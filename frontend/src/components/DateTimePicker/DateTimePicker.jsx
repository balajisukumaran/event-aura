/**
 * Author : Nikita Davies
 */
import React from 'react';
import { useState } from 'react';
import "./DateTimePicker.css";

const DateTimePicker = ({eventDate, eventStartTime, eventEndTime, handleDateChange, handleStartTimeChange, handleEndTimeChange, errors }) => {
    const [isSingleEvent, setIsSingleEvent] = useState(true);

    return (
        <>
            <form>
                <div>
                    <div className="form-group">
                        <label className="form-label fw-semibold mt-2">Date</label>
                            <input type="date"  className={`form-control mt-1 ${errors.eventDate ? 'border-danger' : ''}`} id="date" value={eventDate} onChange={handleDateChange}/>
                            {errors.eventDate && (
                                    <div className="text-danger mt-1">
                                      {errors.eventDate}
                                    </div>
                                  )}
                    </div>
                     <div className="btn-group mt-4 mb-3" role="group">
                <button
                    type="button"
                    className={`btn ${isSingleEvent ? 'btn-primary' : 'btn-outline-secondary'}`}
                    onClick={() => setIsSingleEvent(true)}
                >
                    Single event
                </button>
                <button
                    type="button"
                    className={`btn ${!isSingleEvent ? 'btn-primary' : 'btn-outline-secondary'}`}
                    onClick={() => setIsSingleEvent(false)}
                >
                    Recurring event
                </button>
            </div>
            <div className="col-md-12 mt-2">
                                  <hr className="text-muted mb-0" />
                                </div>
                    <div className='row mt-2'>
                    <div className="form-group col-md-5">
                        <label className="form-label fw-semibold mt-2">Start time</label>
                        <div className="time-picker-container">
                            <input type="time"  className={`form-control mt-1 ${errors.eventStartTime ? 'border-danger' : ''}`}  id="start-time" value={eventStartTime} onChange={handleStartTimeChange}/>
                            {errors.eventStartTime && (
                                    <div className="text-danger mt-1">
                                      {errors.eventStartTime}
                                    </div>
                                  )}
                    </div>
                    </div>
                    <div className="form-group col-md-5">
                        <label className="form-label fw-semibold mt-2">End time</label>
                            <input type="time" className={`form-control mt-1 ${errors.eventEndTime ? 'border-danger' : ''}`} id="end-time" value={eventEndTime} onChange={handleEndTimeChange} />
                            {errors.eventEndTime && (
                                    <div className="text-danger mt-1">
                                      {errors.eventEndTime}
                                    </div>
                                  )}
                    </div>
                    </div>
                </div>
               </form>
        </>
    );
};

export default DateTimePicker;
