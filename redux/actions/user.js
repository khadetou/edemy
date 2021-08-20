import axios from "axios";
import setToken from "@/utils/setToken";
import { LOAD_USER, LOAD_USER_ERROR } from "../types/type";
import { loading } from "./loading";

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setToken(localStorage.token);
  }

  try {
    dispatch(loading());
    const { data } = await axios.get("http://localhost:8000/api/user/profile");
    dispatch({
      type: LOAD_USER,
      payload: data,
    });
  } catch (error) {
    console.log({ error });
    dispatch({
      type: LOAD_USER_ERROR,
      payload: error,
    });
  }
};
