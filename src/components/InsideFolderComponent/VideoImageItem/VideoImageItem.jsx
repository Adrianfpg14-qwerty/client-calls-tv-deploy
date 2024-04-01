import React, {useEffect, useRef, useState, useContext} from 'react'
import "./VideoImageItem.css"

import { Button, Modal } from 'flowbite-react';

import videoIcon from "../../../assets/icons/videoIcon.png";
import imageIcon from "../../../assets/icons/imageIcon.png"


import trash from "../../../assets/icons/trash.svg"


import {deleteFileFunction} from "../../../helps/peticiones.js"

import { AppContext } from '../../Provider.jsx'

import Swal from 'sweetalert2'

import { storage } from "../../../services/firebase/firebase.js";
import { deleteObject, ref } from 'firebase/storage';





const VideoImageItem = ({item, folderId}) => {
  
  const [state, setState] = useContext(AppContext)

  const deleteFileFromFirebase = () => {

    const fileRef = ref(storage, "archivos/" + item.idArchivoFirebase);
    const thumbnailRef = ref(storage, "thumbnails/" + item.idFileThumbnailFirebase);
  
    deleteObject(fileRef)
      .then(() => {
        console.log('Archivo eliminado correctamente.');
      })
      .catch((error) => {
        console.error('Error al eliminar el archivo:', error);
      });
  
    deleteObject(thumbnailRef)
      .then(() => {
        console.log('Archivo eliminado correctamente.');
      })
      .catch((error) => {
        console.error('Error al eliminar el archivo:', error);
      });
  }

  const deleteFile = () => {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: true
    });
    swalWithBootstrapButtons.fire({
      title: "Eliminar archivo",
      text: "No se puede revertir este cambio",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, eliminalo",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33"
    }).then(async (result) => {
      if (result.isConfirmed) {

        const response = await deleteFileFunction(folderId, item._id);

        if(response) {
          console.log("DELETE: [success] delete file");
          setState({doOnce : true, estado : true})

          deleteFileFromFirebase()

          if (result.isConfirmed) {
            Swal.fire({
              title: "Eliminado!",
              text: "Tu archivo ha sido eliminado.",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Algo falló!"
          });
          console.log("DELETE: [failed] delete file:" + response);
        }
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        // swalWithBootstrapButtons.fire({
        //   title: "Cancelado",
        //   text: "Your imaginary file is safe :)",
        //   icon: "error"
        // });
      }
    });
   
  }

  const [openModal, setOpenModal] = useState(false);

  const containerImageOrVideoRef = useRef();

  useEffect(() => {
    if(containerImageOrVideoRef.current){
      containerImageOrVideoRef.current.style.height = "4200px";
      containerImageOrVideoRef.current.style.overflow = "hidden";
    }
  }, [])

  

  return (
    <div className="videoThumbnailContainer">
      <div className="detailsVideo"></div>
      <img src={trash} className="trashIcon" onClick={() => deleteFile()}/>

      {/* <img src={item.source} className="thumbnail" onClick={() => setOpenModal(true)}/> */}
      {
        // item.isAnImage ? 
        item.type.startsWith("image") ? (
          <>
            {/* <img src={item.source} className='thumbnail' onClick={() => setOpenModal(true)}/> */}
            <img src={item.thumbnail} className='thumbnail' onClick={() => setOpenModal(true)}/>
            <img src={imageIcon} className='ubicacionPorPosition ubicacionPorPosition-image' />
          </>
        ) : (
          <>
            {/* <video src={item.source} className='thumbnail' onClick={() => setOpenModal(true)}/> */}
            <img src={item.thumbnail} className='thumbnail' onClick={() => setOpenModal(true)}/>
            {/* <video src={item.thumbnail} className='thumbnail' onClick={() => setOpenModal(true)}/> */}
            <img src={videoIcon} className='ubicacionPorPosition ubicacionPorPosition-video' />
          </>
          
        )
      }
      
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header className='p-3 justify-center items-center'>
          {item.name}
        </Modal.Header>
        <Modal.Body>
          {
            <div className="containerImageOrVideo" ref={containerImageOrVideoRef}>
              <div className="containerIv">
                {
                  item.type.startsWith("image") ? (
                    <>
                      <img src={item.source} className='imageClass'/>
                      <div className="info">
                        <p>Nombre: <span>{item.name}</span> </p>
                        <p>Tamaño:<span>{item.size + " MB"}</span></p>
                      </div>
                    </>
                  ) : (
                    <>
                      <video src={item.source} controls className='videoClass'/>
                      <div className="info">
                        <p>Nombre: <span>{item.name}</span> </p>
                        <p>Tamaño:<span>{item.size + " MB"}</span></p>
                      </div>
                    </>
                  )
                }
              </div>
            </div>
            
          }
        </Modal.Body>
        {/* <Modal.Footer>
          <Button onClick={() => setOpenModal(false)}>Salir</Button>
        </Modal.Footer> */}
      </Modal>

    </div>
  )
}

export default VideoImageItem