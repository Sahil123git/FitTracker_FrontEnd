import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Drawer,
  Avatar,
  Typography,
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
  Button,
  Fab,
} from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import HeightIcon from "@mui/icons-material/Height";
import ScaleIcon from "@mui/icons-material/Scale";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import WcIcon from "@mui/icons-material/Wc";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import HelpIcon from "@mui/icons-material/Help";
import UploadDrawer from "./UploadDrawer";
import EditProfileDrawer from "./EditProfileDrawer";
import BmiModal from "../modals/BmiModal";

const getBMI = (weight, heightFeet, heightInch) => {
  const heightInMeters = heightFeet * 0.3048 + heightInch * 0.0254; //conversion to meter
  const bmi = weight / heightInMeters ** 2;
  return bmi;
};
const getBMIFeedback = (bmi) => {
  if (bmi < 18.5)
    return {
      category: "Underweight",
      message: "Consider a balanced diet to help with weight gain.",
      goal: "Focus on strength training and a calorie-surplus diet.",
      type: "error",
    };
  if (bmi >= 18.5 && bmi < 25)
    return {
      category: "Normal Weight",
      message: "Maintain your healthy lifestyle!",
      goal: "Focus on consistency and fitness maintenance.",
      type: "success",
    };
  if (bmi >= 25 && bmi < 30)
    return {
      category: "Overweight",
      message: "Add cardio and strength training for weight management.",
      goal: "Aim for a calorie-deficit diet and consistent exercise.",
      type: "warning",
    };
  return {
    category: "Obesity",
    message: "Consult a healthcare provider for personalized guidance.",
    goal: "Focus on gradual weight loss through lifestyle changes.",
    type: "error",
  };
};

const ProfileDrawer = ({ toggleDrawer }) => {
  const { currentUser, extra } = useSelector((state) => state.user);
  const [resourceOpen, setResourceOpen] = useState(false);
  const [profileDrawer, setProfileDrawer] = useState(false);
  const [bmiModal, setBmiModal] = useState(false);
  const bmi = getBMI(
    currentUser.weight,
    currentUser.height.heightFeet,
    currentUser.height.heightInch
  );
  const openModal = () => {
    setBmiModal(true);
  };
  const { message, goal, type } = getBMIFeedback(bmi);

  return (
    <>
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
      <Box sx={{ padding: 3 }}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          textAlign="center"
          mb={2}
        >
          <Box position="relative" display="inline-block">
            <Avatar
              src={currentUser?.img}
              alt={currentUser?.name}
              sx={{
                width: 120,
                height: 120,
                mb: 2,
                border: "2px solid #1976d2",
                boxShadow: 6,
              }}
            />
            <IconButton
              aria-label="edit"
              size="small"
              sx={{
                position: "absolute",
                top: 5,
                right: 5,
                backgroundColor: "rgba(255,255,255,0.8)",
              }}
              onClick={() => setResourceOpen(true)}
            >
              <EditIcon fontSize="5px" />
            </IconButton>
          </Box>
          <Typography variant="h6" fontWeight="bold">
            {currentUser.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Fitness Goal:{" "}
            {currentUser.fitnessGoal === "weightGain"
              ? "Weight Gain"
              : "Weight Loss"}
          </Typography>
        </Box>
        <Divider sx={{ mb: 1 }} />
        <Box sx={{ position: "relative" }}>
          <Button
            variant="contained"
            sx={{
              position: "absolute",
              right: "0",
              zIndex: "5",
              padding: "0px",
              fontSize: "12px",
              minWidth: "52px",
            }}
            onClick={() => setProfileDrawer(true)}
          >
            Edit
          </Button>
          <List>
            <ListItem>
              <ListItemIcon>
                <AccessibilityNewIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Age"
                secondary={`${currentUser.age} years`}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <WcIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Gender" secondary={currentUser.gender} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <ScaleIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Weight"
                secondary={`${currentUser.weight} kg`}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <HeightIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Height"
                secondary={`${currentUser.height.heightFeet} feet ${currentUser.height.heightInch} inches`}
              />
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <FitnessCenterIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="BMI" secondary={bmi.toFixed(1)} />
              <IconButton
                aria-label="edit"
                size="small"
                onClick={() => openModal(true)}
                sx={{
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: "-2px",
                    left: "-2px",
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    border: "2px dashed #1976d2",
                    animation: "rotate 5s linear infinite",
                    zIndex: -1,
                  },
                }}
              >
                <HelpIcon fontSize="5px" color="primary" />
              </IconButton>
            </ListItem>
          </List>
        </Box>
        <Box mt={3} textAlign="center">
          <Alert variant="filled" severity={type} sx={{ textAlign: "left" }}>
            {message}
          </Alert>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ marginTop: "10px" }}
          >
            {goal}
          </Typography>
        </Box>
        <BmiModal setBmiModal={setBmiModal} bmiModal={bmiModal} />
        <Drawer
          anchor="right"
          open={resourceOpen}
          onClose={() => setResourceOpen(false)}
        >
          <UploadDrawer setResourceOpen={setResourceOpen} avatarUpload={true} />
        </Drawer>
        <Drawer
          anchor="right"
          open={profileDrawer}
          onClose={() => setResourceOpen(false)}
        >
          <EditProfileDrawer
            currentUser={currentUser}
            setProfileDrawer={setProfileDrawer}
            extra={extra}
          />
        </Drawer>
      </Box>
    </>
  );
};
export default ProfileDrawer;
