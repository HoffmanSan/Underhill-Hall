// Imports
import { Link } from 'react-router-dom';

// Styles
import './dashboard.scss';

export default function Dashboard({ eventTypes }) {
  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1 className="header-part-one">EXCLUSIVE EVENTS</h1>
          <h1 className="header-part-two">UNDERHILL HALL</h1>
          <h1 className="header-part-three">PRICELESS MEMORIES</h1>
        </div>
      </div>

      <h2 className="dashboard-title">Upcoming Events</h2>
      
      <div className="dashboard-container">
          {eventTypes.map(type => (
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
