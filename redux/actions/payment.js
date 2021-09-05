import axios from "axios";
import {
  PAYEMENT_SUCESS,
  PAYEMENT_FAIL,
  STRIPESTATUS_SUCCESS,
  STRIPESTATUS_FAIL,
} from "../types/type";
import { loadingPayment } from "./loading";

export const createInstructor = () => async (dispatch) => {
  try {
    dispatch(loadingPayment());
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

export const stripeStatus = () => async (dispatch) => {
  try {
    dispatch(loadingPayment());
    const { data } = await axios.post("/api/get-status");

    dispatch({
      type: STRIPESTATUS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log({ error });
    dispatch({
      type: STRIPESTATUS_FAIL,
      payload: error,
    });
  }
};
