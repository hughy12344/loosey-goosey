import React, { useState } from 'react'

const ExerciseForm = ({ addExercise }) => {
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
      <input
        type='text'
        placeholder='Title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type='datetime-local'
        value={start}
        onChange={(e) => setStart(e.target.value)}
        required
      />
      <input
        type='datetime-local'
        value={end}
        onChange={(e) => setEnd(e.target.value)}
        required
      />
      <button type='submit'>Add exercise</button>
    </form>
  )
}

export default ExerciseForm
