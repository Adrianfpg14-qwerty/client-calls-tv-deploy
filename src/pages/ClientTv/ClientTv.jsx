
import React, { useEffect, useRef, useState } from "react";
import io from 'socket.io-client';


import notificationAudio from "../../assets/audios/notificacion.mp3";
import "./ClientTv.css";

// import bell from "../../assets/icons/bell.svg";
import bell from "./bell.svg";
// import meco from "../../assets/images/meco.png"
import meco from "./meco.png"

// Weather API
// import clouds from "../../assets/images/clouds.svg";
import clouds from "./clouds.svg";

import axios from 'axios';
import {endpointGetArraySecuenceEndpoint} from "../../api/api.js"
import API_URI from "../../api/api.js"; "../../api/api.js"


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
      horasTemp -= 12;
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




  // --------- FUNCTIONS ------------
 


  // volumen video
  // const bajarVolumen = () => {

  //   if(videoRef.current.volume <= 0) return

  //   const cambioGradualVolumen = 0.2;

  //   const intervalo = setInterval(() => {

  //     let actualVolumeToSet = videoRef.current.volume - cambioGradualVolumen

  //     if(actualVolumeToSet >= 0 && actualVolumeToSet <= 0.2){
  //       videoRef.current.volume = 0;
  //       clearInterval(intervalo);
  //     } else {
  //       videoRef.current.volume = actualVolumeToSet;
  //     }
      
  //     console.log(videoRef.current.volume)
  //   }, (timeCambiandoVolume * 1000) / 5 );
  // };

  // const subirVolumen = () => {

  //   if(videoRef.current.volume >= 1) return


  //   const cambioGradualVolumen = 0.2;

  //   const intervalo = setInterval(() => {

  //     let actualVolumeToSet = videoRef.current.volume + cambioGradualVolumen

  //     if(actualVolumeToSet >= 0.8 && actualVolumeToSet <= 1){
  //       videoRef.current.volume = 1;
  //       clearInterval(intervalo);
  //     } else {
  //       videoRef.current.volume = actualVolumeToSet;
  //     }
      
  //     console.log(videoRef.current.volume)
  //   }, (timeCambiandoVolume * 1000) / 5 );

  // };


  let urlVideos = []
  let urlIndex = 0;







function Clienttv() {

  const fetchDataArraySecuence = async () => {
    try {
      const response = await axios.get(endpointGetArraySecuenceEndpoint)
      console.log("fetch array secuence done");

      urlVideos = response.data[0].files;
      urlIndex = 0;

      if(urlVideos.length == 0) return

      setCurrentUrlVideo(urlVideos[urlIndex]);

    } catch (error) {
      console.error('Hubo un error al obtener el array secuence:', error);
    }
  }


  // SOCKETs
  useEffect(() => {

    

    fetchDataArraySecuence();


    const socket = io(API_URI);
    // 'wss://www.hotelmeqo.com/server-calls-tv
    // const socket = io('wss://www.hotelmeqo.com/server-calls-tv:3100');
    // const socket = io('wss://www.hotelmeqo.com/server-calls-tv');
    // const socket = io('wss://www.hotelmeqo.com/server-calls-tv:3100', {path: '/server-calls-tv/socket.io'});

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
      // setUrlVideos(data.objeto)
      urlVideos = data.objeto;
      urlIndex = 0;
      
      if(urlVideos.length == 0) return

      setCurrentUrlVideo(urlVideos[urlIndex]);
      // videoRef.current.play();
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
 


  // ---------------------------- HOOKS ----------------------------
  const notification = useRef();
  const mecoRef = useRef();
  const cortinaRef = useRef();
  const videoRef = useRef();

  // URL VIDEOS
  // const [urlVideos, setUrlVideos] = useState([]);
  // const [urlIndex, setUrlIndex] = useState(0);
  const [currentUrlVideo, setCurrentUrlVideo] = useState('');

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
 
 


  // 
  // VIDEOS
  // const urlsVideos = videosWebm.urlVideos;
  // const urlsVideos = videosMp4.urlVideos;
  // const [urlIndex, setUrlIndex] = useState(0);

  // ---------------------------- HANDLERS ----------------------------
  function handleUrlChange () {
    // if(urlVideos.length == 1){
    //   console.log(true)
    //   setUrlIndex(0)
    //   handlePlay()
    //   return
    // }

    // urlIndex == urlVideos.length - 1
    //     ? setUrlIndex(0)
    //     : setUrlIndex(urlIndex + 1);
    if(onNotification == true) {
      setTimeout(() => {
        handleUrlChange()
      }, 1000)
    } else {
      if(urlIndex == urlVideos.length - 1){
        urlIndex = 0
      } else {
        urlIndex += 1
      }
      
      setCurrentUrlVideo(urlVideos[urlIndex])
  
      if(currentUrlVideo.type.startsWith("video")){
        setTimeout(()=>{
          videoRef.current.play();
        // }, 1000)
        }, 1000);
      }
    }

    

  };
  function handlePlay () {
      // videoRef.current.play()
      // console.log("Starting video");
  };
  function handleEnd () {
      // console.log("Ending video");
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
    
    // videoRef.current.pause();

    // if(urlVideos[urlIndex].type.startsWith("video")){
      try {
        videoRef.current.pause();
      } catch (error) {
        
      }

    // }

    setTimeout(() => {
      // if(urlVideos[urlIndex].type.startsWith("video")){
        try {
          videoRef.current.play();
        } catch (error) {
        
        }
      // }
    }, (timeShow * 1000) + (timeWait * 1000))

    // if(sePausaOno){

    // } else {
    //   bajarVolumen();

    //   setTimeout(() => {
    //     subirVolumen();
    //   }, (timeShow * 1000) + (timeWait * 1000))
    // }
    

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
    if(currentUrlVideo == "") return

    if(currentUrlVideo.type.startsWith("image")){
      setTimeout(() => {
        handleUrlChange();
      // }, 10000)      N CANTIDAD DE TIEMPO
      }, 10000)
    }
  }, [currentUrlVideo])


  return (

    <div className="allContainer">
      {
        currentUrlVideo != '' && (
          <>
            {
              currentUrlVideo.type.startsWith("image") && (
                <img src={currentUrlVideo.source} className="imgRef" alt="imgTemp" />
              )  
            }
            {
              currentUrlVideo.type.startsWith("video") && (
                <video
                  className="video"
                  ref={videoRef}
                  src={currentUrlVideo.source}
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
          <img src={clouds} alt="cloud" className="temperatura-img" />
          <span className="temperatura-grade-number">26</span>
          <span className="temperatura-grade-symbol">º</span>
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

    </div>
  );
}

export default Clienttv;
