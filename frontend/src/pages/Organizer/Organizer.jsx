import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import EventCard from '../../components/EventCard/EventCard';
import "./Organizer.css"

const Organizer = () => {
    const { id } = useParams();
    const [organizer, setOrganizer] = useState();
    const [rating, setRating] = useState(2);
    const [isFollowing, setIsFollowing] = useState(false);
    const [events, setEvents] = useState([]);
    const [, setLoading] = useState(true);

    const filteredArray = events?.filter(item => item.organizerId === id);


    useEffect(() => {
      const fetchEvents = async () => {
          try {
              const response = await fetch('https://event-aura-yt4akn7xpq-uc.a.run.app/api/events/');
              console.log(response);
              if (response.status === 200) {
                  const data = await response.json();
                  setEvents(data);
              }
          } catch (error) {
              console.error('Error fetching events:', error);
          } finally {
              setLoading(false);
          }
      };
      fetchEvents();
  }, []);

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const response = await axios.post(`http://localhost:8080/api/isfollowing`, { id: localStorage.getItem("userId"), organizerId: "66ac17806eae0514764532ae" });
                if (response && response.data.success) {
                    setIsFollowing(response.data.message === "true");
                }
            } catch (error) {
                console.error("There was an error fetching the organizer follow status!", error);
            }
        };
        fetchStatus();
    }, [id]);

    const getOrganizerFollowStatus = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/api/isfollowing`, { id: localStorage.getItem("userId"), organizerId: "66ac17806eae0514764532ae" });
            if (response && response.data) {
                if (response.data.message === "true") {
                    await axios.post(`http://localhost:8080/api/unfollow`, { id: localStorage.getItem("userId"), organizerId: "66ac17806eae0514764532ae" });
                    setIsFollowing(false);
                } else {
                    await axios.post(`http://localhost:8080/api/follow`, { id: localStorage.getItem("userId"), organizerId: "66ac17806eae0514764532ae" });
                    setIsFollowing(true);
                }
            }
        } catch (error) {
            console.error("There was an error updating the follow status!", error);
        }
    };

    const onClickFollow = () => {
        getOrganizerFollowStatus();
    };

    useEffect(() => {
        const fetchOrganizerDetails = async (organizerId) => {
            try {
                const response = await axios.get(`https://event-aura-yt4akn7xpq-uc.a.run.app/api/users/${organizerId}`);
                if (response.status === 200) {
                    setOrganizer(response.data);
                }
            } catch (error) {
                console.error("There was an error fetching the organizer details!", error);
            }
        };

        fetchOrganizerDetails(id);
    }, [id]);

    return (
        <>
            <div className="text-center mb-5">
                <div className="mb-3">
                    <img src={organizer?.imageurl} alt="Profile" className="rounded-circle" />
                </div>
                <h2>{organizer?.firstname} {organizer?.lastname}</h2>
                <p>{organizer?.no_of_followers} Followers | 50 Following</p>
                <div>
                    <div className="rating">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                className={rating >= star ? 'star filled' : 'star'}
                                onClick={() => setRating(star)}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                </div>
                <button className="btn btn-primary mt-2" onClick={onClickFollow}>
                    {isFollowing ? "Following" : "Follow"}
                </button>
            </div>
            <div className='event-wrapper'>
            <div className='event-container'>
            {
                        filteredArray?.length > 0 ?
                            (
                              filteredArray.map(event => (<EventCard key={event.id} event={event} />))
                            )
                            : <div>No events found</div>
                    }
                    </div>
                    </div>
        </>
    );
};

export default Organizer;
