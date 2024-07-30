import React, { useState } from "react";
import { TextField, Button, Typography, Grid } from "@mui/material";
import { put } from "../../services/utils";
import ConfirmationDialog from "./ConfirmationDialog";
import "bootstrap/dist/css/bootstrap.min.css";
import "./EventDetails.css";

const EventDetails = ({ event, onNavigate, onEventUpdate }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [action, setAction] = useState("");

  const handleOpenDialog = (actionType) => {
    setAction(actionType);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleConfirm = async (eventId, comments) => {
    const apiEndpoint = `/events/${eventId}/approve-reject`;
    try {
      const response = await put(apiEndpoint, {
        isApproved: action === "Approve",
        comments,
      });

      onEventUpdate(); // Refresh the event list
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!event) {
    return (
      <Typography variant="h6" className="text-light">
        Select an event to view details.
      </Typography>
    );
  }

  return (
    <div className="event-details">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5" className="mt-3 text-light">
            {event.title}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <form>
            <TextField
              label="Description"
              value={event.description}
              InputProps={{ readOnly: true }}
              fullWidth
              margin="normal"
              className="text-field"
            />
            <TextField
              label="Location"
              value={event.location}
              InputProps={{ readOnly: true }}
              fullWidth
              margin="normal"
              className="text-field"
            />
            <TextField
              label="Date"
              value={event.date}
              InputProps={{ readOnly: true }}
              fullWidth
              margin="normal"
              className="text-field"
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Start Time"
                  value={event.startTime}
                  InputProps={{ readOnly: true }}
                  fullWidth
                  margin="normal"
                  className="text-field"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="End Time"
                  value={event.endTime}
                  InputProps={{ readOnly: true }}
                  fullWidth
                  margin="normal"
                  className="text-field"
                />
              </Grid>
            </Grid>
            <TextField
              label="Price"
              value={`$${event.price}`}
              InputProps={{ readOnly: true }}
              fullWidth
              margin="normal"
              className="text-field"
            />
          </form>
        </Grid>
        <Grid
          item
          xs={6}
          className="d-flex justify-content-center align-items-center"
        >
          <img
            style={{ width: "500px" }}
            src={event.images[0]}
            alt={event.title}
            className="img-fluid event-image"
          />
        </Grid>
        <Grid item xs={12} className="d-flex justify-content-between mt-3">
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={() => onNavigate("prev")}
              style={{ marginRight: 10 }}
            >
              &lt;
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => onNavigate("next")}
              style={{ marginRight: 10 }}
            >
              &gt;
            </Button>
          </div>
          <div>
            <Button
              variant="contained"
              color="success"
              style={{ marginRight: 10 }}
              onClick={() => handleOpenDialog("Approve")}
            >
              Approve
            </Button>
            <Button
              variant="contained"
              color="error"
              style={{ marginRight: 10 }}
              onClick={() => handleOpenDialog("Reject")}
            >
              Reject
            </Button>
          </div>
        </Grid>
      </Grid>
      <ConfirmationDialog
        open={dialogOpen}
        event={event}
        onClose={handleCloseDialog}
        onConfirm={handleConfirm}
        action={action}
      />
    </div>
  );
};

export default EventDetails;
