import {
  LOAD_USER,
  LOAD_USER_ERROR,
  CLEAR_ERROR,
  LOG_OUT,
  SET_LOADING_USER,
} from "../types/type";

const initialState = {
  user: null,
  loading: null,
  error: null,
};

export const user = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case LOAD_USER:
      return {
        ...state,
        user: payload,
        loading: false,
      };

    case LOAD_USER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    case SET_LOADING_USER:
      return {
        ...state,
        loading: true,
      };

    case LOG_OUT:
      return {
        ...state,
        user: null,
        loading: false,
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
