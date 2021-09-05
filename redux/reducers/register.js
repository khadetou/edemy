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
  FORGOT_PASS_ERROR,
  RESET_PASS_ERROR,
  FORGOT_PASS_SUCCESS,
  RESET_PASS_SUCCESS,
  CLEAR_SUCCESS,
  SET_LOADING_REGISTER,
} from "../types/type";

const initialState = {
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
        user: payload,
        isAuthenticated: true,
        loading: false,
      };

    case FORGOT_PASS_SUCCESS:
    case RESET_PASS_SUCCESS:
      return {
        ...state,
        success: payload.success,
        message: payload.message,
        loading: false,
      };

    case FORGOT_PASS_ERROR:
    case RESET_PASS_ERROR:
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

    case SET_LOADING_REGISTER:
      return {
        ...state,
        loading: true,
      };

    case CLEAR_SUCCESS:
      return {
        ...state,
        message: null,
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
