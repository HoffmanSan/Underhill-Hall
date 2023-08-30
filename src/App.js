// imports
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// styles
import './App.scss'

// components
import Navbar from './components/Navbar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import EventList from './components/EventList';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';


// logos & icons
import { Petropo, Redag, Werqu, Ahs } from './assets/sponsors-logos/index';
import { Facebook, Twitter, LinkedIn, Instagram } from './assets/social-media-icons/index';


const EVENT_TYPES = ["Concerts", "Theatre", "Science", "Ballet", "Stand-up", "Opera", "Cinema", "Kids", "Art Exhibitions"];

const SOCIAL_MEDIA = [
  { name: "Facebook", iconSource: Facebook },
  { name: "Twitter", iconSource: Twitter },
  { name: "Instagram", iconSource: Instagram },
  { name: "LinkedIn", iconSource: LinkedIn }
];

function App() {

  const handleClick = (mediaName) => {
    window.open(`https://${mediaName}.com`, '_blank');
  };

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="" element={<><Header /><Dashboard eventTypes={EVENT_TYPES}/></>}></Route>
          <Route path="events/:type" element={<EventList />}></Route>
          <Route path="events/:type/:eventId" element={<EventList />}></Route>
          <Route path="/about" element={<AboutUs />}></Route>
          <Route path="/contact" element={<ContactUs />}></Route>
        </Routes>
      </BrowserRouter>

      {/* footer */}
      <div className="footer">
        <div className="footer-links">
          <p className="footer-paragraph">Find us on social media:</p>
          <ul>
            {SOCIAL_MEDIA.map(media => (
              <li key={media.name} onClick={() => handleClick(media.name)}>
                <img height="25px" width="25px" src={media.iconSource} alt={`${media.name} icon`}/>
                <p>{media.name}</p>
              </li>
            ))}
          </ul>
        </div>
        <p className="footer-paragraph">Our sponsors: </p>
        <div className="footer-sponsors">
          <img height="150px" width="150px" src={Petropo} alt="sponsor logo: Petropo " />
          <img height="150px" width="150px" src={Werqu} alt="sponsor logo: Werqu Incorporado" />
          <img height="150px" width="150px" src={Ahs} alt="sponsor logo: AHS" />
          <img height="150px" width="150px" src={Redag} alt="sponsor logo: REDAG development" />
        </div>
        <p className="footer-paragraph">Copyright 2023</p>
      </div>
    </div>
  );
};

export default App;
