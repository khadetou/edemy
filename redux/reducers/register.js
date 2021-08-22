import {
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  SET_LOADING,
  LOAD_USER,
  LOAD_USER_ERROR,
  CLEAR_ERROR,
  LOG_OUT,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from "../types/type";

const initialState = {
  token: null,
  isAuthenticated: null,
  loading: true,
  user: null,
  error: null,
};

export const auth = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };

    case LOAD_USER:
      return {
        ...state,
        token: localStorage.getItem("token"),
        user: payload,
        isAuthenticated: true,
        loading: false,
      };

    case LOGIN_ERROR:
    case LOG_OUT:
    case LOAD_USER_ERROR:
    case REGISTER_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        error: payload,
        loading: false,
        user: null,
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
