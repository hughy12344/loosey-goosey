import { useState, useEffect } from 'react'

//Backend URL path
const apiBase = import.meta.env.VITE_API_URL;

const useExercises = ({ userID, userType, urlUserID, setExercises }) => {
  const [firstName, setFirstName] = useState('')

  // Custom hook that fetches client's first name for practitioner view of calendar
  useEffect(() => {
    if (userType === 'practitioner') {
      const fetchClientData = async () => {
        try {
          const response = await fetch(`${apiBase}/auth/${userID}`, {
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

  // Custom hook that fetches user's exercises to populate the calendar
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch(`${apiBase}/exercises`, {
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
              end: new Date(exercise.end),
              notes: exercise.notes,
              comment: exercise.comment
            }))
          setExercises(formattedExercisesForClient)
        } else {
          const formattedExercisesForPrac = data.filter(exercise => exercise.userID === urlUserID)
            .map(exercise => ({
              id: exercise._id,
              title: exercise.title,
              start: new Date(exercise.start),
              end: new Date(exercise.end),
              notes: exercise.notes,
              comment: exercise.comment
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
