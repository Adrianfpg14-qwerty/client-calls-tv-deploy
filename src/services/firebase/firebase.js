// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
import { getFirestore } from "@firebase/firestore"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCCvAd_zm3u0mkTs10iDN7GNSkyv3VRbpY",
//   authDomain: "uploadvideos-5bd09.firebaseapp.com",
//   projectId: "uploadvideos-5bd09",
//   storageBucket: "uploadvideos-5bd09.appspot.com",
//   messagingSenderId: "231361345996",
//   appId: "1:231361345996:web:7ed7b3adbab1ba4198c569"
// };

const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);





export const storage = getStorage(app);
export const db = getFirestore(app);