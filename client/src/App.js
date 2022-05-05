import { useState, useEffect } from "react";
import { accessToken, logout, getCurrentUserProfile, getSearchQuery } from "./spotify";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  Link,
} from "react-router-dom";
import "./App.css";
import { catchErrors } from "./utils";
import {
  Login,
  Profile,
  Artists,
  Albums,
  Playlists,
  Discover,
  Template,
} from "./pages";

/**
 * Scroll to top of page when visiting new routes.
 * https://reactrouter.com/web/guides/scroll-restoration/scroll-to-top
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Fn imports the access token
function App() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);
  const [searchQuery, setSearchQuery] = useState(null);

  useEffect(() => {
    setToken(accessToken);

    const fetchData = async () => {
      const { data } = await getCurrentUserProfile();
      setProfile(data);
    };

    catchErrors(fetchData());
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {!token ? (
          <Login />
        ) : (
          <>
            <button onClick={logout}>Log Out</button>
            <Router>
              <ScrollToTop />
              <nav>
                <Link to="/">Home</Link>
                <Link to="/artists">Artists</Link>
                <Link to="/albums">Albums</Link>
                <Link to="/playlists">Playlists</Link>
                <Link to="/discover">Discover</Link>
                <Link to="/template">Template</Link>
              </nav>

              <Switch>
                <Route path="/artists">
                  <Artists />
                </Route>
                <Route path="/albums">
                  <Albums />
                </Route>
                <Route path="/playlists/:id">
                  <h1>Playlist</h1>
                </Route>
                <Route path="/playlists">
                  <Playlists />
                </Route>
                <Route path="/discover">
                  <Discover />
                </Route>
                <Route path="/template">
                  <Template />
                </Route>
                <Route path="/search">
                  <Search />
                </Route>
                <Route path="/">
                  <Profile />
                </Route>
              </Switch>
            </Router>
          </>

        )}
      </header>
    </div>
  );
}

export default App;
