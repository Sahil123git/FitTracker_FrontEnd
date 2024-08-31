import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import AddWorkout from "../AddWorkout";
import { fetchData } from "../../redux/reducers/userSlice";
import { todayWorkoutApi } from "../../apiPath";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: "14px",
  boxShadow: 24,
};

const EditModal = ({ open, setOpen, workout }) => {
  const { loading, extra } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(workout);
  useEffect(() => {
    if (extra?.keyName === "todayWorkoutData") {
      handleClose();
    }
  }, [extra]);
  const handleClose = () => {
    setOpen(false);
    setFormData(workout);
  };
  const updateWorkout = async () => {
    dispatch(
      fetchData({
        keyName: "todayWorkoutData",
        data: workout,
        url: todayWorkoutApi,
        method: "put",
        toastSuccess: true,
        toastError: true,
      })
    );
  };
  const handleChange = (type, value) => {
    setFormData({ ...formData, [type]: value });
  };

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
          buttonLoading={loading}
          isEdit={true}
        />
      </Box>
    </Modal>
  );
};

export default EditModal;
