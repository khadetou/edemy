import {
  SET_LOADING,
  PAYEMENT_SUCESS,
  PAYEMENT_FAIL,
  CLEAR_ERROR,
  LOG_OUT,
} from "../types/type";

const initialState = {
  link: null,
  loading: true,
  error: null,
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

    case PAYEMENT_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    case SET_LOADING:
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
