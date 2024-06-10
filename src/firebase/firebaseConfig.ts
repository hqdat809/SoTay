// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA_MYqh0qQ5IA6Xx5HrcOH92otvA3ej5zs",
  authDomain: "sotay-74bbe.firebaseapp.com",
  databaseURL: "https://sotay-74bbe-default-rtdb.firebaseio.com",
  projectId: "sotay-74bbe",
  storageBucket: "sotay-74bbe.appspot.com",
  messagingSenderId: "477511026795",
  appId: "1:477511026795:web:7d18d04f2ccb090fb6092e",
  measurementId: "G-CTNBCBSS3S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getDatabase(app);

export { app, auth, db };
