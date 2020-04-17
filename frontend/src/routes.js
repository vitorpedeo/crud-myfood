import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NewFood from "./pages/NewFood";

import PrivateRoute from "./utils/PrivateRoute";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/register" component={Register} />
        <PrivateRoute path="/home" component={Home} />
        <PrivateRoute path="/new" component={NewFood} />
      </Switch>
    </BrowserRouter>
  );
}
