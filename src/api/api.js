
const API_URI = import.meta.env.VITE_SERVER_URL;


export const endpointFolders = API_URI + "/api/folder/get-folders";
export const endpointCreateFolders = API_URI + "/api/folder/create-folder";

export const endpointCreateFile = API_URI + "/api/folder/add-file";
export const endpointCreateArrayEndpoint = API_URI + "/api/folder/add-secuence"

export const endpointGetArraySecuenceEndpoint = API_URI + "/api/folder/get-secuence"

export default API_URI;