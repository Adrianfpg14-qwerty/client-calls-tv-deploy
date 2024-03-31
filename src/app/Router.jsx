// Librerias
import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Login from '../pages/Login/Login.jsx';
import Admin from '../pages/Admin/Admin.jsx';
import ClientTv from "../pages/ClientTv/ClientTv.jsx";


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/admin" element={<Admin />}/>
        <Route path="/clientTv/:municipio" element={<ClientTv />}/>
        {/* <Route path="/clientTv" element={<ClientTv />}/> */}
      </Routes>
    </BrowserRouter>
  )
}

export default Router