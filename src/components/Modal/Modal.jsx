import React, { useRef, useState } from "react";
import "./Modal.css";





const Modal = ({handleCloseModal, createFolder}) => {

    const [btnHabilitador, setBtnHabilitador] = useState(true);


    const inputNameFolderRef = useRef()

    const [nameFolder, setNameFolder] = useState("")
    const handleChangeWritingNameFolder = () => {
      setNameFolder(inputNameFolderRef.current.value)

      // console.log(inputNameFolderRef.current.value)
      if(inputNameFolderRef.current.value == "") {
        setBtnHabilitador(true)
      } else {
        setBtnHabilitador(false)
      }
    }


    const handleCreateFolder = () => {
      createFolder(nameFolder);
    }

    



    return (
        <div className="modalStyles">
            <div className="infoModal">
                <div className="modalHeader">
                    <p className="modalHeaderP">Crear carpeta</p>
                </div>
                <div className="modalBody">
                    <input
                        type="text"
                        placeholder="nombre carpeta"
                        className="nameFolderOnModalInput"
                        autoFocus={true}
                        ref={inputNameFolderRef}
                        onChange={(handleChangeWritingNameFolder)}
                    />

                    <div className="buttons">
                        <button
                            disabled={btnHabilitador}
                            className={
                              `
                                btnStylesForBtnCrear 
                                ${btnHabilitador ? "deshabilitadoOnModal" : "habilitadoOnModal"}
                              `
                            }
                            onClick={handleCreateFolder}
                        >Crear</button>
                        <button
                            className="btnStylesForBtnCancelar btnCancelarOnModal"
                            onClick={handleCloseModal}
                        >Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
