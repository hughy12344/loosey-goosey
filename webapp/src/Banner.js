import React from 'react'
import { NavLink } from 'react-router-dom'
import './Banner.css'

const Banner = ({firstName}) => {
    return(
        <div className='bannerContent'>
            <h1>Spinal Health Organiser</h1>
            <h2>Welcome, {firstName ? firstName: "Guest"}!</h2>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/login">Login</NavLink>
        </div>
    )
}

export default Banner