// Imports
import { useState, useEffect } from "react";

// Styles
import './classicRoom.scss';

// Icons
import { TakenSeatIcon, UntakenSeatIcon, PickedSeatIcon } from '../../../assets/icons/index';

const numberOfSeatsInOneSector = 100;

export default function ClassicRoom({ handleClick, clickedSeats, takenSeats }) {
  const [sectorASeats, setSectorASeats] = useState([]);
  const [sectorBSeats, setSectorBSeats] = useState([]);
  const [occupiedSeats, setOccupiedSeats] = useState([]);

  
  // Generating arrays for audience rendering (different for each room) and checking for taken seats
  useEffect(() => {
    let i = 1;
    const seatNumbersA = [];
    const seatNumbersB = [];
    while (i <= numberOfSeatsInOneSector) {
      seatNumbersA.push({'sector': 'A', 'seatNumber': i});
      seatNumbersB.push({'sector': 'B', 'seatNumber': i});
      i++;
    };
    setSectorASeats(seatNumbersA);
    setSectorBSeats(seatNumbersB);
    const checkForOccupiedSeats = () => {
      if (takenSeats) {
        setOccupiedSeats(takenSeats)
      }};
    checkForOccupiedSeats();
  }, [takenSeats]);

  

  return (
    <div className="classic-room-layout">

      {/* ------------------  Reservation legend  ------------------ */}
      <div className="legend">
        <div className="room-model-hidden">
          <p>Room Model</p>
          <div className="room-model">
            <div className="stage-model"><p>stage</p></div>
            <div className="sector-A-model"><p>sector <br />A</p></div>
            <div className="sector-B-model"><p>sector <br />B</p></div>
          </div>
        </div>
        <h3>Seats:</h3>
        <ul>
          <li className="legend-item">
            <img src={UntakenSeatIcon} alt="Untaken Seat Icon" />
            <p>Open</p>
          </li>
          <li className="legend-item">
            <img src={TakenSeatIcon} alt="Untaken Seat Icon" />
            <p>Taken</p>
          </li>
          <li className="legend-item">
            <img src={PickedSeatIcon} alt="Picked Seat Icon" />
            <p>Picked</p>
          </li>
        </ul>
      </div>
      {/* ---------------------------------------------------------- */}

      <div className="container">

        {/* ---------------------  Room layout  --------------------- */}
        <div className="stage">
          <h3>STAGE</h3>
        </div>

        <div className="sector">
          <div className="sector-name">
            <h3>SECTOR A</h3>
          </div>
          {sectorASeats.map(seat => (
          <button
            key={`${seat.sector}${seat.seatNumber}`}
            className={clickedSeats.includes(`${seat.sector}${seat.seatNumber}`) ? 'clicked' : '' || occupiedSeats.includes(`${seat.sector}${seat.seatNumber}`) ? 'taken' : ''}
            disabled={occupiedSeats.includes(`${seat.sector}${seat.seatNumber}`)}
            onClick={() => {handleClick(`${seat.sector}${seat.seatNumber}`)}}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 26 26">
              <path fill="currentColor" d="M16.563 15.9c-.159-.052-1.164-.505-.536-2.414h-.009c1.637-1.686 2.888-4.399 2.888-7.07c0-4.107-2.731-6.26-5.905-6.26c-3.176 0-5.892 2.152-5.892 6.26c0 2.682 1.244 5.406 2.891 7.088c.642 1.684-.506 2.309-.746 2.397c-3.324 1.202-7.224 3.393-7.224 5.556v.811c0 2.947 5.714 3.617 11.002 3.617c5.296 0 10.938-.67 10.938-3.617v-.811c0-2.228-3.919-4.402-7.407-5.557z"/>
            </svg>
          </button>
          ))}
        </div>

        <div className="sector">
          <div className="sector-name">
            <h3>SECTOR B</h3>
          </div>
          {sectorBSeats.map(seat => (
          <button
            key={`${seat.sector}${seat.seatNumber}`}
            className={clickedSeats.includes(`${seat.sector}${seat.seatNumber}`)  ? 'clicked' : '' || occupiedSeats.includes(`${seat.sector}${seat.seatNumber}`) ? 'taken' : ''}
            disabled={occupiedSeats.includes(`${seat.sector}${seat.seatNumber}`)}
            onClick={() => {handleClick(`${seat.sector}${seat.seatNumber}`)}}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 26 26">
              <path fill="currentColor" d="M16.563 15.9c-.159-.052-1.164-.505-.536-2.414h-.009c1.637-1.686 2.888-4.399 2.888-7.07c0-4.107-2.731-6.26-5.905-6.26c-3.176 0-5.892 2.152-5.892 6.26c0 2.682 1.244 5.406 2.891 7.088c.642 1.684-.506 2.309-.746 2.397c-3.324 1.202-7.224 3.393-7.224 5.556v.811c0 2.947 5.714 3.617 11.002 3.617c5.296 0 10.938-.67 10.938-3.617v-.811c0-2.228-3.919-4.402-7.407-5.557z"/>
            </svg>
          </button>
          ))}
        </div>
        {/* --------------------------------------------------------- */}
        
      </div>
    </div>
  )
}
  