/**
 * Author : Kabilesh Ravi Chandran
 */

import React, { useState, useEffect, useRef } from 'react';
import EventCard from '../EventCard/EventCard';
import './style.scss';

const EventSlider = ({ events, className }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const sliderRef = useRef();

  useEffect(() => {
    const updateSlidesToShow = () => {
      if (window.innerWidth <= 480) {
        setSlidesToShow(1);
      } else if (window.innerWidth <= 768) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };

    updateSlidesToShow();
    window.addEventListener('resize', updateSlidesToShow);

    return () => {
      window.removeEventListener('resize', updateSlidesToShow);
    };
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + events.length) % events.length);
  };

  const getTransformStyle = () => {
    return { transform: `translateX(-${(currentIndex / slidesToShow) * 100}%)` };
  };

  return (
    <div className={`slider-container ${className || ''}`} ref={sliderRef}>
      <button className="prev" onClick={prevSlide}>❮</button>
      <div className="slider-wrapper" style={getTransformStyle()}>
        {events.map((event, index) => (
          <div key={event.id} className="slide">
            <EventCard event={event} />
          </div>
        ))}
      </div>
      <button className="next" onClick={nextSlide}>❯</button>
    </div>
  );
};

export default EventSlider;
