
  import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,GoogleAuthProvider ,signInWithPopup,signOut, onAuthStateChanged, updateProfile, sendEmailVerification, updatePassword } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCM6U3ottscJD2kPp7YENweod_UCrp2xUA",
  authDomain: "mini-hackathon-72aa3.firebaseapp.com",
  projectId: "mini-hackathon-72aa3",
  storageBucket: "mini-hackathon-72aa3.firebasestorage.app",
  messagingSenderId: "330705573556",
  appId: "1:330705573556:web:e4bb590a0bc7619104a9e1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export{ getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,app,GoogleAuthProvider ,signInWithPopup,signOut, onAuthStateChanged, updateProfile, sendEmailVerification, updatePassword }