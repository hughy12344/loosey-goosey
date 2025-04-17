//Adds new exercise record to the backend database
export const addExercise = async (exercise) => {
  try {
    const response = await fetch('http://localhost:8080/exercises', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(exercise),
      credentials: 'include'
    })
    return await response.json()
  } catch (err) {
    console.error('Error adding exercise: ', err)
    throw err
  }
}

//Deletes an existing exercise record from the backend database
export const deleteExercise = async (exerciseId) => {
  try {
    await fetch(`http://localhost:8080/exercises/${exerciseId}`, {
      method: 'DELETE',
      credentials: 'include'
    })
  } catch (err) {
    console.error('Error deleting exercise: ', err)
    throw err
  }
}
