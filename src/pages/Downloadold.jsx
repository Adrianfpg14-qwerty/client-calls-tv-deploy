import React, { useState, useContext, useEffect } from 'react'



// api Provider
import { UrlContext } from "../providers/ProviderData.jsx";


// // Firebase
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
// // El exportado por firebase.js
// import { storage } from "../../firebase/firebase.js";





const Downloadold = () => {

  const [btnHabilited, setBtnHabilited] = useState(true);

  const [ showVideos, setShowVideos ] = useState(false);


  const [ urls, setUrls ] = useContext(UrlContext);


  const getVideos = () => {
    console.log(urls)
    if(urls.length === 0) return 
    
    setShowVideos(true);
  }


  useEffect( () => {
    if(urls.length === 0) return

    setBtnHabilited(false);

  }, [urls]) 



  return (
    <>
      <h1>Download Videos</h1>
      <p>Hay {(urls.length !== 0 ? `${urls.length} videos` : '0 videos')}</p>
      <button disabled={btnHabilited} onClick={() => getVideos()}>Descargar videos</button>
     
      {
        showVideos &&
          urls.map( (url, index) => (
            <div key={index}>
              <video width="320" height="240" controls src={url.url} />
            </div>
          ))
      }
    </>
  )
}

export default Downloadold