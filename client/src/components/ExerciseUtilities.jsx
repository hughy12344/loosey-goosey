// Import libraries
import { CalendarPlus2 } from 'lucide-react'
import { useParams } from 'react-router-dom'
import Cookies from 'js-cookie'

const ExerciseUtilities = ({ userType, firstName, handleOpenExerciseForm, location }) => {
  // Grab user ID from URL for prac view of client calendar/exercises
  const { userID: urlUserID } = useParams()
  // Grab user ID from cookies for client view
  const userID = urlUserID || Cookies.get('userID')

  return (
    // Main div wrapper with flex style, gray background, and padding
    <div className='flex justify-between bg-gray-100 rounded p-2 mb-5'>
      {/* If user is a client, show button to add an exercise */}
      {userType === 'client' && (
        <CalendarPlus2
          onClick={handleOpenExerciseForm}
          className='text-gray-500 hover:text-gray-800'
        />
      )}
      {/* If user is a practitioner, show client's name and button to navigate back to client page */}
      {userType === 'practitioner' && location.pathname === `/calendar/${userID}` && (
        <h2 className='text-xl font-bold text-gray-900'>{firstName ? firstName + '\'s Calendar' : ''}</h2>
      )}
      {userType === 'practitioner' && location.pathname === `/exercises/${userID}` && (
        <h2 className='text-xl font-bold text-gray-900'>{firstName ? firstName + '\'s Exercises' : ''}</h2>
      )}
      {userType === 'practitioner' && (
        <a
          href='/clients'
          className='text-white bg-sky-500 hover:bg-sky-700 focus:ring-4 focus-outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2'
        >Go Back
        </a>
      )}
    </div>
  )
}

export default ExerciseUtilities
