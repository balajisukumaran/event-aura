import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import NavBar from './components/Navbar/NavBar';
// import Events from './pages/Events';
// import FAQ from './pages/FAQ';
// import Contact from './pages/Contact';
// import Profile from './pages/Profile';
// import Dashboard from './pages/Dashboard';
// import EventPage from './pages/EventPage';
// import Logout from './pages/Logout';
// import Settings from './pages/Settings';
// import Login from './pages/Login';


function App() {
  return (
    // <div className="App">
    //   <header className="App-header">

    //   </header>
    // </div>
    <Router>
      <NavBar />
      <div className="App">
        <div className="dashboard">
          <Routes>
            <Route path='/' element={<LandingPage />} />
            {/* <Route path='/login' element={<Login />} />
                <Route path="/events" element={<Events />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/eventDetails" element={<EventPage />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
