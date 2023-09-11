// Imports
import { NavLink } from 'react-router-dom';

// Styles
import './dashboard.scss';

export default function Dashboard({ eventTypes }) {
  return (
    <div className="dashboard">

      <h2 className="dashboard-title">Upcoming Events</h2>
      
      <div className="dashboard-container">
        <div className="row">
          {eventTypes.map(type => (
              <NavLink className='col-12-xs col-6-md col-3-lg' to={`events/${type}`} key={type}>
                <div className="card">
                  <h2>{type}</h2>
                </div>
              </NavLink>
            ))}
        </div>
      </div>
    </div>
  );
};
