// Imports
import { useNavigate } from 'react-router-dom';

// Styles
import './eventCard.scss';

export default function EventCard({ event, type, eventId }) {
  const navigate = useNavigate();

  return (
    <div className="event-card">

      <div className="card-poster">
        <img fetchpriority="high" type="image/webp" rel="preload" src={event.posterURL} alt={`${event.eventName} poster`}/>
      </div>

      <div className="card-details">
        <h2>{event.eventName}</h2>
        <ul>
          <li><p>{event.performer}</p></li>
          <li><p>{event.date}</p></li>
          <li><p>{event.duration}</p></li>
          {eventId && <li><p>{event.ticketPrice} PLN/seat</p></li>}
        </ul>
        <p>{!eventId ? `${event.eventDescription.slice(0, 250)}...` : event.eventDescription}</p>

        <button disabled={eventId} onClick={() => navigate(`/events/${type}/${event.id}`)}>Booking</button>
      </div>
    </div>
  )
}
