import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { getDatabase, push, ref, set } from "firebase/database";

const createUser = (uid: string) => {
  const db = getDatabase();
  const usersRef = ref(db, "users");
  const newUserRef = push(usersRef);
  set(newUserRef, {
    name: name,
  })
    .then(() => {
      console.log("Data saved successfully.");
    })
    .catch((error) => {
      console.error("Error saving data: ", error);
    });
};
