// Imports
import { Routes, Route } from 'react-router-dom';

// Styles
import './App.scss'

// Components & Pages
import { Navbar, Footer, NotFound }  from './components';
import { AboutUs, ContactUs, Dashboard, EventList, ReservationPanel } from './pages';

// Never changing values
const event_types = ["Opera", "Theatre", "Science", "Ballet", "Concerts", "Stand-up", "Cinema", "Kids", "Others"];

function App() {
  return (
    <div className="App">
      <Navbar />
        <Routes>
          <Route exact path="/" element={<Dashboard eventTypes={event_types}/>} />
          <Route exact path="events/:type" element={<EventList eventTypes={event_types} />} />
          <Route exact path="events/:type/:eventId" element={<ReservationPanel />} />
          <Route exact path="about" element={<AboutUs />} />
          <Route exact path="contact" element={<ContactUs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      <Footer />
    </div>
  );
};

export default App;
