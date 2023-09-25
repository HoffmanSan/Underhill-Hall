// Styles
import './movieRoom.scss';

// Components
import Sector from '../../Sector/Sector';

export default function MovieRoom({ handleClick, pickedSeats, takenSeats }) {
return (
    <div className="movie-room"> 

      {/* Room model (visible only on mobile devices/tablets) */}
      <div className="room-model-hidden">
        <h2>Room Model</h2>
        <div className="room-model">
          <div className="screen-model"><h4>SCREEN</h4></div>
          <div className="sector-model-A"><h4>A</h4></div>
          <div className="sector-model-B"><h4>B</h4></div>
        </div>
      </div>

      {/* Room layout */}
      <div className="container">
        <div className="screen"><h1>SCREEN</h1></div>
        <Sector sectorRef="A" seatsQuantity={100} takenSeats={takenSeats} pickedSeats={pickedSeats} handleClick={handleClick} />
        <Sector sectorRef="B" seatsQuantity={100} takenSeats={takenSeats} pickedSeats={pickedSeats} handleClick={handleClick} />
      </div>
    </div>
  )
}
  