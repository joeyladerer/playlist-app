import { addDoc, arrayUnion, collection, doc, getDoc, updateDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from './firebase'


// create an event object and add to user events list
export async function createEvent(name, description, image, date, playlist=[], user) {
    // creates the event
    const newEvent = await addDoc(collection(db, "events"), {
        eventName: name,
        eventDescription: description,
        eventImage: image,
        eventDate: date,
        playlist: playlist,
        hostID: user.uid,
        hostFirstname: user.firstname,
        hostLastname: user.lastname
    })
    // update the event with additional information
    await updateDoc(doc(db, "events", newEvent.id), {
        eventID: newEvent.id,
        eventVotingURL: `localhost:3000/vote/${newEvent.id}`
    })
    // update the user profile to include the event
    await updateDoc(doc(db, "users", user.uid), {
        eventsRef: arrayUnion({
            eventID: newEvent.id,
            eventName: name,
            eventDescription: description,
            eventImage: image
        })
    })
    // pull the new event from the database and return
    const docSnap = await getDoc(doc(db, "events", newEvent.id))
    return docSnap.data()
}

// hook returns a promise containing the current event as a result
export async function useEvent(id) {
    const [event, setEvent] = useState()

    useEffect(() => {
        const getEvent = async () => {
            const docSnap = await getDoc(doc(db, "events", id))
            setEvent(docSnap.data())
            return event
        }
        return getEvent
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return event
}

// updates the playlist attribute after voting occurs
export async function updateEventPlaylist(eventID, playlist) {
    await updateDoc(doc(db, "events", eventID), {
        playlist: playlist
    })
}