import { child, get, getDatabase, ref, set } from "firebase/database";
import { auth, db } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

interface IAccountUser {
  email: string;
  password: string;
}

export const doCreateUserWithEmailAndPassword = async (
  payload: IAccountUser
) => {
  return createUserWithEmailAndPassword(auth, payload.email, payload.password)
    .then((userCredential) => {
      const userId = JSON.parse(localStorage.getItem("currentUser") || "").user
        .uid;
      const db = getDatabase();
      console.log("userID: ", userId);

      set(ref(db, "users/" + userId), {
        email: payload.email,
      })
        .then(() => {
          console.log("Data saved successfully.");
        })
        .catch((error) => {
          console.error("Error saving data: ", error);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error creating user: ", errorCode, errorMessage);
    });
};

export const doSignInWithEmailAndPassword = (payload: IAccountUser) => {
  return signInWithEmailAndPassword(auth, payload.email, payload.password).then(
    (userCredential) => {
      const user = userCredential.user;
      const uid = user.uid;
      console.log(uid);
      console.log(auth);

      const dbRef = ref(db);
      return get(child(dbRef, "users/" + uid))
        .then((snapshot) => {
          console.log(snapshot);
          if (
            !snapshot.exists() ||
            snapshot.val().role !== "admin" ||
            snapshot.val().role == null
          ) {
            console.log("auth.ts");
            return Promise.reject(
              new Error("User is not an admin or role is null")
            );
          }

          return userCredential;
        })
        .catch((e) => console.log(e));
    }
  );
};

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;
  // add user to firestore
};

export const doSignOut = () => {
  return auth.signOut();
};

export const doPasswordReset = (email: string) => {
  return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = (password: string) => {
  return auth.currentUser ? updatePassword(auth.currentUser, password) : null;
};

export const doSendEmailVerification = () => {
  return auth.currentUser
    ? sendEmailVerification(auth.currentUser, {
        url: `${window.location.origin}/home`,
      })
    : null;
};
