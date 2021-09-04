import {
  SET_LOADING,
  CLEAR_ERROR,
  GET_INSTRUCTOR_SUCCESS,
  GET_INSTRUCTOR_FAIL,
} from "../types/type";

const initialState = {
  loading: true,
  error: null,
  instructor: null,
  success: false,
};

export const currentInstructor = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case GET_INSTRUCTOR_SUCCESS:
      return {
        ...state,
        loading: false,
        instructor: payload,
        success: true,
      };
    case GET_INSTRUCTOR_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        success: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
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
