import axios from "axios";
import { server } from "../../server";

// Login Seller
export const loginSeller = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: "LoginSellerRequest",
    });
    const { data } = await axios.post(`${server}/shop/login`, formData);
    dispatch({
      type: "LoginSellerSuccess",
      payload: data?.seller,
    });
    // dispatch({
    //   type: "LoadSellerSuccess",
    //   payload: data?.seller,
    // });
  } catch (error) {
    dispatch({
      type: "LoginSellerFailure",
      payload: error.response?.data?.message,
    });
  }
};

// load seller
export const loadSeller = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadSellerRequest",
    });
    const { data } = await axios.get(`${server}/shop/getSeller`);
    dispatch({
      type: "LoadSellerSuccess",
      payload: data.seller,
    });
  } catch (error) {
    dispatch({
      type: "LoadSellerFailure",
      payload: error.response.data.message,
    });
  }
};