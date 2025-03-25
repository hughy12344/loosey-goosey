import { NavLink } from 'react-router-dom'

const Banner = ({ isLoggedIn, firstName, handleLogout }) => {
    return(
        <div className="bg-gray-800">
            <div className="flex gap-10 lg:gap-20 justify-between">
                <div className="flex gap-4 items-center flex-shrink-0">
                    <img src='/goose.svg' alt='Goose' width='50px'/>
                    <a href="/" className="text-white">Loosey-Goosey</a>
                </div>
                <div className="flex gap-4 items-center flex-shrink-0">
                    {isLoggedIn && 
                    <a className="text-white" href="/calendar">Calendar</a>}
                    <p className="text-white ">{firstName && isLoggedIn ? "Welcome, " + firstName + "!": ""}</p>
                    {!isLoggedIn || isLoggedIn === null ? (
                        <a className="items-center text-white" href="/login">Login</a>
                    ) : (
                        <button className="text-white" onClick={handleLogout}>Logout</button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Banner