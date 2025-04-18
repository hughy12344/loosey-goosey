import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment'
import Cookies from 'js-cookie'
import ExerciseForm from './ExerciseForm'
import EventDetails from './EventDetails'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localiser = momentLocalizer(moment)

const MyCalendar = () => {
  const { userID: urlUserID } = useParams()
  const [events, setEvents] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [firstName, setFirstName] = useState('')
  const userID = urlUserID || Cookies.get('userID')
  const [currentView, setCurrentView] = useState(Views.MONTH)
  const [currentDate, setCurrentDate] = useState(new Date())
  const userType = Cookies.get('userType')

  useEffect(() => {
    if (userType === 'practitioner') {
      const fetchClientData = async () => {
        try {
          const response = await fetch(`http://localhost:8080/auth/${userID}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          })
          const clientData = await response.json()
          setFirstName(clientData.firstName)
        } catch (err) {
          console.error('Error fetching user data: ', err)
        }
      }
      fetchClientData()
    }
  }, [userID])

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('http://localhost:8080/appointments', {
          headers: {
            method: 'GET'
          },
          credentials: 'include'
        })
        const data = await response.json()
        if (userType === 'client') {
          const formattedEventsForClient = data.filter(appointment => appointment.userID === userID)
          .map(appointment => ({
            id: appointment._id,
            title: appointment.title,
            start: new Date(appointment.start),
            end: new Date(appointment.end)
          }))
        setEvents(formattedEventsForClient)
        } else {
          const formattedEventsForPrac = data.filter(appointment => appointment.userID === urlUserID)
          .map(appointment => ({
            id: appointment._id,
            title: appointment.title,
            start: new Date(appointment.start),
            end: new Date(appointment.end)
          }))
          setEvents(formattedEventsForPrac)
        }
      } catch (err) {
        console.error('Error fetching appointments: ', err)
      }
    }
    fetchAppointments()
  }, [userID])

  const addAppointment = async (appointment) => {
    try {
      const response = await fetch('http://localhost:8080/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(appointment),
        credentials: 'include'
      })
      const newAppointment = await response.json()
      setEvents([...events, newAppointment])
      setShowForm(false)
    } catch (err) {
      console.error('Error adding appointment: ', err)
    }
  }

  const deleteAppointment = async (appointmentId) => {
    try {
      await fetch(`http://localhost:8080/appointments/${appointmentId}`, {
        method: 'DELETE',
        credentials: 'include'
      })
      setEvents(events.filter(event => event.id !== appointmentId))
      setSelectedEvent(null)
    } catch (err) {
      console.error('Error deleting appointment: ', err)
    }
  }

  const handleOpenForm = () => setShowForm(true)
  const handleCloseForm = () => setShowForm(false)

  const handleEventClick = (event) => {
    setSelectedEvent(event)
  }
  const handleCloseEventDetails = () => setSelectedEvent(null)

  const handleViewChange = (view) => {
    setCurrentView(view)
  }

  const handleNavigate = (date, view, action) => {
    switch (action) {
      case 'PREV':
        setCurrentDate(prevDate => {
          const newDate = moment(prevDate).subtract(1, view).toDate()
          return newDate
        })
        break
      case 'NEXT':
        setCurrentDate(prevDate => {
          const newDate = moment(prevDate).add(1, view).toDate()
          return newDate
        })
        break
      case 'TODAY':
        setCurrentDate(new Date())
        break
      default:
        break
    }
  }

  return (
    <div>
      {userType === 'client' && (
      <button
        onClick={handleOpenForm}
        className='text-white bg-sky-500 hover:bg-sky-700 focus:ring-4 focus-outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2 mb-3'
      >Add Appointment
      </button>)}
      
      <div className='flex justify-between'>
        {userType === 'practitioner' && (
          <h2 className='text-xl font-bold text-gray-900'>{firstName ? firstName + `'s Calendar` : ''}</h2>
        )}
        {userType === 'practitioner' && (
          <a 
            href='/clients'
            className='text-white bg-sky-500 hover:bg-sky-700 focus:ring-4 focus-outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2 mb-3'
          >Go Back</a>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
          <ExerciseForm
            addAppointment={addAppointment}
            handleCloseForm={handleCloseForm}
            userID={userID}
          />
        </div>
      )}

      <Calendar
        localizer={localiser}
        events={events}
        style={{ height: 500 }}
        onSelectEvent={handleEventClick}
        views={['month', 'week', 'day', 'agenda']}
        view={currentView}
        onView={handleViewChange}
        onNavigate={handleNavigate}
        date={currentDate}
      />

      {selectedEvent && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
          <EventDetails
            selectedEvent={selectedEvent}
            deleteAppointment={deleteAppointment}
            handleCloseEventDetails={handleCloseEventDetails}
          />
        </div>
      )}
    </div>
  )
}

export default MyCalendar