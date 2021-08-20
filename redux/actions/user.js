import axios from "axios";
import setToken from "@/utils/setToken";
import { LOAD_USER, LOAD_USER_ERROR } from "../types/type";
import { loading } from "./loading";

export const loadUser = () => async (dispatch) => {
  try {
    if (localStorage.token) {
      setToken(localStorage.token);
    }
    dispatch(loading());
    const { data } = await axios.get("http://localhost:8000/api/user/profile");
    dispatch({
      type: LOAD_USER,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_USER_ERROR,
      payload: error,
    });
  }
};
