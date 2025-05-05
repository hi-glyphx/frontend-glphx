import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import Illustration from "../assets/svg/logos/Illustration 1@3x.svg";
import Illustration1 from "../assets/svg/logos/Illustration 2@3x.svg";
import Illustration2 from "../assets/svg/logos/Illustration 3@3x.svg";
import Illustration3 from "../assets/svg/logos/Illustration 4@3x.svg";

const OwlCarousel = () => {
  const [slides, setSlides] = useState([
    {
      title: "Manage Documentation",
      description:
        "The process of organizing, storing, and maintaining various types of documents within an organization.",
      img: Illustration,
      height: "400px",
      width: "400px",
    },
    {
      title: "Classify and Extract",
      description:
        "The process of automatically categorizing and extracting relevant information from large volumes of data or documents.",
      img: Illustration1,
      height: "400px",
      width: "445.349px",
    },
    {
      title: "Reports and Analysis",
      description:
        "The systematic examination and interpretation of data and information to generate meaningful insights and conclusions.",
      img: Illustration2,
      height: "400px",
      width: "400px",
    },
    {
      title: "Structured and Secured",
      description:
        "The implementation of organized frameworks and robust security measures to ensure the efficient management and protection of data and information.",
      img: Illustration3,
      height: "400px",
      width: "388px",
    },
  ]);

  return (
    <div className="slider">
      <div className="slides">
        <Swiper
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <img src={slide.img.src} alt={slide.title} />
              <p className="sliderTitle">{slide.title}</p>
              <p className="sliderDescription">{slide.description}</p>
              <br />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default OwlCarousel;
