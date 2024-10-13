import { useEffect, useRef, useState } from "react";
import { Box, Button } from "@mui/material";
import { fetchData, updateStoreData } from "../../redux/reducers/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { uploadApi, userApi } from "../../apiPath";
import CircularProgress from "@mui/material/CircularProgress";
import Fab from "@mui/material/Fab";
import Backdrop from "@mui/material/Backdrop";
import ClearIcon from "@mui/icons-material/Clear";

const UploadDrawer = ({ setResourceOpen }) => {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");
  const dispatch = useDispatch();
  const { loading, currentUser, resourceData } = useSelector(
    (state) => state.user
  );
  const inputRef = useRef(null);
  function handleChange(e) {
    setFileUrl(URL.createObjectURL(e.target?.files?.[0]));
    setFile(e.target?.files?.[0]);
  }
  useEffect(() => {
    return () => {
      dispatch(updateStoreData({ payload: null, meta: "resourceData" }));
    };
  }, []);
  useEffect(() => {
    if (resourceData !== null) {
      setResourceOpen(false);
      const data = { ...currentUser, img: resourceData.imageUrl };
      dispatch(
        fetchData({
          keyName: "currentUser",
          data: data,
          url: `${userApi}/${currentUser._id}`,
          method: "put",
          toastSuccess: true,
          toastError: true,
        })
      );
    }
  }, [resourceData]);
  const uploadImage = () => {
    const formData = new FormData();
    formData.append("resource", file);
    dispatch(
      fetchData({
        keyName: "resourceData",
        data: formData,
        url: uploadApi,
        method: "post",
        toastSuccess: true,
        toastError: true,
      })
    );
  };
  return (
    <Box
      sx={{
        width: 350,
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {loading && (
        <Backdrop
          sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <div>
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
          onClick={() => setResourceOpen(false)}
        >
          <ClearIcon />
        </Fab>

        {!file && (
          <>
            <Button
              variant="contained"
              onClick={() => {
                inputRef.current.click();
              }}
            >
              Choose an Image
            </Button>
            <input
              ref={inputRef}
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleChange}
              style={{ display: "none" }}
            />
          </>
        )}

        <img
          src={fileUrl}
          style={{ maxWidth: "90%", display: "block", margin: "auto" }}
        />
        {fileUrl && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "15px",
            }}
          >
            <Button variant="contained" onClick={uploadImage}>
              Upload
            </Button>
            <Button
              color="error"
              onClick={() => {
                setFile(null);
                setFileUrl("");
              }}
            >
              Reset
            </Button>
          </div>
        )}
      </div>
    </Box>
  );
};
export default UploadDrawer;
