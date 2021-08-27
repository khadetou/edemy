import { combineReducers } from "redux";
import { auth } from "./register";
import { user } from "./user";
import { payment } from "./payment";

export default combineReducers({
  auth,
  user,
  payment,
});
