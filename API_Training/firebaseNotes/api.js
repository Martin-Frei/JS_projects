/**
 * Firebase Notes Application
 * This application allows users to register, log in, and manage their notes using Firebase.
 */
import { firebaseConfig } from "./apikey.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);