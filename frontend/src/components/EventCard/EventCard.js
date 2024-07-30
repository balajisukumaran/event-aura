import React, { useState } from 'react';
import './EventCard.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import { DummyImage } from "../../assets/";
import CancelBookingModal from '../CancelBookingModal';

const EventCard = ({ event }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [openModal, setOpenModal] = useState(false);

    const handleCancelBookingClick = (e) => {
        e.stopPropagation();
       event.onCancelBooking();
    };

    const onClickCancel = (e) => {
        e.stopPropagation();
        setOpenModal(true);
    }

    return (
        <div className="event-card" onClick={event?.onCardClick ? () => event.onCardClick() : () => navigate("/events/" + event.id)}>
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
                    <img className='event-image' src={DummyImage} alt={`Dummy`} />
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
            {
                (event?.organizerId !== localStorage.getItem("userId") && location.pathname === '/event-history') ? (
                    <div className='event-cta'>
                        <button className='event-cta-btn' onClick={onClickCancel}>Cancel Booking</button>
                    </div>
                ) : <div className='event-cta-empty' />
            }
            <CancelBookingModal
                open={openModal}
                handleConfirm={handleCancelBookingClick}
                handleClose={() => setOpenModal(false)}
            />
        </div>
    );
};

export default EventCard;
