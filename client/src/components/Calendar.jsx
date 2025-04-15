import { useState } from 'react'
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment'

const localiser = momentLocalizer(moment)

const CalendarComponent = ({ exercises, handleExerciseClick }) => {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [currentView, setCurrentView] = useState(Views.MONTH)

    const handleViewChange = (view) => {
      setCurrentView(view)
    }

    const handleNavigate = ( date, view, action) => {
      switch (action) {
        case 'PREV':
          setCurrentDate((prevDate) => moment(prevDate).subtract(1, view).toDate())
          break
        case 'NEXT':
          setCurrentDate((prevDate) => moment(prevDate).add(1, view).toDate())
          break
        case 'TODAY':
          setCurrentDate(new Date())
          break
        default:
          break
      }
    }

    return(
      <Calendar
        localizer={localiser}
        events={exercises}
        style={{ height: 500 }}
        onSelectEvent={handleExerciseClick}
        views={['month', 'week', 'day', 'agenda']}
        view={currentView}
        onView={handleViewChange}
        onNavigate={handleNavigate}
        date={currentDate}
      />
    )
}

export default CalendarComponent