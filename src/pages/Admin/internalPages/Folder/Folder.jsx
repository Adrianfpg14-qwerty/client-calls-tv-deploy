import React, { useContext, useEffect, useState } from 'react'
import "./Folder.css"

import Folderitem from '../../../../components/Folderitem/Folderitem.jsx'
// import Modal from '../../../../components/Modal/Modal.jsx'

import axios from 'axios'
import {endpointFolders} from "../../../../api/api.js"

import { AppContext } from '../../../../components/Provider.jsx'


const Folder = ({navBarNextRef, setPageSelected, setInfoFolder, setColorFolder, handleOpenModalOnRoot}) => {
  
  const [state, setState] = useContext(AppContext)

  const [items, setItems] = useState([])


  const fetchDataFolders = async () => {
    try {
      const response = await axios.get(endpointFolders)
      console.log("fetch folders done");
      console.log(response.data)
      setItems(response.data);
    } catch (error) {
      console.error('Hubo un error al obtener la carpeta:', error);
    }
  }


  useEffect(() => {
    fetchDataFolders(); 
  }, [])

  
  useEffect(() => {
    if(state.doOnce && state.estado){
      setState({doOnce : false, estado : false})
      fetchDataFolders();  
    }
  }, [state])
 

  return (
      <div className='folder-init'>
        <div className="newItemContainer folderinitnew">
          <input className="newItem" type="button" value="+ New" onClick={() => handleOpenModalOnRoot()}/>
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
      </div>
  )
}

export default Folder