// Imports
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, getDocs } from 'firebase/firestore';

// Styles
import './eventList.scss';

export default function EventList() {
  const navigate = useNavigate();
  const { type } = useParams();
  const [isPending, setIsPending] = useState(false);
  const [events, setEvents] = useState([]);
  
  // Database document access
  useEffect(() => {
    const collectionRef = collection(db, type);
    setIsPending(true);

    getDocs(collectionRef)
    .then(snapshot => {
      let results = [];
      snapshot.docs.forEach(doc => {
        results.push({ id: doc.id, ...doc.data() });
      });
      setEvents(results);
      setIsPending(false);
    });

  }, [type]);
  

  return (
    <div className="event-list">
      
      {/* Heading */}
      <div className="event-list-heading">
        <h2>{type}</h2>
      </div>
      
      {isPending && <p>Loading...</p>}
      {!isPending && 
        <div className="event-list-container">

        {/* Event card */}
        {events && events.map(event => (
          <div key={event.id} className="event-card">

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

              <button className="booking-button" onClick={() => navigate(`/events/${type}/${event.id}`)}>Booking</button>
            </div>
          </div>
        ))}

        {/* If there are no events of this type */}
        {events.length === 0 &&  <div className="event-list-empty"><p>There are currently no events</p></div>}
      </div>
      }
    </div>
  )
}
