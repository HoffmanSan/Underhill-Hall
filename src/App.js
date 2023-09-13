// Imports
import { Routes, Route } from 'react-router-dom';

// Styles
import './App.scss'

// Components & Pages
import { Navbar, Footer }  from './components';
import { AboutUs, ContactUs, Dashboard, EventList, ReservationPanel } from './pages';

// Never changing values
const event_types = ["Opera", "Theatre", "Science", "Ballet", "Concerts", "Stand-up", "Cinema", "Kids", "Others"];

function App() {
  return (
    <div className="App">
      <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard eventTypes={event_types}/>} />
          <Route path="/underhill-hall" element={<Dashboard eventTypes={event_types}/>} />
          <Route path="/events/:type" element={<EventList eventTypes={event_types} />} />
          <Route path="/events/:type/:eventId" element={<ReservationPanel />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
      <Footer />
    </div>
  );
};

export default App;
