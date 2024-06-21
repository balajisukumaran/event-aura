import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        setIsProfileOpen(false);
    };

    const toggleProfileMenu = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/" className="navbar-brand-link">Event Aura</Link>
            </div>
            <div className="navbar-links">
                <p onClick={() => navigate("/login")}>Events</p>
                <p onClick={() => navigate("/faq")}>FAQs</p>
                <p onClick={() => navigate("/contact")}>Contact Us</p>

                <p><button className='login-register-button' onClick={() => navigate("/login")}>Login</button> </p>
                {/* <div className="profile-icon" onClick={toggleProfileMenu}>
                    <AccountCircleTwoToneIcon fontSize="large" style={{ color: "#FF9A00" }} />
                    {isProfileOpen && (
                        <div className="profile-dropdown">
                            <Link to="/profile">Profile</Link>
                            <Link to="/settings">Settings</Link>
                            <Link to="/logout">Logout</Link>
                        </div>
                    )}
                </div> */}
            </div>
            <div className="navbar-menu-icon" onClick={toggleMenu}>
                <MenuIcon fontSize="large" style={{ color: "#FF9A00" }} />
            </div>
            {
                isMenuOpen && (
                    <div className="navbar-dropdown">
                        <Link to="/events" onClick={toggleMenu}>Events</Link>
                        <Link to="/faq" onClick={toggleMenu}>FAQ</Link>
                        <Link to="/contact" onClick={toggleMenu}>Contact</Link>
                        <Link to="/profile" onClick={toggleMenu}>Profile</Link>
                        <Link to="/settings" onClick={toggleMenu}>Settings</Link>
                        <Link to="/logout" onClick={toggleMenu}>Logout</Link>
                    </div>
                )
            }
        </nav >
    );
};

export default NavBar;
