import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
const BlogHeader = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMostLiked, setFilterMostLiked] = useState(false);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleFilterToggle = () => {
    setFilterMostLiked((prev) => !prev);
  };
  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      sx={{ marginBottom: "30px" }}
    >
      <Grid item xs={12} sm={10}>
        <TextField
          variant="outlined"
          placeholder="Search blogs..."
          onChange={handleSearchChange}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <FormControl fullWidth variant="outlined">
          <InputLabel>Filter by Likes</InputLabel>
          <Select
            labelId="likes-filter-label"
            // value={likesFilter}
            // onChange={handleLikesFilterChange}
            label="Filter by Likes"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="desc">Highest to Lowest</MenuItem>
            <MenuItem value="asc">Lowest to Highest</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};
export default BlogHeader;
