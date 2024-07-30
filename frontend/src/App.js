import './App.css';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from './components/Navbar/NavBar';
import { EventProvider } from './context/EventContext';
import MainRoute from './router/routes';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <EventProvider>
      <Router>
        <NavBar />
        <ToastContainer />
        <div className="App">
          <div className="dashboard">
            <MainRoute />
          </div>
        </div>
      </Router>
    </EventProvider>
  );
}

export default App;
