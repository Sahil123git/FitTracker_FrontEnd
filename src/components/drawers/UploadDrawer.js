import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Button,
  Avatar,
  IconButton,
  Fab,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import ClearIcon from "@mui/icons-material/Clear";
import { uploadApi, userApi } from "../../apiPath";
import { fetchData, updateStoreData } from "../../redux/reducers/userSlice";
const DragDropImageUpload = ({ setResourceOpen, avatarUpload }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const { loading, currentUser, resourceData } = useSelector(
    (state) => state.user
  );
  useEffect(() => {
    if (resourceData !== null) {
      setResourceOpen(false);
      const data = { ...currentUser, img: resourceData.imageUrl };
      dispatch(
        fetchData({
          keyName: "currentUser",
          data: data,
          url: `${userApi}/${currentUser._id}`,
          method: "put",
          toastSuccess: true,
          toastError: true,
        })
      );
    }
    return () =>
      dispatch(updateStoreData({ payload: null, meta: "resourceData" }));
  }, [resourceData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageUrl(URL.createObjectURL(file));
      setImage(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setImageUrl(URL.createObjectURL(file));
      setImage(file);
    }
  };

  const handleRemoveImage = () => {
    setImageUrl(null);
    setImage(null);
  };
  const uploadImage = () => {
    const formData = new FormData();
    formData.append("resource", image);
    dispatch(
      fetchData({
        keyName: "resourceData",
        data: formData,
        url: uploadApi,
        method: "post",
        toastSuccess: true,
        toastError: true,
      })
    );
  };
  return (
    <Box sx={{ maxWidth: 420, minWidth: 320, padding: 3 }}>
      <Typography variant="h6" fontWeight="bold" textAlign="center" mb={2}>
        Upload Your Image
      </Typography>
      <Fab
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          marginRight: "5px",
          marginTop: "5px",
          boxShadow: "none",
          backgroundColor: "transparent",
        }}
        size="small"
        color="black"
        aria-label="add"
        onClick={() => setResourceOpen(false)}
      >
        <ClearIcon />
      </Fab>
      {loading && (
        <Backdrop
          sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
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
        {imageUrl ? (
          <>
            {avatarUpload ? (
              <Avatar
                src={imageUrl}
                alt="User selected image"
                sx={{ width: 120, height: 120 }}
              />
            ) : (
              <img
                src={imageUrl}
                alt="User selected image"
                style={{ width: "100%" }}
              />
            )}
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveImage();
              }}
              sx={{
                position: "absolute",
                top: 5,
                right: 5,
                backgroundColor: "white",
                "&:hover": { backgroundColor: "white" },
              }}
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
        disabled={!imageUrl}
        onClick={uploadImage}
      >
        Upload Image
      </Button>
    </Box>
  );
};

export default DragDropImageUpload;
