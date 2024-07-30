import React from 'react';
import './EventCard.css';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import { DummyImage } from "../../assets/";

const EventCard = ({ event }) => {
    const navigate = useNavigate();
    return (
        <div className="event-card" onClick={() => navigate("/events/" + event.id)}>
            <Carousel
                autoPlay={true}
                infiniteLoop={true}
                showThumbs={false}
                showArrows={false}
                showStatus={false}
                showIndicators={false}
            >

                {event.images && event.images.length > 0 ? (
                    event.images.map((image, index) => (
                        <img key={index} className='event-image' src={image} />
                    ))
                ) : (
                    <img className='event-image' src={DummyImage} alt={`Dummy Image`} />
                )}

            </Carousel>
            <div className="event-details">
                <div className="event-title">{event.title}</div>
                <div className="event-datetime">
                    <span className="event-date">{event.date}</span>
                    <span className="event-time">{event.startTime} - {event.endTime}</span>
                </div>
            </div>
            <div className="event-info">

                <div className="event-desc">{event.description}</div>
            </div>


        </div>
    );
};

export default EventCard;
