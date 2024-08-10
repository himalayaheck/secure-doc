// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClgfnnjrXDb_eEObTXS2iINxhGaZiu3Ig",
  authDomain: "file-sharing-a.firebaseapp.com",
  projectId: "file-sharing-a",
  storageBucket: "file-sharing-a.appspot.com",
  messagingSenderId: "962616685246",
  appId: "1:962616685246:web:39e6617adcde8e80c2e4ef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);


export {storage,app,db};