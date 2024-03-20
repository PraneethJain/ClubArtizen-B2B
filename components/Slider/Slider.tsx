"use client";

import React, { useState } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import "./Slider.css";

interface ImageSliderProps {
  images: string[];
}

const Slider: React.FC<ImageSliderProps> = ({ images }) => {
  const [current, setCurrent] = useState(0);
  const length = images.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(images) || images.length === 0) {
    return null;
  }

  return (
    <div className="sliderclass">
      <div className="arrowclass">
        <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
      </div>
      {images.map((image, index) => (
        <div
          className={index === current ? "slide active" : "slide"}
          key={index}
        >
          {index === current && (
            <img src={image} alt={`Slide ${index}`} className="image" />
          )}
        </div>
      ))}
      <div className="arrowclass">
        <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide} />
      </div>
    </div>
  );
};

export default Slider;
