import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localiser = momentLocalizer(moment)

const HomeScreen = () => {
    return(
    <div>
        <div>
            <h1>Spinal Health Organiser</h1>
        </div>
        <div>
            <Calendar 
                localizer={localiser}
                style={{height: 20}}
            />
        </div>
    </div>

    )
}

export default HomeScreen