import "./App.css";
import { Link, useHistory } from "react-router-dom";
import Nav from "./Nav";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { fetchData } from "./decodeJWT";
import loginWithUser from "./Login";
import logoutUser from "./Logout";
import { NavDropdown } from "react-bootstrap";

const URL = "http://localhost:8080/jpareststarter";
let username;

function LogIn({ login }) {
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);
  

  const performLogin = (evt) => {
    console.log(loginCredentials);
    evt.preventDefault();
    login(loginCredentials.username, loginCredentials.password);
  };
  const onChange = (evt) => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value,
    });
    username = loginCredentials.username;
  };

  return (
    <div>
      <h2>Login</h2>
      <form onChange={onChange}>
        <input placeholder="User Name" id="username" />
        <input placeholder="Password" type="password" id="password" />
        <button onClick={performLogin}>Login</button>
      </form>
    </div>
  );
}
function LoggedIn() {
  const [dataFromServer, setDataFromServer] = useState("Loading...");

  useEffect(() => {
    fetchData().then((data) => setDataFromServer(data.msg));
  }, []);

  return (
    <div>
      <h2>Data Received from server</h2>
      <h3>{dataFromServer}</h3>
    </div>
  );
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const history = useHistory();
  const logout = () => {
    // localStorage.clear();
    // history.push("http://localhost:3000/");
    setLoggedIn(false);
    return <Link to="/">{logoutUser()}</Link>;
  };

  const login = (user, pass) => {
    LoginPage();
    loginWithUser(user, pass).then((res) => setLoggedIn(true));
  };
  const logoutBtn = () => {
    return (
      <div>
        <p>Are you sure you want to log out?</p>
        <Link to="/">
          <button type="button" onClick={logout}>
            Logout
          </button>
        </Link>
      </div>
    );
  };

  const ShowLandingPage = () => (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={LoginPage} />
          <Route path="/logout" component={logoutBtn} />
          {/* <Item onClick={logout}>Logout</Item> */}
        </Switch>
      </div>
    </Router>
  );
  function LoginPage() {
    return !loggedIn ? (
      <LogIn login={login} />
    ) : (
      <div>
        <ShowLandingPage />
      </div>
    );
  }

  return (
    <div className="App">
      {!loggedIn ? (
        <LogIn login={login} />
      ) : (
        <div>
          <ShowLandingPage />
        </div>
      )}
    </div>
  );
}

const Home = () => (
  <div>
    <h1>
      <LoggedIn />
    </h1>
  </div>
);

export default App;
export {username};