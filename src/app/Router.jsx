// Librerias
import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Login from '../pages/Login/Login.jsx';
import Admin from '../pages/Admin/Admin.jsx';
import ClientTv from "../pages/ClientTv/ClientTv.jsx";


// Provider
// import ProviderData from "../providers/ProviderData.jsx"

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/admin" element={<Admin />}/>
        <Route path="/clientTv" element={<ClientTv />}/>
        <Route path="*" element={<Login />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default Router