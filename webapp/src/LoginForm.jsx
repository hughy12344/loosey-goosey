import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const LoginForm = ({ handleLogin }) => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include'
    })

    const data = await response.json()

    if (data.user) {
      //Set cookies for 1 hour
      Cookies.set('userID', data.user._id, { expires: 1/24 })
      Cookies.set('firstName', data.user.firstName, { expires: 1/24 })

      handleLogin(data.user.firstName)
      navigate('/calendar')
    }
  }

  return (
    <div>
      <div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input placeholder="Email..." type='email' value={email} onChange={e => setEmail(e.target.value)} />
          <input placeholder="Password..." type='password' value={password} onChange={e => setPassword(e.target.value)} />
          <button type='submit'>Login</button>
          <p>No account? Register here: </p>
          <NavLink to="/register">Register</NavLink>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
