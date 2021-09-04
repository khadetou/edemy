import { combineReducers } from "redux";
import { auth } from "./register";
import { user } from "./user";
import { payment } from "./payment";
import { currentInstructor } from "./instructor";

export default combineReducers({
  auth,
  user,
  payment,
  currentInstructor,
});
