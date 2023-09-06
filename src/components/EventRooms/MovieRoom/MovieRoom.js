// Imports
import { useState, useEffect } from "react";

// Styles
import './movieRoom.scss';

const numberOfSeatsInOneSector = 200;

export default function MovieRoom({ handleClick, clickedSeats, takenSeats }) {
  const [sectorASeats, setSectorASeats] = useState([]);
  const [occupiedSeats, setOccupiedSeats] = useState([]);

  // Generating arrays for audience rendering (different for each room) and checking for taken seats
  useEffect(() => {
    let i = 1;
    const seatNumbersA = [];
    while (i <= numberOfSeatsInOneSector) {
      seatNumbersA.push({'sector': 'A', 'seatNumber': i});
      i++;
    };
    setSectorASeats(seatNumbersA);
    const checkForOccupiedSeats = () => {
      if (takenSeats) {
        setOccupiedSeats(takenSeats)
      }};
    checkForOccupiedSeats();
  }, [takenSeats]);

    return (
      <div className="movie-room-layout"> 

        <div className="room-model-hidden">
          <p>Room Model</p>
          <div className="room-model">
            <div className="screen-model"><p>SCREEN</p></div>
            <div className="sector-A-model"><p>SECTOR <br />A</p></div>
          </div>
        </div>

        <div className="container">
          <div className="screen">
            <h3>SCREEN</h3>
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
                aria-label={`seat ${seat.sector}${seat.seatNumber}`}
                onClick={() => {handleClick(`${seat.sector}${seat.seatNumber}`)}}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26">
                  <path fill="currentColor" d="M16.563 15.9c-.159-.052-1.164-.505-.536-2.414h-.009c1.637-1.686 2.888-4.399 2.888-7.07c0-4.107-2.731-6.26-5.905-6.26c-3.176 0-5.892 2.152-5.892 6.26c0 2.682 1.244 5.406 2.891 7.088c.642 1.684-.506 2.309-.746 2.397c-3.324 1.202-7.224 3.393-7.224 5.556v.811c0 2.947 5.714 3.617 11.002 3.617c5.296 0 10.938-.67 10.938-3.617v-.811c0-2.228-3.919-4.402-7.407-5.557z"/>
                </svg>
            </button>
            ))}
          </div>
        </div>
      </div>
    )
  }
  