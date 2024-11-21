import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../redux/reducers/userSlice";
import { blogApi } from "../../apiPath";
const ModalContent = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const [reaction, setReaction] = useState({ likes: false, dislikes: false });
  const { blogData } = useSelector((state) => state.user);
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
    if (blogData) {
      setReaction({
        likes: blogData.data?.userLike,
        dislikes: blogData.data?.userDislike,
      });
    }
  }, [blogData]);
  console.log({ blogData });
  useEffect(() => {
    if (open) getParticularBlog();
  }, [open]);
  const handleClose = () => {
    setOpen(null);
  };
  const userReaction = (type, value) => {
    console.log(reaction);
    const data = {
      ...blogData.data,
      prevLike: blogData.data?.userLike,
      prevDislike: blogData.data?.userDislike,
      userLike: type === "like" ? value : reaction.likes,
      userDislike: type === "dislike" ? value : reaction.dislikes,
      blogId: blogData.data._id,
    };
    console.log({ data });
    dispatch(
      fetchData({
        keyName: "blogData",
        url: `${blogApi}/likeDislike`,
        data,
        method: "put",
        toastSuccess: true,
        toastError: true,
      })
    );
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "16px",
          overflow: "hidden",
        },
      }}
    >
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          bgcolor: "primary.main",
          color: "primary.contrastText",
        }}
      >
        <Typography variant="h5" component="div" fontWeight="bold">
          {blogData?.data.heading}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "primary.contrastText",
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ p: 4 }}>
        {blogData?.data &&
          blogData?.data.content.map((item, index) => (
            <Box key={index} mb={4}>
              <Typography
                variant="h6"
                gutterBottom
                color="primary"
                fontWeight="bold"
              >
                {item.subHeading}
              </Typography>
              {item.text ? (
                <Typography variant="body1">{item.text}</Typography>
              ) : item.textWithImage ? (
                <Box
                  display="flex"
                  flexDirection={{ xs: "column", md: "row" }}
                  gap={2}
                >
                  <Box flexGrow={1}>
                    <Typography variant="body1">
                      {item.textWithImage.text}
                    </Typography>
                  </Box>
                  <Box
                    component="img"
                    src={item.textWithImage.image}
                    alt={item.subHeading}
                    sx={{
                      width: "250px",
                      borderRadius: "8px",
                      boxShadow: 3,
                    }}
                  />
                </Box>
              ) : null}
            </Box>
          ))}
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", p: 2 }}>
        <Button
          startIcon={<ThumbUpIcon />}
          variant={reaction?.likes ? "contained" : "outlined"}
          color="primary"
          aria-label="Like"
          onClick={() => userReaction("like", !reaction.likes)}
        >
          Like {blogData?.data.likes}
        </Button>
        <Button
          startIcon={<ThumbDownIcon />}
          variant={reaction?.likes ? "contained" : "outlined"}
          color="secondary"
          aria-label="Dislike"
          onClick={() => userReaction("dislike", !reaction.dislikes)}
        >
          Dislike {blogData?.data.dislikes}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ModalContent;
