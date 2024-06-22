import { getMessaging } from "firebase/messaging";
import { AxiosError } from "axios";
import { signIn } from "../../services/auth-services";
import { toastError } from "../../utils/notifications-utils";
import {
  signInFailureAction,
  signInRequestAction,
  signInSuccessAction,
} from "../actions/auth-actions";
import { EAuthActions } from "../actions/auth-actions/constants";
import { TSignInAction } from "../actions/auth-actions/types";
import { put, call, all, fork, takeLatest } from "redux-saga/effects";
import { TSignInResponse } from "../../interfaces/user-interfaces";

function* signInSaga({ payload, cb1 }: TSignInAction) {
  try {
    yield put(signInRequestAction());
    const response: TSignInResponse = yield call(signIn, payload);
    yield put(signInSuccessAction(response));
    cb1?.(response);
  } catch (error: any) {
    yield put(signInFailureAction(error));
    if ((error as AxiosError).response?.status == 401) {
      toastError("Email or password is invalid!!");
    } else {
      console.log(error.message);
      toastError(error.message);
    }
  }
}

function* watchOnAuth() {
  yield takeLatest(EAuthActions.SIGN_IN, signInSaga);
}

export default function* authSaga() {
  yield all([fork(watchOnAuth)]);
}
