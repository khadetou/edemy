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
  CREATE_LESSON_SUCCESS,
  CREATE_LESSON_FAIL,
  SET_LOADING_LESSON,
  UPLOAD_VIDEO_SUCCESS,
  UPLOAD_VIDEO_FAIL,
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

const initialLesson = {
  lessons: null,
  loading: null,
  error: null,
};

export const lesson = (state = initialLesson, action) => {
  const { payload, type } = action;

  switch (type) {
    case CREATE_LESSON_SUCCESS:
      return {
        ...state,
        lessons: payload,
        loading: false,
      };

    case CREATE_LESSON_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    case SET_LOADING_LESSON:
      return {
        ...state,
        loading: true,
      };
    case LOG_OUT:
      return {
        ...state,
        lessons: null,
      };
    default:
      return {
        ...state,
      };
  }
};

const initialVideo = {
  video: null,
  loading: null,
  error: null,
};

export const videos = (state = initialVideo, action) => {
  const { payload, type } = action;

  switch (type) {
    case UPLOAD_VIDEO_SUCCESS:
      return {
        ...state,
        video: payload,
        loading: false,
      };

    case UPLOAD_VIDEO_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    case SET_LOADING_LESSON:
      return {
        ...state,
        loading: true,
      };
    case LOG_OUT:
      return {
        ...state,
        video: null,
      };
    default:
      return {
        ...state,
      };
  }
};
