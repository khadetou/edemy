import {
  SET_LOADING_INSTRUCTOR,
  SET_LOADING_PAYMENT,
  SET_LOADING_REGISTER,
  SET_LOADING_USER,
  SET_LOADING_CREATECOURSE,
} from "../types/type";

export const loadingUser = () => (dispatch) => {
  dispatch({
    type: SET_LOADING_USER,
  });
};

export const loadingRegister = () => (dispatch) => {
  dispatch({
    type: SET_LOADING_REGISTER,
  });
};
export const loadingPayment = () => (dispatch) => {
  dispatch({
    type: SET_LOADING_PAYMENT,
  });
};
export const loadingInstructor = () => (dispatch) => {
  dispatch({
    type: SET_LOADING_INSTRUCTOR,
  });
};
export const loadingCreateCourse = () => (dispatch) => {
  dispatch({
    type: SET_LOADING_CREATECOURSE,
  });
};
