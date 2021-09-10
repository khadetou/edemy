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
  CLEAR_SUCCESS,
} from "../types/type";

const initialState = {
  loading: true,
  error: null,
  courses: null,
  course: null,
  success: false,
};

export const course = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case CREATECOURSE_SUCCESS:
      return {
        ...state,
        success: payload.success,
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
        course: payload,
        loading: false,
      };

    case UPDATE_COURSE_SUCCESS:
      return {
        ...state,
        success: payload.success,
        loading: false,
      };
    case DELETECOURSE_SUCCESS:
      return {
        ...state,
        success: payload,
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
        course: null,
        success: false,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
        success: false,
      };

    case CLEAR_SUCCESS: {
      return {
        ...state,
        success: false,
      };
    }
    default:
      return {
        ...state,
      };
  }
};