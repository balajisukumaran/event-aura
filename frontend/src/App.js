import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./components/Navbar/NavBar";
import { EventProvider } from "./context/EventContext";
import MainRoute from "./router/routes";

function App() {
  const [navKey, setNavKey] = useState(0);

  const refreshNavBar = () => {
    setNavKey(new Date().getTime());
  };

  return (
    <EventProvider>
      <Router>
        <NavBar key={navKey} />
        <div className="App">
          <div className="dashboard">
            <MainRoute refreshNavBar={refreshNavBar} />
          </div>
        </div>
      </Router>
    </EventProvider>
  );
}

export default App;
