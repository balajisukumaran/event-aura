
import React from 'react';

const LocationForm = ({selectedOption, handleOptionClick, address, ticketPrice, handleAddressChange, handleTicketChange}) => {
  return (
    <div className="mt-3">
      <h5 className="mb-3">Location</h5>
      <div className="mb-3 d-flex">
        <button
          type="button"
          className={`btn ${selectedOption === "Venue" ? "btn-primary" : "btn-light"} me-2`}
          onClick={() => handleOptionClick("Venue")}
        >
          Venue
        </button>
        <button
          type="button"
          className={`btn ${selectedOption === "Online event" ? "btn-primary" : "btn-light"} me-2`}
          onClick={() => handleOptionClick("Online event")}
        >
          Online event
        </button>
        <button
          type="button"
          className={`btn ${selectedOption === "To be announced" ? "btn-primary" : "btn-light"}`}
          onClick={() => handleOptionClick("To be announced")}
        >
          To be announced
        </button>
      </div>
      <div className="mb-3">
        <label htmlFor="location" className="form-label fw-semibold">
          Address
        </label>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            id="location"
            placeholder="Address"
            aria-describedby="inputGroupPrepend"
            value={address}
            onChange={handleAddressChange}
            disabled={selectedOption === "Online event" || selectedOption === "To be announced"}
          />
        </div>
        <div className="mt-3">
          <h6 className="fw-semibold">Ticket Price (Optional) </h6>
          <input
            type="text"
            className="form-control"
            placeholder="Ticket Price"
            value={ticketPrice}
            onChange={handleTicketChange}
          />
        </div>
      </div>
    </div>
  );
};


export default LocationForm;
