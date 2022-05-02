import { useEffect } from 'react';
import "./App.css";
import Album from "./components/Album";
import Artist from "./components/Artist"
import Login from "./components/Login"
import Nav from "./components/Nav";
import Playback from "./components/Playback" ;
import Playlist from "./components/Playlist";
import Search from "./components/Search";

function App() {
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const accessToken = urlParams.get("access_token");
    const refreshToken = urlParams.get("refresh_token");

    console.log(accessToken);
    console.log(refreshToken);

    if (refreshToken) {
      fetch(`/refresh_token?refresh_token=${refreshToken}`)
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.error(err));
    }
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <Search/> 
        <Nav/>
        <Artist/>
        <Album/>
        <Login/>
        <Playlist/>
        <Playback/>


        <p>
         
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a className="App-link" href="http://localhost:8888/login">
          Login to Spotify Random Crap
        </a>
      </header>
    </div>
  );
}

export default App;
