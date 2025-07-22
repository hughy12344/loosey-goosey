// Adds new workout record to the backend database
export const addWorkout = async (workout) => {
  try {
    const response = await fetch('http://localhost:8080/workouts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(workout),
      credentials: 'include'
    })
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    return await response.json()
  } catch (err) {
    console.error('Error adding workout: ', err)
    throw err
  }
}

export const getPracName = async (workout) => {
  try {
    const response = await fetch(`http://localhost:8080/auth/${workout.pracID}`, {
      method: 'GET',
      headers: {
      'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
    return await response.json()
  } catch (err) {
    console.error('Error fetching prac name: ', err)
  }
}