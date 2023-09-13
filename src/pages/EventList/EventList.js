// Imports
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, getDocs } from 'firebase/firestore';

// Styles
import './eventList.scss';

// Components
import { EventCard, NotFound } from '../../components';

export default function EventList({ eventTypes }) {
  const { type } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState([]);
  
  // Database collection access
  useEffect(() => {
    const collectionRef = collection(db, type);
    setIsLoading(true);

    getDocs(collectionRef)
    .then(snapshot => {
      let results = [];
      snapshot.docs.forEach(doc => {
        results.push({ id: doc.id, ...doc.data() });
      });
      setEvents(results);
      setIsLoading(false);
    });

  }, [type]);
  
  return (
    <>
      {/* If 'type' parameter matches a value in eventTypes array - render EventList with collection data, if it doesn't - render NotFound */}
      {eventTypes.includes(type) ? 

        <div className="event-list">
          
          {/* Heading */}
          <div className="event-list-heading">
            <h2>{type}</h2>
          </div>
          
          {isLoading && <p>Loading...</p>}
          {!isLoading && 
            <div className="event-list-container">

            {/* Event card */}
            {events && events.map(event => (
              <EventCard key={event.id} event={event} type={type} />
            ))}

            {/* If there are no events of this type */}
            {events.length === 0 &&  <div className="event-list-empty"><p>There are currently no events</p></div>}
          </div>
          }
        </div>

      :
      <NotFound />}
    </>
  )
}
