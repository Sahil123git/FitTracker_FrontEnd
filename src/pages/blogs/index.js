import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import { blogApi } from "../../apiPath";
import { fetchData } from "../../redux/reducers/userSlice";
import ModalContent from "./ModalContent";
import BlogHeader from "./BlogHeader";
import BlogCard from "./BlogCard";

const limit = 3;

const Blogs = () => {
  const dispatch = useDispatch();
  const { blogsData } = useSelector((state) => state.user);
  const [open, setOpen] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getBlogData = () => {
    if (hasMore) {
      dispatch(
        fetchData({
          keyName: "blogsData",
          url: `${blogApi}?page=${page}&limit=${limit}`,
          method: "get",
          toastSuccess: false,
          toastError: true,
        })
      );
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      getBlogData(true); // Load next page
    }
  };

  const openModal = (id) => setOpen(id);

  useEffect(() => {
    if (blogsData === null) getBlogData();
  }, []);
  console.log({ hasMore });
  useEffect(() => {
    console.log(blogsData?.currentPage, blogsData?.totalPages);
    if (blogsData && blogsData?.currentPage === blogsData?.totalPages) {
      setHasMore(false);
    }
    if (blogsData) {
      setPage(blogsData.currentPage + 1);
    }
  }, [blogsData]);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, true);
    return () => window.removeEventListener("scroll", handleScroll, true); // Cleanup listener on unmount
  }, [blogsData]);

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
        <BlogHeader />
        {blogsData?.data.length > 0 &&
          blogsData?.data?.map((blog) => (
            <BlogCard key={blog._id} blog={blog} openModal={openModal} />
          ))}
        {loading && <p>Loading more blogs...</p>}
        {!hasMore && <p>No more blogs to load.</p>}
      </Box>

      <ModalContent open={open} setOpen={setOpen} getBlogData={getBlogData} />
    </Box>
  );
};

export default Blogs;
