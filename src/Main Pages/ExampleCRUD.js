import {db} from '../firebase'
import { addDoc, collection, onSnapshot, query, Timestamp, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Button } from '@chakra-ui/react';

// CRUD: Create, Read, Update, Delete
// This component is a basic example of how to perform CRUD operations on a dataset in Firestore (only for reference)
function ExampleCRUD() {
  const [objects, setObjects] = useState([])

  // function to add object to firestore. should be pretty standard. 
  const handleClick = async (e) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, 'objects'), {
        name: 'cade',
        age: 18,
        sex: 'male',
        created: Timestamp.now()
      })
    } catch (err) {
      alert(err)
    }
  }

  // pull existing objects data
  useEffect(() => {
    const q = query(collection(db, 'objects'))
    onSnapshot(q, (querySnapshot) => {
      setObjects(querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })));
    })
  }, [])

  // update the age attribute of an object
  const handleUpdate = async (e) => {
    e.preventDefault()
    if (objects.length === 0) {
      return
    }
    const objectDocRef = doc(db, 'objects', objects[0].id)
    console.log(objectDocRef)
    try {
      await updateDoc(objectDocRef, {
        age: objects[0].data.age + 1
      })
    } catch (err) {
      alert(err)
    }
  }

  // delete the last object in the list
  const handleDelete = async () => {
    const objectDocRef = doc(db, "objects", objects[objects.length - 1].id)
    try {
      await deleteDoc(objectDocRef)
    } catch (err) {
      alert(err)
    }
  }
  // first button adds the object specified in handleclick
  // the display button prints 
  // update button adds one to the age of the first object in the list
  // delete button gets rid of the last object in the list
  return (
    <div>
      <Button onClick={handleClick}>Add Object</Button>
      <Button onClick={() => console.log(objects)}>display</Button>
      <Button onClick={handleUpdate}>  UPDATE FIRST  </Button>
      <Button onClick={handleDelete}>  DELETE LAST  </Button>
    </div>
  );
}

export default ExampleCRUD;
