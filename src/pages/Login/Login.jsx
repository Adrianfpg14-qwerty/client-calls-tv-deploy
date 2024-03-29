import React, {useRef, useState} from "react";
import { useNavigate } from 'react-router-dom';
import "./Login.css"
import axios from "axios"

let username = '';
let password = '';


const Login = () => {

  const [isHide, setIsHide] = useState(true)

  const navigate = useNavigate();


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/login`, {
        username,
        password,
      })
        // Almacenar un token, navegar a otra página, etc.
      // console.log('Respuesta del servidor:', response);

      if(response.data == "Admin Ok"){
        navigate('/admin');
      } else {
        navigate('/clientTv/' + response.data);
      }
    } catch (error) {
      console.log('Respuesta del servidor:', error);
    }
  };

  const handleUserNameInput = (e) => {
    if(e.target.value == "mquintero") {
      setIsHide(false);
    } else {
      setIsHide(true);
    }

    username = e.target.value
    handleSubmit(e)
  }

  const handlePasswordInput = (e) => {
    password = e.target.value
    handleSubmit(e)
  }

  return (
    <div className="login-container">
      
      <form>

        <div className="inputs usernameInput">
          <label htmlFor="username">Usuario:</label>
          <input
            type="text"
            id="username"
            className="nameInputLogin"
            tabIndex="1"
            onChange={(e) => handleUserNameInput(e)}
            required
            autoFocus
          />
        </div>

        <div className={`inputs ${isHide ? "hide" : ""}`}>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            className="passwordInputLogin"
            tabIndex="2"
            onChange={(e) => handlePasswordInput(e)}
            onKeyDown={
              (e) => {
                if(e.code == "Enter" || e.key == "Enter"){
                  handleSubmit(e)
                }
              }
            }
            required
          />
        </div>

        <input 
          className={`submitLogin ${isHide ? "hide" : ""}`}
          type="button"
          value="Iniciar Sesión"
          onClick={(e) => handleSubmit(e)}
          tabIndex="3"
        />

      </form>
    </div>
  );
};

export default Login;