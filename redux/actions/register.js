import axios from "axios";
import { REGISTER_SUCCESS, REGISTER_ERROR } from "../types/type";
import { loadUser } from "./user";
import { loadingRegister } from "./loading";

//REGISTER
export const register = (body) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    dispatch(loadingRegister());
    const { data } = await axios.post(`/api/register`, body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: data,
    });
    dispatch(loadUser());
  } catch (error) {
    dispatch({
      type: REGISTER_ERROR,
      payload: error.response.data.errors[0],
    });
  }
};
