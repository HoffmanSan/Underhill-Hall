// Imports
import { Routes, Route } from 'react-router-dom';

// Styles
import './App.scss'

// Components & Pages
import { Navbar, Footer }  from './components';
import { AboutUs, ContactUs, Dashboard, EventList, ReservationPanel, PaymentPanel, Completion } from './pages';

function App() {
  return (
    <div className="App">
      <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/underhill-hall" element={<Dashboard/>} />
          <Route path="/events/:type" element={<EventList />} />
          <Route path="/events/:type/:eventId" element={<ReservationPanel />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/payment" element={<PaymentPanel />} />
          <Route path="/completion" element={<Completion />} />
        </Routes>
      <Footer />
    </div>
  );
};

export default App;
