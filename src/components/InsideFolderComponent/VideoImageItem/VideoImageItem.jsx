import React, {useEffect, useRef, useState} from 'react'
import "./VideoImageItem.css"

import { Button, Modal } from 'flowbite-react';

import videoIcon from "../../../assets/icons/videoIcon.svg";
import imageIcon from "../../../assets/icons/imageIcon.png"


import trash from "../../../assets/icons/trash.svg"

const deleteVideo = () => {
  alert("deleting video")
}



const VideoImageItem = ({item}) => {



  const [openModal, setOpenModal] = useState(false);

  const containerImageOrVideoRef = useRef();

  useEffect(() => {
    if(containerImageOrVideoRef.current){
      containerImageOrVideoRef.current.style.height = "4200px";
      containerImageOrVideoRef.current.style.overflow = "hidden";
    }
  }, [])

  // console.log(item)
  

  return (
    <div className="videoThumbnailContainer">
      <div className="detailsVideo"></div>
      <img src={trash} className="trashIcon" onClick={() => deleteVideo()}/>

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