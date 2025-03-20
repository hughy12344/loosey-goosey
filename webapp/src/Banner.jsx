
import { NavLink } from 'react-router-dom'
import './Banner.css'

const Banner = ({ isLoggedIn, firstName, handleLogout }) => {
    return(
        <div className='banner'>
            <div className='bannerContent'>
                <img src='/goose.svg' alt='Goose' width='50px'/>
                <h1>Loosey-Goosey</h1>
                <NavLink to="/">Home</NavLink>
                {isLoggedIn && <NavLink to="/calendar">Calendar</NavLink>}
                <p>{firstName && isLoggedIn ? "Welcome, " + firstName + "!": ""}</p>
                {!isLoggedIn || isLoggedIn === null ? (
                    <NavLink to="/login">Login</NavLink>
                ) : (
                    <button color='#C87037' onClick={handleLogout}>Logout</button>
                )}
            </div>
        </div>
    )
}

export default Banner