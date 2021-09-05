import {
  SET_LOADING,
  PAYEMENT_SUCESS,
  PAYEMENT_FAIL,
  CLEAR_ERROR,
  LOG_OUT,
  STRIPESTATUS_SUCCESS,
  STRIPESTATUS_FAIL,
  SET_LOADING_PAYMENT,
} from "../types/type";

const initialState = {
  link: null,
  loading: true,
  error: null,
  success: null,
};

export const payment = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case PAYEMENT_SUCESS:
      return {
        ...state,
        link: payload,
        loading: false,
      };

    case STRIPESTATUS_SUCCESS:
      return {
        ...state,
        success: payload,
        loading: false,
      };
    case PAYEMENT_FAIL:
    case STRIPESTATUS_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    case SET_LOADING_PAYMENT:
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
