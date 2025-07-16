import { useState } from 'react'
import { addWorkout } from '../api/workoutAPI'

const useWorkoutsManagement = (initialWorkouts = []) => {
  const [workouts, setWorkouts] = useState(initialWorkouts)

  // Handle add exercise button within the exercise form
  const handleAddWorkout = async (workout) => {
    try {
      const newWorkout = await addWorkout(workout)
      setWorkouts(prevWorkouts => [...prevWorkouts, newWorkout])
    } catch (err) {
      console.error('Error adding workout: ', err)
    }
  }

  return {
    workouts,
    handleAddWorkout
  }
}

export default useWorkoutsManagement
