import axios from "axios";

import {endpointDeleteFolder} from "../api/api.js"

export const deleteFolderFunction = async (_id) => {

  try {
    await axios.delete(`${endpointDeleteFolder}/${_id}`)
    return true
  } catch (error) {
    return error
  }
}



import { endpointDeleteFile } from "../api/api.js";
export const deleteFileFunction = async (folderId, fileId) => {
  try {
    await axios.delete(`${endpointDeleteFile}/${folderId}/${fileId}`)
    return true
  } catch (error) {
    return error
  }
}