import React, { useState, useEffect } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import ExerciseForm from './ExerciseForm'
import EventDetails from './EventDetails'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './Calendar.css'

const localiser = momentLocalizer(moment)

const MyCalendar = ({token, userID}) => {
  const [events, setEvents] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!token) return

      try {
        const response = await fetch('http://localhost:8080/appointments', {
          headers: {
            'x-auth-token': token
          }
        })
        const data = await response.json()
        const formattedEvents = data.filter(appointment => appointment.userID === userID)
        .map(appointment => ({
          id: appointment._id,
          title: appointment.title,
          start: new Date(appointment.start),
          end: new Date(appointment.end)
        }))
        setEvents(formattedEvents)
      } catch (err) {
        console.error('Error fetching appointments: ', err)
      }
    }
    fetchAppointments()
  }, [token])

  const addAppointment = async (appointment) => {
    try {
      const response = await fetch('http://localhost:8080/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(appointment)
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
        method: 'DELETE'
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

  return (
    <div>
      <Calendar
        localizer={localiser}
        events={events}
        style={{ height: 500 }}
        onSelectEvent={handleEventClick}
      />

      <button onClick={handleOpenForm}>Add Appointment</button>
      {showForm && (
        <div className='pane-open'>
          <ExerciseForm
            addAppointment={addAppointment}
            handleCloseForm={handleCloseForm}
            userID={userID}
          />
        </div>
      )}

      {selectedEvent && (
        <div className='pane-open'>
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
