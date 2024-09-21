'use client';
import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  MenuItem,
  Badge,
  IconButton,
  Typography,
  Box
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const OwnerForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    nearbyColleges: [],
    roomType: "Single",
    totalRooms: "1",
    vacantSeats: "0",
    price: "0",
    latitude: "",
    longitude: "",
    images: []
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" && formData.nearbyColleges.length < 5) {
      e.preventDefault();
      const tagValue = e.target.value.trim();
      if (tagValue && !formData.nearbyColleges.includes(tagValue)) {
        setFormData(prev => ({
          ...prev,
          nearbyColleges: [...prev.nearbyColleges, tagValue],
        }));
        e.target.value = "";
      }
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      nearbyColleges: prev.nearbyColleges.filter(tag => tag !== tagToRemove),
    }));
  };

  const handleImageUpload = (e) => {
    setImageFiles([...imageFiles, ...Array.from(e.target.files)]);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString(),
          }));
        },
        (error) => {
          console.error("Error fetching location:", error);
          setError("Unable to fetch current location");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formPayload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach(v => formPayload.append(key, v));
        } else {
          formPayload.append(key, value);
        }
      });

      imageFiles.forEach((file) => {
        formPayload.append("images", file);
      });

      console.log("Submitting Form Data:", Array.from(formPayload.entries()));

      await axios.post(`http://localhost:3000/api/owner`, formPayload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert("Form submitted successfully!");
      setFormData({
        name: "",
        email: "",
        mobileNumber: "",
        nearbyColleges: [],
        roomType: "Single",
        totalRooms: "1",
        vacantSeats: "0",
        price: "0",
        latitude: "",
        longitude: "",
        images: []
      });
      setImageFiles([]);
    } catch (error) {
      console.error("Submission error:", error);
      setError("There was an error submitting the form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, py: 5 }}
    >
      <Typography variant="h5">Owner Form</Typography>

      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        required
        sx={{ width: "50%" }}
      />

      <TextField
        label="Mobile Number"
        name="mobileNumber"
        value={formData.mobileNumber}
        onChange={handleInputChange}
        required
        sx={{ width: "50%" }}
      />

      <TextField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleInputChange}
        required
        sx={{ width: "50%" }}
      />

      <TextField
        label="Nearby Colleges (press Enter to add)"
        name="nearbyCollegesInput"
        onKeyDown={handleTagKeyDown}
        sx={{ width: "50%" }}
      />
      <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
        {formData.nearbyColleges.map((tag) => (
          <Badge
            key={tag}
            badgeContent={
              <IconButton size="small" onClick={() => handleTagRemove(tag)}>
                <CloseIcon fontSize="small" />
              </IconButton>
            }
          >
            {tag}
          </Badge>
        ))}
      </Box>

      <TextField
        label="Room Type"
        name="roomType"
        select
        value={formData.roomType}
        onChange={handleInputChange}
        sx={{ width: "50%" }}
      >
        {["Single", "Double", "Triple", "Quad", "Suite"].map((type) => (
          <MenuItem key={type} value={type}>{type}</MenuItem>
        ))}
      </TextField>

      <TextField
        label="Total Rooms"
        name="totalRooms"
        type="number"
        value={formData.totalRooms}
        onChange={handleInputChange}
        required
        sx={{ width: "50%" }}
      />

      <TextField
        label="Vacant Seats"
        name="vacantSeats"
        type="number"
        value={formData.vacantSeats}
        onChange={handleInputChange}
        required
        sx={{ width: "50%" }}
      />

      <TextField
        label="Price"
        name="price"
        type="number"
        value={formData.price}
        onChange={handleInputChange}
        required
        sx={{ width: "50%" }}
        helperText="Price per month"
      />

      <TextField
        label="Latitude"
        name="latitude"
        type="number"
        value={formData.latitude}
        onChange={handleInputChange}
        sx={{ width: "50%" }}
        InputProps={{ readOnly: true }}
      />

      <TextField
        label="Longitude"
        name="longitude"
        type="number"
        value={formData.longitude}
        onChange={handleInputChange}
        sx={{ width: "50%" }}
        InputProps={{ readOnly: true }}
      />

      <Button variant="contained" onClick={getCurrentLocation} sx={{ width: "50%" }}>
        Use Current Location
      </Button>

      <Box sx={{ width: "50%", mt: 2 }}>
        <Button variant="contained" component="label" fullWidth>
          Upload Images
          <input
            type="file"
            hidden
            multiple
            onChange={handleImageUpload}
          />
        </Button>
        {imageFiles.length > 0 && (
          <Typography variant="body2" mt={1}>
            {imageFiles.length} files selected
          </Typography>
        )}
      </Box>

      {error && <Typography color="error">{error}</Typography>}

      <Button type="submit" variant="contained" color="primary" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </Button>
    </Box>
  );
};

export default OwnerForm;
