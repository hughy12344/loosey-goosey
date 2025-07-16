// Import libraries and components
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'
import CalendarPage from './pages/CalendarPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Banner from './components/Banner'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ClientsPage from './pages/ClientsPage'
import ExercisesPage from './pages/ExercisesPage'
import WorkoutsPage from './pages/WorkoutsPage'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

function App () {
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
      case '/exercises':
        return 'My Exercises'
      case '/workouts':
        return 'My Workouts'
      default:
        return ''
    }
  }

  // Get title of current page based on route's path
  const pageTitle = getPageTitle(location.pathname)

  return (
    // Main container for the app with a flex layout
    <div className='flex flex-col min-h-screen'>
      <Banner isLoggedIn={isLoggedIn} firstName={firstName} userType={userType} handleLogout={handleLogout} location={location} />
      {/* Main content area */}
      <div className='bg-slate-200 flex-1 flex items-center'>
        {/* Container for the page content */}
        <div className='bg-white max-w-4xl mx-auto px-5 flex-1 rounded-lg p-5'>
          {/* Page title */}
          <h1 className='text-3xl font-bold text-gray-900 py-6'>{pageTitle}</h1>
          {/* Dynamically displayed content based on route path */}
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage handleLogin={handleLogin} />} />
            <Route path='/register' element={<RegisterPage />} />
            {/* Protected routes to prevent unauthorised access */}
            <Route
              path='/calendar' element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <CalendarPage location={location} />
                </ProtectedRoute>
            }
            />
            <Route
              path='/calendar/:userID' element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <CalendarPage location={location} />
                </ProtectedRoute>
            }
            />
            <Route
              path='/clients' element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <ClientsPage />
                </ProtectedRoute>
            }
            />
            <Route
              path='/exercises' element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <ExercisesPage location={location} />
                </ProtectedRoute>
            }
            />
            <Route
              path='/exercises/:userID' element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <ExercisesPage location={location} />
                </ProtectedRoute>
            }
            />
            <Route
              path='/workouts' element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <WorkoutsPage />
                </ProtectedRoute>
            }
            />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default App
