/**
 * Authors : Kabilesh Ravi Chandran
 */

import React from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const CancelBookingModal = ({ open, handleClose, handleConfirm }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Confirm Cancellation
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Are you sure you want to cancel this booking?
        </Typography>
        <Button onClick={handleConfirm} variant="contained" color="primary" sx={{ mt: 2, backgroundColor: '#FF9A00' }}>
          Confirm
        </Button>
        <Button onClick={handleClose} variant="outlined" color="secondary" sx={{ mt: 2, ml: 2, border: '1px solid #FF9A00', color: '#FF9A00' }}>
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

export default CancelBookingModal;
