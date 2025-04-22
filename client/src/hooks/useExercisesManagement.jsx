import { useState } from 'react'
import { addExercise, deleteExercise } from '../api/exerciseAPI'

const useExercisesManagement = (initialExercises = []) => {
  const [exercises, setExercises] = useState(initialExercises)

  // Handle add exercise button within the exercise form
  const handleAddExercise = async (exercise) => {
    try {
      const newExercise = await addExercise(exercise)
      setExercises(prevExercises => [...prevExercises, newExercise])
    } catch (err) {
      console.error('Error adding exercise: ', err)
    }
  }

  // Handle delete exercise button within the exercise details
  const handleDeleteExercise = async (exerciseId) => {
    try {
      await deleteExercise(exerciseId)
      setExercises(prevExercises => prevExercises.filter(exercise => exercise.id !== exerciseId))
    } catch (err) {
      console.error('Error deleting exercise: ', err)
    }
  }

  // Return the exercises and set / handle add / handle delete functions for exercises
  return {
    exercises,
    setExercises,
    handleAddExercise,
    handleDeleteExercise
  }
}

export default useExercisesManagement
