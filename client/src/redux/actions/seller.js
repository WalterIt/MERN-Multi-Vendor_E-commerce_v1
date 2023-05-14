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
    const { data } = await axios.get(`${server}/shop/getseller`);
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

// get all sellers --- admin
export const getAllSellers = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllSellersRequest",
    });

    const { data } = await axios.get(`${server}/shop/admin-all-sellers`);

    dispatch({
      type: "getAllSellersSuccess",
      payload: data.sellers,
    });
  } catch (error) {
    dispatch({
      type: "getAllSellerFailure",
      //   payload: error.response.data.message,
    });
  }
};
