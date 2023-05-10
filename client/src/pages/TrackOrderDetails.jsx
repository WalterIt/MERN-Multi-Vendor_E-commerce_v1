import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllOrdersUser } from "../redux/actions/order";

const TrackOrderDetails = () => {
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersUser(user._id));
  }, [dispatch]);

  const data = orders && orders.find((item) => item._id === id);

  const statusMessages = {
    Processing: "Your Order is Processing in Shop!",
    "Transfered to delivery Partner":
      "Your Order is on the way from Delivery Partner!",
    Shipping: "Your Order has been Shipped!",
    Received: "Your Order has been Delivered!",
    "On the way": "Your Order has been Shipped!",
    Delivered: "Your Order has been Delivered!",
    "Processing Refund": "Your Refund is been Processing!",
    "Refund Success": "Your Refund is Successful!",
  };

  const status = data?.status;

  return (
    <div className="w-full h-[60vh] flex justify-center items-center">
      {status && (
        <h1 className="text-center text-[20px] ">{statusMessages[status]}</h1>
      )}
    </div>
  );
};

export default TrackOrderDetails;
