import { useEffect } from 'react'

const useClients = ({setClients, userID}) => {
    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await fetch('http://localhost:8080/clients', {
                    headers: {
                        method: 'GET'
                    },
                    credentials: 'include'
                })
                const data = await response.json()
                const filteredClients = data.filter(clients => clients.pracID === userID)
                
                const filteredClientDetails = await Promise.all(filteredClients.map(async (client) => {
                    const userResponse = await fetch(`http://localhost:8080/auth/${client.userID}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        credentials: 'include'
                    })
    
                    const userData = await userResponse.json();
                    return { ...client, firstName: userData.firstName, email: userData.email }
                }))
    
                setClients(filteredClientDetails)
            } catch (err) {
                console.error('Error fetching clients: ', err)
            }
        }
        fetchClients()
    }, [userID])
}

export default useClients