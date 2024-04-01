import React, { useContext, useEffect, useState } from 'react'
import "./Folder.css"

import Folderitem from '../../../../components/Folderitem/Folderitem.jsx'
// import Modal from '../../../../components/Modal/Modal.jsx'

import axios from 'axios'
import {endpointGetFolders} from "../../../../api/api.js"

import { AppContext } from '../../../../components/Provider.jsx'

import Swal from 'sweetalert2'

const Folder = ({navBarNextRef, setPageSelected, setInfoFolder, setColorFolder, handleOpenModalOnRoot}) => {
  
  const [state, setState] = useContext(AppContext)

  const [items, setItems] = useState([])


  const fetchDataFolders = async () => {
    try {
      const response = await axios.get(endpointGetFolders)
      console.log("GET: [success] fetch folders");
      setItems(response.data);
    } catch (error) {
      console.log("GET: [failed] fetch folders:" + error);
      
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Algo falló!"
      });
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
                <Folderitem setPageSelected={setPageSelected} setInfoFolder={setInfoFolder} navBarNextRef={navBarNextRef} folderData={folderData} setColorFolder={setColorFolder} key={index} indexColor={index} _id={folderData._id} />
              ))
            )
          }
        </div>
      </div>
  )
}

export default Folder