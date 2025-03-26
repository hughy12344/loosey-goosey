import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'
import MyCalendar from './Calendar'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import Banner from './Banner'
import Home from './Home'
import './App.css'

function App () {
  const navigate = useNavigate()
  const location = useLocation()
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
      const response = await fetch('http://localhost:8080/auth/logout', {
        method: 'POST',
        credentials: 'include'
      })

      if (!response.ok) {
        throw new Error('Failed to loggout from server')
      }

      Cookies.remove('userID')
      Cookies.remove('firstName')

      setIsLoggedIn(false)

      navigate('/login')
    } catch (err) {
      console.error('Error during logout:', err)
    }
  }

  const getPageTitle = (path) => {
    switch (path) {
      case '/':
        return 'Home'
      case '/calendar':
        return 'My Calendar'
      case '/login':
        return 'Login'
      case '/register':
        return 'Register'
      default:
        return ''
    }
  }

  const pageTitle = getPageTitle(location.pathname)

  return (
    <div>
      <Banner isLoggedIn={isLoggedIn} firstName={firstName} handleLogout={handleLogout} />
      <div className='bg-slate-200'>
        <div className='bg-white max-w-3xl mx-auto py-6'>
          <h1 className='text-3xl font-bold text-gray-900 px-5'>{pageTitle}</h1>
        </div>
        <div className='bg-white max-w-3xl mx-auto px-5'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/calendar' element={<MyCalendar />} />
            <Route path='/login' element={<LoginForm handleLogin={handleLogin} />} />
            <Route path='/register' element={<RegisterForm />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
