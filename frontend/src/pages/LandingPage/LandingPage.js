import React from 'react';
import "./LandingPage.css"
import SearchBar from '../../components/SearchBar/SearchBar';
import SortPicker from '../../components/SortPicker/SortPicker';
import EventCard from '../../components/EventCard/EventCard';

const Dashboard = () => {
    const events = getSampleData();

    return (
        <div>
            <SearchBar />
            <div className='event-wrapper'>
                <div className='event-sort'><SortPicker /></div>
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
            title: "Event 1 Event 1 Event 1 Event 1 Event 1 ",
            image: "https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_640.jpg",
            date: "11/12/2029",
            time: "12:49",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        },
        {
            id: 2,
            title: "Event 2",
            image: "https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_640.jpg",
            date: "11/12/2029",
            time: "12:49",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        },
        {
            id: 3,
            title: "Event 3",
            image: "https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_640.jpg",
            date: "11/12/2029",
            time: "12:49",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        },
        {
            id: 4,
            title: "Event 4",
            image: "https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_640.jpg",
            date: "11/12/2029",
            time: "12:49",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        },
        {
            id: 5,
            title: "Event 5",
            image: "https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_640.jpg",
            date: "11/12/2029",
            time: "12:49",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        },
        {
            id: 6,
            title: "Event 6",
            image: "https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_640.jpg",
            date: "11/12/2029",
            time: "12:49",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        },
        {
            id: 7,
            title: "Event 7",
            image: "https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_640.jpg",
            date: "11/12/2029",
            time: "12:49",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        },
        {
            id: 8,
            title: "Event 8",
            image: "https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_640.jpg",
            date: "11/12/2029",
            time: "12:49",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        },
        {
            id: 9,
            title: "Event 9",
            image: "https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_640.jpg",
            date: "11/12/2029",
            time: "12:49",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        },
    ];
};