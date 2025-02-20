import React, { useState, useEffect } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import ExerciseForm from './ExerciseForm'
import EventDetails from './EventDetails'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './Calendar.css'

const localiser = momentLocalizer(moment)

const MyCalendar = () => {
  const [events, setEvents] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('http://localhost:8080/appointments')
        const data = await response.json()
        const formattedEvents = data.map(appointment => ({
          title: appointment.title,
          start: new Date(appointment.start),
          end: new Date(appointment.end)
        }))
        setEvents(formattedEvents)
      } catch (err) {
        console.error("Error fetching appointments: ", err)
      }
    }
    fetchAppointments()
  }, [])

  const addAppointment = async (appointment) => {
    console.log(appointment)
    try {
      const response = await fetch('http://localhost:8080/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointment)
      })

      const newAppointment = await response.json()
      console.log(newAppointment)
      setEvents([...events, newAppointment])
      setShowForm(false)
    } catch (err) {
      console.error("Error adding appointment: ", err)
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
      <h1>Spinal Health Organiser</h1>

      <Calendar
        localizer={localiser}
        events={events}
        style={{ height: 500 }}
        onSelectEvent={handleEventClick}
      />

    <button onClick={handleOpenForm}>Add Appointment</button>
    {showForm && (
        <div className="pane-open">
            <ExerciseForm 
                addAppointment={addAppointment} 
                handleCloseForm={handleCloseForm}
            />
        </div>
    )}

    {selectedEvent && (
      <div className="pane-open">
          <EventDetails
            selectedEvent={selectedEvent}
            handleCloseEventDetails={handleCloseEventDetails}
          />
      </div>
    )}
    </div>
  )
}

export default MyCalendar
