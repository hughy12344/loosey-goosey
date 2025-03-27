import { UserPlus } from 'lucide-react'
import { useState, useEffect }  from 'react'
import ClientForm from './ClientForm'
import Cookies from 'js-cookie'

const Clients = () => {
    const [showForm, setShowForm] = useState(false)
    const [clients, setClients] = useState([])
    const userID = Cookies.get('userID')

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
                setClients(filteredClients)
            } catch (err) {
                console.error('Error fetching clients: ', err)
            }
        }
        fetchClients()
    }, [userID])

    const addClient = async (client) => {
        try {
            const response = await fetch('http://localhost:8080/clients', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(client),
              credentials: 'include'
            })
            const newClient = await response.json()
            setClients([...clients, newClient])
            setShowForm(false)
          } catch (err) {
            console.error('Error adding appointment: ', err)
          }
    } 

    const handleOpenForm = () => setShowForm(true)
    const handleCloseForm = () => setShowForm(false)

    return(
        <div>
            <UserPlus onClick={(handleOpenForm)}/>

            {showForm && (
                <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
                    <ClientForm
                        addClient={addClient}
                        handleCloseForm = {handleCloseForm}
                    />
                </div>
            )}

            <table className='table-auto'>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Email</th>
                        <th>Calendar</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map(client => (
                        <tr key={client.pracID}>
                            <td>{client.userID}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Clients