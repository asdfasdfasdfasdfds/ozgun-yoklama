// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDLaU1uOxIstC9gqCHLqVBZxyKDzloRlMI",
  authDomain: "obsnot-92247.firebaseapp.com",
  projectId: "obsnot-92247",
  storageBucket: "obsnot-92247.appspot.com",
  messagingSenderId: "797392609398",
  appId: "1:797392609398:web:c2540bc4fd3a202ae83f57",
  measurementId: "G-N9TPM3TG9Y",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
