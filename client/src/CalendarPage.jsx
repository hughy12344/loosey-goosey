import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Cookies from 'js-cookie'
import Calendar from './components/Calendar'
import useExercises from './hooks/useExercises'
import ExerciseForm from './ExerciseForm'
import EventDetails from './EventDetails'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import CalendarUtilities from './components/CalendarUtilities'


const CalendarPage = () => {
  const { userID: urlUserID } = useParams()
  const [showForm, setShowForm] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const userID = urlUserID || Cookies.get('userID')
  const userType = Cookies.get('userType')

  const {exercises, firstName} = useExercises(userID, userType, urlUserID)


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

  return (
    <div>
      <CalendarUtilities
        userType={userType}
        firstName={firstName}
        handleOpenForm={handleOpenForm}
      />
    
      <ExerciseForm
        showForm={showForm}
        addAppointment={addAppointment}
        handleCloseForm={handleCloseForm}
        userID={userID}
      />

      <Calendar 
        exercises={exercises}
        handleEventClick={handleEventClick}
      />

      <EventDetails
        selectedEvent={selectedEvent}
        deleteAppointment={deleteAppointment}
        handleCloseEventDetails={handleCloseEventDetails}
      />
    </div>
  )
}

export default CalendarPage