  import { useState } from 'react'
  import './ExerciseForm.css'

  const ExerciseForm = ({ addAppointment, handleCloseForm, userID }) => {
    //Abdominal workout is first option of dropdown (default)
    const [title, setTitle] = useState('Abdominal workout')
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')
    const [customTitle, setCustomTitle] = useState('')
    const [isCustomTitle, setIsCustomTitle] = useState(false)

    const handleSubmit = (e) => {
      e.preventDefault()
      const newAppointment = {
        title: isCustomTitle ? customTitle : title,
        start: new Date(start),
        end: new Date(end),
        userID
      }
      addAppointment(newAppointment)
    }

    const handleClose = (e) => {
      e.preventDefault()
      handleCloseForm()
    }

    const handleTitleChange = (e) => {
      const value = e.target.value
      if (value === "Custom") {
        setIsCustomTitle(true)
        setTitle('Custom')
      } else {
        setIsCustomTitle(false)
        setTitle(value)
      }
    }

    return (
      <form onSubmit={handleSubmit}>
        <div className='formContent'>
          <h2>Add Exercise</h2>
          <label>Title</label>
          <select
            value={title}
            onChange={handleTitleChange}
            required
          >
            <option value="Abdominal workout">Abdominal workout</option>
            <option value="Yoga">Yoga</option>
            <option value="Foam rolling">Foam rolling</option>
            <option value="Walk">Walk</option>
            <option value="Custom">Custom</option>
          </select>
          {isCustomTitle && (
            <input 
              type='text'
              placeholder='Enter custom title...'
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              required={isCustomTitle}
            />
          )}
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
          <button type='button' onClick={handleClose}>Close</button>
        </div>
      </form>
    )
  }

  export default ExerciseForm