// Import libraries and components
import { UserPlus } from 'lucide-react'
import { useState } from 'react'
import ClientForm from '../components/ClientForm'
import Cookies from 'js-cookie'
import useClients from '../hooks/useClients'
import useClientsManagement from '../hooks/useClientsManagement'

const ClientsPage = () => {
  // State variables for showing client form and user ID
  const [showForm, setShowForm] = useState(false)
  const userID = Cookies.get('userID')

  // Import client state and management
  const { clients, setClients, handleAddClient } = useClientsManagement()

  // Import and use custom hook for fetching clients assigned to logged in practitioner
  useClients({ setClients, userID })

  // Handlers for opening and closing the client form
  const handleOpenForm = () => setShowForm(true)
  const handleCloseForm = () => setShowForm(false)

  return (
    <div>
      {/* Add user button (opens client form) */}
      <UserPlus onClick={(handleOpenForm)} className='mb-5 text-gray-500 hover:text-black' />

      {/* Client form component wrapped in div to darken background UI */}
      {showForm && (
        <div className='fixed inset-0 bg-black/50 z-50 flex justify-center items-center'>
          <ClientForm
            handleAddClient={handleAddClient}
            handleCloseForm={handleCloseForm}
          />
        </div>
      )}
      {/* Table that contains assigned client info and a link to their unique calendar */}
      <table className='w-full text-left'>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Email</th>
            <th>Calendar</th>
            <th>Exercises</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <tr key={client._id}>
              <td>{client.firstName}</td>
              <td>{client.email}</td>
              <td>
                <a href={`/calendar/${client.userID}`}>View Calendar</a>
              </td>
              <td>
                <a href={`/exercises/${client.userID}`}>View Exercises</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ClientsPage
