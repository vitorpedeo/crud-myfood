import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import logo from "../../assets/MyFood.png";

import api from "../../utils/api";

import "./styles.css";

export default function NewFood() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const history = useHistory();

  const restaurantId = localStorage.getItem("id");

  const handleCreate = async (e) => {
    e.preventDefault();

    const data = {
      title,
      description,
      price,
    };

    try {
      await api.post("food/create", data, {
        headers: {
          Authorization: restaurantId,
        },
      });

      history.push("/home");
    } catch (error) {
      alert("Não foi possível criar o prato");
    }
  };

  return (
    <div className="new-food-container">
      <div className="new-food-main">
        <div className="new-food-img"></div>
        <form method="POST" onSubmit={handleCreate} className="new-food-form">
          <img src={logo} alt="MyFood" />
          <input
            type="text"
            placeholder="Nome do Prato"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="new-food-input"
          />
          <textarea
            cols="30"
            rows="5"
            placeholder="Descrição do Prato"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="new-food-textarea"
          />
          <input
            type="text"
            placeholder="Preço"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="new-food-input"
          />
          <div className="btns-new-food">
            <Link to="/home" className="link-to-home">
              Voltar ao Menu Principal
            </Link>
            <button type="submit" className="btn-create-food">
              Criar Prato
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
