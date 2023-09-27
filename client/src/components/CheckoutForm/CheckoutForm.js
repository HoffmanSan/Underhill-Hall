// Imports
import { useStripe, useElements, PaymentElement, AddressElement } from '@stripe/react-stripe-js';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase/config';
import { doc, onSnapshot, updateDoc, arrayUnion } from 'firebase/firestore';
import { nanoid } from 'nanoid';
import emailjs from '@emailjs/browser';

// Styles
import './checkoutForm.scss';

// Components
import { Modal } from '../index';

export default function CheckoutForm({ userName, userEmail, userSeats, eventRef, reservationCost }) {
  const navigate = useNavigate();
  const nanoID = nanoid();
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [reservationOutcome, setReservationOutcome] = useState({status: '', message: ''});
  const [event, setEvent] = useState([])

  // Real time database access
  useEffect(() => {
    const docRef = doc(db, eventRef.type, eventRef.eventId);
    const unsub = onSnapshot(docRef, snapshot => {
      setEvent(snapshot.data());
    });
    return () => unsub();
  }, [eventRef.type, eventRef.eventId]);

  // Hide modal
  const closeModal = () => {
    setReservationOutcome({status: "", message: ""});
  };

  // Form submition process
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)

    // Stop if Stripe and Elements have not loaded yet
    if (!stripe || !elements) {
      setIsLoading(false);
      return;
    }

    // Stop if the seats that user is trying to book, have been booked in the meantime
    if (userSeats.some(el => event.takenSeats.includes(el))) {
      setReservationOutcome({status: "error", message: "Some or all of the seats that you're trying to book are already taken. Please try again."});
      setIsLoading(false);
      return
    };

    // Making Payment
    const result = await stripe.confirmPayment({
      elements,
      redirect: 'if_required'
    });
    
    if (result.paymentIntent && result.paymentIntent.status === "succeeded") {
      // Updating the database with reservation data and sending booking confirmation to user email
      const docRef = doc(db, eventRef.type, eventRef.eventId);
      let takenSeats = [];
      let seatReservations = [];
      let reservation = {
        "reservationName": userName,
        "reservationEmail": userEmail,
        "seatReference": userSeats,
        "reservationID": nanoID,
      };
      seatReservations.push(reservation);
      takenSeats.push(...userSeats);

      updateDoc(docRef, {seatReservations: arrayUnion(...seatReservations), takenSeats: arrayUnion(...takenSeats)})
      .then(() => {
        console.log("Reservation process successful.");
        let bookingInformation = {
          "eventName": event.eventName,
          "eventPerformer": event.performer,
          "eventDate": event.date,
          "reservationName": userName,
          "reservationEmail": userEmail,
          "seatReference": userSeats.map(seat => {return " " + seat}),
          "reservationID": reservation.reservationID
        }
        // Send email
        emailjs.send(process.env.REACT_APP_EMAILJS_SERVICE_ID, process.env.REACT_APP_EMAILJS_TEMPLATE_ID_2, bookingInformation, process.env.REACT_APP_EMAILJS_PUBLIC_KEY)
        .then((response) => {
          console.log('SUCCESS!', response.status, response.text);
        });
      })
      .catch((error) => {
        console.log("Reservation process failed. An error occured: ", error.message);
        setIsLoading(false);
      });

      setIsLoading(false);
      navigate(`/completion`);
    }

    if (result.error) {
      if (result.error.message === "This field is incomplete.") {
        setIsLoading(false)
        return
      }
      console.log(result.error.message);
      setReservationOutcome({status: "error", message: result.error.message})
      setIsLoading(false);
    }  
  };

  return (
    <div className="checkout">
      <h1 className="summary-heading">Summary</h1>
      <ul>
          <li><h2>Event:</h2><h4>{event.eventName}</h4><h4>{event.date}</h4></li>
          <li><h2>Name:</h2><h4>{userName}</h4></li>
          <li><h2>Email:</h2><h4>{userEmail}</h4></li>
          <li><h2>Seats:</h2><h4>{userSeats.map((seat) => {return " " + seat})}</h4></li>
          <li><h2>Cost:</h2><h4>{reservationCost} PLN</h4></li>
      </ul>
      <h1 className="form-heading">Payment</h1>
      <form autoComplete="off" required onSubmit={handleSubmit}>
        <AddressElement
          options={{
            mode: 'billing',
            autocomplete: {
              mode: 'disabled'
            },
            allowedCountries: ['PL'],
            defaultValues: {
              name: `${userName}`
            }
          }}
        />
        <div className="payment-simulation-tips">
          <div>
            <small><span>For BLIK payments enter a random code.</span></small>
            <small><span>For card payments enter one of listed card numbers and a random expiration date/CVC code.</span></small>
          </div>
          <div>
            <small><span>Successful card payment: </span><br /> 4242 4242 4242 4242</small>
            <small><span>Failed card payment: </span><br /> 4000 0000 0000 0002</small>
          </div>
        </div>
        <PaymentElement />
        <button disabled={!stripe || isLoading} type="submit">{isLoading ? 'Processing...' : 'Submit'}</button>
      </form>

      {/* Show modal when payment outcome status changes */}
      {reservationOutcome.status !== "" && <Modal statusMessage={reservationOutcome.message} closeModal={closeModal} />}
    </div>
  )
};
