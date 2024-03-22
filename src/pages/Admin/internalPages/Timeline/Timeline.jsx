import React, { useEffect, useRef, useState } from 'react';
import "./Timeline.css";

// import Box from './Box/Box';
import ItemFile from "./ItemFile/ItemFile.jsx";

// import imageIcon from "../../../../assets/icons/imageIcon.png"
// import videoIcon from "../../../../assets/icons/videoIcon.svg"

import arrowRight from "../../../../assets/icons/arrow.png";

// const miArray = ["A", "B", "C", "D", "E", "F"];



import ItemFileOnFolder from './ItemFileOnFolder/ItemFileOnFolder.jsx';


let arrayTemp;
const setArray = (folders) => {

  // Carpeta videos
  arrayTemp = folders;
}







const handleDragEnterOnTemp = () => {
  // //  console.log("handleDragEnterOnTemp")
}

const handleDragOverEnterOnTemp = (e) => {
  // //  console.log("handleDragOverEnterOnTemp")
  e.preventDefault();
}

const handleDragLeaveOnTemp = () => {
  // //  console.log("handleDragLeaveOnTemp")
}









import axios from 'axios'
import {endpointFolders} from "../../../../api/api.js"
import {endpointCreateArrayEndpoint} from "../../../../api/api.js"
import {endpointGetArraySecuenceEndpoint} from "../../../../api/api.js"





let arrayAuxiliar = [];
// const arrayTemporal = [];

