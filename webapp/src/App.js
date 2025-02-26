import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import MyCalendar from './Calendar.js'
import LoginForm from './LoginForm.js'
import Banner from './Banner.js'
import './App.css'
import RegisterForm from './RegisterForm.js'

function App () {
  const [token, setToken] = useState(localStorage.getItem('token'))
  console.log(token)

  return (
    <div>
      <Banner />
      <Routes>
        <Route path ="/" element={<MyCalendar token={token}/>} />
        <Route path ="/login" element={<LoginForm setToken={setToken} />} />
        <Route path ="/register" element={<RegisterForm />} />
      </Routes>
    </div>
  )
}

export default App
