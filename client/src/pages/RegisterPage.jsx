// Import libraries and API
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { register } from '../api/authAPI'

const RegisterPage = () => {
  // Import navigate function for changing URL path
  const navigate = useNavigate()

  // Insantiate user type, email, password and first name state variables
  const [type, setType] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')

  // Handler for register button
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // Pass data to register API function
      const data = await register(type, email, password, firstName)

      // If registration is successful, notify and navigate user to login
      if (data.token) {
        localStorage.setItem('token', data.token)
        alert('Registration successful! You can now login.')
        navigate('/login')
      } else {
        alert(data.error || 'Registration failed! Please try again.')
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    // Registration form
    <form autoComplete='off' onSubmit={handleSubmit}>
      {/* Fieldset for radio buttons of user type */}
      <fieldset>
        <legend className='block text-sm font-medium text-gray-900'>User type</legend>
        {/* Practitioner radio button and label */}
        <div className='flex items-center gap-x-6'>
          <input
            id='userPractitioner'
            name='radioUser'
            type='radio'
            value='practitioner'
            checked={type === 'practitioner'}
            onChange={e => setType(e.target.value)}
            className='relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-sky-500 checked:bg-sky-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden'
          />
          <label htmlFor='userPractitioner' className='block text-sm'>Practitioner</label>
        </div>
        {/* Client radio button and label */}
        <div className='flex items-center gap-x-6 mb-3'>
          <input
            id='userClient'
            name='radioUser'
            type='radio'
            value='client'
            checked={type === 'client'}
            onChange={e => setType(e.target.value)}
            className='relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-sky-500 checked:bg-sky-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden'
          />
          <label htmlFor='userClient' className='block text-sm'>Client</label>
        </div>
      </fieldset>
      {/* First name label and input */}
      <label htmlFor='registrationFirstName' className='block text-sm font-medium text-gray-900'>First Name</label>
      <input
        id='registrationFirstName'
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
        required
        className='block bg-gray-50 text-gray-900 text-sm border border-gray-300 rounded-lg w-full p-2 mb-3'
      />
      {/* Email label and input */}
      <label htmlFor='registrationEmail' className='block text-sm font-medium text-gray-900'>Email</label>
      <input
        id='registrationEmail'
        type='email'
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        className='block bg-gray-50 text-gray-900 text-sm border border-gray-300 rounded-lg w-full p-2 mb-3'
      />
      {/* Password label and input */}
      <label htmlFor='registrationPassword' className='block text-sm font-medium text-gray-900'>Password</label>
      <input
        id='registrationPassword'
        type='password'
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        className='block bg-gray-50 text-gray-900 text-sm border border-gray-300 rounded-lg w-full p-2 mb-3'
      />
      {/* Register button */}
      <button
        type='submit'
        className='text-white bg-sky-500 hover:bg-sky-700 focus:ring-4 focus-outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2 mb-3'
      >
        Register
      </button>
      {/* Link to login page */}
      <p className='block text-sm'>Already have an account? Login here:</p>
      <a href='/login' className='text-sm text-blue-500 hover:text-blue-500 hover:underline'>Login</a>
    </form>
  )
}

export default RegisterPage