const Timeline = ({folders}) => {

  // const [arrayAuxiliar, setArrayAuxiliar] = useState([]);
  const [arrayTemporal, setArrayTemporal] = useState([]);


  const [items, setItems] = useState([])

  const fetchDataFolders = async () => {
    try {
      const response = await axios.get(endpointFolders)
      console.log("fetch folders done");
      console.log("response.data");
      console.log(response.data);

      

      setItems(response.data);
    } catch (error) {
      console.error('Hubo un error al obtener la carpeta:', error);
    }
  }


  

  const fetchDataArraySecuence = async () => {
    try {
      const response = await axios.get(endpointGetArraySecuenceEndpoint)
      console.log("fetch array secuence done");

      setArrayTemporal(response.data[0].files)
      arrayAuxiliar = response.data[0].files;
      // setArrayAuxiliar(response.data[0].files)

      console.log("init -----------------")
      console.log("arrayTemporal")
      console.log(response.data[0].files)
      
      console.log("arrayAuxiliar")
      console.log(arrayAuxiliar)
      console.log("end -----------------")


    } catch (error) {
      console.error('Hubo un error al obtener el array secuence:', error);
    }
  }


  useEffect(() => {

    fetchDataFolders(); 

    // setArrayTemporal([])
    fetchDataArraySecuence()
    
    // setSomethingWasDropped(!somethingWasDropped)

    setBtnsHabilitadoState(true)
  }, [])



  const pushUpdateArray = async (arrayToSet) => {

    console.log("push update array")

    console.log("arrayToSet")
    console.log(arrayToSet)

    try {
      const response = await axios.post(endpointCreateArrayEndpoint, {files: arrayToSet})
      console.log("push update-new-array done");
      console.log("response de endpoint: " + response)
      
      alert("array de videos/images actualizado")

      console.log("fetching again")
      fetchDataArraySecuence();


    } catch (error) {
      console.error('Hubo un error al actualizar el array:', error);
    }

    console.log("after")

  }
  



  const aceptarBtnRef = useRef()
  const cancelarBtnRef = useRef()
  const sincronizarBtnRef = useRef()


  const [btnsHabilitadoState, setBtnsHabilitadoState] = useState(true);
  const [btnsHabilitadoState2, setBtnsHabilitadoState2] = useState(true);


  const handleAcceptEditionArray = () => {


    setBtnsHabilitadoState2(false)
  }
  const handleCanceltEditionArray = () => {

    //  console.log("---antes--- (cancel)")
    
    
    
    
    

    if(arrayAuxiliar.length > 0){
      // arrayTemporal = arrayAuxiliar.map((e) => e) ;
      setArrayTemporal(arrayAuxiliar.map((e) => e));
    } else if(arrayAuxiliar.length == 0) {
      // arrayTemporal = [];
      setArrayTemporal([])
    }
    // setSomethingWasDropped(!somethingWasDropped)
    
    //  console.log("hiding")
    setBtnsHabilitadoState(true)      // EXCELENTE  (cancelar un solo elemento)
    setBtnsHabilitadoState2(true)

    //  console.log("---despues--- (cancel)")
    
    
    
    // 
    
  }






  


  const handleSincronizeEditionArray = () => {
    //  console.log("---antes--- (sincronize)")
    
    
    
    //  console.log("arrayTemporal")
    //  console.log(arrayTemporal)


    //  console.log("hiding")
    setBtnsHabilitadoState(true)      // EXCELENTE (sincronizado correcto)
    setBtnsHabilitadoState2(true)


    console.log("arrayTemporal ??")
    console.log(arrayTemporal)
    arrayAuxiliar = arrayTemporal.map((e) => e);

    // console.log("es o no es")
    // console.log(arrayAuxiliar)

    // console.log(arrayAuxiliar)
    // setArrayToSet(arrayAuxiliar);

    

    pushUpdateArray(arrayAuxiliar)
    
  }


  const handleDeleteFromArray = (indice) => {

    //  console.log("---antes--- (delete)")
    
    
    console.log("indice")
    console.log(indice)
    
    console.log("arrayTemporal")
    console.log(arrayTemporal)

    // arrayTemporal.splice(indice, 1)
    let newArray = [...arrayTemporal]
    newArray.splice(indice, 1);

    // setArrayTemporal(arrayTemporal.splice(indice, 1))
    setArrayTemporal(newArray)

    console.log("newArray")
    console.log(newArray)

    // setSomethingWasDropped(!somethingWasDropped)


    if(arrayAuxiliar.length > 0 && arrayTemporal.length >= 0){
      //  console.log("showing")
      setBtnsHabilitadoState(false)
    } 

    if(arrayAuxiliar.length == 0 && arrayTemporal.length == 0){
      //  console.log("hiding")
      setBtnsHabilitadoState(true)        // EXCELENTE     (delete y mostrar FINAL)
    } 

    if(arrayAuxiliar.length == 0 && arrayTemporal.length > 0){
      //  console.log("showing")
      setBtnsHabilitadoState(false)       // EXCELENTE     (delete y mostrar INICIAL)
    } 
    // } 

    // if(arrayAuxiliar.length == 0 && arrayTemporal.length == 0){
    //   setBtnsHabilitadoState(true)
    // } 


    
    
    
    
    
  }


  const handleMoveUpDownFromArray = (indice, toDo) => {
    let aux;

    if(toDo == "up") {
      if(indice == 0) return;

      const newArray = [...arrayTemporal];

      // aux = arrayTemporal[indice-1];
      // arrayTemporal[indice-1] = arrayTemporal[indice]
      // arrayTemporal[indice] = aux;

      aux = newArray[indice-1];
      newArray[indice-1] = newArray[indice]
      newArray[indice] = aux;

      setArrayTemporal(newArray)
      // setSomethingWasDropped(!somethingWasDropped)

      //  console.log("showing")
      setBtnsHabilitadoState(false)

    } else if (toDo="down") {
    
      if(indice == arrayTemporal.length-1) return;

      const newArray = [...arrayTemporal];

      // aux = arrayTemporal[indice+1];
      // arrayTemporal[indice+1] = arrayTemporal[indice]
      // arrayTemporal[indice] = aux;

      aux = newArray[indice+1];
      newArray[indice+1] = newArray[indice]
      newArray[indice] = aux;

      setArrayTemporal(newArray)

      // setSomethingWasDropped(!somethingWasDropped)

      //  console.log("showing")
      setBtnsHabilitadoState(false)
    }


  }


  // const [somethingWasDropped, setSomethingWasDropped] = useState(false);
  

  const handleDropOnTemp = () => {
    //  console.log("---antes--- (drop)")
    
    
    
    
    
    const newArray = [...arrayTemporal]

    // arrayTemporal.push(itemSelected)
    newArray.push(itemSelected)
    setArrayTemporal(newArray)

    // setSomethingWasDropped(!somethingWasDropped)

    //  console.log("showing")        
    setBtnsHabilitadoState(false)   // EXCELENTE  (drop y habilitar)


    //  console.log("---despues--- (drop)")
    
    
    
    
    

  }


  setArray(folders);

  // drag
  const [hoveredState, setHoveredState] = useState(false)
  
  const [itemSelected, setItemSelected] = useState(null)
  const [itemSelectedSobre, setItemSelectedSobre] = useState(null)

  const [actualizarState, setActualizarState] = useState(true);

  const handleSelectingItems = () => {
    // //  console.log("selecting item: " + itemSelected)
    // //  console.log("selecting item sobre: " + itemSelectedSobre)



    // const auxiliar = miArray[itemSelected];
    // miArray[itemSelected] = miArray[itemSelectedSobre]
    // miArray[itemSelectedSobre] = auxiliar;

    // setActualizarState(!actualizarState)
  }

  const temporalText = (texto, num) => {
    const temporalTexto = texto.substring(0,num)
    return temporalTexto + "..."
  }


  
  

 
  return (
    <div className='timeLineDiv'>
      
      <section className="selectFiles">
        <div className='carpetasHeader'>
          Carpetas
        </div>
        <div className='folderContenedor'>
          {
            items.length > 0 && (
              items.map((folder, index) => (
                <div key={index} className={`folderContainer personalizedColor${index}`}>
                  <div className="titleNameFolder">
                    {
                      folder.nameFolder.length > 25 ? (
                        temporalText(folder.nameFolder, 25)
                      ) : (
                        folder.nameFolder
                      )
                    }
                  </div>
                <div className="itemsFolder" >
                  {
                    folder.files.map((file, index) => (
                      <ItemFile index={index} key={index} setItemSelected={setItemSelected} setItemSelectedSobre={setItemSelectedSobre} handleSelectingItems={handleSelectingItems} file={file} temporalText={temporalText}/>
                    ))
                  }
                </div>
              </div>
              ))
            )
          }
        </div>
      </section>

      <img src={arrowRight} />

      <section className="line-selectFiles">
        <div className='carpetasHeader line-carpetasHeader'>
          {/* Linea de tiempo */}
          Lista de reproducción
        </div>
        <div className='folderContenedor line-folderContenedor'
          onDragOver={(e) => handleDragOverEnterOnTemp(e)}

          onDragEnter={handleDragEnterOnTemp}
          onDragLeave={handleDragLeaveOnTemp}
          onDrop={handleDropOnTemp}
        >
          {
            arrayTemporal.length > 0 && (
              arrayTemporal.map((elementoInfo, index) => (
                <ItemFileOnFolder key={index} temporalText={temporalText} elementoInfo={elementoInfo} index={index} handleDeleteFromArray={handleDeleteFromArray} handleMoveUpDownFromArray={handleMoveUpDownFromArray} />
              ))
            ) 
          }
        </div>
        <div className="buttonsAcciones">
          <div className='buttonsAccion-A'>
            <button className={`buttonsAction btnAccept ${btnsHabilitadoState ? "deshabilitado" : "habilitado habilitadoAccept"}`} disabled={btnsHabilitadoState} onClick={handleAcceptEditionArray}>Aceptar</button>
            <button className={`buttonsAction btnCancel ${btnsHabilitadoState ? "deshabilitado" : "habilitado habilitadoCancel"}`} disabled={btnsHabilitadoState} onClick={handleCanceltEditionArray}>Cancelar</button>
          </div>
          <div className='buttonsAccion-A'>
            <button className={`buttonsAction ${btnsHabilitadoState2 ? "deshabilitado" : "habilitado habilitadoSincronize"}`} ref={sincronizarBtnRef} disabled={btnsHabilitadoState2} onClick={handleSincronizeEditionArray}>Sincronizar</button>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Timeline