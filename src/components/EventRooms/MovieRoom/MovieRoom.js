// Styles
import './movieRoom.scss';

// Components
import Sector from '../../Sector/Sector';

export default function MovieRoom({ handleClick, clickedSeats, takenSeats }) {
return (
    <div className="movie-room"> 

      {/* Room model (visible only on mobile devices for easier reservation making process) */}
      <div className="room-model-hidden">
        <h3>Room Model</h3>
        <div className="room-model">
          <div className="screen-model"><p>SCREEN</p></div>
          <div className="sector-model-A"><p>A</p></div>
          <div className="sector-model-B"><p>B</p></div>
        </div>
      </div>

      {/* Room layout */}
      <div className="container">
        <div className="screen"><h3>SCREEN</h3></div>
        <Sector sectorRef="A" seatsQuantity={100} takenSeats={takenSeats} clickedSeats={clickedSeats} handleClick={handleClick} />
        <Sector sectorRef="B" seatsQuantity={100} takenSeats={takenSeats} clickedSeats={clickedSeats} handleClick={handleClick} />
      </div>
    </div>
  )
}
  