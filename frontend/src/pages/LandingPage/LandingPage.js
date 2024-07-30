import "./LandingPage.css"
import SearchBar from '../../components/SearchBar/SearchBar';
import SortPicker from '../../components/SortPicker/SortPicker';
import EventCard from '../../components/EventCard/EventCard';
import React, { useState, useContext, useEffect } from 'react';
import { EventContext } from '../../context/EventContext';
import ReactLoading from "react-loading";

const Dashboard = () => {
    const { events } = useContext(EventContext);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [searchTitle, setSearchTitle] = useState('');
    const [searchDate, setSearchDate] = useState(null);
    const [sortType, setSortType] = useState('Recent Date first');

    useEffect(() => {
        setFilteredEvents(events);
    }, [events]);

    const handleSearch = () => {
        const filtered = events.filter(event => {
            const matchesTitle = event.title.toLowerCase().includes(searchTitle.toLowerCase());
            const matchesDate = searchDate ? new Date(event.date).toDateString() === searchDate.toDateString() : true;
            return matchesTitle && matchesDate;
        });
        setFilteredEvents(filtered);
    };

    const handleSortChange = (sortOption) => {
        setSortType(sortOption);
        sortEvents(sortOption);
    };

    const sortEvents = (sortOption) => {
        let sortedEvents;
        if (sortOption === 'Recent Date first') {
            sortedEvents = [...events].sort((a, b) => new Date(b.date) - new Date(a.date));
        }
        else if (sortOption === 'Oldest Date first') {
            sortedEvents = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));
        }
        else if (sortOption === 'Lowest price first') {
            sortedEvents = [...events].sort((a, b) => a.price - b.price);
        }
        else if (sortOption === 'Highest price first') {
            sortedEvents = [...events].sort((a, b) => b.price - a.price);
        }
        setFilteredEvents(sortedEvents);
    };

    return (
        <div>
            <SearchBar
                searchTitle={searchTitle}
                setSearchTitle={setSearchTitle}
                searchDate={searchDate}
                setSearchDate={setSearchDate}
                onSearch={handleSearch}
            />
            <div className='event-wrapper'>
                <div className='event-sort'>
                    <SortPicker selectedOption={sortType} onSortChange={handleSortChange} />
                </div>
                <div className='event-container'>
                    {
                        filteredEvents ?
                            (
                                filteredEvents.map(event => (<EventCard key={event.id} event={event} />))
                            )
                            : <ReactLoading type="spin" color="#fff" />
                    }

                </div>

            </div>

        </div>
    );
};

export default Dashboard;