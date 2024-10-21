import { useEffect } from "react";
import { Box, Typography, Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../redux/reducers/userSlice";
import { blogApi } from "../../apiPath";
const ModalContent = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const { blogData } = useSelector((state) => state.user);
  console.log({ blogData });
  const getParticularBlog = () => {
    dispatch(
      fetchData({
        keyName: "blogData",
        url: `${blogApi}/${open}`,
        method: "get",
        toastSuccess: false,
        toastError: true,
      })
    );
  };
  useEffect(() => {
    if (open) getParticularBlog();
  }, [open]);
  const handleClose = () => {
    setOpen(null);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {blogData.data.heading}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>
      </Box>
    </Modal>
  );
};
export default ModalContent;
