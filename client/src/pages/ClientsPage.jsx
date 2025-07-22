// Import libraries and components
import { useState } from 'react'
import ClientForm from '../components/ClientForm'
import WorkoutForm from '../components/WorkoutForm'
import Cookies from 'js-cookie'
import useClients from '../hooks/useClients'
import useClientsManagement from '../hooks/useClientsManagement'
import ClientUtilities from '../components/ClientUtilities'
import useWorkoutsManagement from '../hooks/useWorkoutsManagement'

const ClientsPage = () => {
  // State variables for showing client form and user ID
  const [showForm, setShowForm] = useState(false)
  const [showAddWorkout, setShowAddWorkout] = useState(false)
  const userID = Cookies.get('userID')
  const firstName = Cookies.get('firstName')

  // Import client state and management
  const { clients, setClients, handleAddClient } = useClientsManagement()
  const { handleAddWorkout } = useWorkoutsManagement()

  // Import and use custom hook for fetching clients assigned to logged in practitioner
  const { isLoading } = useClients({ setClients, userID })

  // Handlers for opening and closing the client form
  const handleOpenForm = () => setShowForm(true)
  const handleCloseForm = () => setShowForm(false)

  const handleOpenAddWorkout = () => setShowAddWorkout(true)
  const handleCloseAddWorkout = () => setShowAddWorkout(false)

  return (
    <div>
      <ClientUtilities
        handleOpenForm={handleOpenForm}
        handleOpenAddWorkout={handleOpenAddWorkout}
      />

      {/* Client form component wrapped in div to darken background UI */}
      {showForm && (
        <div className='fixed inset-0 bg-black/50 z-50 flex justify-center items-center'>
          <ClientForm
            handleAddClient={handleAddClient}
            handleCloseForm={handleCloseForm}
          />
        </div>
      )}

      {/* Workout form component wrapped in div to darken background UI */}
      {showAddWorkout && (
        <div className='fixed inset-0 bg-black/50 z-50 flex justify-center items-center'>
          <WorkoutForm
            clients={clients}
            userID={userID}
            firstName={firstName}
            handleCloseAddWorkout={handleCloseAddWorkout}
            handleAddWorkout={handleAddWorkout}
          />
        </div>
      )}

      {isLoading ? (
        <div className='flex justify-center'>
          <div className='w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin' />
        </div>
      ) : (
        <div>
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
      )}
    </div>
  )
}

export default ClientsPage
