import "./ViewEventDetails.css";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import React, { useContext, useState, useEffect } from 'react';
import { format, parse } from 'date-fns';
import ReactLoading from "react-loading";
import { DummyImage } from "../../assets";
import { Modal, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import api from "../../services";


export default function ViewEventDetails() {
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [event, setEvent] = useState();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);


  const navigate = useNavigate();


    useEffect(() => {
        api.events.getEventId(id)
        .then(response => {
            setEvent(response);
        })
        .catch(error => {
            console.error("Error fetching properties:", error);
        })
        .finally(() => {
            setLoading(false);
        });
    }, []);
    const formatDateTime = (dateString, timeString) => {
        const parsedDate = parse(dateString, 'dd-MM-yyyy', new Date());
        const formattedDate = format(parsedDate, "do MMMM yyyy");
        return `${formattedDate}, ${timeString}`;
    };

    const handleOpenDeleteModal = () => setOpenDeleteModal(true);
    const handleCloseDeleteModal = () => setOpenDeleteModal(false);


    const handleDeleteConfirmation = async() => {
try{
    const response = await api.events.deleteEvent(id);
    if(response){
        navigate("/");

    }

}catch(error){
console.log(error);
}
    }

    const handleEditClick = () => {
     navigate(`/edit-event/${id}`)

    }

    return (
        <div >
            {event ? (
                <div>
                    <div className="event-header">
                    <h2 className="event-detail-title">{event.title}</h2>
                    <div className="button-header"> <button className="event-book-button" onClick={handleEditClick}>Edit Event</button>
                    <button className="event-book-button" onClick={handleOpenDeleteModal}>Delete</button></div>
                        </div>
                   
                    <div className="event-detail-container">
                        <div className="left-box" >
                            <Carousel
                                showArrows={false}
                                autoPlay={false}
                                infiniteLoop={false}
                                showStatus={false}
                                showIndicators={false}
                            >
                                {event?.images && event?.images?.length > 0 ?
                                    event?.images.map((image, index) => (
                                        <div key={index}>
                                            <img src={image} alt={`Event Image ${index + 1}`} />
                                        </div>
                                    )) :
                                    <img src={DummyImage} alt={`Dummy Image`} />
                                }
                            </Carousel>

                        </div >
                        <div className="right-box">
                            <p> {event.desc}</p>
                            <h6><strong>Date and Time</strong></h6>
                            <p>{formatDateTime(event.date, event.time)}</p>
                            <h6><strong>Location</strong></h6>
                            <p>{event.location}</p>
                            <h6><strong>Ticket Price</strong></h6>
                            <p>${event.price} CAD</p>
                        </div>
                    </div >
                    <Modal
                        open={openDeleteModal}
                        onClose={handleCloseDeleteModal}
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
                           
                             <h5 class="card-title">Are you sure you want to delete this event?</h5>
                             <div class="modal-button">
                             <button
              className="event-book-button"
              onClick={handleDeleteConfirmation}
            >
              Yes, Delete
            </button>
            <button
              className="event-book-button"
              onClick={handleCloseDeleteModal}
            >
              Cancel
            </button>
                             </div>
           
                            
                        </Box>
                    </Modal>
                   
                </div>) : <ReactLoading type="spin" color="#fff" />

            }
        </div >);

};