import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import NavBar from './components/Navbar/NavBar';
import ContactUs from './pages/ContactUs/ContactUs';
import FAQ from './pages/FAQ/FAQ';
import Login from './pages/Login/Login';
import { CreateEventPage } from './pages/CreateEvent/CreateEventPage';


function App() {
  return (
    <Router>
      <NavBar />
      <div className="App">
        <div className="dashboard">
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/contact' element={<ContactUs />} />
            <Route path='/faq' element={<FAQ />} />
            <Route path='/login' element={<Login />} />
            <Route path='/create-event' element={<CreateEventPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
