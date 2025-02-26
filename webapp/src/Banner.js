import React from 'react'
import { NavLink } from 'react-router-dom'
import './Banner.css'

const Banner = () => {
    return(
        <div className='bannerContent'>
            <h1>Spinal Health Organiser</h1>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/login">Login</NavLink>
        </div>
    )
}

export default Banner