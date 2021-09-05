import axios from "axios";
import {
  LOG_OUT,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  FORGOT_PASS_SUCCESS,
  FORGOT_PASS_ERROR,
  RESET_PASS_SUCCESS,
  RESET_PASS_ERROR,
} from "../types/type";
import { loadUser } from "./user";
import { loadingRegister } from "./loading";

//LOGIN
export const login = (body) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    dispatch(loadingRegister());
    const { data } = await axios.post(`/api/login`, body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });
    dispatch(loadUser());
  } catch (error) {
    dispatch({
      type: LOGIN_ERROR,
      payload: error.response.data.message,
    });
  }
};

//LOG OUT
export const logout = () => (dispatch) => {
  localStorage.clear();
  dispatch({
    type: LOG_OUT,
  });
};

//FORGOT PASSWORD
export const forgotPassword = (body) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    dispatch(loadingRegister());
    const { data } = await axios.post(`/api/password/forgot`, body, config);
    dispatch({
      type: FORGOT_PASS_SUCCESS,
      payload: data,
    });
    dispatch(loadUser());
  } catch (error) {
    console.log({ error });
    dispatch({
      type: FORGOT_PASS_ERROR,
      payload: error.response.data,
    });
  }
};
//RESET PASSWORD
export const resetPassword = (body, token) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    dispatch(loadingRegister());
    const { data } = await axios.put(
      `/api/password/reset/${token}`,
      body,
      config
    );
    dispatch({
      type: RESET_PASS_SUCCESS,
      payload: data,
    });
    dispatch(loadUser());
  } catch (error) {
    console.log({ error });
    dispatch({
      type: RESET_PASS_ERROR,
      payload: error.response.data.message,
    });
  }
};
