// Assigns a new client to a practitioner in the backend database
export const addClient = async (client) => {
  try {
    const response = await fetch('http://localhost:8080/clients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(client),
      credentials: 'include'
    })
    return await response.json()
  } catch (err) {
    console.error('Error adding appointment: ', err)
    throw err
  }
}
