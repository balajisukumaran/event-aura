import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/Navbar/NavBar';
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
