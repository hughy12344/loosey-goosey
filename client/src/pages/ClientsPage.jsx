import { UserPlus } from 'lucide-react'
import { useState }  from 'react'
import ClientForm from '../ClientForm'
import Cookies from 'js-cookie'
import useClients from '../hooks/useClients'
import useClientsManagement from '../hooks/useClientsManagement'

const ClientsPage = () => {
    const [showForm, setShowForm] = useState(false)
    const userID = Cookies.get('userID')

    const {clients, setClients, handleAddClient} = useClientsManagement()
    useClients({ setClients, userID })

    const handleOpenForm = () => setShowForm(true)
    const handleCloseForm = () => setShowForm(false)

    return(
        <div>
            <UserPlus onClick={(handleOpenForm)} className='mb-5'/>

            {showForm && (
                <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
                    <ClientForm
                        handleAddClient={handleAddClient}
                        handleCloseForm = {handleCloseForm}
                    />
                </div>
            )}

            <table className='w-full text-left'>
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
                            <td>{client.firstName}</td>
                            <td>{client.email}</td>
                            <td>
                                <a
                                    href={`/calendar/${client.userID}`}
                                >View Calendar
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ClientsPage