import { useEffect, useState } from 'react'

//Backend URL path
const apiBase = import.meta.env.VITE_API_URL;

// Custom hook to fetch clients assigned to logged in practitioner
const useClients = ({ setClients, userID }) => {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchClients = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`${apiBase}/clients`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        })
        const data = await response.json()
        const filteredClients = data.filter(clients => clients.pracID === userID)

        const filteredClientDetails = await Promise.all(filteredClients.map(async (client) => {
          const userResponse = await fetch(`${apiBase}/auth/${client.userID}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include'
          })

          const userData = await userResponse.json()
          return { ...client, firstName: userData.firstName, email: userData.email }
        }))
        setIsLoading(false)
        setClients(filteredClientDetails)
      } catch (err) {
        console.error('Error fetching clients: ', err)
      }
    }
    fetchClients()
  }, [userID])

  return { isLoading }
}

export default useClients
