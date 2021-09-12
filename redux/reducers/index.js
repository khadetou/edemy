import { combineReducers } from "redux";
import { auth } from "./register";
import { user } from "./user";
import { payment } from "./payment";
import { currentInstructor } from "./instructor";
import { course, lesson, videos } from "./course";

export default combineReducers({
  auth,
  user,
  payment,
  currentInstructor,
  course,
  videos,
  lesson,
});
