// Imports
import { nanoid } from 'nanoid';
import { useParams, } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { db } from '../../firebase/config';
import { doc, onSnapshot, updateDoc, arrayUnion } from 'firebase/firestore';

// Styles
import './reservationPanel.scss';

// Icons
import { TakenSeatIcon, UntakenSeatIcon, PickedSeatIcon } from '../../assets/icons/index';

// Components
import { ArtRoom, AudienceRoom, ClassicRoom, ConcertHall, MovieRoom} from '../EventRooms/index';

export default function ReservationPanel() {
  const nanoID = nanoid();
  const { type, eventId } = useParams();
  const [clickedSeats, setClickedSeats] = useState([]);
  const [email, setEmail] = useState('');
  
  // Real time database document watching
  const [event, setEvent] = useState([]);

  useEffect(() => {
    const docRef = doc(db, type, eventId);
    const unsub = onSnapshot(docRef, snapshot => {
      setEvent(snapshot.data());
    });
    return () => unsub();
  }, [type, eventId]);

  // Reservation Handling
  const handleReservation = (e) => {
    e.preventDefault();
    const docRef = doc(db, type, eventId);

    const takenSeats = [];
    const seatReservations = [];

    const reservation = {
      "reservationEmail": email,
      "seatReference": clickedSeats,
      "reservationID": nanoID,
    };
    seatReservations.push(reservation);

    clickedSeats.map(seatRef => {
      return takenSeats.push(seatRef);
    })

    updateDoc(docRef,  {seatReservations: arrayUnion(...seatReservations), takenSeats: arrayUnion(...takenSeats)})
      .then(
        console.log('Reservation process succesful.')
      )
      .catch(error => {
        console.log('Reservation process failed. An error occured: ', error.message)
      });
    setEmail('');
    setClickedSeats([]);
  };

  // Gathering all unique seats chosen by the user into a single state
  const handleSeatPick = (seatRef) => {
    setClickedSeats(prevSeats => {
      if (prevSeats.includes(seatRef)) {
        const uniqueSeats = prevSeats.filter(seat => {
          if (seat === seatRef) {
            return false;
          } else {
            return true;
          }});
          return uniqueSeats;
      } else {
        const uniqueSeats = prevSeats.concat(seatRef);
        return uniqueSeats;
      }});
  };

  // Correct room render based on event type
  const roomChoice = () => {
    switch (type) {
      case 'Theatre':
      case 'Opera':
      case 'Ballet':
        return <ClassicRoom handleClick={handleSeatPick} clickedSeats={clickedSeats} takenSeats={event.takenSeats ? event.takenSeats : []}/>
      case 'Science':
      case 'Stand-up':
        return <AudienceRoom handleClick={handleSeatPick} clickedSeats={clickedSeats} takenSeats={event.takenSeats ? event.takenSeats : []}/>
      case 'Cinema':
      case 'Kids':
        return <MovieRoom handleClick={handleSeatPick} clickedSeats={clickedSeats} takenSeats={event.takenSeats ? event.takenSeats : []}/>
      case 'Concerts':
        return <ConcertHall handleClick={handleSeatPick} clickedSeats={clickedSeats} takenSeats={event.takenSeats ? event.takenSeats : []}/>
      case 'Art Exhibitions':
        return <ArtRoom handleClick={handleSeatPick} clickedSeats={clickedSeats} takenSeats={event.takenSeats ? event.takenSeats : []}/>
      default: 
        return Error('There is no such type of event available')
    };
  };

  return (
    <div className="reservation-panel">
      <div className="reservation-panel-container">
        <div className="event-card">

          {/* Event poster */}
          <div className="card-poster">
            <img rel="preload" fetchpriority="high" as="image/webp" height="300" width="300" src={event.posterURL} alt={`${event.eventName} poster`}/>
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
          </div>
          
        </div>
      </div>

      <div className="form-container">
        <div className="reservation-form">
          <h3>Make a reservation:</h3>
          <form onSubmit={(e) => handleReservation(e)}>
            <label htmlFor="rervation_email">Enter an e-mail address for the reservation:</label>
              <input value={email} type="email" id="rervation_email" autoComplete="off" onChange={(e) => setEmail(e.target.value)}/>
            
            <div className="chosen-seats-display">
              <h3>Your seats:</h3>
              <div>
                {clickedSeats.length !== 0 ? clickedSeats.map(seat => (<button className="chosen-seats-btns" disabled key={seat}>{`${seat}`}</button>)) : <p>Pick a seat!</p>}
              </div>
            </div>
            <button className="submit-button" type="submit">Submit</button>
          </form>
        </div>
      </div>

      <div className="legend">
      <h3>Seats:</h3>
        <ul>
          <li>
            <img src={UntakenSeatIcon} height="60px" width="47px" alt="Untaken Seat Icon" />
            <p>Open</p>
          </li>
          <li>
            <img src={TakenSeatIcon} height="60px" width="47px" alt="Untaken Seat Icon" />
            <p>Taken</p>
          </li>
          <li>
            <img src={PickedSeatIcon} height="60px" width="47px" alt="Picked Seat Icon" />
            <p>Picked</p>
          </li>
        </ul>
      </div>
      
      {/* Event room */}
        {roomChoice()}
    </div>
  )
}
