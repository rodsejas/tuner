import { useState, useEffect } from "react";
import { getRecommendations } from "../spotify";
import { catchErrors } from "../utils";
import "./Discover.css";

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
      <button onClick={refreshHandler}>Get New Recommendations</button>
      <div className="recommendations-container">
        {recommendations.map((track) => {
          return (
            <div key={track.id} className="track-container">
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
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Discover;
