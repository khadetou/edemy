import axios from "axios";
import { loadingCreateCourse, loadingLesson, loadingVideo } from "./loading";
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
  CREATE_LESSON_SUCCESS,
  CREATE_LESSON_FAIL,
  UPLOAD_VIDEO_SUCCESS,
  UPLOAD_VIDEO_FAIL,
  SET_PROGRESS,
  DELETE_VIDEO_SUCCESS,
  DELETE_VIDEO_FAIL,
  DELETE_LESSON_FAIL,
  DELETE_LESSON_SUCCESS,
} from "../types/type";

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
export const updateCourse = (id, courseData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    dispatch(loadingCreateCourse());

    const { data } = await axios.put(`/api/course/${id}`, courseData, config);
    dispatch({
      type: UPDATE_COURSE_SUCCESS,
      payload: data,
    });
  } catch (error) {
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

    const { data } = await axios.delete(`/api/course/${id}`);
    dispatch({
      type: DELETECOURSE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETECOURSE_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Upload video
export const uploadVideo = (id, videoData) => async (dispatch) => {
  try {
    dispatch(loadingVideo());

    const { data } = await axios.post(
      `/api/course/lesson/upload-video/${id}`,
      videoData,
      {
        onUploadProgress: (e) => {
          dispatch(setProgress(Math.round((100 * e.loaded) / e.total)));
        },
      }
    );

    dispatch({
      type: UPLOAD_VIDEO_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log({ error });
    dispatch({
      type: UPLOAD_VIDEO_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Create lesson
export const createLesson = (id, lessonData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    dispatch(loadingLesson());

    const { data } = await axios.post(
      `/api/course/lesson/${id}`,
      lessonData,
      config
    );

    dispatch({
      type: CREATE_LESSON_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log({ error });
    dispatch({
      type: CREATE_LESSON_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const setProgress = (progress) => (dispatch) => {
  dispatch({
    type: SET_PROGRESS,
    payload: progress,
  });
};

//DELETE VIDEO
export const deleteVideo = (id, videoLinks) => async (dispatch) => {
  try {
    dispatch(loadingVideo());
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `/api/course/lesson/delete-video/${id}`,
      videoLinks,
      config
    );

    dispatch({
      type: DELETE_VIDEO_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log({ error });
    dispatch({
      type: DELETE_VIDEO_FAIL,
      payload: error.response.data.message,
    });
  }
};

//DELETE LESSON
export const deleteLesson = (id, lessonId) => async (dispatch) => {
  try {
    dispatch(loadingCreateCourse());

    const { data } = await axios.delete(`/api/course/lesson/${id}/${lessonId}`);
    dispatch({
      type: DELETE_LESSON_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_LESSON_FAIL,
      payload: error.response.data.message,
    });
  }
};
