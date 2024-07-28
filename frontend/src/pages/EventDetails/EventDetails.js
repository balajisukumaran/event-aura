import "./EventDetails.css";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import React, { useContext, useState } from 'react';
import { EventContext } from '../../context/EventContext';
import { format, parse } from 'date-fns';
import ReviewCard from "../../components/ReviewCard/ReviewCard";
import ReactLoading from "react-loading";
import { DummyImage } from "../../assets/";
import { Modal, Box } from '@mui/material';
import AddReview from "../../components/AddReview/AddReview";
import BookTicket from "../../components/BookTicket/BookTicket";


export default function EventDetails() {
    const [openReviewModal, setOpenReviewModal] = useState(false);
    const [openBookModal, setOpenBookModal] = useState(false);
    const [review, setReview] = useState({ description: "", rating: 0 });
    const { events } = useContext(EventContext);

    const event = events.length > 0 ? events[0] : null;
    const organizer = event ? event.organizer : null;
    const reviews = event ? event.reviews : null;

    const formatDateTime = (dateString, timeString) => {
        const parsedDate = parse(dateString, 'dd/MM/yyyy', new Date());
        const formattedDate = format(parsedDate, "do MMMM yyyy");
        return `${formattedDate}, ${timeString}`;
    };

    const handleOpenReview = () => setOpenReviewModal(true);
    const handleOpenBooking = () => setOpenBookModal(true);
    const handleCloseReview = () => setOpenReviewModal(false);
    const handleCloseBooking = () => setOpenBookModal(false);

    function onAddReview(event) {
        event.preventDefault();

        console.log("New review added:", review);
        handleCloseReview();
    }

    function handleBooking(numTickets, total) {
        console.log("Num of Tickets:", numTickets);
        console.log("Total Price: ", total);
        handleCloseBooking();
    }

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
                                        <h6 style={{ marginBottom: "20%" }}>Organized by</h6>
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
                            <p>${event.price} CAD</p>
                            <button className="event-book-button" onClick={handleOpenBooking}>Book Now</button>
                            <div className="review-list-box">
                                <div className="review-list-header" >
                                    <h5> Reviews</h5>
                                    <button className="review-add-button" onClick={handleOpenReview}> Add a Review</button>
                                </div>
                                {reviews && reviews.map((review, index) => (
                                    <div key={index}>
                                        <ReviewCard review={review} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div >
                    <Modal
                        open={openReviewModal}
                        onClose={handleCloseReview}
                    >
                        <Box sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 500,
                            bgcolor: 'background.paper',
                            border: '2px solid #000',
                            boxShadow: 24,
                            p: 4
                        }}>
                            <AddReview review={review} setReview={setReview} onSubmit={onAddReview} onCancel={handleCloseReview} />
                        </Box>
                    </Modal>
                    <Modal
                        open={openBookModal}
                        onClose={handleCloseBooking}
                    >
                        <Box sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 500,
                            bgcolor: '#1A2529',
                            border: '2px solid #000',
                            boxShadow: 24,
                            p: 4
                        }}>
                            <BookTicket event={event} onSubmit={handleBooking} />
                        </Box>
                    </Modal>
                </div>) : <ReactLoading type="spin" color="#fff" />

            }

        </div >);

};