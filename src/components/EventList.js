// imports
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { db } from '../firebase/config'
import { collection, getDocs } from 'firebase/firestore'

export default function EventList() {
  const { type } = useParams();
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
    <>
      <div className="event-list-heading">
          <h1>{type}</h1>
          <div className="event-type-description">
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet delectus doloremque optio nam fugit ipsam totam unde corrupti repudiandae magni.</p>
          </div>
        </div>
      <div className="event-list">
        {events.length === 0 && <p>There are currently no events</p>}
        {events && events.map(event => (
          <div key={event.id} className="event-card">
            <div className="card-poster">
              <img src={event.posterURL} alt={`${event.eventName} poster`}/>
            </div>
            <div className="card-details">
              <h3>{event.eventName}</h3>
              <ul>
                <li><p>{event.performer}</p></li>
                <li><p>{event.date}</p></li>
                <li><p>{event.duration} min</p></li>
              </ul>
              <p>{event.eventDescription}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
