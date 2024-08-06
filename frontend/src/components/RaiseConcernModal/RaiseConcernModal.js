/**
 * Authors : Kabilesh Ravi Chandran
 */

import React, { useState } from "react";
import { Box, Button, Modal, Typography, TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const RaiseConcernModal = ({ open, handleClose, handleSubmit }) => {
  const [concern, setConcern] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(concern);
    setConcern("");
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} onClick={(e) => e.stopPropagation()}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Raise a Concern
        </Typography>
        <form onSubmit={onSubmit}>
          <TextField
            fullWidth
            id="outlined-multiline-static"
            label="Describe your issue"
            multiline
            rows={4}
            value={concern}
            onChange={(e) => setConcern(e.target.value)}
            sx={{ mt: 2 }}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2, backgroundColor: "#FF9A00" }}
          >
            Submit
          </Button>
          <Button
            onClick={handleClose}
            variant="outlined"
            color="secondary"
            sx={{ mt: 2, ml: 2, border: "1px solid #FF9A00", color: "#FF9A00" }}
          >
            Cancel
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default RaiseConcernModal;
