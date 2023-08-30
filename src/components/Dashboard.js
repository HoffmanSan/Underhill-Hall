// imports
import { NavLink } from 'react-router-dom';

export default function Dashboard({ eventTypes }) {
  return (
    < >
      <h2 className="dashboard-title">Upcoming Events</h2>
      <div className="dashboard">
        
        <div className="row">
          {eventTypes.map(type => (
              <NavLink className='col-12-xs col-6-md col-3-lg' to={`events/${type}`} key={type}>
                <div className={`card ${type}`}>
                  <h2>{type}</h2>
                </div>
              </NavLink>
            ))}
        </div>
      </div>
    </>
  );
};
