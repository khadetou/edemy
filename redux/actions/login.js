import axios from "axios";
import { LOG_OUT, LOGIN_ERROR, LOGIN_SUCCESS } from "../types/type";
import { loadUser } from "./user";
import { loading } from "./loading";

//LOGIN
export const login = (body) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    dispatch(loading());
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
