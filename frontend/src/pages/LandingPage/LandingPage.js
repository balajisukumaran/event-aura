/**
 * Author : Sruthi Shaji
 */
import "./LandingPage.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import SortPicker from "../../components/SortPicker/SortPicker";
import EventCard from "../../components/EventCard/EventCard";
import React, { useState, useEffect, useCallback } from "react";
import ReactLoading from "react-loading";

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchDate, setSearchDate] = useState(null);
  const [sortType, setSortType] = useState("Recent Date first");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          "https://event-aura-yt4akn7xpq-uc.a.run.app/api/events/"
        );
        console.log(response);
        if (response.status === 200) {
          const data = await response.json();
          setEvents(data);
          setFilteredEvents(data);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);


  const handleSearch = useCallback(() => {
    const filtered = events.filter((event) => {
      const matchesTitle = event.title
        .toLowerCase()
        .includes(searchTitle.toLowerCase());
      const matchesDate = searchDate
        ? new Date(event.date).toDateString() === searchDate.toDateString()
        : true;
      return matchesTitle && matchesDate;
    });
    setFilteredEvents(filtered);
  }, [events, searchTitle, searchDate]);


  useEffect(() => {   
    handleSearch();
  }, [handleSearch]);

  const handleSortChange = (sortOption) => {
    setSortType(sortOption);
    sortEvents(sortOption);
  };

  const sortEvents = (sortOption) => {
    let sortedEvents;
    if (sortOption === "Recent Date first") {
      sortedEvents = [...events].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
    } else if (sortOption === "Oldest Date first") {
      sortedEvents = [...events].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
    } else if (sortOption === "Lowest price first") {
      sortedEvents = [...events].sort((a, b) => a.price - b.price);
    } else if (sortOption === "Highest price first") {
      sortedEvents = [...events].sort((a, b) => b.price - a.price);
    }
    setFilteredEvents(sortedEvents);
  };

  if (loading) {
    return <ReactLoading type="spin" color="#fff" />;
  }

  return (
    <div>
      <SearchBar
        searchTitle={searchTitle}
        setSearchTitle={setSearchTitle}
        searchDate={searchDate}
        setSearchDate={setSearchDate}
        onSearch={handleSearch}
      />
      <div className="event-wrapper">
        <div className="event-sort">
          <SortPicker
            selectedOption={sortType}
            onSortChange={handleSortChange}
          />
        </div>
        <div className="event-container">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))
          ) : (
            <div>No events found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
