import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import NavBar from './components/Navbar/NavBar';
import ContactUs from './pages/ContactUs/ContactUs';
import FAQ from './pages/FAQ/FAQ';
import Login from './components/Authentication/Login';
import Signup from './components/Authentication/Signup';
import ResetPassword from './components/Authentication/ResetPassword';
// import Login from './pages/Login/Login';
import MainRoute from './router/routes';

function App() {
  return (
    <Router>
      <NavBar />
      <div className="App">
        <div className="dashboard">
          {/*<Routes>*/}
          {/*  <Route path='/' element={<LandingPage />} />*/}
          {/*  <Route path='/contact' element={<ContactUs />} />*/}
          {/*  <Route path='/faq' element={<FAQ />} />*/}
          {/*  <Route path='/login' element={<Login />} />*/}
          {/*  <Route path='/signup' element={<Signup />} />*/}
          {/*  <Route path='/resetPassword' element={<ResetPassword />} />*/}
          {/*  <Route path='/resetPassword' element={<ResetPassword />} />*/}
          {/*</Routes>*/}
          <MainRoute />
        </div>
      </div>
    </Router>
  );
}

export default App;
