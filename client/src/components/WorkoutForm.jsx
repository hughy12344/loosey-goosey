import { useState } from 'react'
import EXERCISES from '../constants/exercises'

const WorkoutForm = ({ clients, userID, firstName, handleCloseAddWorkout, handleAddWorkout }) => {
  const [selectedClientID, setSelectedClientID] = useState(clients[0].userID)
  const [rows, setRows] = useState([
    { exercise: '', sets: '', reps: '' }
  ])

  const addRow = () => {
    setRows([...rows, { exercise: '', sets: '', reps: '' }])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newWorkout = {
      pracID: userID,
      pracFirstName: firstName,
      date: new Date(),
      clientID: selectedClientID,
      exercises: rows.map(row => ({
        exercise: row.exercise,
        sets: row.sets ? parseInt(row.sets, 10) : undefined,
        reps: row.reps ? parseInt(row.reps, 10) : undefined
      }))
    }
    console.log(newWorkout)
    handleAddWorkout(newWorkout)
    handleCloseAddWorkout()
  }

  const handleTableChange = (index, field, value) => {
    const updatedRows = [...rows]
    updatedRows[index][field] = value
    setRows(updatedRows)
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col bg-white p-5 rounded-lg max-w-m shadow-lg'>
      {/* Form title */}
      <h2 className='text-2xl font-bold text-gray-900 mb-5'>Add New Workout</h2>

      {/* Dropdown of assigned clients to practitoner */}
      <label className='block text-sm font-medium text-gray-900' htmlFor='formClient'>Client</label>
      <select
        className='block bg-gray-50 text-gray-900 text-sm border border-gray-300 rounded-lg w-full p-2 mb-5'
        id='formClient'
        onChange={(e) => {
          setSelectedClientID(e.target.value)
          console.log(selectedClientID)
        }}
      >
        {clients.map(client => {
          return <option key={client._id} value={client.userID}>{client.firstName}</option>
        })}
      </select>
      <label className='block text-sm font-medium text-gray-900' htmlFor='formTable'>Workout</label>
      <table className='block text-sm mb-2' id='formTable'>
        <thead>
          <tr className='border-b border-gray-300'>
            <th>Exercise</th>
            <th>Sets</th>
            <th>Reps</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => {
            return (
              <tr key={index} className='border-b border-gray-200 p-2'>
                <td>
                  <select
                    id='formExercise'
                    value={row.exercise}
                    onChange={(e) => handleTableChange(index, 'exercise', e.target.value)}
                  >
                    {EXERCISES.map((exercise, idx) => (
                        <option key={idx} value={exercise}>{exercise}</option>
                      ))}
                  </select>
                </td>
                <td>
                  <input
                    id='formExerciseSets'
                    type='number'
                    value={row.sets}
                    onChange={(e) => handleTableChange(index, 'sets', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    id='formExerciseReps'
                    type='number'
                    value={row.reps}
                    onChange={(e) => handleTableChange(index, 'reps', e.target.value)}
                  />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <button
        type='button'
        className='text-white bg-sky-500 hover:bg-sky-700 focus:ring-4 focus-outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2 mb-10'
        onClick={addRow}
      >Add Exercise
      </button>

      <button
        type='submit'
        className='text-white bg-sky-500 hover:bg-sky-700 focus:ring-4 focus-outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2 mb-3'
      >Add Workout
      </button>

      {/* Close button for closing the client form */}
      <button
        type='button'
        onClick={handleCloseAddWorkout}
        className='text-white bg-sky-500 hover:bg-sky-700 focus:ring-4 focus-outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2 mb-3'
      >Close
      </button>
    </form>
  )
}

export default WorkoutForm
