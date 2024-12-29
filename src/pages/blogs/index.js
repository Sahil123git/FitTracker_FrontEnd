import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Box from "@mui/material/Box";
import { apiPath, blogApi } from "../../apiPath";
import { updateStoreData } from "../../redux/reducers/userSlice";
import ModalContent from "./ModalContent";
import BlogHeader from "./BlogHeader";
import BlogCard from "./BlogCard";

const LIMIT = 3;

const Blogs = () => {
  const dispatch = useDispatch();
  const { blogsData, loading } = useSelector((state) => state.user);
  const [open, setOpen] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const modifyData = (response) => {
    if (blogsData === null) {
      setPage(2);
      dispatch(updateStoreData({ payload: response.data, meta: "blogsData" }));
    } else {
      if (response.data.currentPage < response.data.totalPages) {
        setPage(response.data.currentPage + 1);
      } else {
        setHasMore(false);
      }
      setIsFetching(false);
      const list = [...blogsData.data, ...response.data.data];
      response.data.data = list;
      dispatch(updateStoreData({ payload: response.data, meta: "blogsData" }));
    }
  };
  const getBlogData = async (pageGet) => {
    if (hasMore) {
      const token = localStorage.getItem("fittrack-app-token");
      axios.defaults.headers.common["Authorization"] = token;
      const url = `${blogApi}?page=${pageGet}&limit=${LIMIT}`;
      dispatch(updateStoreData({ payload: true, meta: "loading" }));
      const response = await axios.get(`${apiPath}/${url}`);
      dispatch(updateStoreData({ payload: false, meta: "loading" }));
      modifyData(response);
    }
  };
  console.log({ loading });
  const handleScroll = () => {
    const scrollContainer = document.querySelector(".blogContainer");
    if (
      scrollContainer.clientHeight + scrollContainer.scrollTop + 1 >=
        scrollContainer.scrollHeight &&
      hasMore &&
      loading === false
    ) {
      console.log({ inside: page, blogsData });
      setIsFetching(true);
    }
  };

  useEffect(() => {
    if (!isFetching) {
      return;
    }
    if (blogsData !== null) {
      getBlogData(page);
    }
  }, [isFetching]);

  const openModal = (id) => setOpen(id);

  useEffect(() => {
    if (blogsData === null && loading === false) {
      getBlogData(1);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, true);
    return () => window.removeEventListener("scroll", handleScroll, true); // Cleanup listener on unmount
  }, [blogsData, page, hasMore]);

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
        className="blogContainer"
        sx={{
          width: "90%",
          margin: "auto",
          padding: "20px 30px 0 30px",
          height: "100%",
          overflow: "auto",
        }}
      >
        <BlogHeader />
        {blogsData &&
          blogsData?.data.length > 0 &&
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
