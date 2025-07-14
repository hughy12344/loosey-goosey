// Import libraries and components
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Cookies from 'js-cookie'
import Calendar from '../components/Calendar'
import useExercises from '../hooks/useExercises'
import ExerciseForm from '../components/ExerciseForm'
import ExerciseDetails from '../components/ExerciseDetails'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import ExerciseUtilities from '../components/ExerciseUtilities'
import useExercisesManagement from '../hooks/useExercisesManagement'

const CalendarPage = ({ location }) => {
  // Grab user ID from URL for prac view of client calendar
  const { userID: urlUserID } = useParams()
  
  // State variables for showing exercise form
  const [showExerciseForm, setShowExerciseForm] = useState(false)

  // Grab user ID and type from cookies
  const userID = urlUserID || Cookies.get('userID')
  const userType = Cookies.get('userType')

  // Import exercise management functions and state
  const { exercises, setExercises, selectedExercise, setSelectedExercise, handleAddExercise, handleDeleteExercise, handleAddComment } = useExercisesManagement()
  // Import client's first name (for prac view) and exercises from DB
  const { firstName, isLoading } = useExercises({ userID, userType, urlUserID, setExercises })

  // Handle opening and closing the add exercise form
  const handleOpenExerciseForm = () => setShowExerciseForm(true)
  const handleCloseExerciseForm = () => setShowExerciseForm(false)

  // Handle clicking an exercise on the calendar and closing the exercise details pane
  const handleExerciseClick = (exercise) => setSelectedExercise(exercise)
  const handleCloseExerciseDetails = () => setSelectedExercise(null)

  return (
    <div>
      {/* Utilities bar for calendar */}
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

      {/* Exercise details popup component when clicking on an existing exercise */}
      <ExerciseDetails
        selectedExercise={selectedExercise}
        handleDeleteExercise={handleDeleteExercise}
        handleCloseExerciseDetails={handleCloseExerciseDetails}
        handleAddComment={handleAddComment}
        userType={userType}
      />

      {isLoading ? (
          <div className="flex justify-center">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
      ) : (
        <div>
          {/* Calendar component */}
          <Calendar
            exercises={exercises}
            handleExerciseClick={handleExerciseClick}
          />
        </div> )}
    </div>
  )
}

export default CalendarPage
