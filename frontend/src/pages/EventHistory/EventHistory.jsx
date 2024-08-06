import React, { useEffect, useState } from "react";
import EventSlider from "../../components/EventSlider";
import { Tab, Tabs } from "@mui/material";
import { tabs } from "./constants";
import './style.scss';
import { cancelOrder, getAllEvents, getAllOrders } from "./apiUtils";
import { useNavigate } from "react-router-dom";

const EventHistory = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [createdEvents, setCreatedEvents] = useState([]);
  const [bookedEvents, setBookedEvents] = useState([]);
  const navigate = useNavigate();
  
  const handleChange = (_, newValue) => {
    setSelectedTab(newValue);
  };

  const onCancelBooking = (orderId) => {
    cancelOrder(orderId);
  };

  useEffect(() => {
    const getEvents = async() => {
      const response = await getAllEvents();
      setCreatedEvents(response);
    };

    const getOrders = async() => {
      const response = await getAllOrders();
      setBookedEvents(response);
    };
    getEvents();
    getOrders();
  }, []);

  return (
    <div className="event-history">
      <button className='event-history-button' onClick={() => navigate("/create-event")}>Create Event</button>
      <Tabs TabIndicatorProps={{style: {background:'#FF9A00'}}} className="event-history-tabs" centered value={selectedTab} onChange={handleChange}>
        {tabs.map((tab) => <Tab className="event-history-tabs-item" label={tab.name} key={tab.id} />)}
      </Tabs>
      {selectedTab === 0 && (createdEvents?.length ? <EventSlider events={createdEvents?.map((createdEvent) => ({ ...createdEvent, onCardClick: () => navigate(`/view-event/${createdEvent?.id}`) }))} className="event-history-slider" /> : <div className="event-history-placeholder">You didn't create any events</div>) }
      {selectedTab === 1 && ( bookedEvents?.length ? <EventSlider events={bookedEvents?.map((bookedEvent) => ({...bookedEvent?.event,  onCardClick: () => navigate(`/events/${bookedEvent?.event?.id}`), onCancelBooking: () => onCancelBooking(bookedEvent?.id)}))} className="event-history-slider" /> : <div className="event-history-placeholder">You didn't book any events</div>) }
    </div>
  )
};

export default EventHistory;
