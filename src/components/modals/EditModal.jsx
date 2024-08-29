import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import AddWorkout from "../AddWorkout";
import { editWorkout } from "../../api";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: "14px",
  boxShadow: 24,
};

const EditModal = ({ open, setOpen, workout, getTodaysWorkout }) => {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [formData, setFormData] = useState(workout);
  const handleClose = () => setOpen(false);
  const updateWorkout = async () => {
    setButtonLoading(true);
    const token = localStorage.getItem("fittrack-app-token");
    await editWorkout(token, { ...formData, _id: workout._id })
      .then((res) => {
        getTodaysWorkout();
        handleClose();
        setButtonLoading(false);
      })
      .catch((err) => {
        alert(err);
      });
  };
  const handleChange = (type, value) =>
    setFormData({ ...workout, [type]: value });
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <AddWorkout
          workout={formData}
          handleChange={handleChange}
          addNewWorkout={updateWorkout}
          buttonLoading={buttonLoading}
          isEdit={true}
        />
      </Box>
    </Modal>
  );
};

export default EditModal;
