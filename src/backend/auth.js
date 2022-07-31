import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "./firebase"

// initialize firebase authentication
const auth = getAuth()

// create a user, add information to database in users object
export async function signup(email, password, firstname='deez', lastname='nuts') {
    return createUserWithEmailAndPassword(auth, email, password).then((newUser) => {
        const user = newUser.user
        console.log('uid', user)
        setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            firstname: firstname,
            lastname: lastname,
            email: email,
            eventsRef: [],
            dateCreated: Timestamp.now()
        })
    })
}

// take to host dashboard of account
export function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
}
export function logout() {
    return signOut(auth)
}
export function useAuth() {
    const [currentUser, setCurrentUser] = useState()

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                return
            }
            try {
                const docSnap = await getDoc(doc(db, 'users', user.uid))
                if (docSnap.exists()) {
                    setCurrentUser(docSnap.data())
                } else {
                    alert('User Does Not Exist')
            }} catch(error) {
                console.log(error)
            }
        })
        return unsub
    }, [])

    return currentUser
}