import React from 'react'
import { NavLink } from 'react-router-dom'
import './Banner.css'

const Banner = ({handleLogout, firstName, isLoggedIn}) => {
    return(
        <div className='banner'>
            <div className='bannerContent'>
                <img src='/goose.svg' alt='Goose image' width='50px'/>
                <h1>Loosey-Goosey</h1>
                <NavLink to="/">Home</NavLink>
                {isLoggedIn && <NavLink to="/calendar">Calendar</NavLink>}
                <p>{firstName ? "Welcome, " + firstName + "!": ""}</p>
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