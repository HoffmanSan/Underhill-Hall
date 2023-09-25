// Imports
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { db } from '../../firebase/config';
import { doc, onSnapshot } from 'firebase/firestore';

// Styles
import './reservationPanel.scss';

// Components
import { AudienceRoom, ClassicRoom, ConcertHall, MovieRoom, EventCard, Modal } from '../../components';

// Button types for seats legend
const buttonTypes = ['Open', 'Taken', 'Picked'];

export default function ReservationPanel() {
  const navigate = useNavigate();
  const { type, eventId } = useParams();
  const [pickedSeats, setPickedSeats] = useState([]);
  const [event, setEvent] = useState([]);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [reservationOutcome, setReservationOutcome] = useState({status: '', message: ''});

  // Real time database access
  useEffect(() => {
    const docRef = doc(db, type, eventId);
    const unsub = onSnapshot(docRef, snapshot => {
      setEvent(snapshot.data());
    });
    return () => unsub();
  }, [type, eventId]);

  // Reservation making process
  const handleReservation = (e) => {
    e.preventDefault();

    // If user tries to submit the form without choosing seats
    if (pickedSeats.length === 0) {
      setReservationOutcome({status: "error", message: "You forgot to pick a seat."});
      return
    }

    // Navigate to payment and pass the necessary data
    navigate('/payment', {state: {
      userEmail: email,
      userName: name,
      eventRef: {
        type: type,
        eventId: eventId
      },
      userSeats: pickedSeats,
      reservationCost: pickedSeats.length * event.ticketPrice
    }});
  };

  // On click add/delete seats to/from pickedSeats state
  const handleSeatPick = (seatRef) => {
    setPickedSeats(prevSeats => {
      if (prevSeats.includes(seatRef)) {
        const uniqueSeats = prevSeats.filter(seat => {
          if (seat === seatRef) {
            return false;
          } else {
            return true;
          }});
          return uniqueSeats.sort().sort(((a, b) => a.length - b.length));
      } else {
        const uniqueSeats = prevSeats.concat(seatRef);
        return uniqueSeats.sort().sort(((a, b) => a.length - b.length));
      }});
  };

  // Hide modal
  const closeModal = () => {
    setReservationOutcome({status: "", message: ""});
  };

  // Render the correct room layout based on event type
  const roomChoice = () => {
    switch (type) {
      case 'Theatre':
      case 'Opera':
      case 'Ballet':
        return (
          <ClassicRoom
            handleClick={handleSeatPick}
            pickedSeats={pickedSeats}
            takenSeats={event.takenSeats ? event.takenSeats : []}
          />
        )
      case 'Science':
      case 'Stand-up':
        return (
          <AudienceRoom
            handleClick={handleSeatPick}
            pickedSeats={pickedSeats}
            takenSeats={event.takenSeats ? event.takenSeats : []}
          />
        )
      case 'Cinema':
      case 'Kids':
        return (
          <MovieRoom
            handleClick={handleSeatPick}
            pickedSeats={pickedSeats}
            takenSeats={event.takenSeats ? event.takenSeats : []}
          />
        )
      case 'Concerts':
        return (
          <ConcertHall
            handleClick={handleSeatPick}
            pickedSeats={pickedSeats}
            takenSeats={event.takenSeats ? event.takenSeats : []}
          />
        )
      default: 
        return Error('There is no such type of event available')
    };
  };

  return (
    <div className="reservation-panel">
      
      <div className="event-card-container">
        <EventCard event={event} type={type} eventId={eventId} />
      </div>

      {/* Seats Legend */}
      <div className="legend">
      <h2>Legend:</h2>
        <ul>
          {buttonTypes.map(buttonType => (
            <li key={buttonType}>
              <button disabled className={buttonType}>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 26 26">
                  <path fill="currentColor" d="M16.563 15.9c-.159-.052-1.164-.505-.536-2.414h-.009c1.637-1.686 2.888-4.399 2.888-7.07c0-4.107-2.731-6.26-5.905-6.26c-3.176 0-5.892 2.152-5.892 6.26c0 2.682 1.244 5.406 2.891 7.088c.642 1.684-.506 2.309-.746 2.397c-3.324 1.202-7.224 3.393-7.224 5.556v.811c0 2.947 5.714 3.617 11.002 3.617c5.296 0 10.938-.67 10.938-3.617v-.811c0-2.228-3.919-4.402-7.407-5.557z"/>
                </svg>
              </button>
              <p>{buttonType}</p>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Render the proper room after successful connection with the database */}
      {event.takenSeats ? roomChoice() : <p>Loading...</p>}

      {/* Show modal when reservation outcome status changes */}
      {reservationOutcome.status !== "" && <Modal statusMessage={reservationOutcome.message} closeModal={closeModal} />}

      <div className="form-container">
          <h2>Make a reservation:</h2>
          <form onSubmit={(e) => handleReservation(e)}>

            <label>
              <span>Enter your name and surname:</span>
              <input type="text" placeholder="e.g. John Doe"autoComplete="off" value={name} onChange={(e) => setName(e.target.value)} required/>
            </label>

            <label>
              <span>Enter an e-mail address for the reservation:</span>
              <input type="email" placeholder="example@gmail.com"autoComplete="off" value={email} onChange={(e) => setEmail(e.target.value)} required/>
            </label>
            <small>(Enter an existing email to receive a booking confirmation)</small>
            
            <div className="picked-seats-display">
              <h3>Your seats:</h3>
              <div>
                {pickedSeats.length !== 0 ? pickedSeats.map(seat => (<button className="picked-seats-btn" disabled key={seat}>{`${seat}`}</button>)) : <p>Pick a seat!</p>}
              </div>
            </div>
            
            <div className="reservation-cost">
              <h3>Cost:</h3>
              {pickedSeats.length !== 0 ? <h4>{pickedSeats.length * event.ticketPrice} PLN</h4> : <p>Pick a seat!</p>}
            </div>

            <button className="submit-button" type="submit">Checkout</button>
          </form>
      </div>
    </div>
  )
}
