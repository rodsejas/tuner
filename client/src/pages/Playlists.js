import { useState, useEffect } from "react";
import axios from "axios";
import { getCurrentUserPlaylists } from "../spotify";
import { catchErrors } from "../utils";
import "./Playlists.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Playlists = () => {
  const [playlistsData, setPlaylistsData] = useState(null);
  const [playlists, setPlaylists] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getCurrentUserPlaylists();
      setPlaylists(data);

      console.log(setPlaylists, "this is data");
    };

    catchErrors(fetchData());
  }, []);

  useEffect(() => {
    if (!playlistsData) {
      return;
    }

    const fetchMoreData = async () => {
      if (playlistsData.next) {
        const { data } = await axios.get(playlistsData.next);
        setPlaylistsData(data);
      }
    };

    setPlaylists((playlists) => [
      ...(playlists ? playlists : []),
      ...playlistsData.items,
    ]);

    catchErrors(fetchMoreData());
  }, [playlistsData]);

  // take a look at the object in react console
  // render a html element with data from the object.

  // put in a conditional that only renders the p tag if playlists is not null.

  // TERNARY EXPRESSION:
  // [condition] ? [evaluation if true] : [evaluation if false]

  // write a ternary where if 6 > 5 then return "hello" Otherwise "goobye";

  // 6 > 5 ? 'hello' : 'goodbye'

  if (!playlists) {
    return;
    <p> No playlists here </p>;
  }

  console.log(playlists.items);

  return (
    <>
      <h1> Your playlists</h1>
      <div className="fuckity-fuck">
        {playlists.items.map((playlist) => {
          return (
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                image={
                  playlist.images.length &&
                  playlist.images[0].url &&
                  playlist.images[0].url
                }
                alt="jkfnerjkfne"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {playlist.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {playlist.description} {playlist.id}
                  {/* <img src={playlist.images[0].url}></img> */}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">▶️​</Button>
                <Button size="small">songs</Button>
              </CardActions>
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default Playlists;
