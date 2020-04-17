import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute(props) {
  const id = localStorage.getItem("id");

  if (!id) {
    alert("Você precisa estra logado!");
    return <Redirect to="/" />;
  }

  return <Route {...props} />;
}
