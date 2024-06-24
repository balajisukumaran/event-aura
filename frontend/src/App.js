import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import NavBar from './components/NavBar/NavBar';
import ContactUs from './pages/ContactUs/ContactUs';
import FAQ from './pages/FAQ/FAQ';
import Login from './pages/Login/Login';


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
            <Route path='/contact' element={<ContactUs />} />
            <Route path='/faq' element={<FAQ />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
