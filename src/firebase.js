// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCs8Izgk17Csh94TNllV4Fx7FDzLZsFs_k",
  authDomain: "task-manager-a0d53.firebaseapp.com",
  projectId: "task-manager-a0d53",
  storageBucket: "task-manager-a0d53.appspot.com",
  messagingSenderId: "1035881769437",
  appId: "1:1035881769437:web:5fba7fde448d3756f8ae34",
  measurementId: "G-YDT1B1JH3H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export {db}
