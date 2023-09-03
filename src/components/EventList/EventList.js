// Imports
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, getDocs } from 'firebase/firestore';

// Styles
import './eventList.scss';

export default function EventList() {
  const navigate = useNavigate();

  // URL parameters extraction
  const { type } = useParams();

  // Database document access
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const ref = collection(db, type);

    getDocs(ref)
    .then(snapshot => {
      let results = [];
      snapshot.docs.forEach(doc => {
        results.push({ id: doc.id, ...doc.data() });
      });
      setEvents(results);
    });
  }, [type]);
  

  return (
    <div className="event-list">
      <div className="event-list-heading">
        <h1>{type}</h1>
      </div>
      <div className="event-list-container">
        {events && events.map(event => (
          <div key={event.id} className="event-card">
            <div className="card-poster">
              <img fetchpriority="high" type="image/webp" rel="preload" src={event.posterURL} alt={`${event.eventName} poster`}/>
            </div>
            <div className="card-details">
              <h3>{event.eventName}</h3>
              <ul>
                <li><p>{event.performer}</p></li>
                <li><p>{event.date}</p></li>
                <li><p>{event.duration}</p></li>
              </ul>
              <p>{event.eventDescription}</p>
              <button className="booking-button" onClick={() => navigate(`/events/${type}/${event.id}`)}>Booking</button>
            </div>
          </div>
        ))}
        {events.length === 0 &&  <div className="event-list-empty"><p>There are currently no events</p></div>}
      </div>
    </div>
  )
}
