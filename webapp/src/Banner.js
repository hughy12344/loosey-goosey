import React from 'react'
import { NavLink } from 'react-router-dom'
import './Banner.css'

const Banner = ({handleLogout, firstName, isLoggedIn}) => {
    return(
        <div className='bannerContent'>
            <h1>Spinal Health Organiser</h1>
            <h2>{firstName ? "Welcome, " + firstName + "!": ""}</h2>
            <NavLink to="/">Home</NavLink>
            {isLoggedIn && <NavLink to="/calendar">Calendar</NavLink>}
            {!isLoggedIn ? (
                <NavLink to="/login">Login</NavLink>
            ) : (
                <button onClick={handleLogout}>Logout</button>
            )}
        </div>
    )
}

export default Banner