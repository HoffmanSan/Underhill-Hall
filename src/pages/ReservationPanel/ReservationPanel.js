// Imports
import { nanoid } from 'nanoid';
import { useParams, } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { db } from '../../firebase/config';
import { doc, onSnapshot, updateDoc, arrayUnion } from 'firebase/firestore';
import emailjs from '@emailjs/browser';

// Styles
import './reservationPanel.scss';

// Icons
import { TakenSeatIcon, UntakenSeatIcon, PickedSeatIcon } from '../../assets/icons/index';

// Components
import { ArtRoom, AudienceRoom, ClassicRoom, ConcertHall, MovieRoom, EventCard, Modal } from '../../components/index';

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

    if (clickedSeats.length === 0) {
      setStatus('error')
      setStatusMessage('You forgot to pick a seat.')
      return
    }

    // If the seats that user is trying to book are not open anymore - stop the process
    if (clickedSeats.some(el => event.takenSeats.includes(el))) {
      setStatus('error');
      setStatusMessage("Some or all of the seats that you're trying to book are already taken. Please try again.");
      return
    };

    // Otherwise - continue
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

    clickedSeats.map(seatRef => {
      return takenSeats.push(seatRef);
    });

    // Update the database with reservation data
    updateDoc(docRef, {seatReservations: arrayUnion(...seatReservations), takenSeats: arrayUnion(...takenSeats)})
      .then(() => {
        console.log('Reservation process successful.');
        setStatus('success');
        setStatusMessage("Reservation process successful. Booking confirmation has been sent to your email.");
      })
      .catch(error => {
        console.log('Reservation process failed. An error occured: ', error.message);
        setStatus('error');
        setStatusMessage('Reservation process failed, please try again.');
      });

      const bookingConfirmation = {
        "eventName": event.eventName,
        "eventPerformer": event.performer,
        "eventDate": event.date,
        "reservationName": name,
        "reservationEmail": email,
        "seatReference": clickedSeats,
        "reservationID": nanoID,
      };

      emailjs.send(process.env.REACT_APP_EMAILJS_SERVICE_ID, process.env.REACT_APP_EMAILJS_TEMPLATE_ID_2, bookingConfirmation, process.env.REACT_APP_EMAILJS_PUBLIC_KEY);

    setEmail('');
    setName('');
    setClickedSeats([]);
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

  const closeModal = () => {
    setStatus('');
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
      case 'Art Exhibitions':
        return <ArtRoom handleClick={handleSeatPick} clickedSeats={clickedSeats} takenSeats={event.takenSeats ? event.takenSeats : []}/>
      default: 
        return Error('There is no such type of event available')
    };
  };

  return (
    <div className="reservation-panel">
      <div className="reservation-panel-container">
      <EventCard event={event} type={type} eventId={eventId} />
      </div>

      <div className="form-container">

        {/* Reservation making form */}
        <div className="reservation-form">
          <h3>Make a reservation:</h3>
          <form onSubmit={(e) => handleReservation(e)}>

          <label htmlFor="rervation_name">Enter your name and surname:</label>
            <input value={name} type="text" id="rervation_name" autoComplete="off" required onChange={(e) => setName(e.target.value)}/>

            <label htmlFor="rervation_email">Enter an e-mail address for the reservation:</label>
            <input value={email} type="email" id="rervation_email" autoComplete="off" required onChange={(e) => setEmail(e.target.value)}/>
            
            {/* Displaying the seats that the user wants to book */}
            <div className="chosen-seats-display">
              <h3>Your seats:</h3>
              <div>
                {/* If there are no clicked seats - display the paragraph, otherwise display the seats */}
                {clickedSeats.length !== 0 ? clickedSeats.map(seat => (<button className="chosen-seats-btn" disabled key={seat}>{`${seat}`}</button>)) : <p>Pick a seat!</p>}
              </div>
            </div>

            <button className="submit-button" type="submit">Submit</button>
          </form>
        </div>
      </div>

      {/* Seat types description */}
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
      
      {/* Render the proper room after successful connection with the database */}
      {event.takenSeats ? roomChoice() : <p>Loading...</p>}

      {/* Show modal after reservation process */}
      {status !== "" && <Modal statusMessage={statusMessage} closeModal={closeModal} />}
    </div>
  )
}
