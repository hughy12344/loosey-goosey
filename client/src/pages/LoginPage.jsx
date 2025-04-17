import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { login } from '../api/authAPI'

const LoginForm = ({ handleLogin }) => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = await login(email, password)

      if (data.user) {
        // Set cookies for 1 hour
        Cookies.set('userID', data.user._id, { expires: 1 / 24 })
        Cookies.set('firstName', data.user.firstName, { expires: 1 / 24 })
        Cookies.set('userType', data.user.type, { expires: 1 / 24 })

        handleLogin(data.user.firstName, data.user.type)

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
    <form onSubmit={handleSubmit}>
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
      <button
        type='submit'
        className='text-white bg-sky-500 hover:bg-sky-700 focus:ring-4 focus-outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2 mb-3'
      >
        Login
      </button>
      <p className='block text-sm'>No account? Register here: </p>
      <a className='text-sm text-blue-500 hover:text-blue-500 hover:underline' href='/register'>Register</a>
    </form>
  )
}

export default LoginForm
