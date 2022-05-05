
import React, {Component} from 'react'
import { useState, useEffect } from 'react';
import { getFollowedArtists } from '../spotify';
import { getCurrentUserProfile } from "../spotify";
import { catchErrors } from "../utils";
import { getTopArtists } from '../spotify';
import { ArtistsGrid } from '../components/Artist'
import RelatedArtists from '../components/RelatedArtist';

const FollowedArtists = () => {
    const [artists, setArtists] = useState(null)
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
      <div>
          <h1> YOUR FOLLOWED Artists  </h1>
            {artists && artists.items.map((artist)  => (
          <>
            <div>
           <p><img src={artist.images[0].url}  alt={artist.name}></img>
            {artist.name} </p> 
      </div>

    </>
        ))}
        
          <RelatedArtists/>
          
        </div>
     
    </>
  );
};

export default FollowedArtists;
