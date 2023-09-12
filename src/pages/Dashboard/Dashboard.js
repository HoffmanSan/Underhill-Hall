// Imports
import { NavLink } from 'react-router-dom';

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
        <div className="row">
          {eventTypes.map(type => (
              <NavLink className='col-12-xs col-6-md col-3-lg' to={`events/${type}`} key={type}>
                <div className="dashboard-card">
                  <h2>{type}</h2>
                </div>
              </NavLink>
            ))}
        </div>
      </div>
    </div>
  );
};
