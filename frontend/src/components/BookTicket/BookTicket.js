import { useState } from 'react';
import ReactLoading from "react-loading";
import Divider from '@mui/material/Divider';
import "./BookTicket.css";

export default function BookTicket({ event, onSubmit }) {
    const [numTickets, setNumTickets] = useState(1);
    const handleChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value)) {
            setNumTickets(value);
        }
    };

    function handleSubmit(e) {
        e.preventDefault();

        onSubmit(numTickets, event.price * numTickets);
    }

    return <div>
        {
            event ? <div style={{ border: "1px solid orange", margin: "1%", padding: "3%", color: "white", borderRadius: "10px" }}>
                <h5 style={{ textAlign: "left" }}> {event.title}</h5>
                <p style={{ textAlign: "left" }} >{event.location}</p>
                <div style={{ textAlign: "left", flexDirection: 'row', display: "flex" }} >
                    <div style={{ padding: "1%", border: "1px solid orange", width: "50%" }}>
                        <h6 style={{ color: 'orange', fontSize: "11px" }}>Date</h6>
                        <p >{event.date}</p>
                    </div>
                    <div style={{ padding: "1%", border: "1px solid orange", width: "50%" }}>
                        <h6 style={{ color: 'orange', fontSize: "11px" }}>Time</h6>
                        <p>{event.time}</p>
                    </div>
                </div>
                <div style={{ justifyContent: 'space-between', display: "flex", alignItems: 'center', textAlign: "left" }}>
                    <div>
                        <p style={{ margin: "10% 0", color: "orange", whiteSpace: "nowrap", fontSize: "11px" }}>Individual Ticket</p>
                        <p>{event.price} CAD</p>
                    </div>
                    <div>
                        <input
                            type="number"
                            value={numTickets}
                            onChange={handleChange}
                            min="1"
                            className="custom-number-input"
                        />
                    </div>
                </div>
                <Divider style={{ borderColor: 'orange', color: "#1A2529" }} component="li" />
                <div style={{ justifyContent: 'space-between', display: "flex", alignItems: "center" }}>
                    <div style={{ textAlign: 'left' }}>
                        <p style={{ margin: "10% 0", color: "orange", fontSize: "11px" }}> Total </p>
                        <p>{event.price * numTickets} CAD </p>
                    </div>
                    <div>
                        <button style={{ backgroundColor: 'orange', border: "none", height: "40px", width: "100px", borderRadius: "5px" }} onClick={handleSubmit}>Continue</button>
                    </div>
                </div>
            </div>
                : <ReactLoading type="spin" color="#fff" />
        }
    </div >;
}
