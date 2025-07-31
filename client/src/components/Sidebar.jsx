import { CalendarDays, Dumbbell, List, Users } from "lucide-react"
import { Link } from "react-router-dom"

const Sidebar = ({ isLoggedIn, userType }) => {
    
    const SideBarItem = ({ Icon, title, url }) => {
        const isActive = location.pathname === url
        
        return (
        <Link to={url} className={`flex items-center gap-3 px-4 py-2 pb-1 mx-2 rounded-lg
            ${isActive ? 'text-white bg-gray-500' 
            : 'hover:text-white text-gray-500'}`}>
                <Icon href={url} />
                <p>{title}</p>
        </Link>
        )
    }

    return (
        <div className="bg-gray-800">
            <h1 className="text-white font-bold text-xl px-4 py-3">Dashboard</h1>
            {userType === 'client' &&
            <div>
                <SideBarItem Icon={Dumbbell} title="My Workouts" url="/workouts" />
                <SideBarItem Icon={CalendarDays} title="My Calendar" url="/calendar" />
                <SideBarItem Icon={List} title="My Exercises" url="/exercises" />
            </div>}
            {userType === 'practitioner' && 
            <div>
                <SideBarItem Icon={Users} title="My Clients" url="/clients" />
                <SideBarItem Icon={Dumbbell} title="My Assigned Workouts" url="/assignedWorkouts" />
            </div>}
        </div>
    )
}

export default Sidebar