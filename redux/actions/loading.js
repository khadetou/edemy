import { SET_LOADING } from "../types/type";

export const loading = () => (dispatch) => {
  dispatch({
    type: SET_LOADING,
  });
};
