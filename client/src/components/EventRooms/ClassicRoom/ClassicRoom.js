// Styles
import './classicRoom.scss';

// Components
import Sector from '../../Sector/Sector';

export default function ClassicRoom({ handleClick, pickedSeats, takenSeats }) {
  return (
    <div className="classic-room">

      {/* Room model (visible only on mobile devices/tablets) */}
      <div className="room-model-hidden">
        <h2>Room Model</h2>
        <div className="room-model">
          <div className="stage-model"><h4>STAGE</h4></div>
          <div className="sector-model-A"><h4>A</h4></div>
          <div className="sector-model-B"><h4>B</h4></div>
        </div>
      </div>
      
      {/* Room layout */}
      <div className="container">
        <div className="stage"><h1>STAGE</h1></div>
        <Sector sectorRef="A" seatsQuantity={100} takenSeats={takenSeats} pickedSeats={pickedSeats} handleClick={handleClick} />
        <Sector sectorRef="B" seatsQuantity={100} takenSeats={takenSeats} pickedSeats={pickedSeats} handleClick={handleClick} />
      </div>
    </div>
  )
}
  