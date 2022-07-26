import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

// Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmPeUiMFCiiv6yMzM6dg-eSlFyVd_0QrY",
  authDomain: "playlist-app-15c32.firebaseapp.com",
  projectId: "playlist-app-15c32",
  storageBucket: "playlist-app-15c32.appspot.com",
  messagingSenderId: "45656067471",
  appId: "1:45656067471:web:05e6b452574492ad17cffa",
  measurementId: "G-DYVRNDRFTL"
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {db}