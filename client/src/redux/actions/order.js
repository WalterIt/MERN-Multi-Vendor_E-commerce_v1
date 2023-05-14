import axios from "axios";
import { server } from "../../server";

// Get All Order from an User
export const getAllOrdersUser = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllOrdersUserRequest",
    });
    const { data } = await axios.get(`${server}/order/getorders/${userId}`);

    dispatch({
      type: "getAllOrdersUserSuccess",
      payload: data?.orders,
    });
  } catch (error) {
    dispatch({
      type: "getAllOrdersUserFailure",
      payload: error.response?.data?.message,
    });
  }
};

// Get All Order from a Shop
export const getAllOrdersShop = (shopId) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllOrdersSellerRequest",
    });
    const { data } = await axios.get(
      `${server}/order/getorders-seller/${shopId}`
    );

    dispatch({
      type: "getAllOrdersSellerSuccess",
      payload: data?.orders,
    });
  } catch (error) {
    dispatch({
      type: "getAllOrdersSellerFailure",
      payload: error.response?.data?.message,
    });
  }
};

// get all orders of Admin
export const getAllAdminOrders = () => async (dispatch) => {
  try {
    dispatch({
      type: "adminAllOrdersRequest",
    });

    const { data } = await axios.get(`${server}/order/admin-all-orders`);

    dispatch({
      type: "adminAllOrdersSuccess",
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: "adminAllOrdersFailure",
      payload: error.response?.data?.message,
    });
  }
};
