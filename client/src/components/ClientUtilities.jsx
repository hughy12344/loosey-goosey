import { UserPlus, Dumbbell } from 'lucide-react'

const ClientUtilities = ({ handleOpenForm, handleOpenAddWorkout }) => {
  return (
  // Main div wrapper with flex style, gray background, and padding
    <div className='flex bg-gray-100 rounded gap-3 p-2 mb-5'>
      {/* Add user button (opens client form) */}
      <UserPlus onClick={(handleOpenForm)} className='text-gray-500 hover:text-black' />

      {/* Add workout button (opens workout form) */}
      <Dumbbell onClick={(handleOpenAddWorkout)} className='text-gray-500 hover:text-black' />
    </div>
  )
}

export default ClientUtilities
