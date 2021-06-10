

// const API = "https://nameless-hollows-01919.herokuapp.com/api"
import {API} from  "../backend"

// SIGN-IN SIGN-OUT HELPERS

export const signin = user => {
  // let _user = JSON.stringify(user)
  // console.log("CUSTOM USER ",_user)
  console.log("API_______",API)
  return fetch(`${API}/signin`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    }
  ).then(response => {
    return response.json();
  }).catch(err => console.log(err))
};

export const authenticate = (data, next) => {
  if (typeof window != "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
}

export const signout = next => {
  if (typeof window != "undefined") {
    localStorage.removeItem("jwt");
    next();

    return fetch(`${API}/signout`, {
      method: "GET"
    })
      .then(response =>{ 
        console.log(`singout success ${response}`);
      })
      .catch(err => console.log(err))
  }
}

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};