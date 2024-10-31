import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { blogApi } from "../../apiPath";
import { fetchData } from "../../redux/reducers/userSlice";
import { Box } from "@mui/material";
import ModalContent from "./ModalContent";
import BlogCard from "./BlogCard";
const Blogs = () => {
  const dispatch = useDispatch();
  const { blogsData } = useSelector((state) => state.user);
  const [open, setOpen] = useState(null);
  const [loading, setLoading] = useState(false);
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
  const openModal = (id) => setOpen(id);
  useEffect(() => {
    if (blogsData === null) getTodaysWorkout();
  }, []);
  return (
    <Box
      sx={{
        marginTop: "20px",
        overflow: "hidden",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "10px",
        marginBottom: "10px",
      }}
    >
      <Box
        sx={{
          width: "90%",
          margin: "auto",
          padding: "20px 30px 0 30px",
          height: "100%",
          overflow: "auto",
        }}
      >
        {blogsData?.data.length > 0 &&
          blogsData?.data?.map((blog) => (
            <BlogCard key={blog._id} blog={blog} openModal={openModal} />
          ))}
      </Box>

      <ModalContent open={open} setOpen={setOpen} />
    </Box>
  );
};
export default Blogs;
