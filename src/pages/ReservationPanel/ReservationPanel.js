// Imports
import { nanoid } from 'nanoid';
import { useParams, } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { db } from '../../firebase/config';
import { doc, onSnapshot, updateDoc, arrayUnion } from 'firebase/firestore';
import emailjs from '@emailjs/browser';

// Styles
import './reservationPanel.scss';

// Components
import { AudienceRoom, ClassicRoom, ConcertHall, MovieRoom, EventCard, Modal, NotFound } from '../../components';

// Button types for seats legend
const buttonTypes = ['Open', 'Taken', 'Clicked'];

export default function ReservationPanel() {
  const nanoID = nanoid();
  const { type, eventId } = useParams();
  const [clickedSeats, setClickedSeats] = useState([]);
  const [event, setEvent] = useState([]);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  

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
    if (clickedSeats.length === 0) {
      setStatus('error')
      setStatusMessage('You forgot to pick a seat.')
      return
    }

    // If the seats that user is trying to book, have been booked in the meantime
    if (clickedSeats.some(el => event.takenSeats.includes(el))) {
      setStatus('error');
      setStatusMessage("Some or all of the seats that you're trying to book are already taken. Please try again.");
      return
    };

    // If the seats are available - continue
    const docRef = doc(db, type, eventId);
    const takenSeats = [];
    const seatReservations = [];
    const reservation = {
      "reservationName": name,
      "reservationEmail": email,
      "seatReference": clickedSeats,
      "reservationID": nanoID,
    };
    seatReservations.push(reservation);
    takenSeats.push(...clickedSeats);

    // Update the database with reservation data, send booking confirmation to user email and reset the form
    updateDoc(docRef, {seatReservations: arrayUnion(...seatReservations), takenSeats: arrayUnion(...takenSeats)})
    .then(() => {
      console.log('Reservation process successful.');
      const bookingConfirmation = {
        "eventName": event.eventName,
        "eventPerformer": event.performer,
        "eventDate": event.date,
        "reservationName": name,
        "reservationEmail": email,
        "seatReference": clickedSeats,
        "reservationID": nanoID,
      };

      // Send email
      emailjs.send(process.env.REACT_APP_EMAILJS_SERVICE_ID, process.env.REACT_APP_EMAILJS_TEMPLATE_ID_2, bookingConfirmation, process.env.REACT_APP_EMAILJS_PUBLIC_KEY);

      setStatus('success');
      setStatusMessage("Reservation process successful. Booking confirmation has been sent to your email.");

      // Reset form
      setEmail('');
      setName('');
      setClickedSeats([]);
    })
    .catch(error => {
      console.log('Reservation process failed. An error occured: ', error.message);
      setStatus('error');
      setStatusMessage('Reservation process failed, please try again.');
    });
  };

  // On click add/delete seats to/from clickedSeats state
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

  // Modal button onClick handler
  const closeModal = () => {
    setStatus('');
    setStatusMessage('');
  };

  // Render the correct room layout based on event type
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
      default: 
        return Error('There is no such type of event available')
    };
  };

  return (
    <>
      {/* If 'eventId' parameter matches a document in the database - render EventList with document data, if it doesn't - render NotFound */}
      {event ? 
      <div className="reservation-panel">
        <div className="event-card-container">
          <EventCard event={event} type={type} eventId={eventId} />
        </div>

        <div className="form-container">
          {/* Reservation making form */}
            <h3>Make a reservation:</h3>
            <form onSubmit={(e) => handleReservation(e)}>

              <label htmlFor="rervation_name">Enter your name and surname:</label>
              <input value={name} type="text" id="rervation_name" autoComplete="off" required onChange={(e) => setName(e.target.value)}/>

              <label htmlFor="rervation_email">Enter an e-mail address for the reservation:</label>
              <input value={email} type="email" id="rervation_email" autoComplete="off" required onChange={(e) => setEmail(e.target.value)}/>
              <p>(Enter an existing email to receive a booking confirmation)</p>
              
              {/* Displaying the seats that the user's trying to book */}
              <div className="chosen-seats-display">
                <h3>Your seats:</h3>
                <div>
                  {/* If there are no clicked seats - display the paragraph */}
                  {clickedSeats.length !== 0 ? clickedSeats.map(seat => (<button className="chosen-seats-btn" disabled key={seat}>{`${seat}`}</button>)) : <p>Pick a seat!</p>}
                </div>
              </div>

              <button className="submit-button" type="submit">Submit</button>
            </form>
        </div>

        {/* Seats Legend */}
        <div className="legend">
        <h3>Legend:</h3>
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

        {/* Show modal with statusMessage on status change */}
        {status !== "" && <Modal statusMessage={statusMessage} closeModal={closeModal} />}
      </div>

      :
      <NotFound />
      }
    </>
  )
}
