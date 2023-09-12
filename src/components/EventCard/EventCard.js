// Imports
import { useNavigate } from 'react-router-dom';

// Styles
import './eventCard.scss';

export default function EventCard({ event, type, eventId }) {
  const navigate = useNavigate();

  return (
    <div className="event-card">

      {/* Event poster */}
      <div className="card-poster">
        <img fetchpriority="high" type="image/webp" rel="preload" src={event.posterURL} alt={`${event.eventName} poster`}/>
      </div>

      {/* Event details */}
      <div className="card-details">
        <h3>{event.eventName}</h3>
        <ul>
          <li><p>{event.performer}</p></li>
          <li><p>{event.date}</p></li>
          <li><p>{event.duration}</p></li>
        </ul>
        <p>{event.eventDescription}</p>

        <button className="submit-button" disabled={eventId} onClick={() => navigate(`/events/${type}/${event.id}`)}>Booking</button>
      </div>
    </div>
  )
}
