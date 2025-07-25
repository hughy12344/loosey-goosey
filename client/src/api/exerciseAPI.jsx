//Backend URL path
const apiBase = import.meta.env.VITE_API_URL;

// Adds new exercise record to the backend database
export const addExercise = async (exercise) => {
  try {
    const response = await fetch(`${apiBase}/exercises`, {
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

// Deletes an existing exercise record from the backend database
export const deleteExercise = async (exerciseId) => {
  try {
    await fetch(`${apiBase}/exercises/${exerciseId}`, {
      method: 'DELETE',
      credentials: 'include'
    })
  } catch (err) {
    console.error('Error deleting exercise: ', err)
    throw err
  }
}

// Adds a comment to an existing exercise record in the backend database
export const addComment = async (comment, id) => {
  try {
    const response = await fetch(`${apiBase}/exercises/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(comment),
      credentials: 'include'
    })
    return await response.json()
  } catch (err) {
    console.error('Error adding comment: ', err)
    throw err
  }
}
