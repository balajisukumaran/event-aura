import "./EventDetails.css";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import React, { useContext, useState, useEffect } from 'react';
import { EventContext } from '../../context/EventContext';
import { format, parse } from 'date-fns';
import ReviewCard from "../../components/ReviewCard/ReviewCard";
import ReactLoading from "react-loading";
import { DummyImage } from "../../assets/";
import { Modal, Box } from '@mui/material';
import AddReview from "../../components/AddReview/AddReview";
import BookTicket from "../../components/BookTicket/BookTicket";
import axios from "axios";
import { useParams, Link } from 'react-router-dom';

export default function EventDetails() {
    const [openReviewModal, setOpenReviewModal] = useState(false);
    const [openBookModal, setOpenBookModal] = useState(false);
    const [organizer, setOrganizer] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [showAllReviews, setShowAllReviews] = useState(false); // New state variable

    const { events } = useContext(EventContext);
    const { id } = useParams();
    const event = events.find(event => event.id === id);

    useEffect(() => {
        const fetchOrganizerDetails = async (organizerId) => {
            try {
                const response = await axios.get(`http://localhost:8080/api/users/${organizerId}`);
                if (response.status === 200) {
                    setOrganizer(response.data);
                }
            } catch (error) {
                console.error("There was an error fetching the organizer details!", error);
            }
        };

        const fetchReviews = async (eventId) => {
            try {
                const response = await axios.get(`http://localhost:8080/api/reviews/all?event=${eventId}`);
                if (response.status === 200) {
                    setReviews(response.data);
                }
            } catch (error) {
                console.error("There was an error fetching the reviews!", error);
            }
        };

        if (event) {
            fetchOrganizerDetails(event.organizerId);
            fetchReviews(event.id);
        }
    }, [event]);

    const formatDateTime = (dateString, timeString) => {
        const parsedDate = parse(dateString, 'dd-MM-yyyy', new Date());
        const formattedDate = format(parsedDate, "do MMMM yyyy");
        return `${formattedDate}, ${timeString}`;
    };

    const handleOpenReview = () => setOpenReviewModal(true);
    const handleOpenBooking = () => setOpenBookModal(true);
    const handleCloseReview = () => setOpenReviewModal(false);
    const handleCloseBooking = () => setOpenBookModal(false);

    async function handleReview(rating, description) {
        const review_request = {
            user_id: event.user_id,
            event_id: event.id,
            description: description,
            rating: rating
        };

        try {
            const response = await axios.post('http://localhost:8080/api/reviews/add', review_request);
            console.log("Review added", response.data);
        } catch (error) {
            console.error("There was an error adding the review!", error);
        }
        handleCloseReview();
    }

    function handleBooking(numTickets, total) {
        const order_request = {
            user_id: 1,
            event_id: event.id,
            no_of_tickets: numTickets,
            total: total
        };

        axios.post("http://localhost:8080/api/order/", order_request)
            .then((response) => {
                if (response.status === 200) {
                    const data = response.data;
                    window.location.href = data.payment_url
                } else {
                    //provide a toast message.
                    console.error("Payment URL not found in the response");
                }
            }).catch((error) => {
                //provide a toast message.
                console.log(error);
            })
        handleCloseBooking();
    }

    return (
        <div>
            {event ? (
                <div>
                    <h2 className="event-detail-title">{event.title}</h2>
                    <div className="event-detail-container">
                        <div className="left-box">
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
                            {organizer && <div className="organizer-box">
                                <div className="organizer-details">
                                    <div>
                                        <img
                                            className="organizer-image"
                                            src={organizer.imageurl}
                                            alt="Organizer Image"
                                        />
                                    </div>
                                    <div className="organizer-description">
                                        <h6 style={{ marginBottom: "20%" }}>Organized by</h6>
                                        <h5>{organizer.firstname + " " + organizer.lastname}</h5>
                                        <p>{organizer.no_of_followers} Followers</p>
                                    </div>
                                </div>
                                <div>
                                    <button className="organizer-follow-button">Follow</button>
                                </div>
                            </div>}
                        </div>
                        <div className="right-box">
                            <p>{event.desc}</p>
                            <h6><strong>Date and Time</strong></h6>
                            <p>{formatDateTime(event.date, event.time)}</p>
                            <h6><strong>Location</strong></h6>
                            <p>{event.location}</p>
                            <h6><strong>Ticket Price</strong></h6>
                            <p>${event.price} CAD</p>
                            <button className="event-book-button" onClick={handleOpenBooking}>Book Now</button>
                            <div className="review-list-box">
                                <div className="review-list-header">
                                    <h5>Reviews</h5>
                                    <button className="review-add-button" onClick={handleOpenReview}>Add a Review</button>
                                </div>
                                {reviews.length > 0 && <ReviewCard review={reviews[0]} />}
                                {showAllReviews && reviews.slice(1).map((review, index) => (
                                    <div key={index}>
                                        <ReviewCard review={review} />
                                    </div>
                                ))}
                            </div>
                            {!showAllReviews && reviews.length > 1 && (
                                <Link className="custom-link" onClick={() => setShowAllReviews(true)}>Show more reviews</Link>
                            )}
                            {showAllReviews && (
                                <Link className="custom-link" onClick={() => setShowAllReviews(false)}>Show less reviews</Link>
                            )}
                        </div>
                    </div>
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
                            <AddReview onSubmit={handleReview} onCancel={handleCloseReview} />
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
        </div>
    );
}
