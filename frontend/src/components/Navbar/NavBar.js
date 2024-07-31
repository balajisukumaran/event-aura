import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import UserDropdown from '../UserDropdown/UserDropdown';

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [, setIsLoggedIn] = React.useState(false);
    const navigate = useNavigate();
    const token = localStorage?.getItem("token");

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    useEffect(() => {
        setIsLoggedIn(localStorage.getItem("token") ? true : false);
    }, [setIsLoggedIn]);

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/" className="navbar-brand-link">Event Aura</Link>
            </div>
            <div className="navbar-links">
                <p onClick={() => navigate("/event-history")}>Events</p>
                <p onClick={() => navigate("/faq")}>FAQs</p>
                <p onClick={() => navigate("/contact")}>Contact Us</p>

                {
                    !token ?
                        (
                            <p>
                                <button className='login-register-button' onClick={() => navigate("/login")}>
                                    Login
                                </button>
                            </p>
                        )
                        : <UserDropdown handleLogout={handleLogout} />
                }
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
                        {!token ? (<Link to="/login" onClick={toggleMenu}>Login</Link>) : <UserDropdown />}

                    </div>
                )
            }
        </nav >
    );
};

export default NavBar;
