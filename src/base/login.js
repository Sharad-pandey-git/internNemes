import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import { isAuthenticated, signin, authenticate } from "./auth";

function Login() {
    const [values, setValues] = useState({
      user_name: "",
      password: "",
      error: "",
      loading: false,
      didRedirect: false
    })
  
    const { user_name, password, error, loading, didRedirect } = values;
    const { user } = isAuthenticated();
  
    const handelChange = name => event => {
      setValues({ ...values, error: false, [name]: event.target.value })
    };
  
    const onSubmit = event => {
      event.preventDefault();
      setValues({ ...values, error: false });
      signin({ user_name, password })
        .then(data => {
          // console.log("data from My BAckend : ", data)
          if (data.error || data.err) {
            var _error = data.err ? data.err : data.error;
  
            setValues({ ...values, error: _error, success: false })
          }
          else {
            authenticate(data, () => {
              setValues({
                ...values,
                didRedirect: true
              })
            })
          }
        })
        .catch(
          console.log("Custom error from F_E (onsubmit ) : Signin request Failed ")
        )
    }
  
    const perFormRedirect = () => {
      if (didRedirect) {
        return <Redirect to="/dashboard" />
      }
    }
  
    const signinForm = () => (
      <main className="form-signin container text-center d-felx justify-content-center align-items-center" style={{ height: "100vh", paddingTop: "30vh" }}>
        <div className="container">
          <form>
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
            <div className="form-floating mb-1">
              <input type="text"
                className="form-control"
                value={user_name}
                onChange={handelChange("user_name")}
              />
              <label htmlFor="floatingInput">Email / user Name</label>
            </div>
            <div className="form-floating mt-1">
              <input type="password"
                className="form-control"
                value={password}
                onChange={handelChange("password")}
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>
            <button className="w-100 btn btn-lg btn-primary mt-2"
              onClick={onSubmit}
            >Sign in</button>
            <p className="mt-5 mb-3 text-muted">© S.P</p>
          </form>
        </div>
      </main>
    )
  
    const loadingMessage = () => {
      return (
        loading && (
          <div className="alert alert-info">
            <h2>
              Loading.......
            </h2>
          </div>
        )
      )
  
    }
  
    const errorMessage = () => (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div className="alert alert-danger text-left"
            style={{ display: error ? "" : "none" }}>
            Error occured : {error}
          </div>
        </div>
      </div>
    )
  
  
    return (
      <div>
        {loadingMessage()}
        {errorMessage()}
        {signinForm()}
        {perFormRedirect()}
      </div>
    )
  }


  export default Login
  