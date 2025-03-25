import moment from 'moment'

const EventDetails = ({ selectedEvent, deleteAppointment, handleCloseEventDetails }) => {
  const handleDeleteClick = () => {
    deleteAppointment(selectedEvent.id)
  }

  return (
    <div className="flex flex-col bg-white p-5 rounded-lg max-w-sm shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-5">Appointment Details</h2>
      <label className="block text-sm font-bold text-gray-900">Title</label>
      <p className="text-gray-900 text-sm mb-3">{selectedEvent.title}</p>
      <label className="block text-sm font-bold text-gray-900">Start</label>
      <p className="text-gray-900 text-sm mb-3">{moment(selectedEvent.start).format('MMMM Do YYYY, h:mm:ss a')}</p>
      <label className="block text-sm font-bold text-gray-900">End</label>
      <p className="text-gray-900 text-sm mb-3">{moment(selectedEvent.end).format('MMMM Do YYYY, h:mm:ss a')}</p>
      <button 
        onClick={handleDeleteClick}
        className='text-white bg-sky-500 hover:bg-sky-700 focus:ring-4 focus-outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2 mb-3'
      >Delete</button>
      <button
        onClick={handleCloseEventDetails}
        className='text-white bg-sky-500 hover:bg-sky-700 focus:ring-4 focus-outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2 mb-3'
      >Close</button>
    </div>
  )
}

export default EventDetails
