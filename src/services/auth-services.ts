import { doSignInWithEmailAndPassword } from "../firebase/auth";
import { TSignInRequest } from "../interfaces/user-interfaces";
import { ApiClient } from "./api-clients";

export const signIn = (payload: TSignInRequest) => {
  return doSignInWithEmailAndPassword(payload)
    .then((response) => Promise.resolve(response))
    .catch((error) => {
      return Promise.reject(error);
    });
};
