import { useState } from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import { Avatar, Typography } from "@mui/material";
import UploadDrawer from "./UploadDrawer";
import ClearIcon from "@mui/icons-material/Clear";

const ProfileDrawer = ({ toggleDrawer }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [resourceOpen, setResourceOpen] = useState(false);

  return (
    <Box sx={{ minWidth: resourceOpen ? 500 : 350 }} role="presentation">
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
        onClick={() => toggleDrawer(false)}
      >
        <ClearIcon />
      </Fab>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <Avatar
          alt={currentUser.name}
          src="/static/images/avatar/1.jpg"
          sx={{ width: 135, height: 135 }}
        ></Avatar>
        <Fab
          color="primary"
          aria-label="edit"
          sx={{
            position: "absolute",
            right: "115px",
            top: "15px",
            height: "35px",
            width: "35px",
          }}
          onClick={() => setResourceOpen((prev) => !prev)}
        >
          <EditIcon />
        </Fab>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Name: {currentUser.name}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Email: {currentUser.email}
        </Typography>
      </Box>
      <Drawer
        anchor="right"
        open={resourceOpen}
        onClose={() => setResourceOpen(false)}
      >
        <UploadDrawer
          resourceOpen={resourceOpen}
          setResourceOpen={setResourceOpen}
        />
      </Drawer>
    </Box>
  );
};
export default ProfileDrawer;
