import { CalendarDays, Dumbbell, List } from "lucide-react"
import { Link } from "react-router-dom"

const Sidebar = ({ isLoggedIn, userType }) => {
    const SideBarItem = ({ Icon, title, url }) => {
        return (
        <Link to={url} className={`pb-1 border-b-2 ${location.pathname === url ? 'border-white' : 'border-transparent'} hover:text-white ${location.pathname === url ? 'text-white' : 'text-gray-500'}`}>
            <Icon href={url} />
            <p>{title}</p>
        </Link>
        )
    }

    return (
        <div className="bg-gray-800">
            {isLoggedIn && userType === 'client' &&
            <div>
                <SideBarItem Icon={Dumbbell} title="My Workouts" url="/workouts" />
                <SideBarItem Icon={CalendarDays} title="My Calendar" url="/calendar" />
                <SideBarItem Icon={List} title="My Exercises" url="/exercises" />
            </div>
            }
        </div>
    )
}

export default Sidebar