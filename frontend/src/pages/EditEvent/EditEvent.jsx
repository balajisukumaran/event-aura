/**
 * Author : Nikita Davies
 */
import React, { useState, useEffect } from "react";
import "./styles.css";
import axios from "axios";
import  DropzoneComponent from "../../components/ImageUpload/DropzoneComponent";
import DateTimePicker from "../../components/DateTimePicker/DateTimePicker";
import LocationForm from "../../components/LocationForm/LocationForm";
import { toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services";

export const EditEvent = () => {
  const { id } = useParams();
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [eventDate, setEventDate] = useState("");
  const [eventStartTime, setEventStartTime] = useState("");
  const [eventEndTime, setEventEndTime] = useState("");
  const [errors, setErrors] = useState({});

  const [selectedOption, setSelectedOption] = useState("Venue");
  const [address, setAddress] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();


  function formatTime(time) {
    const [timePart, modifier] = time.split(' ');
    let [hours, minutes] = timePart.split(':');

    if (hours === '12') {
        hours = '00';
    }
    if (modifier === 'PM') {
        hours = parseInt(hours, 10) + 12;
    }

    return `${hours}:${minutes}`;
}


function formatDate(date) {
  const [day, month, year] = date.split('-');
  return `${year}-${month}-${day}`;
}

  useEffect(() => {
    api.events.getEventId(id)
    .then(response => {
        const formattedStartTime = formatTime(response.startTime);
        const formattedEndTime = formatTime(response.endTime);
        const formattedDate = formatDate(response.date);
        console.log(formatDate);
        setEventName(response.title);
        setEventDescription(response.description);
        setEventDate(formattedDate);
        setEventStartTime(formattedStartTime);
        setEventEndTime(formattedEndTime);
        setAddress(response.location);
        setTicketPrice(response.price);
    })
    .catch(error => {
        console.error("Error fetching properties:", error);
    })
    .finally(() => {
        setLoading(false);
    });
}, []);


  const handleOptionClick = (option) => {
    setSelectedOption(option);
    if (option === "Online event" || option === "To be announced") {
      setAddress("");
    }
  };
  const steps = [
    { label: "Event Details" },
    { label: "Date and Time" },
    { label: "Location" },
  ];
  const handleFilesSelected = (selectedFiles) => {
    setFiles(selectedFiles);
  };

  const validateStep = (step) => {
    const today = new Date().toISOString().split('T')[0];
    const errors = {};
    switch (step) {
      case 0:
        if (!eventName) {
          errors.eventName = "Event Name is required";
        }
        if (!eventDescription) {
          errors.eventDescription = "Event Description is required";
        }
        break;
      case 1:
        if (!eventDate) {
          errors.eventDate = "Event Date is required";
        }
        if (eventDate <= today) {
          errors.eventDate = "Event Date must be in the future";
        }
        if (!eventStartTime) {
          errors.eventStartTime = "Event Start Time is required";
        }
        if (!eventEndTime) {
          errors.eventEndTime = "Event End Time is required";
        }
        break;
      case 2:
        if (!address && selectedOption === "Venue") {
          errors.address = "Event Location is required";
        }
        break;
      default:
        break;
    }
    return errors;
  };


  const handleSubmit = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("event", new Blob([JSON.stringify({
      title: eventName,
      description: eventDescription,
      date: eventDate,
      startTime: eventStartTime,
      endTime: eventEndTime,
      location: address,
      price: ticketPrice,
      // TODO : to be changed
      organizerId: "66a7d5b555572a2845f307f4"
  })], {
      type: "application/json"
  }));

  files.forEach(file => {
      formData.append("images", file);
  });
  try{
    const response = await axios.put(`http://localhost:8080/api/events/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    navigate('/events');
    toast.success('Event created successfully!!');
  }catch(error){
console.log(error);
  }
    toast.success('Event created successfully!!');
    navigate('/events')
  };

  return (
    <>
        <div
          style={{
            backdropFilter: "blur(5px)",
            backgroundColor: "#1A2529",
            height: '100vh'
          }}
        >
          <div class="cont">
                    <div className="card border-0 shadow-sm p-4">
                      <div className="card-body">
                        <form className="row g-3">
                          <h4 class="fw-bold">Edit Event</h4>
                          <p style={{ margin: "0px" }}>
                            Please update the details about your event
                          </p>

                          <div className="content">
                           
                              <div>
                                <div>
                                  <label className="form-label fw-semibold mt-2">
                                    Event Name{" "}
                                    <span className="text-danger">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    className={`form-control mt-1 ${errors.eventName ? 'border-danger' : ''}`}
                                    value={eventName}
                                    onChange={(e) => {
                                      setErrors({...errors, eventName: ""});
                                      setEventName(e.target.value)
                                    }}
                                  />
                                  {errors.eventName && (
                                    <div className="text-danger mt-1">
                                      {errors.eventName}
                                    </div>
                                  )}
                                </div>

                                <h6 className="fw-semibold mb-0 mt-3">
                                  About your Event{" "}
                                  <span className="text-danger">*</span>
                                </h6>
                                <div>
                                  <input
                                    type="textarea"
                                    className={`form-control mt-1 ${errors.eventDescription ? 'border-danger' : ''}`}
                                    value={eventDescription}
                                    onChange={(e) => {
                                      setErrors({...errors, eventDescription: ""});
                                      setEventDescription(e.target.value)
                                    }
                                      
                                    }
                                  />
                                   {errors.eventDescription && (
                                    <div className="text-danger mt-1">
                                      {errors.eventDescription}
                                    </div>
                                  )}
                                </div>

                                <div className="col-md-12 mt-2">
                                  <hr className="text-muted mb-0" />
                                </div>

                                <h6 className="fw-semibold mb-0 mt-3">
                                  Add Event Images (Optional)
                                </h6>
                                <div className="col-md-12 mt-2">
                                  <DropzoneComponent
                                    onFilesSelected={handleFilesSelected}
                                  />
                                </div>
                              </div>
                        
                            
                              <div>
                                <DateTimePicker
                                  eventDate={eventDate}
                                  eventStartTime={eventStartTime}
                                  eventEndTime={eventEndTime}
                                  handleDateChange={(e) =>{
                                    setErrors({...errors, eventDate: ""});
                                    setEventDate(e.target.value)
                                  }
                                  }
                                  handleStartTimeChange={(e) => {
                                    setErrors({...errors, eventStartTime: ""});
                                    setEventStartTime(e.target.value)
                                  }
                                  }
                                  handleEndTimeChange={(e) => {
                                    setErrors({...errors, eventEndTime: ""});
                                    setEventEndTime(e.target.value)
                                  }
                                  }
                                  errors={errors}
                                />
                              </div>
                        
                          
                              <LocationForm
                                selectedOption={selectedOption}
                                address={address}
                                ticketPrice={ticketPrice}
                                handleOptionClick={handleOptionClick}
                                handleAddressChange={(e) => {
                                  setErrors({...errors, eventAddress: ""});
                                  setAddress(e.target.value)}
                                }
                                handleTicketChange={(e) => {
                                  setErrors({...errors, eventTicket: ""});
                                  setTicketPrice(e.target.value)}
                                } 
                              />
                        
                          </div>
                          <div className="buttons">
                            <button
                              onClick={handleSubmit}
                              style={{backgroundColor: "#FF9A00"}}
                            >
                              {"Submit"}
                            </button>
                            <button
                              onClick={() => navigate("/events")}
                             
                            >
                              Back
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
        </div>
    </>
  );
};
