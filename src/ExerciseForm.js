import React, { useState } from 'react'
import './ExerciseForm.css'

const ExerciseForm = ({ addExercise, handleCloseForm }) => {
  const [title, setTitle] = useState('')
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const newEvent = {
      title,
      start: new Date(start),
      end: new Date(end)
    }
    addExercise(newEvent)
  }

  return (
    <form onSubmit={handleSubmit}>
        <div className='formContent'>
            <h2>Add Exercise</h2>
            <input
            type='text'
            placeholder='Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            />
            <label>Start Date</label>
            <input
            type='datetime-local'
            value={start}
            onChange={(e) => setStart(e.target.value)}
            required
            />
            <label>End Date</label>
            <input
            type='datetime-local'
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            required
            />
            <button type='submit'>Add exercise</button>
            <button onClick={handleCloseForm}>Close</button>
        </div>
    </form>
  )
}

export default ExerciseForm
