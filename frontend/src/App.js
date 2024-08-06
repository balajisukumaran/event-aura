import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./components/Navbar/NavBar";
import { EventProvider } from "./context/EventContext";
import MainRoute from "./router/routes";
import { ToastContainer } from "react-toastify";
import { AuthorizationContextProvider } from "./context/AuthorizationContext";
import { ChatContextProvider } from "./context/chatContext";

function App() {
  const [navKey, setNavKey] = useState(0);

  const refreshNavBar = () => {
    setNavKey(new Date().getTime());
  };

  return (
    <AuthorizationContextProvider>
      <ChatContextProvider>
        <EventProvider>
          <Router>
            <NavBar key={navKey} />
            <ToastContainer />
            <div className="App">
              <div className="dashboard">
                <MainRoute refreshNavBar={refreshNavBar} />
              </div>
            </div>
          </Router>
        </EventProvider>
      </ChatContextProvider>
    </AuthorizationContextProvider>
  );
}

export default App;
