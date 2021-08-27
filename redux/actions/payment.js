import axios from "axios";
import { PAYEMENT_SUCESS, PAYEMENT_FAIL } from "../types/type";
import { loading } from "./loading";

export const createInstructor = () => async (dispatch) => {
  try {
    dispatch(loading());
    const { data } = await axios.post("/api/instructor");

    dispatch({
      type: PAYEMENT_SUCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PAYEMENT_FAIL,
      payload: error,
    });
  }
};
