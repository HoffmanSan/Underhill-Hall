// imports
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// styles
import './App.css'

// components & pages
import CarouselElement from './components/CarouselElement'
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

const imageData = [
  { alt: "image1", url: "https://lh5.googleusercontent.com/xo6zDzj4Mq8JTuh31DRdzWPkmeekU1ykdvy7gmdGNkBnVzHoULgCA_MpL1ybOV2GKEkbvmswUl0iQW0lvnNQe3gqOFi_-bbt3MBzOAla29FvVN753jPZS87Bn7HyXoQ-dwA-ioYg" },
  { alt: "image2", url: "https://cdn.thomasnet.com/insights-images/eaf2ea91-c0ca-488d-ab63-af480b6f78cb/750px.png" },
  { alt: "image3", url: "https://moneyinc.com/wp-content/uploads/2018/11/Willow-750x500.jpg" },
  { alt: "image4", url: "https://japan.stripes.com/sites/default/files/styles/community_site_carousel_750x500/public/article-images/main_13.jpg?itok=_GELFbpY" }
];

const eventTypes = ["Concerts", "Theatre", "Science", "Ballet", "Cabaret", "Opera", "Cinema", "Kids", "Art Exhibitions"];

const socialMedia = [
  { name: "Facebook", iconSource: Facebook},
  { name: "Twitter", iconSource: Twitter},
  { name: "Instagram", iconSource: Instagram },
  { name: "LinkedIn", iconSource: LinkedIn }
];

function App() {
  const handleClick = (mediaName) => {
    window.open(`https://${mediaName}.com`, '_blank');
    // window.location.replace(`https://${mediaName}.com`);
  }
  return (
    <div className="App">
      <BrowserRouter>
      <CarouselElement imageData={imageData}/>

        <Routes>
          <Route path="" element={<Dashboard eventTypes={eventTypes}/>}></Route>
          <Route path="events/:type" element={<EventList />}></Route>
        </Routes>

      <div className="footer">
        <div className="footer-links">
          <ul>
            {socialMedia.map(media => (
              <li key={media.name} onClick={() => handleClick(media.name)}><img height="25px" width="25px" src={media.iconSource} alt={`${media.name} logo`}/><p>{media.name}</p></li>
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
      </div>
        <p className="footer-paragraph">© MG. Copyright 2023</p>
      </BrowserRouter>
    </div>
  );
}

export default App;
