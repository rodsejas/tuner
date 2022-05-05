import React, { Component } from "react";
import { useState, useEffect } from "react";
import { getFollowedArtists } from "../spotify";
import { getCurrentUserProfile } from "../spotify";
import { catchErrors } from "../utils";
import { getTopArtists } from "../spotify";
import { ArtistsGrid } from "../components/Artist";
import { getRelatedArtists } from "../spotify";
import "../pages/Artists.css";
import MediaCard from "../components/card";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const RelatedArtists = () => {
  const [related, setRelated] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const userRelatedArtists = await getRelatedArtists();
      setRelated(userRelatedArtists.data.artists);
      console.log(userRelatedArtists);
    };

    catchErrors(fetchData());
  }, []);

  if (!related) {
    return <p>it's fucked. Fuckity Fucked!</p>;
  }

  return (
    <>
      <h1>You may also dig</h1>
      {related.map((artist) => {
        return (
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="140"
              image={artist.images[1].url}
              alt={artist.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {artist.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {artist.genres[0]}{" "}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">​❤️​​</Button>
              <Button size="small">Explore</Button>
            </CardActions>
          </Card>
        );
      })}
    </>
  );
};

export default RelatedArtists;
