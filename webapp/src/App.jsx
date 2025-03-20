import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import MyCalendar from './Calendar'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import Banner from './Banner'
import Home from './Home'
import './App.css'

function App () {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(null)
  const [firstName, setFirstName] = useState('')

  useEffect(() => {
      const userID = Cookies.get('userID')
      const firstName = Cookies.get('firstName')

      if (userID) {
          setIsLoggedIn(true)
          setFirstName(firstName)
      } else {
          setIsLoggedIn(false)
      }
  }, [])

  const handleLogin = (firstName) => {
    setIsLoggedIn(true)
    setFirstName(firstName)
  } 

  const handleLogout = async () => {
      try {
          await fetch('http://localhost:8080/auth/logout', {
              method: 'POST',
              credentials: 'include'
          })

          Cookies.remove('userID')
          Cookies.remove('firstName')

          setIsLoggedIn(false)
          
          navigate("/login")
      } catch (err) {
          console.error('Error during logout:', err)
      }
  }

  return (
    <div>
      <Banner isLoggedIn={isLoggedIn} firstName={firstName} handleLogout={handleLogout}/>
      <div className='page'>
        <div className='pageContent'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calendar" element={<MyCalendar />} />
            <Route path="/login" element={<LoginForm handleLogin={handleLogin}/>} />
            <Route path="/register" element={<RegisterForm />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
