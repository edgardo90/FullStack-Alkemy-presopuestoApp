// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import {getAuth} from "firebase/auth";//
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3Hj2ce05uTHtDJcDgrLfL3oeowSBRJVw",
  authDomain: "presopuestoapp.firebaseapp.com",
  projectId: "presopuestoapp",
  storageBucket: "presopuestoapp.appspot.com",
  messagingSenderId: "815859542479",
  appId: "1:815859542479:web:d47a69e82fe880224b4aba"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); //