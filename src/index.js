import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./base/login"
import AdminRoute from "./component/adminRoute"
import './index.css';
import Base from './base/base';

ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <AdminRoute path="/dashboard" exact component={Base} />
      </Switch>
    </BrowserRouter>
    </React.StrictMode>,
  document.getElementById('root')
);

