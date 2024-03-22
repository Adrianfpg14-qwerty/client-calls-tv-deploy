import React, { useEffect, useRef, useState } from 'react'
import "./Folderitem.css"

// ICONS
import imageIcon from "../../assets/icons/imageIcon.png"
import videoIcon from "../../assets/icons/videoIcon.svg"

import Dropdown from 'react-bootstrap/Dropdown';




let cantImages = 0;
let cantVideos = 0;



import backgroundColorsArray from "../../helps/colors.js"



// let actualColor = "";

// const contador = (data) => {
//   data.files.forEach((e) => {
//     console.log(e)
//     if(e.type == "img") {
//       // setCantImages(cantImages => cantImages + 1);
//       cantImages++;
//     } else if(e.type == "vid") {
//       // setCantVideos(cantVideos => cantVideos + 1);
//       cantVideos++;
//     }
//   });

  // console.log(cantImages)
  // console.log(cantVideos)
// }

const Folderitem = ({folderData, indexColor, navBarNextRef, setPageSelected, setInfoFolder, setColorFolder, handleDoAgain}) => {


  const [cantImages, setCantImages] = useState(0)
  const handleContadorImages = () => {
    setCantImages(cantImages => cantImages + 1)
  }

  const [cantVideos, setCantVideos] = useState(0)
  const handleContadorVideos = () => {
    setCantVideos(cantVideos => cantVideos + 1)
  }


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
  const deleteFolder = () => {
    alert("delete folder");

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
    // console.log(folderItemHeaderRef.current.style.backgroundColor)
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




  // const getCantImages = () => {
  //   return cantImages;
  // }

  // const getCantVideos = () => {
  //   return cantVideos;
  // }

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