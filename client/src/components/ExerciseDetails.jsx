// Import library
import { useState } from 'react';
import moment from 'moment'

const ExerciseDetails = ({ selectedExercise, handleDeleteExercise, handleCloseExerciseDetails, handleAddComment, userType }) => {
  const [pracCommentInput, setPracCommentInput] = useState(false);
  const [comment, setComment] = useState('');

  // Handles the delete exercise button
  const handleDeleteClick = () => {
    handleDeleteExercise(selectedExercise.id)
    handleCloseExerciseDetails()
  }

  const handleShowPracComment = () => {
    setPracCommentInput(true);
  }

  const handleSubmitAddComment = (e) => {
    e.preventDefault()
    const newComment = {comment: comment}
    handleAddComment(newComment)
    setPracCommentInput(false)
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
        {/* Prac comments input and label */}
        {selectedExercise.comment != '' &&
        <label className='block text-sm font-bold text-gray-900'>Practitioner's Comment</label>}
        <p className='text-gray-900 text-sm mb-3'>{selectedExercise.comment}</p>
        {/* Show add comment input button for practitioner*/}
        {userType == 'practitioner' && !pracCommentInput && <button
          onClick={handleShowPracComment}
          className='text-white bg-sky-500 hover:bg-sky-700 focus:ring-4 focus-outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2 mb-3'
        >Add comment
        </button>}
        {/* Add comment label, input and button for practitioner */}
        {userType == 'practitioner' && pracCommentInput && <div>
          <label 
            htmlFor='pracComment' 
            className='block text-sm font-medium text-gray-900'>
            Comment
          </label>
          <input
            id='pracComment'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className='block bg-gray-50 text-gray-900 text-sm border border-gray-300 rounded-lg w-full p-2 mb-5'
          />
          <button
            onClick={handleSubmitAddComment}
            className='text-white bg-sky-500 hover:bg-sky-700 focus:ring-4 focus-outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2 mb-3'
          >+
          </button>
        </div>}
        {/* Delete button for client */}
        {userType == 'client' && <button
          onClick={handleDeleteClick}
          className='text-white bg-sky-500 hover:bg-sky-700 focus:ring-4 focus-outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2 mb-3'
        >Delete
        </button>}
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
