import React, { useEffect, useRef, useState } from 'react'
import "./Admin.css";

import axios from 'axios';

// ICONS
import profileIcon from "../../assets/icons/profile.png"
import menuIcon from "../../assets/icons/menu.svg"
import cancelIcon from "../../assets/icons/cancel.svg"
import folderIcon from "../../assets/icons/folder.svg"
import timeLineIcon from "../../assets/icons/timeLine.svg"
import tvIcon from "../../assets/icons/tv.svg"

// Internal Pages
import Folder from './internalPages/Folder/Folder';
import Timeline from './internalPages/Timeline/Timeline';
import Tv from './internalPages/Tv/Tv';

// Insides Internal Pages
import InsideFolderComponent from '../../components/InsideFolderComponent/InsideFolderComponent';

import Modal from '../../components/Modal/Modal';

import {endpointCreateFolders} from "../../api/api.js"
import {endpointDeleteFolder} from "../../api/api.js"

import Provider from "../../components/Provider.jsx"


const Admin = () => {
  const menuRef = useRef()
  const iconMenuRef = useRef()
  const navBarRef = useRef();
  const navBarNextRef = useRef();

  const [showMenu, setShowMenu] = useState(true);
  const handleShowMenu = () => {
    setShowMenu(!showMenu);

    if(showMenu){
      iconMenuRef.current.src = cancelIcon;
    } else {
      iconMenuRef.current.src = menuIcon;
    }
  }

  const [pageSelected, setPageSelected] = useState(1)

  const handleNavigation = (numberPage, textNavBar) => {
    setPageSelected(numberPage);
    navBarRef.current.textContent = textNavBar;
    navBarNextRef.current.textContent = "";
  }



  // DATA FOLDER SELECTED
  const [infoFolder, setInfoFolder] = useState({})
  const [colorFolder, setColorFolder] = useState("")

  // DATA TIMELINE SELECTED
  const [idTimeLine, setIdTimeLine] = useState({})


  // DATA TV SELECTED
  const [idTv, setIdTv] = useState({})

  const [idBox, setIdBox] = useState("");


  const createFolder = async (nameFolder) => {
    try {
      const response = await axios.post(endpointCreateFolders, {nameFolder})
      handleCloseModalOnRoot();
      return true
    } catch (error) {
      return error
    }
  }

  


  const [modalOnRoot, setOpenModalOnRoot] = useState(false)

  const handleOpenModalOnRoot = () => {
    setOpenModalOnRoot(true);
  }

  const handleCloseModalOnRoot = () => {
    setOpenModalOnRoot(false);
  }


  

  return (
    <Provider >
      <div className="pageContainer no-select">
      
        <div className={`${showMenu ? "" : "cortinaMenu"}`} onClick={() => handleShowMenu()}></div>

        <div className="header">

          <div className="leftHeader">
            <img src={menuIcon} className="menuIcon" onClick={() => handleShowMenu()} ref={iconMenuRef}/>
            <span className="nameApp">
              {/* MediCast */}
              {/* MG-TV */}
              {/* Meco-TV */}
              {/* Vox-TV */}
              Tv-Call
            </span>
            <span className="navBar" ref={navBarRef} onClick={() => {
              if(navBarRef.current.textContent == "| Carpetas"){
                setPageSelected(1)
                navBarNextRef.current.textContent = ""
              }
              if(navBarRef.current.textContent == "| Listas"){
                setPageSelected(2)
                navBarNextRef.current.textContent = ""
              }
              // if(navBarRef.current.textContent == "| TV"){
              //   setPageSelected(3)
              //   navBarNextRef.current.textContent = ""
              // }
            }}>
              {"| Carpetas"}  
            </span>
            <span className="navBarNext" ref={navBarNextRef} >
              {""}
            </span>
          </div>

          <div className="rightHeader">
            <img src={profileIcon} className="profileIcon"/>
          </div>

        </div>
        
        <div className="main">

          <div className={`menu ${showMenu ? "hided" : "desplegated"}`} ref={menuRef}>
            <div className={`itemPage ${(pageSelected === 1 || pageSelected === 4) ? "selected" : ""}`} onClick={() => {handleNavigation(1, "| Carpetas")} }>
              <span className="namePage">Carpetas</span>
              <img src={folderIcon} className="iconPage" />
            </div>

            <div className={`itemPage ${(pageSelected === 2 || pageSelected === 5) ? "selected" : ""}`} onClick={() => {handleNavigation(2, "| Linea")} }>
              <span className="namePage">Listas de reproducción</span>
              <img src={timeLineIcon} className="iconPage" />
            </div>

            {/* <div className={`itemPage ${(pageSelected === 3 || pageSelected === 6) ? "selected" : ""}`} onClick={() => {handleNavigation(3, "| TV")} }>
              <span className="namePage">TV</span>
              <img src={tvIcon} className="iconPage" />
            </div> */}

          </div>

          <div className="content">
            {pageSelected === 1 && (
              // <Folder folders={folders} navBarNextRef={navBarNextRef} setPageSelected={setPageSelected} setInfoFolder={setInfoFolder} setColorFolder={setColorFolder} />
              <Folder setIdBox={setIdBox} navBarNextRef={navBarNextRef} setPageSelected={setPageSelected} setInfoFolder={setInfoFolder} setColorFolder={setColorFolder} handleOpenModalOnRoot={handleOpenModalOnRoot} modalOnRoot={modalOnRoot}/>
            )}
            {pageSelected === 2 && (
              // <Timeline folders={folders} navBarNextRef={navBarNextRef} setPageSelected={setPageSelected}/>
              <Timeline navBarNextRef={navBarNextRef} setPageSelected={setPageSelected}/>
            )}
            {/* {pageSelected === 3 && (
              <Tv folders={folders} navBarNextRef={navBarNextRef} setPageSelected={setPageSelected}/>
            )} */}

            {pageSelected === 4 && (
              // <InsideFolderComponent navBarNextRef={navBarNextRef} infoFolder={infoFolder} colorFolder={colorFolder} />
              <InsideFolderComponent idBox={idBox} navBarNextRef={navBarNextRef} infoFolder={infoFolder} colorFolder={colorFolder} />
            )}
            {/* {pageSelected === 5 && (
              <InsideTimelineComponent navBarRef={navBarRef} />
            )}
            {pageSelected === 6 && (
              <InsideTvComponent navBarRef={navBarRef} />
            )} */}
          </div>
        </div>

        {
          modalOnRoot && (
            <Modal handleCloseModal={handleCloseModalOnRoot} createFolder={createFolder}/>
          )
        }
        
        
      </div>
    </Provider>
  )
}

export default Admin