import React, { createContext, useState, useEffect } from 'react';
const EventContext = createContext();

const EventProvider = ({ children }) => {
    const [events, setEvents] = useState([]);

    // Fetch events from an API or any other source
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                // const response = await fetch('/api/events'); // Replace with your API endpoint
                // const data = await response.json();
                const data = getSampleData();
                setEvents(data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    return (
        <EventContext.Provider value={{ events, setEvents }}>
            {children}
        </EventContext.Provider>
    );
};

export { EventContext, EventProvider };


const getSampleData = () => {
    return [
        {
            id: 1,
            title: "Tech Innovators Conference 2024",
            images: ["https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg?auto=compress&cs=tinysrgb&w=600", "https://images.pexels.com/photos/16408/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600", "https://images.pexels.com/photos/2253831/pexels-photo-2253831.jpeg?auto=compress&cs=tinysrgb&w=600", "https://images.pexels.com/photos/1243337/pexels-photo-1243337.jpeg?auto=compress&cs=tinysrgb&w=600"],
            date: "1/12/2025",
            time: "12:49 pm",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            price: 900,
            location: "Lorem Ipsum set",
            organizer: { "name": "Joseph Saint", "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_xO4UktfIe6YAE0bSQ1nbm8VJwY7gh5_NjA&s", "no_of_followers": 130, "desc": "Loren Ipsum set loh" },
            reviews: [
                {
                    description: "Amazing event! Learned a lot.",
                    date: "11/12/2023",
                    rating: 5,
                    username: "John Doe",
                    userimage: "https://randomuser.me/api/portraits/men/1.jpg"
                },
                {
                    description: "Good experience, but could be improved.",
                    date: "11/12/2023",
                    rating: 3,
                    username: "Jane Smith",
                    userimage: "https://randomuser.me/api/portraits/women/1.jpg"
                },
                {
                    description: "Not what I expected.",
                    date: "11/12/2023",
                    rating: 2,
                    username: "Alice Johnson",
                    userimage: "https://randomuser.me/api/portraits/women/2.jpg"
                }
            ]
        },
        {
            id: 2,
            title: "Annual Health and Wellness Expo",
            images: [],
            date: "11/11/2024",
            time: "12:49 pm",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            price: 300,
            location: "Lorem Ipsum set",
            organizer: { "name": "Joseph Saint", "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_xO4UktfIe6YAE0bSQ1nbm8VJwY7gh5_NjA&s", "no_of_followers": 130, "desc": "Loren Ipsum set loh" },
            reviews: [
                {
                    description: "Amazing event! Learned a lot.",
                    date: "11/12/2023",
                    rating: 5,
                    username: "John Doe",
                    userimage: "https://randomuser.me/api/portraits/men/1.jpg"
                },
                {
                    description: "Good experience, but could be improved.",
                    date: "11/12/2023",
                    rating: 3,
                    username: "Jane Smith",
                    userimage: "https://randomuser.me/api/portraits/women/1.jpg"
                },
                {
                    description: "Not what I expected.",
                    date: "11/12/2023",
                    rating: 2,
                    username: "Alice Johnson",
                    userimage: "https://randomuser.me/api/portraits/women/2.jpg"
                }
            ]
        },
        {
            id: 3,
            title: "International Culinary Festival",
            images: ["https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_640.jpg"],
            date: "08/06/2024",
            time: "12:49 pm",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            price: 100,
            location: "Lorem Ipsum set"
        },
        {
            id: 4,
            title: "Global Fintech Forum",
            images: ["https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_640.jpg"],
            date: "06/30/2024",
            time: "12:49 pm",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            price: 400,
            location: "Lorem Ipsum set"
        },
        {
            id: 5,
            title: "Food Truck Rally",
            images: ["https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_640.jpg"],
            date: "08/30/2024",
            time: "12:49 pm",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            price: 300,
            location: "Lorem Ipsum set"
        },
        {
            id: 6,
            title: "Art & Craft Fair",
            images: ["https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_640.jpg"],
            date: "12/02/2024",
            time: "12:49 pm",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            price: 400,
            location: "Lorem Ipsum set"
        },
        {
            id: 7,
            title: "Startup Pitch Night",
            images: ["https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_640.jpg"],
            date: "11/23/2024",
            time: "12:49 pm",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            price: 500,
            location: "Lorem Ipsum set"
        },
        {
            id: 8,
            title: "Fashion Week Showcase",
            images: ["https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_640.jpg"],
            date: "08/12/2024",
            time: "12:49 pm",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            price: 1000,
            location: "Lorem Ipsum set"
        },
        {
            id: 9,
            title: "Charity Gala Dinner",
            images: ["https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_640.jpg"],
            date: "10/20/2024",
            time: "12:49 pm",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            price: 200,
            location: "Lorem Ipsum set"
        },
    ];
};