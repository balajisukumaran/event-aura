import { Navigate, Route, Routes } from "react-router-dom";
import React from "react";
import routes from "./routesInfo";

const MainRoute = ({ refreshNavBar }) => {
  return (
    <Routes>
      {routes?.map((route) => (
        <Route
          key={route?.id}
          path={route?.route}
          element={
            route?.id === "login"
              ? React.cloneElement(route?.component, { refreshNavBar })
              : route?.component
          }
        />
      ))}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default MainRoute;
