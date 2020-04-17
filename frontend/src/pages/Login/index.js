import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

import "./styles.css";
import logo from "../../assets/MyFood.png";

import api from "../../utils/api";

export default function Login() {
  const [id, setId] = useState("");

  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post("seller/login", { id });

      localStorage.setItem("id", id);
      localStorage.setItem("name", response.data.name);

      history.push("/home");
    } catch (error) {
      alert("Algo de errado aconteceu no login!");
    }
  }

  return (
    <div className="login-container">
      <div className="main">
        <form className="content" onSubmit={handleLogin} method="POST">
          <img src={logo} alt="MyFood" />

          <div className="text-container">
            <h2>Login</h2>
            <p>Entre na rede e venda todas as suas comidas deliciosas!</p>
          </div>

          <input
            type="text"
            className="form-input"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="ID do Restaurante"
          />

          <button type="submit">Entrar</button>

          <Link className="register-link" to="/register">
            <p>Não sou cadastrado</p>
            <FaArrowRight color="#21BF73" />
          </Link>
        </form>

        <div className="image"></div>
      </div>
    </div>
  );
}
