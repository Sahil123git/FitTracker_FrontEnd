import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  Paper,
  Fab,
  InputAdornment,
} from "@mui/material";
import { useDispatch } from "react-redux";
import ClearIcon from "@mui/icons-material/Clear";
import { userApi } from "../../apiPath";
import { fetchData } from "../../redux/reducers/userSlice";

function EditProfileDrawer({ currentUser, setProfileDrawer, extra }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: currentUser.name,
    age: currentUser.age,
    gender: currentUser.gender,
    weight: currentUser.weight,
    heightFeet: currentUser.height.heightFeet,
    heightInch: currentUser.height.heightInch,
    fitnessGoal: currentUser.fitnessGoal,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    formData.height = {
      heightFeet: formData.heightFeet,
      heightInch: formData.heightInch,
    };

    dispatch(
      fetchData({
        keyName: "currentUser",
        data: formData,
        url: `${userApi}/${currentUser._id}`,
        method: "put",
        toastSuccess: true,
        toastError: true,
      })
    );
  };
  useEffect(() => {
    if (extra?.keyName === "currentUser") {
      toggleDrawer();
    }
  }, [extra]);
  const toggleDrawer = () => setProfileDrawer((val) => !val);

  return (
    <Container maxWidth="xs" sx={{ mt: 5 }}>
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
        onClick={toggleDrawer}
      >
        <ClearIcon />
      </Fab>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Edit Profile
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Age"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            inputProps={{ min: 0 }}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Gender</InputLabel>
            <Select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              label="Gender"
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Weights"
            name="weight"
            type="number"
            value={formData.weight}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            inputProps={{ min: 0, step: 0.1 }}
            InputProps={{
              endAdornment: <InputAdornment position="end">kg</InputAdornment>,
            }}
          />

          <Box display="flex" gap={2} alignItems="center">
            {/* TextField for Feet */}
            <TextField
              label="Feets"
              name="heightFeet"
              type="number"
              value={formData.heightFeet}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              inputProps={{ min: 0, step: 1 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">ft</InputAdornment>
                ),
              }}
            />

            {/* TextField for Inches */}
            <TextField
              label="Inches"
              name="heightInch"
              type="number"
              value={formData.heightInch}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              inputProps={{ min: 0, max: 11, step: 1 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">in</InputAdornment>
                ),
              }}
            />
          </Box>

          <FormControl fullWidth margin="normal">
            <InputLabel>Fitness Goal</InputLabel>
            <Select
              name="fitnessGoal"
              value={formData.fitnessGoal}
              onChange={handleChange}
              label="Fitness Goal"
            >
              <MenuItem value="weightGain">Weight Gain</MenuItem>
              <MenuItem value="weightLoss">Weight Loss</MenuItem>
            </Select>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, py: 1.5 }}
          >
            Save Changes
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default EditProfileDrawer;
