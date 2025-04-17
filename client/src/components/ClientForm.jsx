//Import libraries and functions
import { useState } from 'react'
import Cookies from 'js-cookie'
import { getUserByEmail } from '../api/authAPI'

const ClientForm = ({ handleAddClient, handleCloseForm }) => {
  //State variable for client email
  const [email, setEmail] = useState('')

  //Handles the submission of a new client assignment to a practitioner
  const handleSubmit = async (e) => {
    e.preventDefault()
    const user = await getUserByEmail(email)
    const newClient = {
      pracID: Cookies.get('userID'),
      userID: user.userID
    }
    console.log(newClient)
    handleAddClient(newClient)
  }

  //Handles the close button on the form
  const handleClose = (e) => {
    e.preventDefault()
    handleCloseForm()
  }

  return (
    //Main form wrapper that handles submission and uses a flex style with a white background
    <form onSubmit={handleSubmit} className='flex flex-col bg-white p-5 rounded-lg max-w-sm shadow-lg'>
      {/* Form title */}
      <h2 className='text-2xl font-bold text-gray-900 mb-5'>Add New Client</h2>
      {/* Email input and label */}
      <label htmlFor='formEmail' className='block text-sm font-medium text-gray-900'>Email Address</label>
      <input
        id='formEmail'
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className='block bg-gray-50 text-gray-900 text-sm border border-gray-300 rounded-lg w-full p-2 mb-5'
      />
      {/* Submit button for new client assignment */}
      <button
        type='submit'
        className='text-white bg-sky-500 hover:bg-sky-700 focus:ring-4 focus-outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2 mb-3'
      >Add new client
      </button>
      {/* Close button for closing the client form */}
      <button
        type='button'
        onClick={handleClose}
        className='text-white bg-sky-500 hover:bg-sky-700 focus:ring-4 focus-outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2 mb-3'
      >Close
      </button>
    </form>
  )
}

export default ClientForm
