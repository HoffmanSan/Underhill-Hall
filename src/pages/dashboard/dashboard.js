// imports
import { NavLink } from 'react-router-dom';

// styles
import './dashboard.css'

export default function Dashboard({ eventTypes }) {
  return (
    <div className="dashboard-container">
        {eventTypes.map(type => (
            <NavLink to={`events/${type}`} key={type}>
              <div className={`event-type-card ${type}`}>
                <h2>{type}</h2>
              </div>
            </NavLink>
            ))};
    </div>
  );
};
