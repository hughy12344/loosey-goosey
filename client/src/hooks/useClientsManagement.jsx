import { useState } from 'react'
import { addClient } from '../api/clientAPI'

const useClientsManagement = (initialClients = []) => {
  const [clients, setClients] = useState(initialClients)

  const handleAddClient = async (client) => {
    try {
      const newClient = await addClient(client)
      setClients([...clients, newClient])
    } catch (err) {
      console.error('Error adding client', err)
    }
  }

  return {
    clients,
    setClients,
    handleAddClient
  }
}

export default useClientsManagement
