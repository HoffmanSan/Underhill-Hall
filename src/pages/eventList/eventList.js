// imports
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { db } from '../../firebase/config'
import { collection, getDocs } from 'firebase/firestore'

// styles
import './eventList.css'

export default function EventList() {
  const { type } = useParams()
  const [events, setEvents] = useState([])

  useEffect(() => {
    const ref = collection(db, type)

    getDocs(ref)
    .then(snapshot => {
      let results = []
      snapshot.docs.forEach(doc => {
        results.push({ id: doc.id, ...doc.data() });
      })
      setEvents(results);
    });
  }, []);
  
  return (
    <div className="event-list">
      {events && events.map(event => (
        <div key={event.id} className="paragraph">
          <p>{event.eventName}</p>
        </div>
      ))}
    </div>
  )
}
