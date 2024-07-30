import React, { useState } from 'react';
import EventCard from '../EventCard/EventCard';
import './style.scss';

const EventSlider = ({ events, className }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesToShow = 3;
console.log(events);
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + slidesToShow) % events.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - slidesToShow + events.length) % events.length);
  };

  const getVisibleSlides = () => {
    const visibleSlides = [];
    for (let i = 0; i < slidesToShow; i++) {
      const index = (currentIndex + i) % events.length;
      visibleSlides.push(events[index]);
    }
    return visibleSlides;
  };

  return (
    <div className={`slider-container ${className || ''}`}>
      <button className="prev" onClick={prevSlide}>❮</button>
      <div className="slider-wrapper">
        {getVisibleSlides().map((event, index) => (
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
