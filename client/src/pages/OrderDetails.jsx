import { Link, useParams } from "react-router-dom";
import styles from "../styles/styles";
import { BsFillBagFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllOrdersUser } from "../redux/actions/order";

const OrderDetails = () => {
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrdersUser(user._id));
  }, [dispatch]);

  const data = orders && orders.find((item) => item._id === id);

  const handleOrderUpdateStatus = (e) => {
    e.preventDefault();
  };

  return (
    <div className={`${styles.section} py-4 px-6 min-h-screen`}>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <BsFillBagFill size={30} color="crimson" />
          <h1 className="pl-2 text-[25px] ">Order Details</h1>
        </div>
      </div>
      <div className="w-full flex items-center justify-between pt-6">
        <h5 className="text-[#000b] ">
          Order ID: <span className="">{data?._id} </span>
        </h5>
        <h5 className="text-[#000b] ">
          Placed On: <span className="">{data?.createdAt.slice(0, 19)} </span>
        </h5>
      </div>
      {/* ORDER ITEMS */}
      {data &&
        data?.cart.map((item, i) => (
          <div className="flex w-full items-start py-5">
            <img
              src={item.images[0]}
              alt={item.name}
              className="w-[80px] h-auto object-cover "
            />
            <div className="w-full">
              <h5 className="pl-3 text-[20px] ">{item.name}</h5>
              <h5 className="pl-3 text-[20px] text-[#00000091] ">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(item?.discountPrice || item?.originalPrice)}{" "}
                x {item.quantity}
              </h5>
            </div>
            {data?.status === "Delivered" && (
              <div className={`${styles.button} text-white `}>
                Write a Review
              </div>
            )}
          </div>
        ))}
      <div className="border-t w full text-right">
        <h5 className="pt-3 text-lg ">
          Total Price:{" "}
          <strong>
            {data && (
              <h5 className="pl-3 text-[20px] text-[#000000] ">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(
                  data.cart.reduce((total, item) => {
                    const price = item?.discountPrice || item?.originalPrice;
                    return total + price * item.quantity;
                  }, 0)
                )}
              </h5>
            )}
          </strong>
        </h5>
      </div>
      <div className="w-full 800px:flex items-center pt-8">
        <div className="w-full 800px:w-[60%] ">
          <h4 className="pt-3 text-[20px] font-[600] ">Shipping Address</h4>
          <h4 className="pt-3 text-[20px]  ">
            {data?.shippingAddress?.address1}, {data?.shippingAddress?.address2}
            , {data?.shippingAddress?.city}, {data?.shippingAddress?.country},{" "}
            {data?.shippingAddress?.zipCode}
          </h4>
          <h4 className="pt-3 text-[20px]  ">
            <span className="font-[600] ">User Name: </span> {data?.user?.name}
          </h4>
          <h4 className="pt-3 text-[20px]  ">
            <span className="font-[600] ">User Phone Number: </span>
            {data?.user?.phoneNumber}
          </h4>
        </div>
        <div className="w-full 800px:w-[40%] ">
          <h4 className="pt-3 text-[20px]  ">Payment Information:</h4>
          <h4 className="pt-3 text-[20px]  ">
            Status: {data?.status ? data?.status : "Not Paid Yet!"}
          </h4>
        </div>
      </div>
      <div className={`${styles.button} text-white mt-12 hover:scale-105 `}>
        Send a Message
      </div>
    </div>
  );
};

export default OrderDetails;
