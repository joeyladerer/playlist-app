import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { useEffect, useState } from "react";
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
const auth = getAuth()
const db = getFirestore(app)

export {db}

// AUTH FUNCTIONALITY
export function signup(email, password) {
  return createUserWithEmailAndPassword(auth, email, password)
}
export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
}
export function logout() {
  return signOut(auth)
}
export function useAuth() {
  const [currentUser, setCurrentUser] = useState()

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user))
    return unsub
  }, [])

  return currentUser
}