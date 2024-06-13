// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCS7h1JKCB2F4unsaI6tsvNWEl5xBgyJqY",
  authDomain: "thaythuocdinhduong.firebaseapp.com",
  databaseURL: "https://thaythuocdinhduong-default-rtdb.firebaseio.com",
  projectId: "thaythuocdinhduong",
  storageBucket: "thaythuocdinhduong.appspot.com",
  messagingSenderId: "410567508682",
  appId: "1:410567508682:web:f4a7617d5fd3ac35466a33",
  measurementId: "G-FMVLRTHTYB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getDatabase(app);

export { app, auth, db };
