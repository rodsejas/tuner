# canned-tunr


## Description

    TO DO .... 



## Configuration

### Available Scripts


### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.



## Advanced Configuration


### Local Installation & Set Up

1. Register a  Spotify App  [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/). Add `http://localhost:8888/callback` as a Redirect URI in the Spotify app's settings tab

2. Create a `.env` file at the root of the project based on  the `.env.example`.  
   Add a unique `CLIENT_ID` and `CLIENT_SECRET` from the Spotify dashboard

3. Install [npm](https://www.npmjs.com/) 

4. Install the correct version of Node

5. Install dependencies

```shell
    npm install
```

6. Run the React app on <http://localhost:3000> and the Node server on <http://localhost:8888>

```shell
    npm start
```

### Production deployment to Heroku

white-list Production redirect URI in the Spotify app dashboard  https://canned-tunr.herokuapp.com/callback.

```shell
    //.env GLOBAL VARIABLES 
    CLIENT_ID=XXX CLIENT_SECRET=XXX 
    REDIRECT_URI=http://localhost:8888/callback 
    FRONTEND_URI=http://localhost:3000
```

Implement environment globals in server source code index.js 

```shell
    const CLIENT_ID = process.env.CLIENT_ID; 
    const CLIENT_SECRET = process.env.CLIENT_SECRET; 
    const REDIRECT_URI = process.env.REDIRECT_URI; 
    const FRONTEND_URI = process.env.FRONTEND_URI; 
    const PORT = process.env.PORT || 8888;
```
Heroku dynos expose a dynamic port to allow the app to bind to on the PORT variable. 

Redirects are implemented in index.js 

```shell
    res.redirect(`${FRONTEND_URI}/?${queryParams}`);
```

Implement environment variables in the client source  client/src/pages/Login.js

```shell
    const LOGIN_URI =
    process.env.NODE_ENV !== 'production'
        ? 'http://localhost:8888/login'
        : 'https://spotify-profile-v2.herokuapp.com/login';

    const Login = () => (
        <StyledLoginContainer>
            <StyledLoginButton href={LOGIN_URI}>
                Log in to Spotify
            </StyledLoginButton>
        </StyledLoginContainer>
    );
 ```
Add environment variable for production build to the ‘config vars’ section of the Heroku app in the ‘settings’ tab.

REDIRECT_URI and FRONTEND_URI  differ from development to production:

- For the redirect URI (server backend interfaces to Spotify APIs
    - https://canned-tunr.herokuapp.com/callback  (prod)
    - http://localhost:8888/callback (dev)


- For the Front End URI 
    - https://canned-tunr.herokuapp.com (prod)
    - http://localhost:3000 (dev)


Package.json changes are required to build production instance on Heroku. 

The 'engines' statement will direct heroku to build the app using the specified veriosn of node.

'CachedDirectories' directs heroku to cache node_modules for fromt and backend deployments  - improving performance.

The npm 'concurrently' lib will only work on localhost. 

The build script will direct heroku how to install and build the solution, in conjunction with the 'Procfile' configuration file 

 ```shell
  "engines": {
    "node": "14.15.0"
  },
  "cacheDirectories": [
    "node_modules",
    "client/node_modules"
  ],
  "scripts": {
    "start": "concurrently --kill-others-on-fail \"npm run server\" \"npm run client\"",
    "server": "nodemon index.js",
    "client": "cd client && npm start",
    "postinstall": "cd client && npm install",
    "build": "NODE_ENV=production cd client/ && npm install && npm run build",
    "start-server": "node index.js"
  }, 
 ```

Add an Heroku 'Procfile' to issue start server commands 
Create a  Procfile in the root of the project source.
Text: 
 ```shell
    web: npm run start-server
 ```

Configure teh Express app to serve all React  routes.
Add the following to index.js 

 ```shell
    const path = require('path');
 ```

Add the following to the top of index.js file, before the declaration of the  Express routes, but after the declaration of the app variable.  
This directs the Express app to priority-serve any static files from the React app.

 ```shell
// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, './client/build')));
 ```

Add the following statemen to the bottom of index.js file, after all Express routes declarations, but before the app.listen() declaration.

 ```shell
// All remaining requests return the React app, so it can handle routing.
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});
 ```