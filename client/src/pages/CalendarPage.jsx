import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Cookies from 'js-cookie'
import Calendar from '../components/Calendar'
import useExercises from '../hooks/useExercises'
import ExerciseForm from '../ExerciseForm'
import ExerciseDetails from '../ExerciseDetails'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import CalendarUtilities from '../components/CalendarUtilities'
import useExercisesManagement from '../hooks/useExercisesManagement'


const CalendarPage = () => {
  const { userID: urlUserID } = useParams()
  const [showExerciseForm, setShowExerciseForm] = useState(false)
  const [selectedExercise, setSelectedExercise] = useState(null)
  const userID = urlUserID || Cookies.get('userID')
  const userType = Cookies.get('userType')

  //Import exercise management functions and state
  const { exercises, setExercises, handleAddExercise, handleDeleteExercise} = useExercisesManagement()
  //Import user's name and exercises from DB
  const { firstName} = useExercises({ userID, userType, urlUserID, setExercises })

  //Handle opening and closing the add exercise form
  const handleOpenExerciseForm = () => setShowExerciseForm(true)
  const handleCloseExerciseForm = () => setShowExerciseForm(false)

  const handleExerciseClick = (exercise) => setSelectedExercise(exercise)
  const handleCloseExerciseDetails = () => setSelectedExercise(null)

  return (
    <div>
      <CalendarUtilities
        userType={userType}
        firstName={firstName}
        handleOpenExerciseForm={handleOpenExerciseForm}
      />
    
      <ExerciseForm
        showExerciseForm={showExerciseForm}
        handleAddExercise={handleAddExercise}
        handleCloseExerciseForm={handleCloseExerciseForm}
        userID={userID}
      />

      <Calendar 
        exercises={exercises}
        handleExerciseClick={handleExerciseClick}
      />

      <ExerciseDetails
        selectedExercise={selectedExercise}
        handleDeleteExercise={handleDeleteExercise}
        handleCloseExerciseDetails={handleCloseExerciseDetails}
      />
    </div>
  )
}

export default CalendarPage