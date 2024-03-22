import React, { useEffect, useState } from 'react'
import "./Folder.css"

import Folderitem from '../../../../components/Folderitem/Folderitem.jsx'
import Modal from '../../../../components/Modal/Modal.jsx'

import axios from 'axios'
import {endpointFolders} from "../../../../api/api.js"
import {endpointCreateFolders} from "../../../../api/api.js"


const Folder = ({navBarNextRef, setPageSelected, setInfoFolder, setColorFolder}) => {
  

  const [items, setItems] = useState([])



  const fetchDataFolders = async () => {
    try {
      const response = await axios.get(endpointFolders)
      console.log("fetch folders done");
      setItems(response.data);
    } catch (error) {
      console.error('Hubo un error al obtener la carpeta:', error);
    }
  }


  useEffect(() => {
    console.log("folder selected")
    fetchDataFolders(); 
  }, [])



  

  const createFolder = async (nameFolder) => {

    try {
      const response = await axios.post(endpointCreateFolders, {nameFolder})
      console.log("push create-folder done");
      console.log("response de endpoint: " + response)
      handleCloseModal();
      fetchDataFolders();

    } catch (error) {
      console.error('Hubo un error al crear la carpeta:', error);
    }
  }





  const [createFolderState, setCreateFolderState] = useState(false);

  const handleOpenModal = () => {
    setCreateFolderState(true);
  }



  const handleCloseModal = () => {

    setCreateFolderState(false);
  }






  return (
      <div className='folder-init'>
        <div className="newItemContainer folderinitnew">
          <input className="newItem" type="button" value="+ New" onClick={() => handleOpenModal()}/>
        </div>

        <div className="folderContainers">
          {
            items.length > 0 && (
              items.map((folderData, index) => (
                <Folderitem setPageSelected={setPageSelected} setInfoFolder={setInfoFolder} navBarNextRef={navBarNextRef} folderData={folderData} setColorFolder={setColorFolder} key={index} indexColor={index} />
              ))
            )
          }
        </div>

        {
          createFolderState && (
            <Modal handleCloseModal={handleCloseModal} createFolder={createFolder} />
          )
        }

      </div>
  )
}

export default Folder