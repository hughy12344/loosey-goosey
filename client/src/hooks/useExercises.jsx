import { useState, useEffect } from 'react'

const useExercises = ({ userID, userType, urlUserID, setExercises }) => {
  const [firstName, setFirstName] = useState('')

  useEffect(() => {
    if (userType === 'practitioner') {
      const fetchClientData = async () => {
        try {
          const response = await fetch(`http://localhost:8080/auth/${userID}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include'
          })
          const clientData = await response.json()
          setFirstName(clientData.firstName)
        } catch (err) {
          console.error('Error fetching user data: ', err)
        }
      }
      fetchClientData()
    }
  }, [userID, userType])

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch('http://localhost:8080/exercises', {
          headers: {
            method: 'GET'
          },
          credentials: 'include'
        })
        const data = await response.json()
        if (userType === 'client') {
          const formattedExercisesForClient = data.filter(exercise => exercise.userID === userID)
            .map(exercise => ({
              id: exercise._id,
              title: exercise.title,
              start: new Date(exercise.start),
              end: new Date(exercise.end)
            }))
          setExercises(formattedExercisesForClient)
        } else {
          const formattedExercisesForPrac = data.filter(exercise => exercise.userID === urlUserID)
            .map(exercise => ({
              id: exercise._id,
              title: exercise.title,
              start: new Date(exercise.start),
              end: new Date(exercise.end)
            }))
          setExercises(formattedExercisesForPrac)
        }
      } catch (err) {
        console.error('Error fetching exercises: ', err)
      }
    }
    fetchExercises()
  }, [userID, userType, urlUserID, setExercises])

  return { firstName }
}

export default useExercises
