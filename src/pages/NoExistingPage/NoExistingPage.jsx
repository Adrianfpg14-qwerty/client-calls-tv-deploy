import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./NoExistingPage.css"

const NoExistingPage = () => {

  const [cont, setCont] = useState(5)
  const navigate = useNavigate();
  let intervalo;

  useEffect(() => {
    intervalo = setInterval(() => {
      setCont(currentCont => currentCont - 1);
    }, 1000);

    return () => clearInterval(intervalo);
  }, [])

  useEffect(() => {
    if(cont == 0) {
      clearInterval(intervalo);
      navigate('/login');
    }
  }, [cont])


  return (
    <>
      <div>The requested page doesn't exist</div>
      <p>Redirecting to Login in <span>{cont}...</span></p>
    </>
  )
}

export default NoExistingPage