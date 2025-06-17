//Backend URL path
const apiBase = import.meta.env.VITE_API_URL;

// Assigns a new client to a practitioner in the backend database
export const addClient = async (client) => {
  try {
    const response = await fetch(`${apiBase}/clients`, {
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
