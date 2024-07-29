import React, { createContext, useState, useEffect } from 'react';
const EventContext = createContext();

const EventProvider = ({ children }) => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/events/');
                console.log(response);
                if (response.status === 200) {
                    const data = await response.json();
                    setEvents(data);
                }

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