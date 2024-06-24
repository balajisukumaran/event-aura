import "../../App.css";
import "./ContactUs.css";
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useCallback, useState } from "react";

export default function ContactUs() {
    const [messageUs, setMessageUs] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [errors, setErrors] = useState({});

    const validate = () => {
        const validationErrors = {};
        if (!messageUs.name) validationErrors.name = "false";
        if (!messageUs.email) validationErrors.email = "false";
        if (!validateEmail(messageUs.email)) validationErrors.email = "false";
        if (!messageUs.message) validationErrors.message = "false";
        return validationErrors;
    };

    const validateEmail = (email) => {
        // Basic email validation using regex
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleInputChange = (field, value) => {
        // Update state for input change and remove error border
        setMessageUs({ ...messageUs, [field]: value });
        setErrors({ ...errors, [field]: false });
    };

    const handleSubmit = useCallback(() => {
        const validationErrors = validate();
        console.log(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            toast.success("Message has been sent!");
            // Reset the form
            setMessageUs({
                name: "",
                email: "",
                message: "",
            });
        } else {
            toast.error("Please fill in all fields.");
            setErrors(validationErrors);
            console.log(errors);
        }
    }, [messageUs, errors]);

    return (
        <div className="App">
            <div className="App-header">
                <div className="contact-container">
                    <div className="container-top">
                        <div className="message-box">
                            <h2>Message Us!</h2>
                            <div className="input-box">
                                <div className="input-field">
                                    <label>Name</label>
                                    <input
                                        id="name"
                                        type="text"
                                        value={messageUs.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        style={{ border: errors.name ? "1px solid red" : 'initial', borderColor: errors.name ? 'red' : 'initial' }}
                                    />
                                </div>
                                <div className="input-field">
                                    <label>Email</label>
                                    <input
                                        id="email"
                                        type="text"
                                        value={messageUs.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        style={{ border: errors.email ? "1px solid red" : 'initial', borderColor: errors.email ? 'red' : 'initial' }}
                                    />
                                </div>
                                <div className="input-field">
                                    <label>Message</label>
                                    <input
                                        id="message"
                                        type="text"
                                        value={messageUs.message}
                                        onChange={(e) => handleInputChange('message', e.target.value)}
                                        style={{ border: errors.message ? "1px solid red" : 'initial', borderColor: errors.message ? 'red' : 'initial' }}
                                    />
                                </div>
                            </div>

                            <div>
                                <button onClick={handleSubmit}>Contact Us</button>
                            </div>
                        </div>
                    </div>
                    <div className="container-bottom">
                        <div className="info-card">
                            <div>
                                <PhoneRoundedIcon style={{ fontSize: "60px" }} />
                                <h6>
                                    Call: 902-494-2211
                                </h6>
                            </div>
                        </div>
                        <div className="info-card">
                            <div>
                                <LocalPostOfficeIcon style={{ fontSize: "60px" }} />
                                <h6>
                                    Email: admissions@dal.ca
                                </h6>

                            </div>
                        </div>
                        <div className="info-card">
                            <div>
                                <HomeRoundedIcon style={{ fontSize: "60px" }} />
                                <h6>
                                    6299 South St, Halifax, NS B3H 4R2
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />

        </div >

    );
}
