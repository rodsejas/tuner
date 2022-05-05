const LOGIN_URI =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:8888/login'
    : 'https://canned-tunr.herokuapp.com/login';

const Login = () => (
  <a className="button" href={LOGIN_URI}>
    Login to Spotify
  </a>
);

export default Login;
