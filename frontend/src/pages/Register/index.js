import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import "./styles.css";
import logo from "../../assets/MyFood.png";

import api from '../../utils/api';

export default function Register() {
  const [name, setName] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [foodType, setFoodType] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [uf, setUf] = useState("");

  const history = useHistory(); 

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      name,
      cnpj,
      foodType,
      whatsapp,
      address,
      city,
      uf,
    };

    try {
        const response = await api.post('seller/register', data);

        alert(`ID de acesso: ${response.data.id}\n
              Guarde com cuidado :)`);

        history.push('/');
    } catch (error) {
       alert("Erro durante o cadastro"); 
    }
  }

  return (
    <div className="register-container">
      <div className="register-content">
        <div className="info">
          <img src={logo} alt="MyFood" />
          <div className="text-info">
            <h2>Entre no mundo do MyFood!</h2>
            <p>Cadastre-se e comece a vender seus pratos agora!</p>
          </div>
          <Link className="login-link" to="/">
            <FaArrowLeft color="#21BF73" />
            <p>Já sou cadastrado</p>
          </Link>
        </div>

        <form className="register-form" onSubmit={handleRegister} method="POST">
          <input
            className="register-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome do Restaurante"
            type="text"
          />
          <input
            className="register-input"
            value={cnpj}
            onChange={(e) => setCnpj(e.target.value)}
            placeholder="CNPJ"
            type="text"
          />
          <input
            className="register-input"
            value={foodType}
            onChange={(e) => setFoodType(e.target.value)}
            placeholder="Tipo de Comida Servida"
            type="text"
          />
          <input
            className="register-input"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="WhatsApp"
            type="text"
          />
          <input
            className="register-input"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            placeholder="Endereço"
            type="text"
          />
          <div className="location-input">
            <input
              className="register-input city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Cidade"
              type="text"
            />
            <input
              className="register-input uf"
              value={uf}
              onChange={(e) => setUf(e.target.value)}
              placeholder="UF"
              type="text"
            />
          </div>
          <button type="submit">Cadastrar Meu Restaurante</button>
        </form>
      </div>
    </div>
  );
}
