import React, { useState } from "react";
import {
  Drawer,
  Typography,
  Box,
  Button,
  Avatar,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const DragDropImageUpload = ({ open, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  return (
    <Drawer
      anchor="right"
      open={true}
      onClose={() => {}}
      PaperProps={{ sx: { width: 320, padding: 3 } }}
    >
      <Typography variant="h6" fontWeight="bold" textAlign="center" mb={2}>
        Upload Your Profile Image
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 2,
          border: "2px dashed #1976d2",
          borderRadius: 2,
          backgroundColor: "#f0f0f0",
          cursor: "pointer",
          position: "relative",
          mb: 2,
        }}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => document.getElementById("file-input").click()}
      >
        {selectedImage ? (
          <>
            <Avatar
              src={selectedImage}
              alt="Selected"
              sx={{ width: 120, height: 120, mb: 2 }}
            />
            <IconButton
              size="small"
              onClick={handleRemoveImage}
              sx={{ position: "absolute", top: 5, right: 5 }}
            >
              <DeleteIcon color="error" />
            </IconButton>
          </>
        ) : (
          <Box textAlign="center" sx={{ color: "#9e9e9e" }}>
            <CloudUploadIcon fontSize="large" />
            <Typography>Drag & Drop or Click to Upload</Typography>
          </Box>
        )}
        <input
          type="file"
          accept="image/*"
          id="file-input"
          onChange={handleImageChange}
          hidden
        />
      </Box>

      <Button
        variant="contained"
        color="primary"
        sx={{ width: "100%" }}
        disabled={!selectedImage}
        onClick={() => alert("Image uploaded successfully!")}
      >
        Save Image
      </Button>
    </Drawer>
  );
};

export default DragDropImageUpload;
