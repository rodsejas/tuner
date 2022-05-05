import { useState, useEffect } from "react";
import { getRecommendations } from "../spotify";
import "./Discover.css";

const Template = () => {
  const [recommendations, setRecommendations] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getRecommendations();
      setRecommendations(result);
    };
    fetchData();
  }, []);

  if (!recommendations) {
    return <p>No recommendations</p>;
  }

  return (
    <>
      {recommendations.map((track) => {
        return <p>{track.name}</p>;
      })}
    </>
  );
};

export default Template;
