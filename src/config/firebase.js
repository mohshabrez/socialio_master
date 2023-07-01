// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxlgrxN3c2AH4afYedVTqb6vGVaMO_m0Q",
  authDomain: "check-auth-b0b99.firebaseapp.com",
  projectId: "check-auth-b0b99",
  storageBucket: "check-auth-b0b99.appspot.com",
  messagingSenderId: "861546145644",
  appId: "1:861546145644:web:9d481cea65672628853549",
  measurementId: "G-65C6Q5FWNH"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)

export const storage =  getStorage();

export const db = getFirestore(app)