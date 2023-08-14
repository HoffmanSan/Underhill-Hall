// imports
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// styles
import './App.css'

// components & pages
import CarouselElement from './components/CarouselElement'
import Navbar from './components/Navbar'
import EventList from './pages/eventList/eventList'
import Dashboard from './pages/dashboard/dashboard'

const imageData = [
  { alt: "image1", url: "https://lh5.googleusercontent.com/xo6zDzj4Mq8JTuh31DRdzWPkmeekU1ykdvy7gmdGNkBnVzHoULgCA_MpL1ybOV2GKEkbvmswUl0iQW0lvnNQe3gqOFi_-bbt3MBzOAla29FvVN753jPZS87Bn7HyXoQ-dwA-ioYg" },
  { alt: "image2", url: "https://cdn.thomasnet.com/insights-images/eaf2ea91-c0ca-488d-ab63-af480b6f78cb/750px.png" },
  { alt: "image3", url: "https://moneyinc.com/wp-content/uploads/2018/11/Willow-750x500.jpg" },
  { alt: "image4", url: "https://japan.stripes.com/sites/default/files/styles/community_site_carousel_750x500/public/article-images/main_13.jpg?itok=_GELFbpY" }
];

const eventTypes = ["Concerts", "Theatre", "Science", "Ballet", "Cabaret", "Opera", "Cinema", "Kids", "Art Exhibitions"];

function App() {
  return (
    <div className="App">
      <CarouselElement imageData={imageData}/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard eventTypes={eventTypes}/>}></Route>
          <Route path="events/:type" element={<EventList />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
