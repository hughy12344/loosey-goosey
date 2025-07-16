import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Cookies from 'js-cookie'
import moment from 'moment'
import useExercises from '../hooks/useExercises'
import useExercisesManagement from '../hooks/useExercisesManagement'
import ExerciseUtilities from '../components/ExerciseUtilities'
import ExerciseForm from '../components/ExerciseForm'

const ExercisesPage = ({ location }) => {
  // State variables for showing exercise form
  const [showExerciseForm, setShowExerciseForm] = useState(false)

  // Grab user ID from URL for prac view of client calendar/exercises
  const { userID: urlUserID } = useParams()

  // Grab user ID and type from cookies
  const userID = urlUserID || Cookies.get('userID')
  const userType = Cookies.get('userType')

  // Grab exercise state variables
  const { exercises, setExercises, handleAddExercise } = useExercisesManagement()

  // Import and use custom hook for fetching user's exercises
  const { firstName, isLoading } = useExercises({ userID, userType, urlUserID, setExercises })

  // Handle opening and closing the add exercise form
  const handleOpenExerciseForm = () => setShowExerciseForm(true)
  const handleCloseExerciseForm = () => setShowExerciseForm(false)

  return (
    <div>
      {/* Utilities bar for exercises */}
      <ExerciseUtilities
        userType={userType}
        firstName={firstName}
        handleOpenExerciseForm={handleOpenExerciseForm}
        location={location}
      />

      {/* Exercise form popup component when adding a new exercise */}
      <ExerciseForm
        showExerciseForm={showExerciseForm}
        handleAddExercise={handleAddExercise}
        handleCloseExerciseForm={handleCloseExerciseForm}
        userID={userID}
      />

      {isLoading ? (
        <div className='flex justify-center'>
          <div className='w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin' />
        </div>
      ) : (
        <div>
          {/* Table for displaying user's exercise details */}
          <table className='w-full text-left'>
            <thead>
              <tr className='border-b border-slate-300'>
                <th className='p-2'>Date</th>
                <th className='p-2'>Title</th>
                <th className='p-2'>Start</th>
                <th className='p-2'>End</th>
                <th className='p-2'>Notes</th>
                <th className='p-2'>Comment</th>
              </tr>
            </thead>
            <tbody>
              {exercises.map(exercise => (
                <tr key={exercise.id}>
                  <td className='p-2 whitespace-nowrap'>{moment(exercise.start).format('MMMM Do YYYY')}</td>
                  <td className='p-2 whitespace-nowrap'>{exercise.title}</td>
                  <td className='p-2 whitespace-nowrap'>{moment(exercise.start).format('h:mm:ss a')}</td>
                  <td className='p-2 whitespace-nowrap'>{moment(exercise.end).format('h:mm:ss a')}</td>
                  <td className='p-2 whitespace-nowrap'>{exercise.notes}</td>
                  <td className='p-2 w-full whitespace-normal'>{exercise.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default ExercisesPage
