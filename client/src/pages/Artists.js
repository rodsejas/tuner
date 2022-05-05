import React, { Component } from "react";
import { useState, useEffect } from "react";
import { getFollowedArtists } from "../spotify";
import { getCurrentUserProfile } from "../spotify";
import { catchErrors } from "../utils";
import { getTopArtists } from "../spotify";
import { ArtistsGrid } from "../components/Artist";
import RelatedArtists from "../components/RelatedArtist";
import "./Artists.css";
import MediaCard from "../components/card";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const FollowedArtists = () => {
  const [artists, setArtists] = useState(null);
  // console.log(artists)

  useEffect(() => {
    const fetchData = async () => {
      const userFollowedArtists = await getFollowedArtists();
      setArtists(userFollowedArtists.data.artists);
    };

    catchErrors(fetchData());
  }, []);

  return (
    <>
      {" "}
      <h1> YOUR FOLLOWED Artists </h1>
      <div className="artists-container">
        {artists &&
          artists.items.map((artist) => (
            <>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={artist.images[0].url}
                  alt={artist.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {artist.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  ></Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </>
          ))}

        <RelatedArtists />
      </div>
    </>
  );
};

export default FollowedArtists;
