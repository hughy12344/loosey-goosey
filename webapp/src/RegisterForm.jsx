import React, { useState } from 'react'
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
    <form onSubmit={handleSubmit}>
      <h1>Register</h1>
      <input placeholder="Email..." type='email' value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password..." type='password' value={password} onChange={e => setPassword(e.target.value)} />
      <input placeholder="Name..." value={firstName} onChange={e => setFirstName(e.target.value)} />
      <button type='submit'>Register</button>
      <p>Already have an account? Login here:</p>
      <NavLink to="/login">Login</NavLink>
    </form>
  )
}

export default RegisterForm
