import React, { useEffect, useState } from "react";
import EventSlider from "../../components/EventSlider";
import { Tab, Tabs } from "@mui/material";
import { events, tabs } from "./constants";
import './style.scss';
import { getAllEvents } from "./apiUtils";

const EventHistory = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  
  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  useEffect(() => {
    getAllEvents("66a7d5b555572a2845f307f4");
  }, []);

  return (
    <div className="event-history">
      <button className='event-history-button'>Create Event</button>
      <Tabs TabIndicatorProps={{style: {background:'#FF9A00'}}} className="event-history-tabs" centered value={selectedTab} onChange={handleChange}>
        {tabs.map((tab) => <Tab className="event-history-tabs-item" label={tab.name} key={tab.id} />)}
      </Tabs>
      <EventSlider events={events} className="event-history-slider" />
    </div>
  )
};

export default EventHistory;
