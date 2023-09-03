// Imports
import { Routes, Route } from 'react-router-dom';

// Styles
import './App.scss'

// Components
import { Navbar, Header, Dashboard, EventList, AboutUs, ContactUs, ReservationPanel, Footer }  from './components';


const event_types = ["Concerts", "Theatre", "Science", "Ballet", "Stand-up", "Opera", "Cinema", "Kids", "Art Exhibitions"];

function App() {
  return (
    <div className="App">
      <Navbar />
        <Routes>
          <Route path="" element={<><Header /><Dashboard eventTypes={event_types}/></>}></Route>
          <Route path="events/:type" element={<EventList />}></Route>
          <Route path="events/:type/:eventId/*" element={<ReservationPanel />}></Route>
          <Route path="about" element={<AboutUs />}></Route>
          <Route path="contact" element={<ContactUs />}></Route>
        </Routes>
      <Footer />
    </div>
  );
};

export default App;
