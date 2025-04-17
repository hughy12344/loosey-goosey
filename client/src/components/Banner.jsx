//Import libraries
import { CalendarDays, LogOut, Users } from 'lucide-react'
import { Link } from 'react-router-dom'

//
const Banner = ({ isLoggedIn, firstName, userType, handleLogout }) => {
  return (
    //Main div wrapper with gray background
    <div className='bg-gray-800'>
      <div className='flex gap-10 lg:gap-20 justify-between'>
        {/* Left side of the banner - Logo and home link*/}
        <div className='flex gap-4 items-center flex-shrink-0'>
          <Link to='/'>
            <img src='/goose.svg' alt='Goose' width='50px' />
          </Link>
        </div>
        {/* Right side of the banner - Conditional links and user info */}
        <div className='flex gap-4 items-center flex-shrink-0'>
          {/* Show calendar link if user is a client and logged in*/}
          {isLoggedIn && userType === 'client' &&
            <Link to='/calendar'>
              <CalendarDays href='/calendar' className='text-white' />
            </Link>}
            {/* Show clients link if user is a practitioner and logged in*/}
          {isLoggedIn && userType === 'practitioner' &&
            <Link to='/clients'>
              <Users href='/clients' className='text-white' />
            </Link>}
            {/* Show welcome message for user if logged in*/}
          <p className='text-white text-sm'>{firstName && isLoggedIn ? 'Welcome, ' + firstName + '!' : ''}</p>
          {/* Conditional login link / logout button based on logged in status */}
          {!isLoggedIn || isLoggedIn === null
            ? (
              <a className='text-white px-4' href='/login'>Login</a>
              )
            : (
              <LogOut className='text-white mx-2' onClick={handleLogout} />
              )}
        </div>
      </div>
    </div>
  )
}

export default Banner
