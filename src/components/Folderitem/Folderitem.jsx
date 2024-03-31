import React, { useEffect, useRef, useState, useContext } from 'react'
import "./Folderitem.css"

// ICONS
import imageIcon from "../../assets/icons/imageIcon.png"
import videoIcon from "../../assets/icons/videoIcon.svg"

import Dropdown from 'react-bootstrap/Dropdown';

import backgroundColorsArray from "../../helps/colors.js"

import {deleteFolderFunction} from "../../helps/peticiones.js"

import { AppContext } from "../Provider.jsx"

const Folderitem = ({folderData, indexColor, navBarNextRef, setPageSelected, setInfoFolder, setColorFolder, _id}) => {

  const [state, setState] = useContext(AppContext)

  const [editNameState, setEditNameState] = useState(false);
  // const [nameFolderState, setNameFolderState] = useState("");
  const editNameFolder   = () => {
    // alert("edit name");

    setEditNameState(true)
  }
  const handleEditNameFolder = () => {
    editNameFolder();
  }


  const [deleteFolderState, setDeleteFolderState] = useState(false);
  const deleteFolder = async () => {

    const response = await deleteFolderFunction(_id);

    if(response) {
      console.log("DELETE: [success] delete folder");
      setState({doOnce : true, estado : true})
    } else {
      console.log("DELETE: [failed] delete folder:" + response);
    }

    setDeleteFolderState(!deleteFolderState)
  }
  const handleDeleteFolder = () => {
    deleteFolder();
  }



  const goToFolder = () => {
    navBarNextRef.current.textContent = "> " + folderData.nameFolder;

    setPageSelected(4)
    setInfoFolder(folderData)

    setColorFolder(folderItemHeaderRef.current.style.backgroundColor);
  }

  let finalName;
  if(folderData.nameFolder.length >= 12) {
    finalName = folderData.nameFolder.substring(0,12)+"...";
  } else {
    finalName = folderData.nameFolder
  }
  
  

  const folderItemHeaderRef = useRef(null);

  useEffect(() => {
    if (folderItemHeaderRef.current) {

      let indexColorFondo = indexColor;
      if(indexColor >= 6){
        indexColorFondo = indexColor - 6;
      }
      folderItemHeaderRef.current.style.backgroundColor = backgroundColorsArray[indexColorFondo];
    }

    
  }, []);

  const [contVideos, setContVideos] = useState(0)
  const [contImages, setContImages] = useState(0)

  useEffect(()=> {
    let contadorImagenes = 0;
    let contadorVideos = 0;

    folderData.files.forEach((e) => {
      if(e.type.startsWith("image")){
        contadorImagenes++;
      } else {
        contadorVideos++;
      }
    })

    setContVideos(contadorVideos);
    setContImages(contadorImagenes);

  }, [])


  return (
    <div className="folderItemContainer" >
      <div className="folderItemHeader" ref={folderItemHeaderRef} >
        <span className="folderName" onClick={() => goToFolder()} >
          {finalName}
        </span>
        <div className="folderOptionss">
          <Dropdown>
            <Dropdown.Toggle className='folderOptions'></Dropdown.Toggle>

            <Dropdown.Menu >
              {/* <Dropdown.Item onClick={() => handleEditNameFolder()}>Editar nombre</Dropdown.Item> */}
              <Dropdown.Item onClick={() => handleDeleteFolder()}>Eliminar carpeta</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      <div className="folderItemContent" >
        <div className="folderVideosItem">
          <img src={videoIcon} className="videosIcon" />
          <span className="cantititesVideosImages">
            {
              contVideos
            }
          </span>
        </div>
        <div className="folderImagesItem">
          <img src={imageIcon} className="imagesIcon" />
          <span className="cantititesVideosImages">
            {
              contImages
            }
          </span>
        </div>
      </div>  
    </div>
  )
}

export default Folderitem