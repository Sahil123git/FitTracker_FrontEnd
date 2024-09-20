import { useRef, useState } from "react";
import { Box, Button } from "@mui/material";
import { fetchData } from "../../redux/reducers/userSlice";
import { useDispatch } from "react-redux";
import { uploadApi } from "../../apiPath";
import Fab from "@mui/material/Fab";
import ClearIcon from "@mui/icons-material/Clear";

const UploadDrawer = ({ setResourceOpen }) => {
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  //   const [formData, setFormData] = useState(workout);
  const inputRef = useRef(null);
  function handleChange(e) {
    console.log(e.target.files);
    console.log("getting called");
    setFile(URL.createObjectURL(e.target?.files?.[0]));
  }
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
        minWidth: 350,
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
              Choose Image
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
          src={file}
          style={{ maxWidth: "90%", display: "block", margin: "auto" }}
        />
        {file && (
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
            <Button color="error" onClick={() => setFile(null)}>
              Reset
            </Button>
          </div>
        )}
      </div>
    </Box>
  );
};
export default UploadDrawer;
