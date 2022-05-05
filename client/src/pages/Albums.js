import React, {Component} from 'react'
import { useState, useEffect } from 'react';
import { getCurrentUserProfile } from "../spotify";
import { catchErrors } from "../utils";
import { getAlbums } from '../spotify';

const Albums = () => {
  const [albums, setAlbums] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const userAlbums = await getAlbums();
      setAlbums(userAlbums.data.items);
      console.log(userAlbums.data.items);
    };

    catchErrors(fetchData());
  }, []);
  if (!albums) {
    return <p> No bums.</p>
  }
  
  return (
    <div>
      <> 
          {albums.map((album) => {
            return <img src={album.album.images[0].url}></img>
           
          })}
      </>
    
    </div>

  );
};
export default Albums;