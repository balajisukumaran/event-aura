import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Approvals/Sidebar";
import EventDetails from "../../components/Approvals/EventDetails";
import { get } from "../../services/utils";
import "bootstrap/dist/css/bootstrap.min.css";

const Approvals = () => {
  const [events, setEvents] = useState([]);
  const [selectedEventIndex, setSelectedEventIndex] = useState(null);

  const fetchEvents = async () => {
    try {
      const data = await get("/events/", {});
      const unapprovedEvents = data.filter((event) => event.approved === null);
      setEvents(unapprovedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSelectEvent = (eventId) => {
    const index = events.findIndex((event) => event.id === eventId);
    setSelectedEventIndex(index);
  };

  const handleNavigate = (direction) => {
    if (direction === "prev" && selectedEventIndex > 0) {
      setSelectedEventIndex(selectedEventIndex - 1);
    } else if (direction === "next" && selectedEventIndex < events.length - 1) {
      setSelectedEventIndex(selectedEventIndex + 1);
    }
  };

  const selectedEvent = events[selectedEventIndex];

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <Sidebar events={events} onSelectEvent={handleSelectEvent} />
        </div>
        <div className="col-md-9">
          <EventDetails
            event={selectedEvent}
            onNavigate={handleNavigate}
            onEventUpdate={fetchEvents}
          />
        </div>
      </div>
    </div>
  );
};

export default Approvals;
