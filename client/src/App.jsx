// Import libraries and components
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'
import CalendarPage from './pages/CalendarPage'
import LoginForm from './pages/LoginPage'
import RegisterForm from './pages/RegisterPage'
import Banner from './components/Banner'
import Footer from './components/Footer'
import Home from './pages/HomePage'
import Clients from './pages/ClientsPage'
import './App.css'

function App () {
  //Backend URL path
  const apiBase = import.meta.env.VITE_API_URL;

  // Navigate feature from react-router-dom to render page based on URL path
  const navigate = useNavigate()

  // Location feature from react-router-dom to render title based on URL
  const location = useLocation()

  // State variables for managing logged-in status and user data
  const [isLoggedIn, setIsLoggedIn] = useState(null)
  const [firstName, setFirstName] = useState('')
  const [userType, setUserType] = useState('')

  // useEffect hook to check cookies for user session data
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

  // Handles login action and updates state
  const handleLogin = (firstName, userType) => {
    setIsLoggedIn(true)
    setFirstName(firstName)
    setUserType(userType)
  }

  // Handles logout action, removes cookies and redirects user
  const handleLogout = async () => {
    try {
      const response = await fetch(`${apiBase}/auth/logout`, {
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

  // Get title of page based on current route path
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

  // Get title of current page based on route's path
  const pageTitle = getPageTitle(location.pathname)

  return (
    // Main container for the app with a flex layout
    <div className='flex flex-col min-h-screen'>
      <Banner isLoggedIn={isLoggedIn} firstName={firstName} userType={userType} handleLogout={handleLogout} />
      {/* Main content area */}
      <div className='bg-slate-200 flex-1 flex items-center'>
        {/* Container for the page content */}
        <div className='bg-white max-w-3xl mx-auto px-5 flex-1 rounded-lg p-5'>
          {/* Page title */}
          <h1 className='text-3xl font-bold text-gray-900 py-6'>{pageTitle}</h1>
          {/* Dynamically displayed content based on route path */}
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/calendar' element={<CalendarPage />} />
            <Route path='/calendar/:userID' element={<CalendarPage/>} />
            <Route path='/login' element={<LoginForm handleLogin={handleLogin} />} />
            <Route path='/register' element={<RegisterForm />} />
            <Route path='/clients' element={<Clients />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default App
