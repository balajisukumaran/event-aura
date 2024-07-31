import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";

const ConfirmationDialog = ({ open, event, onClose, onConfirm, action }) => {
  const [comments, setComments] = useState("");

  const handleConfirm = () => {
    onConfirm(event.id, comments);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{action} Event</DialogTitle>
      <DialogContent>
        <TextField
          label="Event Details"
          value={`${event.title}\n${event.description}\n${event.location}\n${event.date}\n${event.startTime} - ${event.endTime}\n$${event.price}`}
          multiline
          fullWidth
          margin="normal"
          InputProps={{ readOnly: true }}
        />
        <TextField
          label="Comments"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          multiline
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleConfirm} color="primary">
          OK
        </Button>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
