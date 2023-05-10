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

  return (
    <div className="w-full h-[60vh] flex justify-center items-center">
      {data && data?.status === "Processing" ? (
        <h1 className="text-center text-[20px] ">
          Your Order is Processing in Shop!
        </h1>
      ) : data && data?.status === "Transfered to delivery Partner" ? (
        <h1 className="text-center text-[20px] ">
          Your Order is on the way from Delivery Partner!
        </h1>
      ) : data && data?.status === "Shipping" ? (
        <h1 className="text-center text-[20px] ">
          Your Order has been Shipped!
        </h1>
      ) : data && data?.status === "Received" ? (
        <h1 className="text-center text-[20px] ">
          Your Order has been Delivered!
        </h1>
      ) : data && data?.status === "On the way" ? (
        <h1 className="text-center text-[20px] ">
          Your Order has been Shipped!
        </h1>
      ) : data && data?.status === "Delivered" ? (
        <h1 className="text-center text-[20px] ">
          Your Order has been Delivered!
        </h1>
      ) : data && data?.status === "Processing Refund" ? (
        <h1 className="text-center text-[20px] ">
          Your Refund is been Processing!
        </h1>
      ) : data && data?.status === "Refund Success" ? (
        <h1 className="text-center text-[20px] ">Your Refund is Successful!</h1>
      ) : null}
    </div>
  );
};

export default TrackOrderDetails;
