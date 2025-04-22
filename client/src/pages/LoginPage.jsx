// Import libraries and api
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { login } from '../api/authAPI'

const LoginForm = ({ handleLogin }) => {
  // Import navigate function for changing URL path
  const navigate = useNavigate()

  // Instantiate email and password state variables
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Handler for login button (sets cookies for session management)
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = await login(email, password)

      if (data.user) {
        // Set cookies for 1 hour
        Cookies.set('userID', data.user._id, { expires: 1 / 24 })
        Cookies.set('firstName', data.user.firstName, { expires: 1 / 24 })
        Cookies.set('userType', data.user.type, { expires: 1 / 24 })

        // Sets state for is logged in, first name and user type
        handleLogin(data.user.firstName, data.user.type)

        // Navigates to next page depending on user type
        if (data.user.type === 'client') {
          navigate('/calendar')
        } else {
          navigate('/clients')
        }
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    // Login form
    <form onSubmit={handleSubmit}>
      {/* Email label and input */}
      <label htmlFor='email' className='block text-sm font-medium text-gray-900'>Email</label>
      <input
        id='email'
        name='email'
        type='email'
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        className='block bg-gray-50 text-gray-900 text-sm border border-gray-300 rounded-lg w-full p-2 mb-3'
      />
      {/* Password label and input */}
      <label htmlFor='password' className='block text-sm font-medium text-gray-900'>Password</label>
      <input
        id='password'
        name='password'
        type='password'
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        className='block bg-gray-50 text-gray-900 text-sm border border-gray-300 rounded-lg w-full p-2 mb-3'
      />
      {/* Login button */}
      <button
        type='submit'
        className='text-white bg-sky-500 hover:bg-sky-700 focus:ring-4 focus-outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2 mb-3'
      >
        Login
      </button>
      {/* Link to register page */}
      <p className='block text-sm'>No account? Register here: </p>
      <a className='text-sm text-blue-500 hover:text-blue-500 hover:underline' href='/register'>Register</a>
    </form>
  )
}

export default LoginForm
