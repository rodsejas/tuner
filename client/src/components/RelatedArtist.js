
import React, {Component} from 'react'
import { useState, useEffect } from 'react';
import { getFollowedArtists } from '../spotify';
import { getCurrentUserProfile } from "../spotify";
import { catchErrors } from "../utils";
import { getTopArtists } from '../spotify';
import { ArtistsGrid } from '../components/Artist'
import { getRelatedArtists } from '../spotify';


const RelatedArtists = () => {
    const [related, setRelated] = useState(null)

    useEffect(() => {
    const fetchData = async () => {
      const userRelatedArtists = await getRelatedArtists();
      setRelated(userRelatedArtists.data.artists);
 

    };

   
    catchErrors(fetchData());
    }, []);

  if (!related) {
    return <p>it's fucked. Fuckity Fucked!</p>
  }

  return (
    <>
      {related.map((artist)=> {
        return (
          <div key={artist.id}> {artist.name}
          
          
          </div>
        );
      })}



    </> 
  );
};

export default RelatedArtists;

