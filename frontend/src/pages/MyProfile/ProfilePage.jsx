/**
 * Author: Merin Mary Saju
 */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Grid,
  TextField,
  Button,
  IconButton,
  Snackbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Visibility, VisibilityOff, CameraAlt } from "@mui/icons-material";
import "./ProfilePage.css";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("personalInformation");
  const [profile, setProfile] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phone: "",
    status: "active",
    imageurl: "",
  });
  // TO DO: Change user id
  const userId = localStorage.getItem("userId");
  const [editedProfile, setEditedProfile] = useState({ ...profile });
  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [actionType, setActionType] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://event-aura-yt4akn7xpq-uc.a.run.app/api/users/${userId}`
        );
        const userData = response.data;
        setProfile(userData);
        setEditedProfile(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleOptionClick = (option) => setSelectedOption(option);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const validateFields = () => {
    const newErrors = {};
    if (!editedProfile.firstname)
      newErrors.firstname = "First Name is required";
    if (!editedProfile.lastname) newErrors.lastname = "Last Name is required";
    if (!editedProfile.email || !/\S+@\S+\.\S+/.test(editedProfile.email))
      newErrors.email = "Valid Email is required";
    if (!editedProfile.phone) newErrors.phone = "Phone Number is required";
    if (!editedProfile.password || editedProfile.password === "********")
      newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSave = async () => {
    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length === 0) {
      try {
        await axios.put(
          `https://event-aura-yt4akn7xpq-uc.a.run.app/api/users/${userId}`,
          editedProfile
        );
        setProfile(editedProfile);
        setErrors({});
        setSnackbarMessage("Profile saved successfully!");
        setSnackbarOpen(true);
        navigate(0);
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    uploadImage(file); // Call the upload function immediately after selection
  };

  const uploadImage = async (file) => {
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result.split(",")[1]; // Get base64 string
      try {
        const uploadResponse = await axios.post(
          "https://ksqj45fgb6.execute-api.us-east-1.amazonaws.com/prod/s3upload",
          { image: base64Image }
        );
        const uploadedImageUrl = uploadResponse.data.s3_url;

        await axios.put(`https://event-aura-yt4akn7xpq-uc.a.run.app/api/users/${userId}`, {
          ...profile,
          imageurl: uploadedImageUrl,
        });
        setErrors({});
        setSnackbarMessage("Profile image uploaded and saved successfully!");
        setSnackbarOpen(true);
        navigate(0);
      } catch (error) {
        console.error("Image upload or update failed:", error);
      }
    };
    reader.readAsDataURL(file); // Correctly read file as Data URL
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevVisible) => !prevVisible);
  };

  const handleDialogOpen = (action) => {
    setActionType(action);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleConfirmAction = async () => {
    try {
      if (actionType === "disable") {
        await axios.put(`https://event-aura-yt4akn7xpq-uc.a.run.app/api/users/${userId}/disable`);
        setSnackbarMessage("Account temporarily disabled.");
        setTimeout(() => {
          navigate("/"); // Navigate after 20 seconds
        }, 5000);
      } else if (actionType === "delete") {
        await axios.delete(`https://event-aura-yt4akn7xpq-uc.a.run.app/api/users/${userId}`);
        setSnackbarMessage("Account permanently deleted.");
        setTimeout(() => {
          navigate("/"); // Navigate after 20 seconds
        }, 5000);
      }
      setSnackbarOpen(true);
      handleDialogClose();
    } catch (error) {
      console.error("Error performing action:", error);
    }
  };

  return (
    <div className="profile-page">
      <Box className="profile-container">
        <Grid container>
          <Grid
            item
            xs={12}
            md={4}
            className="profile-options"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <div className="profile-header">
              <div className="profile-avatar-container">
                <Avatar
                  alt={profile.firstname}
                  src={editedProfile.imageurl}
                  className="profile-avatar"
                />
                <label htmlFor="file-upload" className="camera-icon">
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                  <CameraAlt />
                </label>
              </div>
              <Typography variant="h6" className="profile-name">
                <strong>
                  {profile.firstname} {profile.lastname}
                </strong>
              </Typography>
            </div>
            <div className="profile-options-list">
              <List component="nav">
                <ListItem
                  button
                  selected={selectedOption === "personalInformation"}
                  onClick={() => handleOptionClick("personalInformation")}
                  className={
                    selectedOption === "personalInformation"
                      ? "selected-option"
                      : ""
                  }
                >
                  <ListItemText primary="Personal Information" />
                </ListItem>
                <ListItem
                  button
                  selected={selectedOption === "accountSettings"}
                  onClick={() => handleOptionClick("accountSettings")}
                  className={
                    selectedOption === "accountSettings"
                      ? "selected-option"
                      : ""
                  }
                >
                  <ListItemText primary="Account Settings" />
                </ListItem>
              </List>
            </div>
          </Grid>
          <Grid item xs={12} md={8} className="profile-content">
            {selectedOption === "personalInformation" && (
              <>
                <Typography
                  variant="h6"
                  gutterBottom
                  className="black-text-important"
                >
                  Personal Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="First Name"
                      name="firstname"
                      value={editedProfile.firstname}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                      error={!!errors.firstname}
                      helperText={errors.firstname}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Last Name"
                      name="lastname"
                      value={editedProfile.lastname}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                      error={!!errors.lastname}
                      helperText={errors.lastname}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Email"
                      name="email"
                      value={editedProfile.email}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                      error={!!errors.email}
                      helperText={errors.email}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Phone Number"
                      name="phone"
                      value={editedProfile.phone}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                      error={!!errors.phone}
                      helperText={errors.phone}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Password"
                      name="password"
                      type={passwordVisible ? "text" : "password"}
                      value={editedProfile.password}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                      error={!!errors.password}
                      helperText={errors.password}
                      InputProps={{
                        endAdornment: (
                          <IconButton
                            edge="end"
                            onClick={togglePasswordVisibility}
                            aria-label={
                              passwordVisible
                                ? "Hide password"
                                : "Show password"
                            }
                          >
                            {passwordVisible ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} className="profile-actions">
                    <Button
                      variant="contained"
                      className="save-button"
                      onClick={handleSave}
                    >
                      Save
                    </Button>
                  </Grid>
                </Grid>
              </>
            )}
            {selectedOption === "accountSettings" && (
              <>
                <Typography
                  variant="h6"
                  gutterBottom
                  className="black-text-important"
                >
                  Account Settings
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} className="profile-actions">
                    <Button
                      variant="contained"
                      className="orange-button"
                      onClick={() => handleDialogOpen("disable")}
                    >
                      Temporarily Disable Account
                    </Button>
                    <Button
                      variant="contained"
                      className="red-button"
                      onClick={() => handleDialogOpen("delete")}
                    >
                      Permanently Delete Account
                    </Button>
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      </Box>

      {/* Snackbar for Notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />

      {/* Confirmation Dialog */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to{" "}
            {actionType === "disable"
              ? "temporarily disable"
              : "permanently delete"}{" "}
            your account?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmAction} color="secondary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProfilePage;
