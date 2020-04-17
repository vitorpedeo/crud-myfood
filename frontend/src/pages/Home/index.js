import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import {
  FaDollarSign,
  FaUtensils,
  FaPen,
  FaTrash,
  FaTimes,
  FaRegSmileBeam,
} from "react-icons/fa";
import Modal from "react-modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import logo from "../../assets/MyFood.png";
import api from "../../utils/api";

import "./styles.css";
import "./modal.css";


export default function Home() {
  const [foods, setFoods] = useState([]);

  const history = useHistory();
  const restaurantName = localStorage.getItem("name");
  const restaurantId = localStorage.getItem("id");

  //Uso do modal e states para edição
  Modal.setAppElement("#root");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [foodIdForUpdate, setFoodIdForUpdate] = useState("");
  const [foodTitleUpdate, setFoodTitleUpdate] = useState("");
  const [foodDescriptionUpdate, setFoodDescriptionUpdate] = useState("");
  const [foodPriceUpdate, setFoodPriceUpdate] = useState("");

  const openModal = (foodId) => {
    setFoodIdForUpdate(foodId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  //

  useEffect(() => {
    api
      .get("profile/list", {
        headers: {
          Authorization: restaurantId,
        },
      })
      .then((response) => setFoods(response.data));
  }, [restaurantId]);

  const handleUpdate = async (id) => {
    const data = {
      title: foodTitleUpdate,
      description: foodDescriptionUpdate,
      price: foodPriceUpdate,
    };

    try {
      await api.put(`food/update/${id}`, data, {
        headers: {
          Authorization: restaurantId,
        },
      });

      /**
       * Update manual do state
       * Assim não é necessário recarregar a página para ver as alterações
       */

      const idToUpdate = foods.findIndex((food) => food.id === id);
      foods[idToUpdate].title = foodTitleUpdate;
      foods[idToUpdate].description = foodDescriptionUpdate;
      foods[idToUpdate].price = foodPriceUpdate;

      setFoods(foods);

      setFoodTitleUpdate("");
      setFoodDescriptionUpdate("");
      setFoodPriceUpdate("");
      setIsModalOpen(false);
      toast.success("Prato Editado!");
    } catch (error) {
      alert("Não foi possível atualizar as informações!");
    }
  };

  const handleDelete = async (foodId) => {
    try {
      await api.delete(`food/delete/${foodId}`, {
        headers: {
          Authorization: restaurantId,
        },
      });

      setFoods(foods.filter((food) => food.id !== foodId));
      toast.success("Prato Removido!");
    } catch (error) {
      alert("Não foi possível deletar o prato");
    }
  };

  const logout = () => {
    localStorage.clear();
    history.push("/");
  };

  return (
    <div className="home-container">
      <header>
        <img src={logo} alt="MyFood" />
        <h2>Bem vindo(a), {restaurantName}!</h2>
        <button type="button" onClick={logout}>
          Finalizar Sessão
        </button>
      </header>

      <div className="foods">
        <div className="title">
          <h2>Seu Cardápio</h2>
          <Link to="/new" className="link-food">
            Adicionar um Prato
          </Link>
        </div>

        <div className="foods-grid">
          {foods.length === 0 ? (
            <h2> Cardápio Vazio </h2>
          ) : (
            foods.map((food) => (
              <div key={food.id} className="food-card">
                <div className="card-logo">
                  <img src={logo} alt="MyFood" />
                </div>
                <div className="card-content">
                  <h3>
                    {food.title} <FaUtensils size={20} />{" "}
                  </h3>
                  <p className="food-description">{food.description}</p>
                  <p className="food-price">
                    {" "}
                    <FaDollarSign size={20} />{" "}
                    {Intl.NumberFormat("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    }).format(food.price)}
                  </p>
                  <div className="btns">
                    <button
                      className="btn-edit"
                      onClick={() => openModal(food.id)}
                      type="button"
                    >
                      {" "}
                      <FaPen /> Mudei a receita
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(food.id)}
                      type="submit"
                    >
                      {" "}
                      <FaTrash /> Não faço esse prato mais
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        overlayClassName="overlay"
        className="modal"
      >
        <button type="button" className="btn-modal" onClick={closeModal}>
          {" "}
          <FaTimes size={20} />{" "}
        </button>

        <div className="update-container">
          <div className="img-update"></div>
          <form method="POST" className="update-form">
            <img src={logo} alt="MyFood" />
            <div className="id-update-container">
              <input type="text" placeholder={foodIdForUpdate} readOnly />
              <p>
                Essa é a identificação do seu prato, não se preocupe{" "}
                <FaRegSmileBeam className="smile-icon" size={20} />
              </p>
            </div>
            <input
              type="text"
              className="input-update"
              value={foodTitleUpdate}
              onChange={(e) => setFoodTitleUpdate(e.target.value)}
              placeholder="Nome do Prato"
            />
            <input
              type="text"
              className="input-update"
              value={foodDescriptionUpdate}
              onChange={(e) => setFoodDescriptionUpdate(e.target.value)}
              placeholder="Descrição do Prato"
            />
            <input
              type="text"
              className="input-update"
              value={foodPriceUpdate}
              onChange={(e) => setFoodPriceUpdate(e.target.value)}
              placeholder="Preço"
            />

            <div className="btns-update">
              <button
                type="button"
                onClick={() => handleUpdate(foodIdForUpdate)}
                className="btn-update-edit"
              >
                Atualizar
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="btn-update-cancel"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
