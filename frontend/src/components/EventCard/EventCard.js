import React from 'react';
import './EventCard.css';
import { useNavigate } from 'react-router-dom';

const EventCard = ({ event }) => {
    const navigate = useNavigate();
    return (
        <div className="event-card" onClick={() => navigate("/login")}>
            <img src={event.image} alt={event.title} className="event-image" />
            <div className="event-details">
                <div className="event-title">{event.title}</div>
                <div className="event-datetime">
                    <span className="event-date">{event.date}</span>
                    <span className="event-time">{event.time}</span>
                </div>
            </div>
            <div className="event-info">

                <div className="event-desc">{event.desc}</div>
            </div>


        </div>
    );
};

export default EventCard;
