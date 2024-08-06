/**
 * Author : Nikita Davies
 */
import React, { useState } from "react";
import axios from "axios";
import "./styles.css";
import Stepper from "../../components/Stepper/Stepper";
import DropzoneComponent from "../../components/ImageUpload/DropzoneComponent";
import DateTimePicker from "../../components/DateTimePicker/DateTimePicker";
import LocationForm from "../../components/LocationForm/LocationForm";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const CreateEventPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [eventDate, setEventDate] = useState("");
  const [eventStartTime, setEventStartTime] = useState("");
  const [eventEndTime, setEventEndTime] = useState("");
  const [errors, setErrors] = useState({});

  const [selectedOption, setSelectedOption] = useState("Venue");
  const [eventType] = useState("Single");
  const [address, setAddress] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");

  const navigate = useNavigate();

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

  const handleNext = (e) => {
    e.preventDefault();
    const validationErrors = validateStep(currentStep);
    if (Object.keys(validationErrors).length === 0) {
      setCurrentStep((prevStep) => prevStep + 1);
    } else {
      setErrors(validationErrors);
    }
  };

  const validateStep = (step) => {
    const today = new Date().toISOString().split("T")[0];
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
  const handleBack = (e) => {
    e.preventDefault();
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
  };
  const formData = new FormData();
  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.append(
      "event",
      new Blob(
        [
          JSON.stringify({
            title: eventName,
            description: eventDescription,
            date: eventDate,
            startTime: eventStartTime,
            endTime: eventEndTime,
            location: address,
            price: ticketPrice,
            eventType: eventType,
            locationType: selectedOption,
            organizerId: localStorage.getItem("userId"),
          }),
        ],
        {
          type: "application/json",
        }
      )
    );
    if (files.length > 0) {
      files.forEach((file) => {
        formData.append("images", file);
      });
    } else {
      formData.append("images", null);
    }

    try {
      await axios.post(`https://event-aura-yt4akn7xpq-uc.a.run.app/api/events`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      await axios.post(`https://event-aura-yt4akn7xpq-uc.a.run.app/api/notifications`, { organizerId: localStorage.getItem("userId"), eventTitle: eventName, eventDescription: eventDescription });
      navigate("/events");
      toast.success("Event created successfully!!");
    } catch (error) {
      toast.error("An error occurred!!");
      console.log(error);
    }
  };

  return (
    <>
      <div
        style={{
          backdropFilter: "blur(5px)",
          backgroundColor: "#1A2529",
          height: "100vh",
        }}
      >
        <div class="cont">
          <div className="card border-0 shadow-sm p-4">
            <div className="card-body">
              <form className="row g-3">
                <h4 class="fw-bold">Create Event</h4>
                <p style={{ margin: "0px" }}>
                  Please fill the following details about your event
                </p>

                <Stepper
                  currentStep={currentStep}
                  handleNext={handleNext}
                  handleBack={handleBack}
                  steps={steps}
                />
                <div className="content">
                  {currentStep === 0 && (
                    <div>
                      <div>
                        <label className="form-label fw-semibold mt-2">
                          Event Name <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className={`form-control mt-1 ${
                            errors.eventName ? "border-danger" : ""
                          }`}
                          value={eventName}
                          onChange={(e) => {
                            setErrors({ ...errors, eventName: "" });
                            setEventName(e.target.value);
                          }}
                        />
                        {errors.eventName && (
                          <div className="text-danger mt-1">
                            {errors.eventName}
                          </div>
                        )}
                      </div>

                      <h6 className="fw-semibold mb-0 mt-3">
                        About your Event <span className="text-danger">*</span>
                      </h6>
                      <div>
                        <input
                          type="textarea"
                          className={`form-control mt-1 ${
                            errors.eventDescription ? "border-danger" : ""
                          }`}
                          value={eventDescription}
                          onChange={(e) => {
                            setErrors({ ...errors, eventDescription: "" });
                            setEventDescription(e.target.value);
                          }}
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
                  )}
                  {currentStep === 1 && (
                    <div>
                      <DateTimePicker
                        eventDate={eventDate}
                        eventType={eventType}
                        eventStartTime={eventStartTime}
                        eventEndTime={eventEndTime}
                        handleDateChange={(e) => {
                          setErrors({ ...errors, eventDate: "" });
                          setEventDate(e.target.value);
                        }}
                        handleStartTimeChange={(e) => {
                          setErrors({ ...errors, eventStartTime: "" });
                          setEventStartTime(e.target.value);
                        }}
                        handleEndTimeChange={(e) => {
                          setErrors({ ...errors, eventEndTime: "" });
                          setEventEndTime(e.target.value);
                        }}
                        errors={errors}
                      />
                    </div>
                  )}
                  {currentStep === 2 && (
                    <LocationForm
                      selectedOption={selectedOption}
                      address={address}
                      ticketPrice={ticketPrice}
                      handleOptionClick={handleOptionClick}
                      handleAddressChange={(e) => {
                        setErrors({ ...errors, eventAddress: "" });
                        setAddress(e.target.value);
                      }}
                      handleTicketChange={(e) => {
                        setErrors({ ...errors, eventTicket: "" });
                        setTicketPrice(e.target.value);
                      }}
                    />
                  )}
                </div>
                <div className="buttons">
                  <button
                    onClick={currentStep === 2 ? handleSubmit : handleNext}
                    style={{ backgroundColor: "#FF9A00" }}
                  >
                    {currentStep === 2 ? "Submit" : "Next"}
                  </button>
                  <button onClick={handleBack} disabled={currentStep === 0}>
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
