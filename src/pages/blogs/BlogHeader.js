import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
const BlogHeader = ({ setSearchQuery, setFilterMostLiked }) => {
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
          onChange={(e) => setSearchQuery(e.target.value.toLowerCase().trim())}
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
            defaultChecked
            defaultValue={""}
            onChange={(e) => setFilterMostLiked(e.target.value)}
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
