// Imports
import { useState } from "react";

// Styles
import './classicRoom.scss';

// Components
import Sector from '../SectorLayout/Sector';

// Sector seats generating function used as initial value in useState (called only on first render)
const generateSectorSeats = (sectorRef, sectorSeatsQuantity) => {
  const sectorSeats = [];
  for (let i = 1; i <= sectorSeatsQuantity; i++) {
    sectorSeats.push({'sector': `${sectorRef}`, 'seatNumber': i});
  };
  return sectorSeats;
};

export default function ClassicRoom({ handleClick, clickedSeats, takenSeats }) {
  const [sectorASeats] = useState(() => generateSectorSeats(`A`, 100));
  const [sectorBSeats] = useState(() => generateSectorSeats(`B`, 100));

  return (
    <div className="classic-room">

      {/* Room model (visible only on mobile devices for easier reservation making process) */}
      <div className="room-model-hidden">
        <h3>Room Model</h3>
        <div className="room-model">
          <div className="stage-model"><p>STAGE</p></div>
          <div className="sector-model-A"><p>A</p></div>
          <div className="sector-model-B"><p>B</p></div>
        </div>
      </div>
      
      {/* Room layout */}
      <div className="container">
        <div className="stage"><h3>STAGE</h3></div>
        <Sector sectorRef="A" seatsArrayRef={sectorASeats} occupiedSeats={takenSeats} clickedSeats={clickedSeats} handleClick={handleClick} />
        <Sector sectorRef="B" seatsArrayRef={sectorBSeats} occupiedSeats={takenSeats} clickedSeats={clickedSeats} handleClick={handleClick} />
      </div>
    </div>
  )
}
  