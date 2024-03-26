import React, {useRef, useState} from "react";
import { useNavigate } from 'react-router-dom';
import "./Login.css"
import axios from "axios"


const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/login`, {
        username: username,
        password: password,
      })
        // Aquí manejas la respuesta. Por ejemplo, puedes almacenar un token, navegar a otra página, etc.
      console.log('Respuesta del servidor:', response);

      if(response.data == "Admin Ok"){
        navigate('/admin');
      // } else if(response.data == "Usuario Riohacha OK"){
      } else {
        // if(response)
        navigate('/clientTv/' + response.data);
      }
    } catch (error) {
      console.log('Respuesta del servidor:', error);
      // console.error('Error en la petición:', error);
      // console.log("Usuario no autenticado")
      // alert("Usuario no autenticado")
    }
  };



  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <label htmlFor="username">Usuario:</label>
          <input
            type="text"
            id="username"
            className="nameInputLogin"
            tabIndex="1"
            onChange={(e) => setUsername(e.target.value)}
            required
            autoFocus
          />
        </div>

        <div className="inputs">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            className="passwordInputLogin"
            tabIndex="2"
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={
              (e) => {
                setPassword(e.target.value)
                if(e.code == "Enter" || e.key == "Enter" || e.keyCode == 13){
                  handleSubmit(e)
                }
              }
            }
            required
          />
        </div>

        <input 
          className="submitLogin"
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