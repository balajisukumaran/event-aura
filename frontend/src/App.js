import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import NavBar from './components/Navbar/NavBar';
import ContactUs from './pages/ContactUs/ContactUs';
import FAQ from './pages/FAQ/FAQ';
import Login from './pages/Login/Login';
import { EventProvider } from './context/EventContext';
import MainRoute from './router/routes';


function App() {
  return (
    <Router>
      <NavBar />
      <div className="App">
        <div className="dashboard">
          <MainRoute />
        </div>
      </div>
    </Router>
  );
}

export default App;
