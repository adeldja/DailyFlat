// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6RLCb0DtJ35NY2er0DSTLzyeiDfqOpDc",
  authDomain: "dailyflat-d179c.firebaseapp.com",
  projectId: "dailyflat-d179c",
  storageBucket: "dailyflat-d179c.appspot.com",
  messagingSenderId: "559391421173",
  appId: "1:559391421173:web:d8972f1eaabbeb39410bbc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const db = getFirestore(app)
// Get a reference to the auth service
const auth = getAuth(app)

export { db, auth }