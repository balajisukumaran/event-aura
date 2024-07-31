import React from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import "./Sidebar.css"; // Import the CSS file

const Sidebar = ({ events, onSelectEvent }) => {
  return (
    <div className="sidebar">
      <Typography variant="h5" className="mt-3 ml-2 text-light">
        Pending Approvals
      </Typography>
      <List className="sidebar-list">
        {events.map((event) => (
          <ListItem
            button
            key={event.id}
            onClick={() => onSelectEvent(event.id)}
            className="sidebar-list-item text-light"
          >
            <ListItemText primary={event.title} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Sidebar;
