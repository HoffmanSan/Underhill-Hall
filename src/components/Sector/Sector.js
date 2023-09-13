// Imports
import { useState } from "react";

// Styles
import './sector.scss';

// Sector seats array generating
const generateSectorSeats = (sectorRef, seatsQuantity) => {
  const seats = [];
  for (let i = 1; i <= seatsQuantity; i++) {
    seats.push({'sectorRef': `${sectorRef}`, 'seatNumber': i});
  };
  return seats;
};

export default function Sector({sectorRef, seatsQuantity, takenSeats, clickedSeats, handleClick}) {
  const [sectorSeats] = useState(() => generateSectorSeats(sectorRef, seatsQuantity));

  return (
    <div className={`sector sector-${sectorRef}`}>

      <div className="sector-name">
        <h3>SECTOR {sectorRef}</h3>
      </div>

      {/* Render seats based on the sectorSeats state */}
      {sectorSeats.map(seat => (
        <button
          key={`${seat.sectorRef}${seat.seatNumber}`}
          // If the user clicked this seat, give it a class of 'clicked' || If this seat is already booked, give it a class of 'taken'
          className={(clickedSeats.includes(`${seat.sectorRef}${seat.seatNumber}`)) ? 'clicked' : '' || (takenSeats.includes(`${seat.sectorRef}${seat.seatNumber}`)) ? 'taken' : ''}
          // If this seat is already booked, set the 'disabled' property to true
          disabled={takenSeats.includes(`${seat.sectorRef}${seat.seatNumber}`)}
          // Give the seat a label for screen readers
          aria-label={`seat ${seat.sectorRef}${seat.seatNumber}`}
          onClick={() => {handleClick(`${seat.sectorRef}${seat.seatNumber}`)}}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 26 26">
            <path fill="currentColor" d="M16.563 15.9c-.159-.052-1.164-.505-.536-2.414h-.009c1.637-1.686 2.888-4.399 2.888-7.07c0-4.107-2.731-6.26-5.905-6.26c-3.176 0-5.892 2.152-5.892 6.26c0 2.682 1.244 5.406 2.891 7.088c.642 1.684-.506 2.309-.746 2.397c-3.324 1.202-7.224 3.393-7.224 5.556v.811c0 2.947 5.714 3.617 11.002 3.617c5.296 0 10.938-.67 10.938-3.617v-.811c0-2.228-3.919-4.402-7.407-5.557z"/>
          </svg>
        </button>
      ))}
    </div>
  )
}
