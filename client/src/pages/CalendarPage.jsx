// Import libraries and components
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Cookies from 'js-cookie'
import Calendar from '../components/Calendar'
import useExercises from '../hooks/useExercises'
import ExerciseForm from '../components/ExerciseForm'
import ExerciseDetails from '../components/ExerciseDetails'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import CalendarUtilities from '../components/CalendarUtilities'
import useExercisesManagement from '../hooks/useExercisesManagement'

const CalendarPage = () => {
  // Grab user ID from URL for prac view of client calendar
  const { userID: urlUserID } = useParams()
  
  // State variables for showing exercise form and selected exercise
  const [showExerciseForm, setShowExerciseForm] = useState(false)
  const [selectedExercise, setSelectedExercise] = useState(null)

  // Grab user ID and type from cookies
  const userID = urlUserID || Cookies.get('userID')
  const userType = Cookies.get('userType')

  // Import exercise management functions and state
  const { exercises, setExercises, handleAddExercise, handleDeleteExercise } = useExercisesManagement()
  // Import client's first name (for prac view) and exercises from DB
  const { firstName } = useExercises({ userID, userType, urlUserID, setExercises })

  // Handle opening and closing the add exercise form
  const handleOpenExerciseForm = () => setShowExerciseForm(true)
  const handleCloseExerciseForm = () => setShowExerciseForm(false)

  // Handle clicking an exercise on the calendar and closing the exercise details pane
  const handleExerciseClick = (exercise) => setSelectedExercise(exercise)
  const handleCloseExerciseDetails = () => setSelectedExercise(null)

  return (
    <div>
      {/* Utilities bar for calendar */}
      <CalendarUtilities
        userType={userType}
        firstName={firstName}
        handleOpenExerciseForm={handleOpenExerciseForm}
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
      />

      {/* Calendar component */}
      <Calendar
        exercises={exercises}
        handleExerciseClick={handleExerciseClick}
      />
    </div>
  )
}

export default CalendarPage
