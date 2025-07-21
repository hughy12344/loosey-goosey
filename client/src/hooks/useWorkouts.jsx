import { useState, useEffect } from "react"

const useWorkouts = ({userID, setWorkouts}) => {
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchWorkouts = async () => {
            setIsLoading(true)
            try{
                const response = await fetch('http://localhost:8080/workouts', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
                })
                const data = await response.json()
                
                const formattedWorkoutsForClient = data.filter(workout => workout.clientID === userID)
                    .map(workout => ({
                    id: workout._id,
                    pracID: workout.pracID,
                    pracFirstName: workout.pracFirstName,
                    date: workout.date,
                    clientID: workout.clientID,
                    exercises: workout.exercises.map(exercise => ({
                       exercise: exercise.exercise,
                       sets: exercise.sets,
                       reps: exercise.reps
                    }))
                }))
                setIsLoading(false)
                setWorkouts(formattedWorkoutsForClient)
            } catch (err) {
                console.error('Error fetching workouts: ', err)
            }
        }
        fetchWorkouts()
    }, [setWorkouts])
    return { isLoading }
}

export default useWorkouts