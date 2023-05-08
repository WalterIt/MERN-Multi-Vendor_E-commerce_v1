import axios from "axios";
import { server } from "../../server";

// Get All Products Shop
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

// // Delete a product of Shop
// export const deleteProductShop = (id) => async (dispatch) => {
//   try {
//     dispatch({
//       type: "deleteProductShopRequest",
//     });
//     const { data } = await axios.delete(
//       `${server}/product/delete-shop-product/${id}`
//     );

//     dispatch({
//       type: "deleteProductShopSuccess",
//       payload: data?.message,
//     });
//   } catch (error) {
//     dispatch({
//       type: "deleteProductShopFailure",
//       payload: error.response?.data?.message,
//     });
//   }
// };
