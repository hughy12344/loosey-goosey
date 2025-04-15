import { CalendarDays, LogOut, Users } from 'lucide-react'
import { Link } from 'react-router-dom'

const Banner = ({ isLoggedIn, firstName, userType, handleLogout }) => {
  return (
    <div className='bg-gray-800'>
      <div className='flex gap-10 lg:gap-20 justify-between'>
        <div className='flex gap-4 items-center flex-shrink-0'>
          <Link to='/'>
            <img src='/goose.svg' alt='Goose' width='50px' />
          </Link>
        </div>
        <div className='flex gap-4 items-center flex-shrink-0'>
          {isLoggedIn && userType === 'client' &&
            <Link to='/calendar'>
              <CalendarDays href='/calendar' className='text-white' />
            </Link>}
          {isLoggedIn && userType === 'practitioner' && 
            <Link to='/clients'>
              <Users href='/clients' className='text-white' />
            </Link>
          }
          <p className='text-white text-sm'>{firstName && isLoggedIn ? 'Welcome, ' + firstName + '!' : ''}</p>
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
