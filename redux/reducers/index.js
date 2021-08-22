import { combineReducers } from "redux";
import { auth } from "./register";
import { user } from "./user";

export default combineReducers({
  auth,
  user,
});
