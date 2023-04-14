import axios from "axios";
import { server } from "../../server";

// Login  user
export const loginUser = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: "LoginUserRequest",
    });
    const { data } = await axios.post(`${server}/user/login`, formData);
    dispatch({
      type: "LoginUserSuccess",
      payload: data.user,
    });
    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });

    // console.log(data?.user);
  } catch (error) {
    dispatch({
      type: "LoginUserFailure",
      payload: error.response?.data?.message,
    });
  }
};

// load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });
    const { data } = await axios.get(`${server}/user/getuser`);
    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });

    // console.log(data?.user);
  } catch (error) {
    dispatch({
      type: "LoadUserFailure",
      payload: error.response?.data?.message,
    });
  }
};

// load Seller
export const loadSeller = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadSellerRequest",
    });
    const { data } = await axios.get(`${server}/shop/getseller`);
    dispatch({
      type: "LoadSellerSuccess",
      payload: data.seller,
    });
  } catch (error) {
    dispatch({
      type: "LoadSellerFailure",
      payload: error.response?.data?.message,
    });
  }
};
