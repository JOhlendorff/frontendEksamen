import handleHttpErrors from "./Errors"
const URL = "http://localhost:8080/jpareststarter";


const loginDetails = {
  user_namer: ""
}

const getToken = () => {
  return localStorage.getItem('jwtToken')
}


const setToken = (token) => {
    localStorage.setItem('jwtToken', token)
  }
const loggedIn = () => {
  const loggedIn = getToken() != null;
  return loggedIn;
}
const loginWithUser = (user, password) => {
    const options = makeOptions("POST", false,{user_name: user, password: password });
    return fetch(URL + "/api/login", options)
      .then(handleHttpErrors)
      .then(res => {setToken(res.token) })
 }
 const makeOptions= (method,addToken,body) =>{
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        'Accept': 'application/json',
      }
    }
    if (addToken && loggedIn()) {
      opts.headers["x-access-token"] = getToken();
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  }
//export default Login;
export default loginWithUser;
export {getToken, loggedIn};