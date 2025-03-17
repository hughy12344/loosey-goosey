import React, { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import MyCalendar from './Calendar'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import Banner from './Banner'
import Home from './Home'

function App () {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [userID, setUserID] = useState('')
  const [firstName, setFirstName] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const navigate = useNavigate()

  const handleLogin = (token, userID, firstName) => {
    setToken(token)
    setUserID(userID)
    setFirstName(firstName)
    setIsLoggedIn(true)
    navigate("/")
  }

  const handleLogout = () => {
    setToken('')
    setUserID('')
    setFirstName('')
    setIsLoggedIn(false)
    navigate("/login")
  }

  return (
    <div>
      <Banner handleLogout={handleLogout} firstName={firstName} isLoggedIn={isLoggedIn}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path ="/calendar" element={<MyCalendar token={token} userID={userID}/>} />
        <Route path ="/login" element={<LoginForm handleLogin={handleLogin}/>} />
        <Route path ="/register" element={<RegisterForm />} />
      </Routes>
    </div>
  )
}

export default App
