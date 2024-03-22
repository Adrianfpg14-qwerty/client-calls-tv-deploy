import React, { useEffect, useRef, useState } from 'react'
import "./ItemFile.css"

import imageIcon from "../../../../../assets/icons/imageIcon.png"
import videoIcon from "../../../../../assets/icons/videoIcon.svg"




const ItemFile = ({index, file, setItemSelected, setItemSelectedSobre, handleSelectingItems, temporalText}) => {

  const [hoveredState , setHoveredState] = useState(false)

  const itemDraggedRef = useRef(null);


  function handleDragOver (e) {
    e.preventDefault();

    setHoveredState(true)

    // setItemDraggedSobre(index)
  }

  function handleDragLeave () {
    setHoveredState(false)
  }



  function handleDragEnter () {
    // console.log("dragging over: " + index)
    setHoveredState(true)

    setItemSelectedSobre(index)
  }


  function handleDragStart () {
    // console.log("dragging " + index)

    itemDraggedRef.current = index; // Actualizar la referencia
    setItemSelected(index);
  }


  // DONE
  function handleDragStartNew (){
    setItemSelected(file);
  }


  function handleDrop () {
    // console.log("droping");
    setHoveredState(false);

    handleSelectingItems()
  }


  return (
    <div
      // className={`box ${hoveredState ? "hovered" : ""}`}
      className={`itemFile ${hoveredState ? "hovered" : ""}`}
      draggable="true" 
      onDragOver={(e) => handleDragOver(e)}
      onDragLeave={handleDragLeave}
      onDragEnter={handleDragEnter}
      onDrop={handleDrop}

      // onDragStart={handleDragStart}


      onDragStart={handleDragStartNew}

      ref={itemDraggedRef}
    >
       <div className="dataContainer">
        <div className="nameItem">
          {
            file.name.length > 10 ? (
              temporalText(file.name, 10)
            ) : (
              file.name
            )
          }
        </div>
        
        
        {
          file.type.startsWith("image") ? (
            <img src={imageIcon} className="imagesIconStyle" />
            ) : (
            <img src={videoIcon} className="imagesIconStyle" />
          )
        }
      </div>
      {
        file.type.startsWith("image") ? (
          // <img className='imageItem' src={file.source} />
          <img className='imageItem' src={file.thumbnail} />
        ) : (
          // <video className='imageItem' src={file.source} ></video>
          <img className='imageItem' src={file.thumbnail} />
        )
      }
    </div>
  )
}



export default ItemFile