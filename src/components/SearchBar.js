import React from "react";
import TextField from "@mui/material/TextField";

function SearchBar({ search, setSearch }) {
  return (
    <TextField
      label="Search Student"
      variant="outlined"
      fullWidth
      margin="normal"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}

export default SearchBar;