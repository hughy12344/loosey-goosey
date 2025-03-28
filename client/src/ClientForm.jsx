import { useState } from 'react'
import Cookies from 'js-cookie'

const ClientForm = ({addClient, handleCloseForm}) => {
    const [email, setEmail] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`http://localhost:8080/auth/getUserByEmail?email=${email}`)
            const data = await response.json()
            if (response.ok) {
                const newClient = {
                    pracID: Cookies.get('userID'),
                    userID: data.userID
                }
                addClient(newClient)
            } else {
                console.error('User not found', data.message)
            }
        } catch (err) {
            console.error('Error fetching user ID', err)
        }
      }
    
      const handleClose = (e) => {
        e.preventDefault()
        handleCloseForm()
      }

    return (
        <form onSubmit={handleSubmit} className='flex flex-col bg-white p-5 rounded-lg max-w-sm shadow-lg'>
            <h2 className='text-2xl font-bold text-gray-900 mb-5'>Add New Client</h2>
            <label htmlFor='formEmail' className='block text-sm font-medium text-gray-900'>Email Address</label>
            <input
                id='formEmail'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className='block bg-gray-50 text-gray-900 text-sm border border-gray-300 rounded-lg w-full p-2 mb-5'
            />
            <button
                type='submit'
                className='text-white bg-sky-500 hover:bg-sky-700 focus:ring-4 focus-outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2 mb-3'
            >Add new client
            </button>
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