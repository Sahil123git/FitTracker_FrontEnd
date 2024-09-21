import { useEffect, useRef, useState } from "react";
import { Box, Button } from "@mui/material";
import { fetchData } from "../../redux/reducers/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { uploadApi } from "../../apiPath";
import Fab from "@mui/material/Fab";
import ClearIcon from "@mui/icons-material/Clear";

const UploadDrawer = ({ setResourceOpen }) => {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");
  const dispatch = useDispatch();
  const { loading, extra, resourceData } = useSelector((state) => state.user);
  //   const [formData, setFormData] = useState(workout);
  const inputRef = useRef(null);
  function handleChange(e) {
    setFileUrl(URL.createObjectURL(e.target?.files?.[0]));
    setFile(e.target?.files?.[0]);
  }
  useEffect(() => {
    if (extra?.keyName === "resourceData") {
      setResourceOpen(false);
    }
  }, [extra]);
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
