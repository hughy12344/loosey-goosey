import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const LoginForm = ({ setToken }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })

    const data = await response.json()

    if (data.token) {
      localStorage.setItem('token', data.token)
      setToken(data.token)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type='email' value={email} onChange={e => setEmail(e.target.value)} />
      <input type='password' value={password} onChange={e => setPassword(e.target.value)} />
      <button type='submit'>Login</button>
      <p>No account? Register here: </p>
      <NavLink to="/register">Register</NavLink>
    </form>
  )
}

export default LoginForm
