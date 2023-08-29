// imports
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// styles
import './App.css'

// components & pages
import Navbar from './components/Navbar'
import EventList from './pages/eventList/eventList'
import Dashboard from './pages/dashboard/dashboard'

// logos & icons
import Petropo from './assets/sponsorsLogo/Petropo-logos.jpeg'
import Redag from './assets/sponsorsLogo/REDAG development-logos.jpeg'
import Werqu from './assets/sponsorsLogo/Werqu Incorporado-logos.jpeg'
import Ahs from './assets/sponsorsLogo/AHS-logos.jpeg'
import Facebook from './assets/socialMediaIcons/icon_fb.png'
import Twitter from './assets/socialMediaIcons/icon_twitter.png'
import LinkedIn from './assets/socialMediaIcons/icon_linkedin.png'
import Instagram from './assets/socialMediaIcons/icon_instagram.png'

const eventTypes = ["Concerts", "Theatre", "Science", "Ballet", "Cabaret", "Opera", "Cinema", "Kids", "Art Exhibitions"];

const socialMedia = [
  { name: "Facebook", iconSource: Facebook },
  { name: "Twitter", iconSource: Twitter },
  { name: "Instagram", iconSource: Instagram },
  { name: "LinkedIn", iconSource: LinkedIn }
];

function App() {

  const handleClick = (mediaName) => {
    window.open(`https://${mediaName}.com`, '_blank');
  }

  return (
    <div className="App">
      <BrowserRouter>

        <Routes>
          <Route path="" element={<Dashboard eventTypes={eventTypes}/>}></Route>
          <Route path="events/:type" element={<EventList />}></Route>
        </Routes>
      </BrowserRouter>

      {/* footer */}
      <div className="footer">
        <div className="footer-links">
          <ul>
            {socialMedia.map(media => (
              <li key={media.name} onClick={() => handleClick(media.name)}>
                <img height="25px" width="25px" src={media.iconSource} alt={`${media.name} icon`}/>
                <p>{media.name}</p>
              </li>
            ))};
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
}

export default App;
