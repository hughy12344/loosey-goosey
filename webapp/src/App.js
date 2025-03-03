import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import MyCalendar from './Calendar.js'
import LoginForm from './LoginForm.js'
import Banner from './Banner.js'
import './App.css'
import RegisterForm from './RegisterForm.js'

function App () {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [userID, setUserID] = useState('')
  const [firstName, setFirstName] = useState('')

  const handleLogin = (token, userID, firstName) => {
    setToken(token)
    setUserID(userID)
    console.log(userID)
    setFirstName(firstName)
  }

  return (
    <div>
      <Banner firstName={firstName}/>
      <Routes>
        <Route path ="/" element={<MyCalendar token={token} userID={userID} firstName={firstName}/>} />
        <Route path ="/login" element={<LoginForm handleLogin={handleLogin}/>} />
        <Route path ="/register" element={<RegisterForm />} />
      </Routes>
    </div>
  )
}

export default App
