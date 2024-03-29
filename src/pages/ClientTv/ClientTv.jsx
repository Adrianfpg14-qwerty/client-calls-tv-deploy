
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom"
import io from 'socket.io-client';


import notificationAudio from "../../assets/audios/notificacion.mp3";
import "./ClientTv.css";

import bell from "../../assets/icons/bell.svg"
import meco from "../../assets/images/meco.png"

// Weather API
import clouds from "../../assets/icons/clouds.svg";
import loadingGif from "../../assets/gifs/loading.gif"

import axios from 'axios';
import {endpointGetArraySecuenceEndpoint} from "../../api/api.js"
import API_URI from "../../api/api.js"; "../../api/api.js"

import {getWeatherRiohacha, getWeatherFonseca, getWeatherMaicao} from "../../helps/weather.js";

let onNotification = false;

// Horas y minutos
// Get hours & minutes
function getHoursMinutes(){
  let horasTemp = new Date().getHours();
  let minutosTemp = new Date().getMinutes();

  minutosTemp = minutosTemp < 10 ? '0' + minutosTemp : minutosTemp;

  let ampm = '';

  if(!horaMilitar) {
    if(horasTemp >= 12 && horasTemp <= 23) {
      ampm = " PM";
      
      if(horasTemp != 12){
        horasTemp -= 12;
      }
    }else {
      ampm = " AM";
    }
  }

  horasTemp = horasTemp < 10 ? '0' + horasTemp : horasTemp;

  // const minutosCompleto = minutosTemp + ampm;
  const minutosCompleto = minutosTemp;


  return [horasTemp, minutosCompleto]
}


  const diasDeLaSemana = {
    0: 'Domingo',
    1: 'Lunes',
    2: 'Martes',
    3: 'Miércoles',
    4: 'Jueves',
    5: 'Viernes',
    6: 'Sábado'
  }
  
  const mesesDelAnho = {
    0: 'Enero',
    1: 'Febrero',
    2: 'Marzo',
    3: 'Abril',
    4: 'Mayo',
    5: 'Junio',
    6: 'Julio',
    7: 'Agosto',
    8: 'Septiembre',
    9: 'Octubre',
    10: 'Noviembre',
    11: 'Diciembre'
  }

  const diaDelMes = new Date().getDate()
  const diaDeSemana = new Date().getDay();     
  const mesDelAnho = new Date().getMonth();



  // VARIABLES GLOBALES 
  // const horaMilitar = true;
  const horaMilitar = false;
  
  // tiempo cortina
  const timeShowHideCortina = 1;

  
  // notificacion
  const timeShow = 2;
  // const timeWait = 5;
  const timeWait = 10;
  const timeHide = 2;
  





  const convertToAudio = (data) => {
    const blob = new Blob([data], { type: 'audio/mp3' }); // Crea un Blob con los datos de la respuesta
    const url = URL.createObjectURL(blob);                // Crea una URL para el Blob
    const audio = new Audio(url);                         // Crea un elemento de audio con esa URLr
    return audio;
  }

  let playOrNot = true;
  const playAudio = async (data) => {
    
    if(!playOrNot) {
      setInterval(()=>{
        if(playOrNot){
          playAudio();
        }
      }, 2000)
    }

    playOrNot = false;
    const audio = await convertToAudio(data);
    const audio2 =  await convertToAudio(data);
    audio.play();
    
    setTimeout(()=> {
      audio2.play();
    }, 5000)
    
    setTimeout(()=> {
      playOrNot = true;
    }, 7000)

  }



  let urlVideos = []
  let urlIndex = 0;



