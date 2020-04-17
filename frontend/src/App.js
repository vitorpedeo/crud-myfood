import React from "react";
import { toast } from "react-toastify";

import Routes from "./routes";

import "./global.css";

//Configuração inicial do Toastify
//Coloca-lá no componente App do projeto
toast.configure();

export default function App() {
  return <Routes />;
}
