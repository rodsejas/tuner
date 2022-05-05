import { useState, useEffect } from "react";
import axios from "axios";
import { getCurrentUserPlaylists } from "../spotify";
import { catchErrors } from "../utils";

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
    <div className="fuckity-fuck">
      <ul>
        {playlists.items.map((playlist) => {
          return (
            <li>
              <a href={playlist.external_urls.spotify}>
                {playlist.name ? (
                  <p>{playlist.name}</p>
                ) : (
                  <p>Spotify did not name this list</p>
                )}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Playlists;
