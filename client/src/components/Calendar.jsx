// Import libraries
import { useState } from 'react'
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment'

// Instantiate localiser to gather user's local time/date
const localiser = momentLocalizer(moment)

const CalendarComponent = ({ exercises, handleExerciseClick }) => {
  // State variables for the calendar's current date and view
  const [currentDate, setCurrentDate] = useState(new Date())
  const [currentView, setCurrentView] = useState(Views.MONTH)

  // Changes state of calendar's current view
  const handleViewChange = (view) => {
    setCurrentView(view)
  }

  // Handle's calendar navigation buttons (PREV, NEXT, TODAY)
  const handleNavigate = (date, view, action) => {
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

  return (
    // Calendar component from react-big-calendar with custom localiser, events, views and navigation
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
