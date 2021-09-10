import axios from "axios";
import { loadingCreateCourse } from "./loading";
import {
  CREATECOURSE_SUCCESS,
  CREATECOURSE_FAIL,
  DELETECOURSE_SUCCESS,
  DELETECOURSE_FAIL,
  GET_COURSES_SUCCESS,
  GET_COURSES_FAIL,
  GET_COURSE_FAIL,
  GET_COURSE_SUCCESS,
  UPDATE_COURSE_SUCCESS,
  UPDATE_COURSE_FAIL,
} from "../types/type";
import { API_URL } from "config";

//Create course
export const createCourse = (courseData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    dispatch(loadingCreateCourse());

    const { data } = await axios.post("/api/course", courseData, config);
    dispatch({
      type: CREATECOURSE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log({ error });
    dispatch({
      type: CREATECOURSE_FAIL,
      payload: error.response.data.message,
    });
  }
};
//Get all courses
export const getAllCourses = () => async (dispatch) => {
  try {
    dispatch(loadingCreateCourse());

    const { data } = await axios.get("/api/course");
    dispatch({
      type: GET_COURSES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log({ error });
    dispatch({
      type: GET_COURSES_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Get a single course
export const getCourse = (id) => async (dispatch) => {
  try {
    dispatch(loadingCreateCourse());

    const { data } = await axios.get(`/api/course/${id}`);
    dispatch({
      type: GET_COURSE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log({ error });
    dispatch({
      type: GET_COURSE_FAIL,
      payload: error.response.data.message,
    });
  }
};

//UPDATE course
export const updateCourse = (courseData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    dispatch(loadingCreateCourse());

    const { data } = await axios.put("/api/course", courseData, config);
    dispatch({
      type: UPDATE_COURSE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log({ error });
    dispatch({
      type: UPDATE_COURSE_FAIL,
      payload: error.response.data.message,
    });
  }
};

//DELETE COURSE
export const deleteCourse = (id) => async (dispatch) => {
  try {
    dispatch(loadingCreateCourse());
    id = id.trim();
    const { data } = await axios.post(`${API_URL}course/${id}`);
    dispatch({
      type: DELETECOURSE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log({ error });
    dispatch({
      type: DELETECOURSE_FAIL,
      payload: error.response.data.message,
    });
  }
};
