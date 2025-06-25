import { useState } from 'react'
import Cookies from 'js-cookie'
import moment from 'moment'
import useExercises from '../hooks/useExercises'
import useExercisesManagement from '../hooks/useExercisesManagement'
import CalendarUtilities from '../components/CalendarUtilities'
import ExerciseForm from '../components/ExerciseForm'

const ExercisesPage = () => {
    // State variables for showing exercise form
    const [showExerciseForm, setShowExerciseForm] = useState(false)

    // Grab user ID and type from cookies (urlUserID is N/A for this page)
    const userID = Cookies.get('userID')
    const userType = Cookies.get('userType')
    const urlUserID = ''

    //Grab exercise state variables
    const {exercises, setExercises, handleAddExercise} = useExercisesManagement()

    //Import and use custom hook for fetching user's exercises
    const firstName = useExercises({ userID, userType, urlUserID, setExercises })
    
    // Handle opening and closing the add exercise form
    const handleOpenExerciseForm = () => setShowExerciseForm(true)
    const handleCloseExerciseForm = () => setShowExerciseForm(false)

  return (
    <div>
        {/* Utilities bar for exercises */}
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

        {/* Table that contains exercises for user */}
        <table className='w-full text-left'>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Title</th>
                    <th>Start</th>
                    <th>End</th>
                    <th>Notes</th>
                    <th>Comment</th>
                </tr>
            </thead>
            <tbody>
                {Array.isArray(exercises) && exercises.length > 0 ? (
                    exercises.map(exercise => (
                        <tr key={exercise.id}>
                            <td>{moment(exercise.start).format('MMMM Do YYYY')}</td>
                            <td>{exercise.title}</td>
                            <td>{moment(exercise.start).format('h:mm:ss a')}</td>
                            <td>{moment(exercise.end).format('h:mm:ss a')}</td>
                            <td>{exercise.notes}</td>
                            <td>{exercise.comment}</td>
                        </tr>
                    ))
                ) : (
                        <tr>
                            <td colSpan="6" className="text-center py-6">
                                <div className="flex justify-center">
                                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div>
  )
}

export default ExercisesPage
