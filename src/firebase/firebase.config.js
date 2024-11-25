import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBw6RdmS5vU1YDDhRY6cB07xqEnbJ9L27Y",
    authDomain: "lugares-monterrey.firebaseapp.com",
    databaseURL: "https://lugares-monterrey-default-rtdb.firebaseio.com",
    projectId: "lugares-monterrey",
    storageBucket: "lugares-monterrey.firebasestorage.app",
    messagingSenderId: "77851173364",
    appId: "1:77851173364:web:1471cebc33ff773ad899a1",
    measurementId: "G-Z4EKVD79PR"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Inicializar Firestore si lo usas
const auth = getAuth(app);
export {db, auth}