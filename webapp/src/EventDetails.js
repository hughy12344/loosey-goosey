import moment from 'moment'
import './EventDetails.css'

const EventDetails = ({ selectedEvent, handleCloseEventDetails }) => {
    return (
        <div className="detailsContent">
            <h2>Appointment Details</h2>
            <p><strong>Title: </strong>{selectedEvent.title}</p>
            <p><strong>Start: </strong>{moment(selectedEvent.start).format('MMMM Do YYYY, h:mm:ss a')}</p>
            <p><strong>End: </strong>{moment(selectedEvent.end).format('MMMM Do YYYY, h:mm:ss a')}</p>
            <button onClick={handleCloseEventDetails}>Close</button>
        </div>
    )
}


export default EventDetails