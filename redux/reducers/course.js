import {
  SET_LOADING_CREATECOURSE,
  CLEAR_ERROR,
  CREATECOURSE_SUCCESS,
  CREATECOURSE_FAIL,
  LOG_OUT,
  DELETECOURSE_SUCCESS,
  DELETECOURSE_FAIL,
  GET_COURSES_SUCCESS,
  GET_COURSES_FAIL,
  GET_COURSE_FAIL,
  GET_COURSE_SUCCESS,
  UPDATE_COURSE_SUCCESS,
  UPDATE_COURSE_FAIL,
} from "../types/type";

const initialState = {
  loading: true,
  error: null,
  courses: null,
};

export const course = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case CREATECOURSE_SUCCESS:
      return {
        ...state,
        courses: payload,
        loading: false,
      };

    case GET_COURSES_SUCCESS:
      return {
        ...state,
        courses: payload,
        loading: false,
      };
    case GET_COURSE_SUCCESS:
      return {
        ...state,
        courses: payload,
        loading: false,
      };

    case UPDATE_COURSE_SUCCESS:
      return {
        ...state,
        courses: payload,
        loaoding: false,
      };
    case DELETECOURSE_SUCCESS:
      return {
        ...state,
        courses: payload,
        loading: false,
      };
    case GET_COURSES_FAIL:
    case GET_COURSE_FAIL:
    case UPDATE_COURSE_FAIL:
    case DELETECOURSE_FAIL:
    case CREATECOURSE_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    case SET_LOADING_CREATECOURSE:
      return {
        ...state,
        loading: false,
      };
    case LOG_OUT:
      return {
        ...state,
        courses: null,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return {
        ...state,
      };
  }
};
