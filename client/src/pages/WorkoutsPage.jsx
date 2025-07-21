import useWorkouts from "../hooks/useWorkouts"
import useWorkoutsManagement from "../hooks/useWorkoutsManagement"
import Cookies from 'js-cookie'
import moment from 'moment'

const WorkoutsPage = () => {
  const userID = Cookies.get('userID')
  const {workouts, setWorkouts} = useWorkoutsManagement()
  const {isLoading} = useWorkouts({userID, setWorkouts})

  return (
    <div>
      {isLoading ? (
        <div className='flex justify-center'>
          <div className='w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin' />
        </div>
      ) : (
        <div>
          {/* Table for displaying user's exercise details */}
          <table className='w-full text-left'>
            <thead>
              <tr className='border-b border-slate-300'>
                <th className='p-2'>Pract</th>
                <th className='p-2'>Date</th>
                <th className='p-2'>Exercise</th>
                <th className='p-2'>Sets</th>
                <th className='p-2'>Reps</th>
              </tr>
            </thead>
            <tbody className='border-b border-slate-300'>
              {workouts.map(workout => (
                  workout.exercises.map((exercise, index) => (
                    <tr key={index}>
                      {index === 0 ? (
                        <>
                          <td className='p-2 whitespace-nowrap' rowSpan={workout.exercises.length}>{workout.pracFirstName}</td>
                          <td className='p-2 whitespace-nowrap' rowSpan={workout.exercises.length}>{moment(workout.date).format('MMMM Do YYYY')}</td>
                        </>
                    ) : null}
                      <td className='p-2 whitespace-nowrap'>{exercise.exercise}</td>
                      <td className='p-2 whitespace-nowrap'>{exercise.sets}</td>
                      <td className='p-2 whitespace-nowrap'>{exercise.reps}</td>
                    </tr>
                  ))
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default WorkoutsPage
