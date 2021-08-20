import { LOG_OUT } from "../types/type";
//LOG OUT
export const logout = () => (dispatch) => {
  localStorage.clear();
  dispatch({
    type: LOG_OUT,
  });
};
