import axios from "axios";
import { loginStart, loginSuccess, loginFailure } from "./userSlice";

export const login = async(dispatch, user) => {
  dispatch(loginStart());
  try {
    console.log("ewwooohahah")
    const res = await axios.post(`${process.env.REACT_APP_BACKEND_HOST}api/auth/login`, user);
    console.log(res);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};