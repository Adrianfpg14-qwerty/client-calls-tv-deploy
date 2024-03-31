import axios from "axios";

import {endpointDeleteFolder} from "../api/api.js"

export const deleteFolderFunction = async (_id) => {

  try {
    await axios.delete(`${endpointDeleteFolder}/${_id}`)
    return true
  } catch (error) {
    // return false
    return error
  }
}