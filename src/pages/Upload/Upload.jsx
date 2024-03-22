
import { useEffect, useRef, useState, useContext } from "react"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"

// El exportado por firebase.js
import { storage } from "../../services/firebase/firebase.js";

// api Provider
import { UrlContext } from "../../providers/ProviderData.jsx";

import "./Upload.css"








function Upload() {

  // const [ urls, setUrls ] = useContext(UrlContext); 

  const uploadVideos = () => {
    
    if(typeof files === 'string') return
    if(files.length === 0) return;


    console.log(files);




    // Uploading videos
    files.forEach((file, index) => {

      const fileRef = ref(storage, "videos/" + file.name);
      const uploadTask = uploadBytesResumable(fileRef, file.originalObject);

      uploadTask.on('state_changed', (snapshot) => {
        let currentProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;				
        currentProgress = Math.trunc(currentProgress);
        console.log(file.name + ": " + currentProgress);

				setFiles(prevData => {
            const updatedFiles = [...prevData];
            updatedFiles[index] = { ...updatedFiles[index], progress: currentProgress };

            return updatedFiles;
          }
        );


      }, (error) => {
        console.log("Error pai");
      }, () => {
        console.log("Success " + file.name);
        console.log(file)

        getDownloadURL(uploadTask.snapshot.ref)
        .then(downloadUrl => {
          // setUrls(downloadUrl)
            // setUrls({...urls, url: downloadUrl});
            // setUrls([...urls, {url: downloadUrl}]);
            console.log(downloadUrl)


            setUrls(prevData => {
              const updatedFiles = [...prevData, {url: downloadUrl}];
              return updatedFiles;
            }
          );
        })
      })
    })
  }






  const messageTemplates = 'Waiting for file...';
  const inputRef = useRef();
  const [ files, setFiles ] = useState(messageTemplates);
  const [btnHabilited, setBtnHabilited] = useState(true);

  // const [ file, setSelectFile ] = useState(null);




  const selectingFiles = () => {
    // console.log(inputRef.current);
    // console.log(inputRef.current.files);
    const filesArray = Array.from(inputRef.current.files)

    const fileURLs = filesArray.map(file => ({
      originalObject: file,
      name: file.name,
      url: URL.createObjectURL(file), // Crea una URL temporal para cada archivo
      progress: 0
    }));

    setFiles(fileURLs);
    setBtnHabilited(false);
  }



  useEffect(() => {
    // Revocar URLs cuando el componente se desmonte o cambie el estado
    return () => {
      if (typeof files !== 'string') {
        files.forEach(file => URL.revokeObjectURL(file.url));
      }
    };
  }, [files]);








  
  return (
    <>
      {/* 
      <div>
        <input type="file" name="" ref={inputRef} multiple onChange={() => handleOnChange()}/>
      </div> 
      
      <div>
        {
          typeof fileNames === 'string' ?
          fileNames
          :
          fileNames.map( (fileName, index) => (
            <div>
              <p key={index}>{fileName.name}</p>
              <img key={index} src={fileName.url} alt={fileName.name} />
            </div>
          ))
        }
      </div>
      
      */}

<>
      {/* <ul>
        <li><Link to="/upload">Upload Videos</Link></li>
        <li><Link to="/client-tv">Client-Tv Videos</Link></li>
      </ul> */}
      <hr />
      <main>
      <h1>Upload Videos</h1>


<div>
  <input type="file" accept="video/*" ref={inputRef} multiple onChange={selectingFiles} />
</div>

<div>
  { typeof files === 'string' ? (
    files
  ) : (
    <>
      {
        files.map( (file, index) => (
          <div key={index} >
            
            <div className="containerAll">

              <p >{file.name}</p>

              <div className="containerVideo">
                <video width="320" height="240" controls>
                <source src={file.url} type="video/mp4" />
                error: Tu navegador no soporta la etiqueta de video.
                </video>
                <button className="btnDeleteVideo">X</button>
              </div>

              </div>

              <div>
                <progress max="100" value={file.progress} />
                <p>{file.progress}%</p>
              </div>

          </div>
        ))
      }
    </>
  )
  }
</div>

<div>
  <button disabled={btnHabilited} onClick={uploadVideos}>Upload Video</button>
</div>
      </main>
    </>


      

    </>
  );
}

export default Upload
