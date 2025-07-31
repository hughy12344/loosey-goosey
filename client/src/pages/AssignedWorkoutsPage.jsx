import { useState, useEffect } from 'react'
import useWorkouts from "../hooks/useWorkouts"
import useWorkoutsManagement from "../hooks/useWorkoutsManagement"
import useClients from "../hooks/useClients"
import useClientsManagement from "../hooks/useClientsManagement"
import Cookies from 'js-cookie'
import LoadingSpinner from "../components/LoadingSpinner"
import moment from 'moment'

const AssignedWorkoutsPage = () => {
    const userID = Cookies.get('userID')
    const userType = Cookies.get('userType')

    const { clients, setClients } = useClientsManagement()
    useClients({ setClients, userID })

    const {workouts, setWorkouts} = useWorkoutsManagement()
    const {isLoading} = useWorkouts({userID, userType, setWorkouts})

    const [selectedClient, setSelectedClient] = useState(null)

    // Set default selected client once workouts are loaded
    useEffect(() => {
        if (workouts.length > 0 && !selectedClient) {
            setSelectedClient(workouts[0].clientID)
        }
    }, [workouts, selectedClient])

    const getClientFirstName = (clientID) => {
        const client = clients.find(client => client.userID === clientID)
        return client ? client.firstName : 'Unknown user'
    }

    return (
        <div>
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <div>
                    {/* Set for removing duplicate clientID and dropdown for client first names*/}
                    <select 
                    id='clientDropdown' 
                    value={selectedClient || ''} onChange={(e) => setSelectedClient(e.target.value)}
                    className='bg-gray-50 text-gray-900 text-sm border border-gray-300 rounded-lg p-2 mb-5'
                    >
                        {[...new Set(workouts.map(workout => workout.clientID))].map(clientID => (
                            <option key={clientID} value={clientID}>{getClientFirstName(clientID)}</option>
                        ))}
                    </select>
                    {/* Table for displaying user's exercise details */}
                    <table className='w-full text-left'>
                    <thead>
                        <tr className='border-b border-slate-300'>
                        <th className='p-2'>Date</th>
                        <th className='p-2'>Exercise</th>
                        <th className='p-2'>Sets</th>
                        <th className='p-2'>Reps</th>
                        </tr>
                    </thead>
                    <tbody className='border-b border-slate-300'>
                        {workouts.filter(workout => workout.clientID === selectedClient)
                        .map(workout => (
                            workout.exercises.map((exercise, index) => {
                            const isLastExercise = index === workout.exercises.length - 1;
                            return(
                                <tr key={index} className={isLastExercise ? 'border-b border-slate-300' : ''}>
                                    {index === 0 ? (
                                    <>
                                        <td className='p-2 whitespace-nowrap' rowSpan={workout.exercises.length}>{moment(workout.date).format('MMMM Do YYYY')}</td>
                                    </>
                                ) : null}
                                    <td className='p-2 whitespace-nowrap'>{exercise.exercise}</td>
                                    <td className='p-2 whitespace-nowrap'>{exercise.sets}</td>
                                    <td className='p-2 whitespace-nowrap'>{exercise.reps}</td>
                                </tr>
                            )
                        })
                        ))
                        }
                    </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default AssignedWorkoutsPage