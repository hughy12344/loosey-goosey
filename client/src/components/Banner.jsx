// Import libraries
import { LogIn, LogOut} from 'lucide-react'
import { Link } from 'react-router-dom'

const Banner = ({ isLoggedIn, firstName, handleLogout }) => {
  return (
    // Main div wrapper with gray background
    <div className='bg-gray-800'>
      <div className='flex gap-10 lg:gap-20 justify-between'>
        {/* Left side of the banner - Logo and home link */}
        <div className='flex gap-4 items-center flex-shrink-0'>
          <Link to='/'>
            <img src='/goose.svg' alt='Goose' width='40px' className='m-2 rounded-lg bg-white '/>
          </Link>
          <h1 className='text-white font-bold text-2xl'>Loosey-Goosey</h1>
        </div>
        {/* Right side of the banner - Conditional links and user info */}
        <div className='flex gap-5 items-center flex-shrink-0'>
          {/* Show welcome message for user if logged in */}
          <p className='text-white text-sm'>{firstName && isLoggedIn ? 'Welcome, ' + firstName + '!' : ''}</p>
          {/* Conditional login link / logout button based on logged in status */}
          {!isLoggedIn || isLoggedIn === null
            ? (
              <LogIn className='text-gray-500 hover:text-white mx-2' href='/login' />
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
