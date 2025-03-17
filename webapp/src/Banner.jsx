import React from 'react'
import { NavLink } from 'react-router-dom'
import './Banner.css'

const Banner = ({handleLogout, firstName, isLoggedIn}) => {
    return(
        <div className='banner'>
            <div className='bannerContent'>
                <img src='/goose.svg' alt='Goose image' width='75px'/>
                <h1>Loosey-Goosey</h1>
                <h2>{firstName ? "Welcome, " + firstName + "!": ""}</h2>
                <NavLink to="/">Home</NavLink>
                {isLoggedIn && <NavLink to="/calendar">Calendar</NavLink>}
                {!isLoggedIn ? (
                    <NavLink to="/login">Login</NavLink>
                ) : (
                    <button color='#C87037' onClick={handleLogout}>Logout</button>
                )}
            </div>
        </div>
    )
}

export default Banner