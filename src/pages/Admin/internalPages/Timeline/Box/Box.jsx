import React, { useEffect, useRef, useState } from 'react'
import "./Box.css"

const Box = ({index, info, setItemSelected, setItemSelectedSobre, handleSelectingItems}) => {

  const [hoveredState , setHoveredState] = useState(false)

  // const [itemDragged, setItemDragged] = useState(null);
  // const [itemDraggedSobre, setItemDraggedSobre] = useState(null);


  // console.log(info)
  const itemDraggedRef = useRef(null);


  // useEffect(() => {
  //   console.log(`itemDragged ahora es: ${itemDragged}`);
  // }, [itemDragged]);


  // useEffect(() => {
  //   console.log(`itemDraggedSobre ahora es: ${itemDraggedSobre}`);
  // }, [itemDraggedSobre]);
  



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


  function handleDrop () {
    // console.log("droping");
    setHoveredState(false);

    handleSelectingItems()
  }


  return (
    <div
      className={`box ${hoveredState ? "hovered" : ""}`}
      draggable="true" 
      onDragOver={(e) => handleDragOver(e)}
      onDragLeave={handleDragLeave}
      onDragEnter={handleDragEnter}

      onDragStart={handleDragStart}
      onDrop={handleDrop}

      ref={itemDraggedRef}
    >
      <div className="image">
        {info}
      </div>
    </div>
  )
}



export default Box