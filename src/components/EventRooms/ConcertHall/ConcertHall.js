// Styles
import './concertHall.scss';

// Components
import Sector from '../../Sector/Sector';

export default function ConcertHall({ handleClick, clickedSeats, takenSeats }) {
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
        <Sector sectorRef="A" seatsQuantity={198} takenSeats={takenSeats} clickedSeats={clickedSeats} handleClick={handleClick} />
        <Sector sectorRef="B" seatsQuantity={288} takenSeats={takenSeats} clickedSeats={clickedSeats} handleClick={handleClick} />
        <Sector sectorRef="C" seatsQuantity={198} takenSeats={takenSeats} clickedSeats={clickedSeats} handleClick={handleClick} />
        <Sector sectorRef="D" seatsQuantity={198} takenSeats={takenSeats} clickedSeats={clickedSeats} handleClick={handleClick} />
        <Sector sectorRef="E" seatsQuantity={198} takenSeats={takenSeats} clickedSeats={clickedSeats} handleClick={handleClick} />
      </div>
    </div>
  )
}
  