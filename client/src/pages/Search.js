import SearchBar from "../components/SearchBar";
import { Component } from "react";
import Typography from "@mui/material/Typography";

class Search extends Component {
  render() {
    return (
      <div>
        <Typography variant="h1" component="div" gutterBottom>
          Search Canned Tunr
        </Typography>
        <SearchBar />
      </div>
    );
  }
}

export default Search;
