import axios from "axios";
import { loading } from "./loading";
import { GET_INSTRUCTOR_FAIL, GET_INSTRUCTOR_SUCCESS } from "../types/type";

export const getCurrentInstructor = (id) => async (dispatch) => {
  try {
    dispatch(loading());
    const { data } = await axios.get("/api/current-instructor");
    dispatch({
      type: GET_INSTRUCTOR_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_INSTRUCTOR_FAIL,
      payload: error.response.data.message,
    });
  }
};
