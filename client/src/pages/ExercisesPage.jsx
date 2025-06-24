import Cookies from 'js-cookie'
import moment from 'moment'
import useExercises from '../hooks/useExercises'
import useExercisesManagement from '../hooks/useExercisesManagement'

const ExercisesPage = () => {
    // Grab user ID and type from cookies (urlUserID is N/A for this page)
    const userID = Cookies.get('userID')
    const userType = Cookies.get('userType')
    const urlUserID = ''

    //Grab exercise state variables
    const {exercises, setExercises} = useExercisesManagement()

    //Import and use custom hook for fetching user's exercises
    useExercises({ userID, userType, urlUserID, setExercises })

  return (
    <div>
        {/* Table that contains exercises for user */}
        <table className='w-full text-left'>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Start</th>
                    <th>End</th>
                    <th>Notes</th>
                    <th>Comment</th>
                </tr>
            </thead>
            <tbody>
                {exercises.map(exercise => (
                <tr key={exercise.id}>
                    <td>{exercise.title}</td>
                    <td>{moment(exercise.start).format('MMMM Do YYYY, h:mm:ss a')}</td>
                    <td>{moment(exercise.end).format('MMMM Do YYYY, h:mm:ss a')}</td>
                    <td>{exercise.notes}</td>
                    <td>{exercise.comment}</td>
                </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default ExercisesPage
