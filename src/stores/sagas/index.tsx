import { all, fork } from "redux-saga/effects";
import userSagas from "./user-sagas";
import authSaga from "./auth-sagas";
import categorySaga from "./category-sagas";
import notificationSaga from "./notification-sagas";

export default function* rootSaga() {
  yield all([fork(userSagas)]);
  yield all([fork(authSaga)]);
  yield all([fork(categorySaga)]);
  yield all([fork(notificationSaga)]);
}
