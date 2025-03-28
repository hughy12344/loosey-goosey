import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'
import MyCalendar from './Calendar'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import Banner from './Banner'
import Home from './Home'
import Clients from './Clients'
import './App.css'

function App () {
  const navigate = useNavigate()
  const location = useLocation()
  const [isLoggedIn, setIsLoggedIn] = useState(null)
  const [firstName, setFirstName] = useState('')
  const [userType, setUserType] = useState('')

  useEffect(() => {
    const userID = Cookies.get('userID')
    const firstName = Cookies.get('firstName')
    const userType = Cookies.get('userType')

    if (userID) {
      setIsLoggedIn(true)
      setFirstName(firstName)
      setUserType(userType)
    } else {
      setIsLoggedIn(false)
      setUserType('')
    }
  }, [])

  const handleLogin = (firstName, userType) => {
    setIsLoggedIn(true)
    setFirstName(firstName)
    setUserType(userType)
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
      Cookies.remove('userType')

      setIsLoggedIn(false)
      setFirstName('')
      setUserType('')

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
      case '/clients':
        return 'My Clients'
      default:
        return ''
    }
  }

  const pageTitle = getPageTitle(location.pathname)

  return (
    <div>
      <Banner isLoggedIn={isLoggedIn} firstName={firstName} userType={userType} handleLogout={handleLogout} />
      <div className='bg-slate-200'>
        <div className='bg-white max-w-3xl mx-auto py-6'>
          <h1 className='text-3xl font-bold text-gray-900 px-5'>{pageTitle}</h1>
        </div>
        <div className='bg-white max-w-3xl mx-auto px-5'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/calendar' element={<MyCalendar />} />
            <Route path='/calendar/:userID' element={<MyCalendar />} />
            <Route path='/login' element={<LoginForm handleLogin={handleLogin} />} />
            <Route path='/register' element={<RegisterForm />} />
            <Route path='/clients' element={<Clients />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
