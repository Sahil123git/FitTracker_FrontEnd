import {
  Card,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  Box,
  Divider,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

const BlogCard = ({ blog, openModal }) => {
  return (
    <Card
      sx={{
        width: "100%",
        margin: "0 0 40px 0",
        boxShadow: 2,
        borderRadius: 2,
        transition: "transform 0.3s",
        background: "#f4f4f4",
        "&:hover": {
          transform: "scale(1.01)",
          boxShadow: 3,
          cursor: "pointer",
        },
      }}
      onClick={() => openModal(blog._id)}
    >
      <CardContent>
        <Typography variant="h6" component="div" fontWeight="bold">
          {blog.heading}
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Typography variant="body2" color="text.secondary">
          {blog.shortDesc}
        </Typography>
      </CardContent>
      <CardActions
        sx={{ display: "flex", justifyContent: "space-between", pt: 0, pb: 2 }}
      >
        <Box display="flex" alignItems="center">
          <IconButton
            color="primary"
            sx={{ "&:hover": { backgroundColor: "rgba(25, 118, 210, 0.08)" } }}
          >
            <ThumbUpIcon />
          </IconButton>
          <Typography variant="body2" component="span" ml={0.5}>
            {blog.likes}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <IconButton
            color="error"
            sx={{ "&:hover": { backgroundColor: "rgba(211, 47, 47, 0.08)" } }}
          >
            <ThumbDownIcon />
          </IconButton>
          <Typography variant="body2" component="span" ml={0.5}>
            {blog.dislikes}
          </Typography>
        </Box>
      </CardActions>
    </Card>
  );
};
export default BlogCard;
