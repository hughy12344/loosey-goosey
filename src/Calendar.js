import React, { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import ExerciseForm from './ExerciseForm'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localiser = momentLocalizer(moment)

const MyCalendar = () => {
  const [events, setEvents] = useState([
    {
      title: 'Sample appointment',
      start: new Date(2025, 1, 14, 10, 0),
      end: new Date(2025, 1, 14, 11, 0)
    }
  ])

  const addExercise = (exercise) => {
    setEvents([...events, exercise])
  }

  return (
    <div>
      <h1>Spinal Health Organiser</h1>
      <ExerciseForm addExercise={addExercise} />
      <Calendar
        localizer={localiser}
        events={events}
        style={{ height: 500 }}
      />
    </div>
  )
}

export default MyCalendar
