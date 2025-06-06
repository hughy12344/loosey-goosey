// Import library
import moment from 'moment'

const ExerciseDetails = ({ selectedExercise, handleDeleteExercise, handleCloseExerciseDetails }) => {
  // Handles the delete exercise button
  const handleDeleteClick = () => {
    handleDeleteExercise(selectedExercise.id)
    handleCloseExerciseDetails()
  }

  // If no exercise is selected, do not render this component
  if (!selectedExercise) return null

  return (
    // Overlay background that dims the rest of the UI
    <div className='fixed inset-0 bg-black/50 z-50 flex justify-center items-center'>
      {/* Modal container */}
      <div className='flex flex-col bg-white p-5 rounded-lg max-w-sm shadow-lg'>
        {/* Modal title */}
        <h2 className='text-2xl font-bold text-gray-900 mb-5'>Exercise Details</h2>
        {/* Title input and label */}
        <label className='block text-sm font-bold text-gray-900'>Title</label>
        <p className='text-gray-900 text-sm mb-3'>{selectedExercise.title}</p>
        {/* Start date input and label */}
        <label className='block text-sm font-bold text-gray-900'>Start</label>
        <p className='text-gray-900 text-sm mb-3'>{moment(selectedExercise.start).format('MMMM Do YYYY, h:mm:ss a')}</p>
        {/* End date input and label */}
        <label className='block text-sm font-bold text-gray-900'>End</label>
        <p className='text-gray-900 text-sm mb-3'>{moment(selectedExercise.end).format('MMMM Do YYYY, h:mm:ss a')}</p>
        {/* Notes input and label */}
        <label className='block text-sm font-bold text-gray-900'>Notes</label>
        <p className='text-gray-900 text-sm mb-3'>{selectedExercise.notes}</p>
        {/* Delete button */}
        <button
          onClick={handleDeleteClick}
          className='text-white bg-sky-500 hover:bg-sky-700 focus:ring-4 focus-outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2 mb-3'
        >Delete
        </button>
        {/* Close button */}
        <button
          onClick={handleCloseExerciseDetails}
          className='text-white bg-sky-500 hover:bg-sky-700 focus:ring-4 focus-outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2 mb-3'
        >Close
        </button>
      </div>
    </div>
  )
}

export default ExerciseDetails
