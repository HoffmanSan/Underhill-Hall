// imports
import { Carousel } from "react-responsive-carousel";
import { useState } from "react";

// styles
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function CarouselElement({ imageData }) {
    const [currentIndex, setCurrentIndex] = useState();

    const handleChange = (index) => {
        setCurrentIndex(index);
    };

  return (
    <Carousel
        showThumbs={false}
        showArrows={true}
        showStatus={false}
        showIndicators={true}
        autoPlay={true}
        interval="5000"
        infiniteLoop={true}
        selectedItem={imageData[currentIndex]}
        onChange={handleChange}
        className="carousel-container"
    >
        {imageData.map(image => (
          <div key={image.alt}>
            <img src={image.url} alt={image.alt} />
          </div>
        ))};
    </Carousel>
  )
};
