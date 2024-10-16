import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { blogApi } from "../../apiPath";
import { fetchData } from "../../redux/reducers/userSlice";
import { Box, Button, Typography, IconButton } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

const Blogs = () => {
  const dispatch = useDispatch();
  const { blogsData } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  console.log({ blog: blogsData?.data });
  const getTodaysWorkout = async () => {
    setLoading(true);
    dispatch(
      fetchData({
        keyName: "blogsData",
        url: blogApi,
        method: "get",
        toastSuccess: false,
        toastError: true,
      })
    );
    setLoading(false);
  };
  useEffect(() => {
    if (blogsData === null) getTodaysWorkout();
  }, []);
  return (
    <Box sx={{ padding: "0 40px 0 40px", marginTop: "40px" }}>
      {blogsData?.data?.map((ele) => (
        <Box
          className="blogBox"
          sx={{
            border: "2px solid #b5b5bc",
            borderRadius: "5px",
            marginBottom: "20px",
            padding: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#f9f9f9",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box>
            <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
              {ele.heading}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginRight: "20px",
              }}
            >
              <ThumbUpIcon color="primary" />

              <Typography variant="body2" sx={{ marginLeft: "5px" }}>
                {ele.likes}
              </Typography>
            </Box>

            {/* Dislike Button */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginRight: "20px",
              }}
            >
              <ThumbDownIcon color="error" />

              <Typography variant="body2" sx={{ marginLeft: "5px" }}>
                {ele.dislikes}
              </Typography>
            </Box>

            {/* View Button */}
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#007bff",
                color: "#fff",
                borderRadius: "8px",
                padding: "5px 15px",
                "&:hover": { backgroundColor: "#0056b3" },
              }}
            >
              View
            </Button>
          </Box>
        </Box>
      ))}
    </Box>
  );
};
export default Blogs;
