import React, { useEffect, useState } from "react";
import EventSlider from "../../components/EventSlider";
import { Tab, Tabs } from "@mui/material";
import { events, tabs } from "./constants";
import './style.scss';
import { cancelOrder, getAllEvents, getAllOrders } from "./apiUtils";

const EventHistory = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [createdEvents, setCreatedEvents] = useState([]);
  const [bookedEvents, setBookedEvents] = useState([]);
  
  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const onCancelBooking = (orderId) => {
    cancelOrder(orderId)
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
    
    if(!createdEvents.length) {
      getEvents();
      getOrders();
    }
  }, []);

  return (
    <div className="event-history">
      <button className='event-history-button'>Create Event</button>
      <Tabs TabIndicatorProps={{style: {background:'#FF9A00'}}} className="event-history-tabs" centered value={selectedTab} onChange={handleChange}>
        {tabs.map((tab) => <Tab className="event-history-tabs-item" label={tab.name} key={tab.id} />)}
      </Tabs>
      {createdEvents?.length && selectedTab === 0 ? <EventSlider events={createdEvents} className="event-history-slider" /> : null}
      {bookedEvents?.length && selectedTab === 1 ? <EventSlider events={bookedEvents?.map((bookedEvent) => ({...bookedEvent?.event, onCancelBooking: () => onCancelBooking(bookedEvent?.id)}))} className="event-history-slider" /> : null}
    </div>
  )
};

export default EventHistory;
