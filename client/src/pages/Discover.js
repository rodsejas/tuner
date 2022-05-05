import { useState, useEffect } from "react";
import { getRecommendations } from "../spotify";
import { catchErrors } from "../utils";
import "./Discover.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import Button from "@mui/material/Button";

const Discover = () => {
  const [recommendations, setRecommendations] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getRecommendations();
      setRecommendations(result);
    };

    catchErrors(fetchData());
  }, []);

  if (!recommendations) {
    return <p>No recommendations</p>;
  }

  const refreshHandler = async () => {
    const result = await getRecommendations();
    setRecommendations(result);
  };

  return (
    <>
      <Button
        variant="contained"
        endIcon={<CachedIcon />}
        onClick={refreshHandler}
        sx={{ margin: "30px" }}
      >
        Get New Song Recommendations
      </Button>
      <div className="recommendations-container">
        {recommendations.map((track) => {
          return (
            <Card key={track.id} sx={{ maxWidth: 345 }}>
              <CardActionArea
                href={track.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={track.album.images[0].url}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {track.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <p>
                      {track.artists
                        .map((artist) => {
                          return artist.name;
                        })
                        .join(", ")}
                    </p>
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            /* <div key={track.id} className="track-container">
              <p>
                Song:{" "}
                <a
                  href={track.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {track.name}
                </a>
              </p>
              <p>
                Artist:{" "}
                {track.artists
                  .map((artist) => {
                    return artist.name;
                  })
                  .join(", ")}
              </p>
              {track.album && <p>From the album: {track.album.name}</p>}
            </div> */
          );
        })}
      </div>
    </>
  );
};

export default Discover;
