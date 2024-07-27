import "./EventDetails.css";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import React, { useContext } from 'react';
import { EventContext } from '../../context/EventContext';
import { format, parse } from 'date-fns';
import ReviewCard from "../../components/ReviewCard/ReviewCard";
import ReactLoading from "react-loading";
import { DummyImage } from "../../assets/";


export default function EventDetails() {
    const { events } = useContext(EventContext);
    const event = events.length > 0 ? events[1] : null;
    const organizer = event ? event.organizer : null;
    const reviews = event ? event.reviews : null;
    console.log(event);

    const formatDateTime = (dateString, timeString) => {
        const parsedDate = parse(dateString, 'dd/MM/yyyy', new Date());
        const formattedDate = format(parsedDate, "do MMMM yyyy");
        return `${formattedDate}, ${timeString}`;
    };

    return (
        <div >
            {event ? (
                <div>
                    <h2 className="event-detail-title">{event.title}</h2>
                    <div className="event-detail-container">
                        <div className="left-box" >
                            <Carousel
                                showArrows={false}
                                autoPlay={false}
                                infiniteLoop={false}
                                showStatus={false}
                                showIndicators={false}
                            >
                                {event.images && event.images.length > 0 ?
                                    event.images.map((image, index) => (
                                        <div key={index}>
                                            <img src={image} alt={`Event Image ${index + 1}`} />
                                        </div>
                                    )) :
                                    <img src={DummyImage} alt={`Dummy Image`} />
                                }
                            </Carousel>

                            <div className="organizer-box">
                                <div className="organizer-details">
                                    <div >
                                        <img
                                            className="organizer-image"
                                            src={organizer.image}
                                            alt="Organizer Image"
                                        />
                                    </div>
                                    <div className="organizer-description">
                                        <h8 style={{ marginBottom: "20%" }}>Organized by</h8>
                                        <h5>{organizer.name}</h5>
                                        <p>{organizer.no_of_followers} Followers</p>

                                    </div>
                                </div>
                                <div>
                                    <button className="organizer-follow-button">Follow</button>
                                </div>
                            </div>

                        </div >
                        <div className="right-box">
                            <p> {event.desc}</p>
                            <h6><strong>Date and Time</strong></h6>
                            <p>{formatDateTime(event.date, event.time)}</p>
                            <h6><strong>Location</strong></h6>
                            <p>{event.location}</p>
                            <h6><strong>Ticket Price</strong></h6>
                            <p>{event.price}/-</p>
                            <button className="event-book-button" >Book Now</button>
                            <div className="review-list-box">
                                <div className="review-list-header" >
                                    <h5> Reviews</h5>
                                    <button className="review-add-button"> Add a Review</button>
                                </div>
                                {reviews && reviews.map((review, index) => (
                                    <div key={index}>
                                        <ReviewCard review={review} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div >
                </div>) : <ReactLoading type="spin" color="#fff" />
            }

        </div >);

};