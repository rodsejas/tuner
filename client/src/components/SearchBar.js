import { useState, useEffect } from "react";
import { catchErrors } from "../utils";
import { getSearchQuery } from "../spotify";
import "../pages/Discover.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState(null);
  const [query, setQuery] = useState("");
  const [queryType, setQueryType] = useState("album");
  const [queryLimits, setqueryLimits] = useState("limit=50&offset=0");

  const artistSearch = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
    const searchTerm = `q=${searchInput}&type=${queryType}&${queryLimits}`;

    const fetchData = async () => {
      const { data } = await getSearchQuery(searchTerm);
      setSearchQuery(data);
    };
    catchErrors(fetchData());
    setSearchInput("");
  };
  if (!searchQuery) {
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Search by Artist, Track or Album"
            id="fullWidth"
            onChange={artistSearch}
            value={searchInput}
          />

          <Button
            variant="contained"
            endIcon={<SearchIcon />}
            type="submit"
            value="Search"
          >
            Search
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Search by Artist, Track or Album"
            id="fullWidth"
            onChange={artistSearch}
            value={searchInput}
          />

          <Button
            variant="contained"
            endIcon={<SearchIcon />}
            type="submit"
            value="Search"
          >
            Search
          </Button>
        </form>
        <div className="recommendations-container">
          {searchQuery.albums.items.map((album) => {
            return (
              <div className="track-container">
                <p key={album.id}>{album.name}</p>
                <a href={album.external_urls.spotify} target="_blank">
                  <img src={album.images[0].url} width="80" height="80" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
