import React, {useState} from "react";
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
      console.log('Respuesta del servidor:', response.data);

      if(response.data == "Usuario Administrador OK"){
        navigate('/admin');
      } else if(response.data == "Usuario Riohacha OK"){
        navigate('/clientTv');
      }
    } catch (error) {
      // console.error('Error en la petición:', error);
      console.log("Usuario no autenticado")
      alert("Usuario no autenticado")
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
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="inputs">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            className="passwordInputLogin"
            // value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <input className="submitLogin" type="button" value="Iniciar Sesión" onClick={handleSubmit}/>
        {/* <button type="submit" className="submit">Iniciar Sesión</button> */}
        {/* <input type="button" className="submitLogin" value="" /> */}
        {/* <input type="submit" className="submit"></input> */}
      </form>
    </div>
  );
};

export default Login;