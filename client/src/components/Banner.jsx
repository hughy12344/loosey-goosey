// Import libraries
import { CalendarDays, LogOut, Users, List, Dumbbell } from 'lucide-react'
import { Link } from 'react-router-dom'

const Banner = ({ isLoggedIn, firstName, userType, handleLogout, location }) => {
  return (
    // Main div wrapper with gray background
    <div className='bg-gray-800'>
      <div className='flex gap-10 lg:gap-20 justify-between'>
        {/* Left side of the banner - Logo and home link */}
        <div className='flex gap-4 items-center flex-shrink-0'>
          <Link to='/'>
            <img src='/goose.svg' alt='Goose' width='50px' />
          </Link>
        </div>
        {/* Right side of the banner - Conditional links and user info */}
        <div className='flex gap-10 items-center flex-shrink-0'>
          {/* Show calendar and exercises link if user is a client and logged in */}
          {isLoggedIn && userType === 'client' && <div className='flex gap-4'>
              <Link to='/workouts' className={`pb-1 border-b-2 ${location.pathname === '/workouts' ? 'border-white' : 'border-transparent'}`}>
                <Dumbbell href='/workouts' className={`hover:text-white ${location.pathname === '/workouts' ? 'text-white' : 'text-gray-500'}`} />
              </Link>
              <Link to='/calendar' className={`pb-1 border-b-2 ${location.pathname === '/calendar' ? 'border-white' : 'border-transparent'}`}>
                <CalendarDays href='/calendar' className={`hover:text-white ${location.pathname === '/calendar' ? 'text-white' : 'text-gray-500'}`} />
              </Link>
              <Link to='/exercises' className={`pb-1 border-b-2 ${location.pathname === '/exercises' ? 'border-white' : 'border-transparent'}`}>
                <List href='/exercises' className={`hover:text-white ${location.pathname === '/exercises' ? 'text-white' : 'text-gray-500'}`} />
              </Link>
            </div>  
          }
          {/* Show clients link if user is a practitioner and logged in */}
          {isLoggedIn && userType === 'practitioner' &&
            <Link to='/clients'>
              <Users href='/clients' className='text-white' />
            </Link>}
          {/* Show welcome message for user if logged in */}
          <p className='text-white text-sm'>{firstName && isLoggedIn ? 'Welcome, ' + firstName + '!' : ''}</p>
          {/* Conditional login link / logout button based on logged in status */}
          {!isLoggedIn || isLoggedIn === null
            ? (
              <a className='text-white px-4' href='/login'>Login</a>
              )
            : (
              <LogOut className='text-gray-500 hover:text-white mx-2' onClick={handleLogout} />
              )}
        </div>
      </div>
    </div>
  )
}

export default Banner