function Clienttv() {

  const { municipio } = useParams();
  const [municipioText, setMunicipioText] = useState()
  const [temperature, setTemperature] = useState('')

  const fetchDataArraySecuence = async () => {
    try {
      const response = await axios.get(endpointGetArraySecuenceEndpoint)
      console.log("fetch array secuence done");
      console.log(response.data[0].files)

      urlVideos = response.data[0].files;
      urlIndex = 0;

      if(urlVideos.length == 0) return

      setcurrentUrlImageVideo(urlVideos[urlIndex]);

    } catch (error) {
      console.error('Hubo un error al obtener el array secuence:', error);
    }
  }


 
 


  // ---------------------------- HOOKS ----------------------------
  const notification = useRef();
  const mecoRef = useRef();
  const cortinaRef = useRef();
  const videoRef = useRef(null);
  const imageRef = useRef(null);

  
  const [currentUrlImageVideo, setcurrentUrlImageVideo] = useState(null);

  // NAME
  const [completeName, setCompleteName] = useState('')
  const [place, setPlace] = useState('')

  
   // FECHA
  const [day, setDay] = useState(diaDelMes)
  const [dayOfTheWeek, setDayOfTheWeek] = useState(diasDeLaSemana[diaDeSemana])
  const [month, setMonth] = useState(mesesDelAnho[mesDelAnho])
  
  // HORA
  const [horas, setHoras] = useState(getHoursMinutes()[0])
  const [minutos, setMinutos] = useState(getHoursMinutes()[1])
 
 
  // VIDEOS

  // ---------------------------- HANDLERS ----------------------------
  function handleUrlChange () {

    if(onNotification == true) {

      setTimeout(() => {
        handleUrlChange()
      }, 3000)

    } else {

      if(urlVideos.length == 0) return

      if(urlIndex == urlVideos.length - 1){
        urlIndex = 0;
      } else {
        urlIndex += 1
      }

      if(urlIndex == 0 && urlVideos.length == 1){
        if(videoRef.current){
          if(urlVideos[urlIndex].type.startsWith('video') && urlVideos[urlIndex].source == videoRef.current.src){
            videoRef.current.play();
            return
          }
        }
        if(imageRef.current){
          if(urlVideos[urlIndex].type.startsWith('image') && urlVideos[urlIndex].source == imageRef.current.src){
            return
          }
        }
      }

      // dispararAnimacion()
  
      const beforeArray = [...urlVideos]
      // setTimeout(() => {
        let conteo = 0;
        beforeArray.forEach((element, index) => {
          if(element.source == urlVideos[index].source){
            conteo += 1
          }
        })

        if(onNotification == true) {
          setcurrentUrlImageVideo(urlVideos[urlIndex])
          if(urlVideos[urlIndex].type.startsWith("video") && videoRef.current){
            videoRef.current.pause();
          }
        }else {
          if(conteo == urlVideos.length){
            setcurrentUrlImageVideo(urlVideos[urlIndex])
            // console.log("is it?")
          }
          // console.log("se ejeecuta o no?")
        }

      // }, 2000)
      
    }

  };


  function handlePlay () {
      // terminar transicion
  };
  function handleEnd () {
      // console.log("Ending video");

      // if(urlIndex == 0 && urlVideos.length == 1){
      //   if(currentUrlImageVideo.type.startsWith("video")){
      //     videoRef.current.play()
      //   }
      // }

      handleUrlChange();
  };


   // Cortina
  function showCortina () {
    cortinaRef.current.style.transition = `background-color ${timeShowHideCortina}s ease-in`;
    cortinaRef.current.style.backgroundColor = `rgba(0, 0, 0, 0.6)`;
  }
  function hideCortina () {
    cortinaRef.current.style.transition = `background-color ${timeShowHideCortina}s ease-in`;
    cortinaRef.current.style.backgroundColor = `rgba(0, 0, 0, 0)`;
  }


  function showNotification () {
    // const audioNotify = new Audio(notificationAudio);
    // audioNotify.play();

    onNotification = true;
    
    fetch(notificationAudio)
      .then(response => response.blob())
      .then(blob => {
        // Crear una URL para el Blob
        const url = URL.createObjectURL(blob);
        
        // Paso 4: Reproducir el archivo MP3
        const audio = new Audio(url);
        audio.play()
      .catch(error => console.error('Error al reproducir el audio:', error));
      
      });
    

    showCortina();
    
    // if(currentUrlImageVideo.type.startsWith("video")){
    if(urlVideos[urlIndex].type.startsWith("video") && videoRef.current){
      videoRef.current.pause();
    }


    


    // NOTIFICACION
    notification.current.style.transition = `all ${timeShow}s ease-in-out`;
    notification.current.style.transform = `translateX(${-850}px)`;

    setTimeout(()=>{
      notification.current.style.transition = `all ${timeHide}s ease-in-out`;
      notification.current.style.transform = `translateX(${850}px)`;
    }, (timeShow * 1000) + timeWait * 1000)



    // MECO
    mecoRef.current.style.transition = `all ${timeShow}s ease-in-out`;
    mecoRef.current.style.transform = `scale(1) rotate(8deg)`;

    setTimeout(()=>{
      mecoRef.current.style.animation = `mecoAnimacion ${timeWait}s infinite`;
    }, timeShow * 1000)
    
    setTimeout(()=>{
      mecoRef.current.style.animation = ``;
    },(timeShow * 1000) + (timeWait * 1000) - 500)

    setTimeout(()=>{
      mecoRef.current.style.transition = `all 1s ease-in-out`;
      mecoRef.current.style.transform = `scale(0)`;

      hideCortina();

      onNotification = false;

      if(urlVideos[urlIndex].type.startsWith("video") && videoRef.current){
        videoRef.current.play();
      }
      // if(currentUrlImageVideo.type.startsWith("video")){
      //   videoRef.current.play();
      // }

    },(timeShow * 1000) + (timeWait * 1000))

  }



 
  
  // Time
  const segundos = new Date().getSeconds();
  let waitSeconds = 60 - segundos;

  setTimeout(() => {
    setHoras(getHoursMinutes()[0])
    setMinutos(getHoursMinutes()[1])

    timerFunction();
  }, (waitSeconds * 1000));
  
  function updateDate () {
    const diaDelMes = new Date().getDate()
    setDay(diaDelMes)
  
    const diaDeSemana = new Date().getDay();   
    setDayOfTheWeek(diasDeLaSemana[diaDeSemana])  
  
    const mesDelAnho = new Date().getMonth();
    setMonth(diasDeLaSemana[mesesDelAnho[mesDelAnho]]);
  }

  function timerFunction () {
    setInterval(()=>{
      setHoras(getHoursMinutes()[0])
      setMinutos(getHoursMinutes()[1])

      let temporalDay = new Date().getDate();
      if(temporalDay > day){
        updateDate();
      }
    }, (60 * 1000))
  }
  

  

  useEffect(() => {
    if(currentUrlImageVideo == null) return

    if(currentUrlImageVideo.type.startsWith("video")){
      videoRef.current.volume = 0.3;
    } 

    if(currentUrlImageVideo.type.startsWith("image")){
      setTimeout(() => {
        handleUrlChange();
        // console.log("ejecutandose")
      // }, 10000)      N CANTIDAD DE TIEMPO
      }, 10000)
    }
  }, [currentUrlImageVideo])




  
   // SOCKETs
  useEffect(() => {

    switch(municipio){
      case "riohacha1":
      case "riohacha2":
      case "riohacha3":
        setMunicipioText("Riohacha, La Guajira")

        getWeatherRiohacha()
        .then(res => {if(res) setTemperature(res)})
        
        break;
      case "fonseca":

        setMunicipioText("Fonseca, La Guajira")

        getWeatherFonseca()
          .then(res => {if(res) setTemperature(res)})
          
        break;
      case "maicao":
        setMunicipioText("Maicao, La Guajira")

        getWeatherMaicao()
          .then(res => {if(res) setTemperature(res)})

        break; 
    }

    fetchDataArraySecuence();

    const socket = io(API_URI);
    
    console.log("Intentando conectar...");

    socket.on('connect', () => {
      console.log("Conectado");
    });

    socket.on('disconnect', () => {
      console.log("Server desconectado");
    });



    
    socket.on("call-on-tv", (data) => {
      console.log(data)

      setTimeout(()=>{
        playAudio(data.objeto);
      }, 1000)
      
      setCompleteName(data.objetoTexto.name.toUpperCase() + ' ' + data.objetoTexto.surname.toUpperCase());
      setPlace(data.objetoTexto.place.toUpperCase());
      showNotification();
    
    });

    socket.on("sendingVideos", (data) => {
      console.log(data.objeto)
      urlVideos = data.objeto;
      urlIndex = 0;
      
      if(urlVideos.length == 0) {
        setcurrentUrlImageVideo(null)
      } else {
        setcurrentUrlImageVideo(urlVideos[urlIndex]);
        if(videoRef.current){
          if(urlVideos[urlIndex].type.startsWith('video') && urlVideos[urlIndex].source == videoRef.current.src){
            videoRef.current.currentTime = 0;
            videoRef.current.play();
          }
        }
      }
    })

    socket.on("updateWeather", () => {
      getWeatherRiohacha()
        .then(res => {if(res) setTemperature(res)})
    })

    // Limpieza al desmontar el componente
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('callPatient');
      socket.disconnect();
      console.log("Desconectado y listeners removidos.");
    };

  }, []);

  const [transition, setTransition] = useState(false)
  const dispararAnimacion = () => {
    setTransition(true)
    
    setTimeout(() => {
      setTransition(false)
    }, 7000)  
  }

  return (

    <div className="allContainer">
      {
        currentUrlImageVideo != null && (
          <>
            {
              currentUrlImageVideo.type.startsWith("image") && (
                <img 
                  src={currentUrlImageVideo.source} 
                  className="imgRef" 
                  alt="imgTemp"
                  ref={imageRef}
                />
              )  
            }
            {
              currentUrlImageVideo.type.startsWith("video") && (
                <video
                  className="video"
                  ref={videoRef}
                  src={currentUrlImageVideo.source}
                  // src={urlVideos[urlIndex]}
                  onPlay={handlePlay}
                  onEnded={handleEnd}
                  autoPlay={true}
                  // controls
                  // muted={true}       // NEVER USED
                />
              )  
            }
            
          </>
        )
      }

      {/* CORTINA */}
      <div className="cortina" ref={cortinaRef}></div>


      {/* WEATHER & TIME */}
      <div className="containerTempTime">
        
        <div className="temperatura">
          {/* <img src={clouds} alt="cloud" className="temperatura-img" /> */}
          <div className="temps">
            {/* <span className="temperatura-grade-number">26</span> */}
            <span className="temperatura-grade-number">
              {
                temperature == '' ?
                  <img src={loadingGif} className="gifLoadingStyles"/>
                :
                  temperature
              }
            </span>
            <span className="temperatura-grade-symbol">º</span>
          </div>
          <span className="municipio">{municipioText}</span>
        </div>

        <div className="separador"></div>

        <div className="time">
          <span className="time-hour">{horas}:{minutos}</span>
          <span className="time-date">{dayOfTheWeek}, {day} de {month}</span>
        </div>

      </div>


      {/* MECO */}
      <img src={meco} alt="meco" className="mecoRef" ref={mecoRef}/>
      <div className="notification" ref={notification}>
        <div className="notification-symbol-container">
          <img src={bell} alt="bell" className="notification-symbol"/>
        </div>
        <div className="notification-names-container">
          <span className="namePatient">{completeName}</span>
          <div className="aBr"></div>
          <span className="nameConsultorio">{place}</span>
        </div>
      </div>

      <div className={`cortina1 ${transition ? "transicion1" : ""}`}></div>
      <div className={`cortina2 ${transition ? "transicion2" : ""}`}></div>

    </div>
  );
}

export default Clienttv;
