import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
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
                <p onClick={() => navigate("/event-history")}>Event History</p>

                <p><button className='login-register-button' onClick={() => navigate("/login")}>Login</button> </p>
            </div>
            <div className="navbar-menu-icon" onClick={toggleMenu}>
                <MenuIcon fontSize="large" style={{ color: "#FF9A00" }} />
            </div>
            {
                isMenuOpen && (
                    <div className="navbar-dropdown">
                        <Link to="/login" onClick={toggleMenu}>Events</Link>
                        <Link to="/faq" onClick={toggleMenu}>FAQ</Link>
                        <Link to="/contact" onClick={toggleMenu}>Contact</Link>
                        <Link to="/login" onClick={toggleMenu}>Login</Link>
                    </div>
                )
            }
        </nav >
    );
};

export default NavBar;
