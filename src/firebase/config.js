// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDsGXKc7Y475tVdHQ1ruiDk788Ny_FYcFM",
  authDomain: "tcc-findjob.firebaseapp.com",
  projectId: "tcc-findjob",
  storageBucket: "tcc-findjob.appspot.com",
  messagingSenderId: "961805959484",
  appId: "1:961805959484:web:ecb6df631fd96d03865e39",
  measurementId: "G-13VKKYK775",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
