import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const RegisterForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch('http://localhost:8080/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password, firstName })
    })

    const data = await response.json()
    if (data.token) {
      localStorage.setItem('token', data.token)
    }
  }

  return (
    <form autoComplete='off' onSubmit={handleSubmit}>
      <label htmlFor='registrationEmail' className='block text-sm font-medium text-gray-900'>Email</label>
      <input
        id='registrationEmail'
        name='registrationEmail'
        placeholder='johnsmith@gmail.com'
        type='email'
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        autoComplete='off'
        className='block bg-gray-50 text-gray-900 text-sm border border-gray-300 rounded-lg w-full p-2 mb-3'
      />
      <label htmlFor='registrationPassword' className='block text-sm font-medium text-gray-900'>Password</label>
      <input
        id='registrationPassword'
        name='registrationPassword'
        type='password'
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        autoComplete='off'
        className='block bg-gray-50 text-gray-900 text-sm border border-gray-300 rounded-lg w-full p-2 mb-3'
      />
      <label htmlFor='registrationFirstName' className='block text-sm font-medium text-gray-900'>First Name</label>
      <input
        id='registrationFirstName'
        name='registrationFirstName'
        placeholder='John'
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
        required
        autoComplete='off'
        className='block bg-gray-50 text-gray-900 text-sm border border-gray-300 rounded-lg w-full p-2 mb-3'
      />
      <button
        type='submit'
        className='text-white bg-sky-500 hover:bg-sky-700 focus:ring-4 focus-outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2 mb-3'
      >
        Register
      </button>
      <p className='block text-sm'>Already have an account? Login here:</p>
      <a href='/login' className='text-sm hover:text-blue-500 hover:underline'>Login</a>
    </form>
  )
}

export default RegisterForm
