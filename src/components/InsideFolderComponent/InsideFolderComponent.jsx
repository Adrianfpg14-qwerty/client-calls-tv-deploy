import React, { useRef, useEffect, useState } from 'react'

import { Button, Modal } from 'flowbite-react';
import "./InsideFolderComponent.css"

import { v4 as uuidGenerator } from 'uuid';

import VideoImageItem from "./VideoImageItem/VideoImageItem.jsx"
import uploadCloud from "../../assets/icons/uploadCloud.png"

// const items = [
//   {
//     _id: 123,
//     name: "montañas",
//     uploadDate: "",
//     duration: "",
//     size: "25 MB",
//     thumbnail: "",
//     isAnImage: true,
//     isAvideo: false,
//     source: montanhas
//   }
// ];



// El exportado por firebase.js
import { storage } from "../../services/firebase/firebase.js";

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"

import ContainerPreview from './ContainerPreview/ContainerPreview.jsx';


import axios from 'axios';
import {endpointCreateFile} from "../../api/api.js"

import {endpointFolders} from "../../api/api.js"



const InsideFolderComponent = ({infoFolder, colorFolder}) => {

  const [blobTemporal, setBlobTemporal] = useState()

  const [infoItemFolder, setInfoItemFolder] = useState([]) 
  // const [fileToSend, setFileToSend] = useState({})


  const fetchDataFolders = async () => {
    try {
      const response = await axios.get(endpointFolders)
      console.log("fetch folders done");

      const allfolders = response.data;
      
      const onlyThisFolder = allfolders.filter((elemento) => elemento._id === infoFolder._id);
      
      setInfoItemFolder(onlyThisFolder[0].files);

    } catch (error) {
      console.error('Hubo un error al obtener la carpeta:', error);
    }
  }


  useEffect(() => {
    if (headerRef.current) {
      headerRef.current.style.backgroundColor = colorFolder;
    }

    // setFileToSendState(null)

    // console.log("fetching folders")
    fetchDataFolders();
  }, []);
  

  useEffect(() => {
    console.log("infoItemFolder");
    console.log(infoItemFolder);
  }, [infoItemFolder])



  // console.log("infoFolder")
  // console.log(infoFolder)

  const [files, setFiles] = useState([])



  
  
  const pushCreateFile = async (fileToSend) => {
    
    // console.log("fileToSend")
    // console.log(fileToSend)

    // console.log("endpointCreateFile")
    // console.log(endpointCreateFile)

    try {
      const response = await axios.post(endpointCreateFile, fileToSend)
      console.log("push create-file done");
      // setInfoItemFolder(response.data);

      // setOpenModal(false)
      fetchDataFolders();

      handleSetContador();

    } catch (error) {
      console.error('Hubo un error al añadir el archivo:', error);
    }
  }







  


  
  // console.log("idBox")
  // console.log(idBox)


  
  
  // console.log(infoFolder)

  // ----- REF
  // Color header
  const headerRef = useRef();
  
  // Input div
  const inputDivRef = useRef();
  const containerAddingFilesRef = useRef()
  
  // Input files
  const inputRef = useRef();
  
  // Buttons
  const uploadButton = useRef();
  const cancelBtn = useRef();
  const finalButton = useRef();



  // ----- STATES
  const [openModal, setOpenModal] = useState(false);

  // const [habilitateBoton, setHabilitateBoton] = useState(true)
  // const [videosUploadedState, setVideosUploadedState] = useState(0);

  // 
  const [contadorVideosUploaded, setContadorVideosUploaded] = useState(0);


  // Buttons states
  const [uploadButtonEnable, setUploadButtonEnable] = useState(true);

  // Individual Btns
  const [individualEnableBtns, setIndividualEnableBtns] = useState(0);

  // show 2 or 1 button
  const [groupButtons, setGroupButtons] = useState(true);



  // ------ EFFECTS

  useEffect(() => {

    console.log("files")
    console.log(files)

    // Revocar URLs cuando el componente se desmonte o cambie el estado
    return () => {
      if (files.length !== 0) {
        files.forEach(file => URL.revokeObjectURL(file.url));
      }
    };

    

  }, [files]);

  


  useEffect(()=> {

    if(contadorVideosUploaded == files.length && files.length > 0){
      // alert("files uploaded")

      setFiles([])

      setOpenModal(false)
      setGroupButtons(false);
    }
  }, [contadorVideosUploaded])




  // ------ HANDLERS
  const handleAddFiles = () => {
    setOpenModal(true)

    setFiles([])

    setContadorVideosUploaded(0);
    setUploadButtonEnable(true)
    setIndividualEnableBtns(0);

    setGroupButtons(true);
  }

  const handleSetContador = () => {
    setContadorVideosUploaded(contadorVideosUploaded => contadorVideosUploaded + 1);
  }

  const handleuploadVideos = () => {
    uploadVideos();
  }

  const handleSelectFiles = () => {
    selectingFiles();

    setUploadButtonEnable(false);
  }
  

  const handleCancelar = () => {
    setFiles([])

    setOpenModal(false)
  }

  

  
  
  // const selectingFiles = async () => {
  //   inputDivRef.current.style.display = "none";
  //   // containerAddingFilesRef.current.style.height = "500px";
  //   containerAddingFilesRef.current.style.height = "320px";


  //   const filesArray = Array.from(inputRef.current.files)


  //   const fileURLs = [];
    
  //   filesArray.forEach((file, index) => {

  //     const img = new Image();
  //     img.src = URL.createObjectURL(file);
  //     img.onload = () => {
  //       // Crea un canvas y ajusta sus dimensiones
  //       const canvas = document.createElement('canvas');
  //       const ctx = canvas.getContext('2d');
  //       canvas.width = 100; // Anchura deseada del thumbnail
  //       canvas.height = 100; // Altura deseada del thumbnail
    
  //       // Dibuja la imagen en el canvas, ajustando su tamaño
  //       ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    
  //       // Convierte el canvas a blob
  //       canvas.toBlob(blob => {
  //         console.log("blob")
  //         console.log(blob)

  //         console.log("what the hell is file")
  //         console.log(file)

  //         fileURLs.push({
  //           originalObject: file,
  //           name: file.name,
  //           url: URL.createObjectURL(file), // Crea una URL temporal para cada archivo
  //           thumbnail: blob,
  //           progress: 0
  //         })
         
  //         if(index == filesArray.length - 1){
  //           setFiles(fileURLs)
  //         }



  //       }, 'image/jpeg', 0.95); // Ajusta el formato y calidad según necesites
  //     }
  //   });

  //   const setter = () => {

  //   }
    
  //   // setFiles(fileURLs);

    

  //   // const fileURLs = filesArray.map(file => ({
  //   //   originalObject: file,
  //   //   name: file.name,
  //   //   url: URL.createObjectURL(file), // Crea una URL temporal para cada archivo
  //   //   progress: 0
  //   // }));

  //   // setFiles(fileURLs);
  // }

  const selectingFiles = async () => {
    inputDivRef.current.style.display = "none";
    containerAddingFilesRef.current.style.height = "320px";
  
    const filesArray = Array.from(inputRef.current.files);

    const promises = filesArray.map(file => {

      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = URL.createObjectURL(file);

        console.log("file - newOne")
        console.log(file)

        if(file.type.startsWith("image")){

          img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = 100; // Anchura deseada del thumbnail
            canvas.height = 100; // Altura deseada del thumbnail
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            canvas.toBlob(blob => {
              resolve({
                originalObject: file,
                name: file.name,
                url: URL.createObjectURL(file), // Crea una URL temporal para cada archivo
                thumbnail: blob, // Este es el blob del thumbnail
                progress: 0
              });
            }, 'image/png', 0.95);
          };
          img.onerror = reject;

        } else {

          
          const video = document.createElement('video');
          video.preload = 'metadata';
          video.src = URL.createObjectURL(file);

          console.log("llego hasta aquí por lo menos?")

          video.onloadedmetadata = () => {
            URL.revokeObjectURL(video.src); // Clean up the URL object
            if (video.duration > 0) {
              // Seek to a second of the video to ensure we have a frame
              // video.currentTime = Math.min(Math.max(1, video.duration / 2), video.duration - 1);
              video.currentTime = 5;
            }
          };

          console.log("llego hasta aquí por lo menos? 2")

          video.onseeked = () => {
            
            console.log("llego hasta aquí por lo menos? 3")
            
            const canvas = document.createElement('canvas');
            canvas.width = 100; // Set thumbnail size
            canvas.height = 100;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            canvas.toBlob(blob => {
              resolve({
                originalObject: file,
                name: file.name,
                url: URL.createObjectURL(file), // Crea una URL temporal para cada archivo
                thumbnail: blob, // Este es el blob del thumbnail
                progress: 0
              });
            }, 'image/png', 0.95);

          };

        }

      });
    });
  
    Promise.all(promises).then(fileObjects => {
      setFiles(fileObjects);
    }).catch(error => {
      console.error("Error al procesar los archivos:", error);
    });
  };
  




  


  const uploadVideos = () => {
    
    if(files.length === 0)  return;

    
    // Uploading videos
    files.forEach((file, index) => {
      
      // console.log(file.originalObject)
      
      const nameUuid = uuidGenerator();
      
      // const fileRef = ref(storage, "videos/" + file.name);
      const fileRef = ref(storage, "archivos/" + nameUuid);
      const uploadTask = uploadBytesResumable(fileRef, file.originalObject);

      uploadTask.on('state_changed', (snapshot) => {
        let currentProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;				
        currentProgress = Math.trunc(currentProgress);
        // console.log(file.name + ": " + currentProgress);

				setFiles(prevData => {
            const updatedFiles = [...prevData];
            updatedFiles[index] = { ...updatedFiles[index], progress: currentProgress };

            return updatedFiles;
          }
        );

        


      }, (error) => {
        console.log("Error rey" + error);
      }, () => {
        // console.log("Success " + file.name);
        
        
        

        getDownloadURL(uploadTask.snapshot.ref)
        .then(downloadUrl => {
            // setUrls(downloadUrl)
            // setUrls({...urls, url: downloadUrl});
            // setUrls([...urls, {url: downloadUrl}]);
            // console.log(downloadUrl)
            // ENVIAR A BASE DE DATOS
            
            // console.log("info File")
            // console.log(file)
            // console.log(infoFolder)
            // console.log(infoFolder._id)

            
            // SENDING THUMBNAIL
            const nameUuidForThumbnail = uuidGenerator();
            const fileRefForThumbnail = ref(storage, "thumbnails/" + nameUuidForThumbnail);

            console.log(file.thumbnail)
            const uploadTaskForThumbnail = uploadBytesResumable(fileRefForThumbnail, file.thumbnail);

            uploadTaskForThumbnail.on('state_changed', (snapshot) => {
            }, (error) => {
              console.log("error con thumbnails")
            }, () => {
              getDownloadURL(uploadTaskForThumbnail.snapshot.ref)
              .then(downloadUrlForThumbnail => {

                const size = file.originalObject.size/1000000;
                const objectToSend = {
                    folderId: infoFolder._id,
                    name: file.name,
                    size: parseFloat(size.toFixed(2)),
                    type: file.originalObject.type,
                    source: downloadUrl,
                    thumbnail: downloadUrlForThumbnail
                }
                
                console.log(objectToSend)
                
                pushCreateFile(objectToSend);
              })
            })

            // file.originalObject.size viene en Bytes => pasalo a MBytes
            // const size = file.originalObject.size/1000000;
            // const objectToSend = {
            //     folderId: infoFolder._id,
            //     name: file.name,
            //     size: parseFloat(size.toFixed(2)),
            //     type: file.originalObject.type,
            //     source: downloadUrl,
            // }

            
            // pushCreateFile(objectToSend);
            
            

            // ENDPOINT QUE EMITE
            // axios.post(`${SERVER_URL}/uploadVideoUrl`, {
            //   url: downloadUrl
            // })
            // .then(response => {
            //   // Aquí manejas la respuesta. Por ejemplo, puedes almacenar un token, navegar a otra página, etc.
            //   console.log('Respuesta del servidor:', response.data);      
              
            //   handleSetContador();
              
            // })
            // .catch(error => {
            //   // Manejar posibles errores
            //   console.error('Error en la petición:', error);
            // });


        })
      })
    })
  }


  return (
    <div className="videoContainers">

      <div className="headerVideoContainer" ref={headerRef}>
        {infoFolder.nameFolder}
      </div>

      <div className="newItemContainer">
        <input className="newItem" type="button" value="+ New" onClick={() => handleAddFiles()}/>
      </div>

      <div className="contentVideoContainer">
        {
          infoItemFolder.length > 0 && (
            infoItemFolder.map((item, index) => (
              <VideoImageItem item={item} key={index} />
            ))
          )
        }
      </div>

      
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header className='p-3 justify-center items-center'>
          Subir archivos
        </Modal.Header>
        <Modal.Body>
          <div className='containerAddingFiles' ref={containerAddingFilesRef}>
            <div className='inputDiv' ref={inputDivRef}>
              <img src={uploadCloud} />
              <input type="file" accept="image/jpg, image/png, image/jpeg, image/*, video/mp4" multiple ref={inputRef} onChange={handleSelectFiles} />
            </div>

            <div className='divContainerPreviews'f>
              { files.length != 0 && (
                  <>
                    {
                      files.map( (file, index) => (
                        <ContainerPreview file={file} index={index} key={index} />
                        // <ContainerPreview file={file} index={index} handleEnableUploadBtn={handleEnableUploadBtn} key={index} />
                        // <ContainerPreview file={file} index={index} key={index}/>
                      ))
                    }
                  </>
                )
              }
            </div>

          </div>
        </Modal.Body>
        <Modal.Footer>
          
          {
            groupButtons ? (
              <>
                <Button 
                  onClick={() => handleuploadVideos()} 
                  disabled={uploadButtonEnable}
                  ref={uploadButton} 
                >
                  Subir
                </Button>

                <Button color="gray" 
                  onClick={handleCancelar} 
                  ref={cancelBtn}
                  >
                  Cancelar
                </Button>
              </>
            ) : (
              <Button 
                onClick={handleCancelar} 
                ref={finalButton} 
              >
                Aceptar
              </Button>
            )

          }
          
         

        </Modal.Footer>
      </Modal>

    </div>
  )
}

export default InsideFolderComponent