import { useState } from 'react'
import { addClient } from '../api/clientAPI'

// Custom hook to manage practitioner's clients
const useClientsManagement = (initialClients = []) => {
  const [clients, setClients] = useState(initialClients)

  // Function to add new client
  const handleAddClient = async (client) => {
    try {
      const newClient = await addClient(client)
      setClients([...clients, newClient])
    } catch (err) {
      console.error('Error adding client', err)
    }
  }

  // Return the client list and set / add functions for clients
  return {
    clients,
    setClients,
    handleAddClient
  }
}

export default useClientsManagement
