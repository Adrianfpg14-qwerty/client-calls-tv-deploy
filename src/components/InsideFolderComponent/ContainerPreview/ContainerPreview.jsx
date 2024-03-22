import React, { useState, useRef, useEffect } from "react";
import "./ContainerPreview.css";

import editIcon from "../../../assets/icons/editIcon.png"
import aceptarIcon from "../../../assets/icons/aceptarIcon.svg"
import cancelarIcon from "../../../assets/icons/cancel.svg"

// const ContainerPreview = ({file, index, handleEnableUploadBtn}) => {
const ContainerPreview = ({file, index}) => {

  const inputNameRef = useRef();
  

  // const [editText, setEditText] = useState(false)
  const [name, setName] = useState(file.name)


  // const editNameFile = () => {
  //   setEditText(true);

  //   handleEnableUploadBtn("sumar");
  // }

  // const aceptarEdicion = () => {
  //   file.name = name + file.name.slice(-4);
  //   setEditText(false);

  //   handleEnableUploadBtn("restar");
  // }


  // useEffect(()=> {
  //   if(inputNameRef.current && editText){

  //     inputNameRef.current.value = file.name.slice(0, -4);
  //   }
  // }, [editText])



    return (
        <div className="containerAll" key={index}>
            <div className="containerImageVideo">
                {file.originalObject.type.startsWith("image") ? (
                    <img src={file.url} className="imageInContainer" />
                ) : (
                    <video width="320" height="240" controls>
                        <source src={file.url} type="video/mp4" />
                        error: Tu navegador no soporta la etiqueta de video.
                    </video>
                )}
            </div>
            <p className="editTetClass">
              { file.name.length >= 30 ? (
                  file.name.substring(0, 30) + "..."
              ) : (
                  file.name
              )}
            </p>

            <div className="progressDiv">
                <progress max="100" value={file.progress} className="progressBar"/>
                <p className="progressP">{file.progress}%</p>
            </div>
        </div>
    );
};

export default ContainerPreview;
