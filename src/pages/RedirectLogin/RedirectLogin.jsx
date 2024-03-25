import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import "./RedirectLogin.css"

const RedirectLogin = () => {

  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login");
  }, [])

  return (
    <>
    </>
  )
}

export default RedirectLogin