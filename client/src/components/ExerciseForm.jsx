//Import library
import { useState } from 'react'

const ExerciseForm = ({ showExerciseForm, handleAddExercise, handleCloseExerciseForm, userID }) => {
  // State variables for exercise inputs
  // Abdominal workout is first option of dropdown (default)
  const [title, setTitle] = useState('Abdominal workout')
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [customTitle, setCustomTitle] = useState('')
  const [isCustomTitle, setIsCustomTitle] = useState(false)

  //Handle submission of new exercise
  const handleSubmit = (e) => {
    e.preventDefault()
    const newExercise = {
      title: isCustomTitle ? customTitle : title,
      start: new Date(start),
      end: new Date(end),
      userID
    }
    handleAddExercise(newExercise)
    handleCloseExerciseForm()
  }

  //Handle closure of exercise form
  const handleClose = (e) => {
    e.preventDefault()
    handleCloseExerciseForm()
  }

  //Handle title change and custom title state
  const handleTitleChange = (e) => {
    const value = e.target.value
    if (value === 'Custom') {
      setIsCustomTitle(true)
      setTitle('Custom')
    } else {
      setIsCustomTitle(false)
      setTitle(value)
    }
  }

  //If showExerciseForm state is false, dont render this component
  if (!showExerciseForm) return null

  return (
    //Overlay background that dims the rest of the UI
    <div className='fixed inset-0 bg-black/50 z-50 flex justify-center items-center'>
      {/* Modal container */}
      <form onSubmit={handleSubmit} className='flex flex-col bg-white p-5 rounded-lg max-w-sm shadow-lg'>
        {/* Modal title */}
        <h2 className='text-2xl font-bold text-gray-900 mb-5'>Add Exercise</h2>
        {/* Title label and input */}
        <label htmlFor='formSelect' className='block text-sm font-medium text-gray-900'>Title</label>
        <select
          id='formSelect'
          value={title}
          onChange={handleTitleChange}
          className='block bg-gray-50 text-gray-900 text-sm border border-gray-300 rounded-lg w-full p-2 mb-5'
          required
        >
          <option value='Abdominal workout'>Abdominal workout</option>
          <option value='Yoga'>Yoga</option>
          <option value='Foam rolling'>Foam rolling</option>
          <option value='Walk'>Walk</option>
          <option value='Custom'>Custom</option>
        </select>
        {/* Custom title input if 'Custom' is selected*/}
        {isCustomTitle && (
          <input
            type='text'
            placeholder='Enter custom title...'
            value={customTitle}
            onChange={(e) => setCustomTitle(e.target.value)}
            required={isCustomTitle}
            className='block bg-gray-50 text-gray-900 text-sm border border-gray-300 rounded-lg w-full p-2 mb-5'
          />
        )}
        {/* Start Date label and input */}
        <label htmlFor='formStartDate' className='block text-sm font-medium text-gray-900'>Start Date</label>
        <input
          id='formStartDate'
          type='datetime-local'
          value={start}
          onChange={(e) => setStart(e.target.value)}
          required
          className='block bg-gray-50 text-gray-900 text-sm border border-gray-300 rounded-lg w-full p-2 mb-5'
        />
        {/* End Date label and input */}
        <label htmlFor='formEndDate' className='block text-sm font-medium text-gray-900'>End Date</label>
        <input
          id='formEndDate'
          type='datetime-local'
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          required
          className='block bg-gray-50 text-gray-900 text-sm border border-gray-300 rounded-lg w-full p-2 mb-5'
        />
        {/* Submit button*/}
        <button
          type='submit'
          className='text-white bg-sky-500 hover:bg-sky-700 focus:ring-4 focus-outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2 mb-3'
        >Add exercise
        </button>
        {/* Close button */}
        <button
          type='button'
          onClick={handleClose}
          className='text-white bg-sky-500 hover:bg-sky-700 focus:ring-4 focus-outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2 mb-3'
        >Close
        </button>
      </form>
    </div>
  )
}

export default ExerciseForm
