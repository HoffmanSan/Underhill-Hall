// Imports
import { Link } from 'react-router-dom';

// Styles
import './dashboard.scss';

const EVENT_TYPES = ["Opera", "Theatre", "Science", "Ballet", "Concerts", "Stand-up", "Cinema", "Kids", "Others"];

export default function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h2 className="header-part-one">EXCLUSIVE EVENTS</h2>
          <h1 className="header-part-two">UNDERHILL HALL</h1>
          <h2 className="header-part-three">PRICELESS MEMORIES</h2>
        </div>
      </div>

      <h2 className="dashboard-title">Upcoming Events</h2>
      
      <div className="dashboard-container">
          {EVENT_TYPES.map(type => (
              <Link to={`/events/${type}`} key={type}>
                <div className="dashboard-card">
                  <h2>{type}</h2>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};
