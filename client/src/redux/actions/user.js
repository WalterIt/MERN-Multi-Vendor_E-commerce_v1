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

// Update User Information
export const updateUserInformation =
  (name, email, phoneNumber, password, avatarLink) => async (dispatch) => {
    try {
      dispatch({
        type: "updateUserInfoRequest",
      });
      const { data } = await axios.put(`${server}/user/update-user-info`, {
        name,
        email,
        phoneNumber,
        password,
        avatarLink,
      });
      dispatch({
        type: "updateUserInfoSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "updateUserInfoFailure",
        payload: error.response?.data?.message,
      });
    }
  };

// Update User Addresses
export const updateUserAddresses =
  (country, city, zipCode, address1, address2, addressType) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "updateUserAddressesRequest",
      });
      const { data } = await axios.put(`${server}/user/update-user-addresses`, {
        country,
        city,
        zipCode,
        address1,
        address2,
        addressType,
      });
      dispatch({
        type: "updateUserAddressesSuccess",
        payload: {
          successMessage: "User Address updated successfully!",
          user: data.user,
        },
      });
    } catch (error) {
      dispatch({
        type: "updateUserAddressesFailure",
        payload: error.response?.data?.message,
      });
    }
  };

// Delete User Addresses
export const deleteUserAddress = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteUserAddressesRequest",
    });
    const { data } = await axios.delete(
      `${server}/user/delete-user-address/${id}`
    );
    dispatch({
      type: "deleteUserAddressesSuccess",
      payload: {
        successMessage: "Address Deleted Successfully!",
        user: data.user,
      },
    });
  } catch (error) {
    dispatch({
      type: "deleteUserAddressesFailure",
      payload: error.response?.data?.message,
    });
  }
};

// Login Seller
export const loginSeller = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: "LoadSellerRequest",
    });
    const { data } = await axios.post(`${server}/shop/login`, formData);
    // clg(data);
    dispatch({
      type: "LoginSellerSuccess",
      payload: data.user,
    });
    dispatch({
      type: "LoadSellerSuccess",
      payload: data.seller,
    });
    // console.log(data?.user);
  } catch (error) {
    dispatch({
      type: "LoadSellerFailure",
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
