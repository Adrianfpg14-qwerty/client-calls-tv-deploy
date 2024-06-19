
const API_URI = import.meta.env.VITE_SERVER_URL;



export const endpointGetFolders = 
  API_URI + "/api/folder/get-folders";
export const endpointCreateFolders = 
  API_URI + "/api/folder/create-folder";
export const endpointDeleteFolder = 
  API_URI + "/api/folder/delete-folder";



export const endpointCreateFile = 
  API_URI + "/api/folder/add-file";
export const endpointDeleteFile = 
  API_URI + "/api/folder/delete-file"



export const endpointGetArraySecuenceEndpoint = 
  API_URI + "/api/folder/get-secuence"
export const endpointCreateArrayEndpoint = 
  API_URI + "/api/folder/add-secuence"



export default API_URI;