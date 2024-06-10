import { combineReducers } from "redux";
import userReducer from "./user-reducer";
import loadingReducer from "./loading-reducer";
import authReducer from "./auth-reducers";
import categoryReducer from "./category-reducers";
import notificationReducer from "./notification-reducer";

const rootReducer = combineReducers({
  user: userReducer,
  loading: loadingReducer,
  categoryReducer: categoryReducer,
  authUser: authReducer,
  notificationReducer: notificationReducer,
});

export type TRootState = ReturnType<typeof rootReducer>;

export default rootReducer;
