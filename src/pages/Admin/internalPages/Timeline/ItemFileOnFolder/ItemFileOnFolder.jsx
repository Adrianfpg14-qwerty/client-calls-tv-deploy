import React, { useEffect, useState } from 'react'
import "./ItemFileOnFolder.css"

import imageIcon from "../../../../../assets/icons/imageIcon.png";
import videoIcon from "../../../../../assets/icons/videoIcon.svg";
import deleteIcon from "../../../../../assets/icons/cancel.svg";

import upIcon from "../../../../../assets/icons/up.png";
import downIcon from "../../../../../assets/icons/down.png";

const ItemFileOnFolder = ({temporalText, elementoInfo, index, handleDeleteFromArray, handleMoveUpDownFromArray}) => {

 
  return (
    <div className='itemFileOnFolderStyle' draggable="false">
      <div className="iconsUpDown">
        <img src={upIcon} className='upDownIconStyle upIcon' onClick={() => handleMoveUpDownFromArray(index, "up")}/>
        <img src={downIcon} className='upDownIconStyle downIcon' onClick={() => handleMoveUpDownFromArray(index, "down")}/>
      </div>
      <div className="itemFile line-itemFile">
        <div className="dataContainer">
          <div className="nameItem">
            {
              elementoInfo.name.length > 10 ? (
                temporalText(elementoInfo.name, 10)
              ) : (
                elementoInfo.name
              )
            }
          </div>
          
          
          {
            elementoInfo.type.startsWith("image") ? (
              <img src={imageIcon} className="imagesIconStyle" />
              ) : (
              <img src={videoIcon} className="imagesIconStyle" />
            )
          }
        </div>
        {
          elementoInfo.type.startsWith("image") ? (
            // <img className='imageItem' src={elementoInfo.source} />
            <img className='imageItem' src={elementoInfo.thumbnail} />
          ) : (
            // <video className='imageItem' src={elementoInfo.source} ></video>
            <img className='imageItem' src={elementoInfo.thumbnail} />
          )
        }
      </div>
      <img src={deleteIcon} className='deleteIconStyle' onClick={() => handleDeleteFromArray(index)}/>
    </div>
  )
}

export default ItemFileOnFolder