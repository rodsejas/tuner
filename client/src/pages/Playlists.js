import { useState, useEffect } from 'react';
import axios from 'axios'
import { getCurrentUserPlaylists } from '../spotify';
import { catchErrors } from '../utils';


const Playlists = () => {
    const [playlistsData, setPlaylistsData] = useState(null);
    const [playlists, setPlaylists] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await getCurrentUserPlaylists();
            setPlaylists(data);
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

        setPlaylists(playlists => ([
            ...playlists ? playlists : [],
            ...playlistsData.items
        ]));

        catchErrors(fetchMoreData());        
        
    }, [playlistsData]);





    return (
        <main>
            title="Playlists" breadcrumbs="true"
                {playlists}
        </main>
    )



    console.log(playlists);



}

export default Playlists;