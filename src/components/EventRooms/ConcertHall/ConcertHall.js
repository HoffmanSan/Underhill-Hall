// Imports
import { useState } from 'react';

// Styles
import './concertHall.scss';

// Components
import Sector from '../../SectorLayout/Sector';

// Sector seats generating
const generateSectorSeats = (sectorRef, sectorSeatsQuantity) => {
  const sectorSeats = [];
  for (let i = 1; i <= sectorSeatsQuantity; i++) {
    sectorSeats.push({'sector': `${sectorRef}`, 'seatNumber': i});
  };
  return sectorSeats;
};

export default function ConcertHall({ handleClick, clickedSeats, takenSeats }) {
  const [sectorASeats] = useState(() => generateSectorSeats('A', 198));
  const [sectorBSeats] = useState(() => generateSectorSeats('B', 288));
  const [sectorCSeats] = useState(() => generateSectorSeats('C', 198));
  const [sectorDSeats] = useState(() => generateSectorSeats('D', 198));
  const [sectorESeats] = useState(() => generateSectorSeats('E', 198));

  return (
    <div className="concert-hall">

      {/* Room model (visible only on mobile devices for easier reservation making process) */}
      <div className="room-model-hidden">
        <h3>Room Model</h3>
        <div className="room-model">
          <div className="stage-model"><p>STAGE</p></div>
          <div className="sector-model-A"><p>A</p></div>
          <div className="sector-model-B"><p>B</p></div> 
          <div className="sector-model-C"><p>C</p></div>
          <div className="sector-model-D"><p>D</p></div>
          <div className="sector-model-E"><p>E</p></div>
        </div>
      </div>

      {/* Room layout */}
      <div className="container">
        <div className="stage"><h3>STAGE</h3></div>
        <Sector sectorRef="A" seatsArrayRef={sectorASeats} occupiedSeats={takenSeats} clickedSeats={clickedSeats} handleClick={handleClick} />
        <Sector sectorRef="B" seatsArrayRef={sectorBSeats} occupiedSeats={takenSeats} clickedSeats={clickedSeats} handleClick={handleClick} />
        <Sector sectorRef="C" seatsArrayRef={sectorCSeats} occupiedSeats={takenSeats} clickedSeats={clickedSeats} handleClick={handleClick} />
        <Sector sectorRef="D" seatsArrayRef={sectorDSeats} occupiedSeats={takenSeats} clickedSeats={clickedSeats} handleClick={handleClick} />
        <Sector sectorRef="E" seatsArrayRef={sectorESeats} occupiedSeats={takenSeats} clickedSeats={clickedSeats} handleClick={handleClick} />
      </div>
    </div>
  )
}
  