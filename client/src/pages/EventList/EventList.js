// Imports
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, getDocs } from 'firebase/firestore';

// Styles
import './eventList.scss';

// Components
import { EventCard } from '../../components';

export default function EventList() {
  const { type } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState([]);
  
  // Database collection access
  useEffect(() => {
    setIsLoading(true);
    let collectionRef = collection(db, type);

    getDocs(collectionRef)
    .then(snapshot => {
      let results = [];
      snapshot.docs.forEach(doc => {
        results.push({ id: doc.id, ...doc.data() });
      });
      setEvents(results);
      setIsLoading(false);
    })
    .catch(error => {
      throw new Error('Error when accessing the database:', error.message);
    });

  }, [type]);
  
  return (
    <> 
      <div className="event-list-heading">
        <h1>{type}</h1>
      </div>
      
      {isLoading && <p>Loading...</p>}
      {!isLoading && events.length !== 0 && 
        <div className="event-list-container">
          {events && events.map(event => (
            <EventCard key={event.id} event={event} type={type} />
          ))}
        </div>
      }

      {/* If there are no events */}
      {!isLoading && events.length === 0 &&
        <div className="event-list-empty">
          <p>There are currently no events</p>
        </div>
      }
    </>
  )
}
