import React from "react"
import { HashRouter, Link, NavLink, Route, Switch } from "react-router-dom"
import { Dashboard } from "../component/dashboard"
import { UserForm } from "../component/form"
import { signout } from "./auth"

const Base = () => {
  setTimeout(
      () => {
          signout(() => {
            alert("session timeoout Please re login")
            window.location.reload()
          })
      },
      5*60*1000
  )
  return (
    <div>
      <HashRouter>
        <nav className="navbar navbar-dark bg-dark">
          <div className="container my-2 d-flex justify-content-around">
            <NavLink exact to="/" style={{ textDecoration: "none" }}>
              <span
                className="navbar-brand px-2 h1 border rounded border-primary"
              >Form</span>
            </NavLink>

            <NavLink exact to="/users" style={{ textDecoration: "none" }}>
              <span
                className="navbar-brand px-2 h1 border rounded border-primary"
              >User Data</span>
            </NavLink>
          </div>
          <div className="text-white me-3">
            <NavLink to="/">
              <button className="btn btn-danger"
                onClick={() => {
                  signout(() => {
                    alert("SuccessFully logOut")
                  })
                }}
              >
                LogOut
                    </button>
            </NavLink>
          </div>
        </nav>
        <div>
          <Switch>
            <Route path="/" exact component={UserForm} />
            <Route path="/users" exact component={Dashboard} />
          </Switch>
        </div>

      </HashRouter>
    </div >
  )
}

export default Base