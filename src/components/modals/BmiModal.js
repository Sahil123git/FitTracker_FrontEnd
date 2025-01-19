import { Box, IconButton, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  maxWidth: "100%",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "10px",
};
const BmiModal = ({ setBmiModal, bmiModal }) => {
  const handleClose = () => {
    setBmiModal(false);
  };
  return (
    <Modal
      open={bmiModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <IconButton
          aria-label="check"
          className="icon"
          sx={{ mr: "5px", right: 0, position: "absolute" }}
          onClick={handleClose}
        >
          <CloseIcon className="checkIcon" />
        </IconButton>
        <Box sx={{ padding: 4 }}>
          <Typography
            id="modal-modal-title"
            variant="h4"
            component="h2"
            marginBottom="25px"
          >
            BMI Information
          </Typography>
          <img
            src="https://www.masinaheartinstitute.com/wp-content/uploads/2021/01/BMI-ArticleImage-min.jpg"
            width="100%"
          />
        </Box>
      </Box>
    </Modal>
  );
};
export default BmiModal;
