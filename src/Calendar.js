import React, {useState} from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localiser = momentLocalizer(moment)

const MyCalendar = () => {
    const [events, setEvents] = useState([
        {
            title: "Sample appointment",
            start: new Date(2025, 1, 14, 10, 0),
            end: new Date(2025, 1, 14, 11, 0)
        }
    ])

    
    
    return(
    <div>
        <div>
            <h1>Spinal Health Organiser</h1>
        </div>
        <div>
            <Calendar 
                localizer={localiser}
                events={events}
                style={{height: 500}}
            />
        </div>
    </div>

    )
}

export default MyCalendar