import React from "react";

import { useDispatch } from "react-redux";
import { clearCart } from "../redux/actions/cart";

const OrderSuccessPage = () => {
  const dispatch = useDispatch();

  dispatch(clearCart());

  return (
    <div className="flex h-[50vh] items-center justify-center ">
      <h5 className="text-center mb-14 text-[25px] text-[#000000a1]">
        Your order is successful 😍!!
      </h5>
    </div>
  );
};

export default OrderSuccessPage;
