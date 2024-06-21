import "./LandingPage.css"
import SearchBar from '../../components/SearchBar/SearchBar';
import SortPicker from '../../components/SortPicker/SortPicker';
import EventCard from '../../components/EventCard/EventCard';
import React, { useState } from 'react';

const Dashboard = () => {
    const [events, setEvents] = useState(getSampleData());
    const [searchTitle, setSearchTitle] = useState('');
    const [searchDate, setSearchDate] = useState(null);
    const [sortType, setSortType] = useState('Recent Date first');


    const handleSearch = () => {
        const filteredEvents = getSampleData().filter(event => {
            const matchesTitle = event.title.toLowerCase().includes(searchTitle.toLowerCase());
            const matchesDate = searchDate ? new Date(event.date).toDateString() === searchDate.toDateString() : true;
            return matchesTitle && matchesDate;
        });
        setEvents(filteredEvents);
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
        setEvents(sortedEvents);
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
                    {events.map(event => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>

            </div>

        </div>
    );
};

export default Dashboard;


const getSampleData = () => {
    return [
        {
            id: 1,
            title: "Tech Innovators Conference 2024",
            image: "https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_640.jpg",
            date: "1/12/2025",
            time: "12:49 pm",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            price: 900
        },
        {
            id: 2,
            title: "Annual Health and Wellness Expo",
            image: "https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_640.jpg",
            date: "11/11/2024",
            time: "12:49 pm",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            price: 300
        },
        {
            id: 3,
            title: "International Culinary Festival",
            image: "https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_640.jpg",
            date: "08/06/2024",
            time: "12:49 pm",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            price: 100
        },
        {
            id: 4,
            title: "Global Fintech Forum",
            image: "https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_640.jpg",
            date: "06/30/2024",
            time: "12:49 pm",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            price: 400
        },
        {
            id: 5,
            title: "Food Truck Rally",
            image: "https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_640.jpg",
            date: "08/30/2024",
            time: "12:49 pm",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            price: 300
        },
        {
            id: 6,
            title: "Art & Craft Fair",
            image: "https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_640.jpg",
            date: "12/02/2024",
            time: "12:49 pm",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            price: 400
        },
        {
            id: 7,
            title: "Startup Pitch Night",
            image: "https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_640.jpg",
            date: "11/23/2024",
            time: "12:49 pm",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            price: 500
        },
        {
            id: 8,
            title: "Fashion Week Showcase",
            image: "https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_640.jpg",
            date: "08/12/2024",
            time: "12:49 pm",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            price: 1000
        },
        {
            id: 9,
            title: "Charity Gala Dinner",
            image: "https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_640.jpg",
            date: "10/20/2024",
            time: "12:49 pm",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            price: 200
        },
    ];
};