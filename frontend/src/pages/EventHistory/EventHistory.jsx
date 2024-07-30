import React, { useEffect, useState } from "react";
import EventSlider from "../../components/EventSlider";
import { Tab, Tabs } from "@mui/material";
import { events, tabs } from "./constants";
import './style.scss';
import { getAllEvents } from "./apiUtils";

const EventHistory = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [createdEvents, setCreatedEvents] = useState([]);
  
  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  useEffect(() => {
    const getEvents = async() => {
      const response = await getAllEvents();
      setCreatedEvents(response);
    };
    
    if(!createdEvents.length) {
      getEvents();
    }
  }, []);

  return (
    <div className="event-history">
      <button className='event-history-button'>Create Event</button>
      <Tabs TabIndicatorProps={{style: {background:'#FF9A00'}}} className="event-history-tabs" centered value={selectedTab} onChange={handleChange}>
        {tabs.map((tab) => <Tab className="event-history-tabs-item" label={tab.name} key={tab.id} />)}
      </Tabs>
      {createdEvents?.length ? <EventSlider events={createdEvents} className="event-history-slider" /> : null}
    </div>
  )
};

export default EventHistory;
