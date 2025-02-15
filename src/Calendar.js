import React, { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import ExerciseForm from './ExerciseForm'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './Calendar.css'

const localiser = momentLocalizer(moment)

const MyCalendar = () => {
  const [events, setEvents] = useState([
    {
      title: 'Sample appointment',
      start: new Date(2025, 1, 14, 10, 0),
      end: new Date(2025, 1, 14, 11, 0)
    }
  ])

  const [showForm, setShowForm] = useState(false)

  const addExercise = (exercise) => {
    setEvents([...events, exercise])
    setShowForm(false)
  }

  const handleOpenForm = () => setShowForm(true)
  const handleCloseForm = () => setShowForm(false)

  return (
    <div>
      <h1>Spinal Health Organiser</h1>

      <button onClick={handleOpenForm}>Add Exercise</button>
      {showForm && (
        <div className="form">
            <ExerciseForm 
                addExercise={addExercise} 
                handleCloseForm={handleCloseForm}
            />
        </div>
      )}

      <Calendar
        localizer={localiser}
        events={events}
        style={{ height: 500 }}
      />
    </div>
  )
}

export default MyCalendar
