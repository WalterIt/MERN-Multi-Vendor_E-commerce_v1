import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "../../styles/styles";
import { BsFillBagFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllOrdersShop } from "../../redux/actions/order";
import axios from "axios";
import server from "../../server";
import { toast } from "react-toastify";

const ShopOrderDetails = () => {
  const { seller } = useSelector((state) => state.seller);
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [status, setStatus] = useState("");
  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrdersShop(seller._id));
  }, [dispatch]);

  const data = orders && orders.find((item) => item._id === id);

  const handleOrderUpdateStatus = async (e) => {
    e.preventDefault();
    await axios
      .put(`${server}/order/update-order-status/${id}`, { status })
      .then((res) => {
        toast.success("Order updated successfully!");
        dispatch(getAllOrdersShop(seller._id));
        navigate("/dashboard/orders");
      })
      .catch((err) =>
        toast.error((error) => toast.error(error.response.data.message))
      );
  };

  const handleRefundOrderUpdate = async (e) => {
    e.preventDefault();
    await axios
      .put(`${server}/order/order-refund-success/${id}`, { status })
      .then((res) => {
        toast.success("Order refunded successfully!");
        navigate("/dashboard/orders");
      })
      .catch((err) =>
        toast.error((error) => toast.error(error.response.data.message))
      );
  };

  return (
    <div className={`${styles.section} py-4 px-6 min-h-screen`}>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <BsFillBagFill size={30} color="crimson" />
          <h1 className="pl-2 text-[25px] ">Order Details</h1>
        </div>
        <Link to="/dashboard/orders">
          <div
            className={`${styles.button} !bg-[#fce1e6] !rounded text-[#e94560] hover:scale-105 hover:text-[crimson] font-[600] !h-[45px] text-[18px] `}
          >
            Order List
          </div>
        </Link>
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
          <div key={i} className="flex w-full items-start py-5">
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
            {data.shippingAddress.address1}, {data.shippingAddress.address2},{" "}
            {data.shippingAddress.city}, {data.shippingAddress.country},{" "}
            {data.shippingAddress.zipCode}
          </h4>
          <h4 className="pt-3 text-[20px]  ">
            <span className="font-[600] ">User Name: </span> {data.user.name}
          </h4>
          <h4 className="pt-3 text-[20px]  ">
            <span className="font-[600] ">User Phone Number: </span>
            {data.user.phoneNumber}
          </h4>
        </div>
        <div className="w-full 800px:w-[40%] ">
          <h4 className="pt-3 text-[20px]  ">Payment Information:</h4>
          <h4 className="pt-3 text-[20px]  ">
            Status: {data?.status ? data?.status : "Not Paid Yet!"}
          </h4>
        </div>
      </div>
      <h4 className="pt-11 text-[20px] font-[600] ">Order Status:</h4>
      {data?.status !== "Processing Refund" &&
        data?.status !== "Refund Success" && (
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-[250px] mt-2 border h-[35px] rounded "
          >
            {[
              "Processing",
              "Transfered to delivery Partner",
              "Shipping",
              "Received",
              "On the way",
              "Delivered",
            ]
              .slice(
                [
                  "Processing",
                  "Transfered to delivery Partner",
                  "Shipping",
                  "Received",
                  "On the way",
                  "Delivered",
                ].indexOf(data?.status)
              )
              .map((option, i) => (
                <option value={option} key={i}>
                  {option}
                </option>
              ))}
          </select>
        )}

      {data?.status === "Processing Refund" ||
      data?.status === "Refund Success" ? (
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-[200px] mt-2 border h-[35px] rounded-[5px]"
        >
          {["Processing Refund", "Refund Success"]
            .slice(
              ["Processing Refund", "Refund Success"].indexOf(data?.status)
            )
            .map((option, index) => (
              <option value={option} key={index}>
                {option}
              </option>
            ))}
        </select>
      ) : null}

      <div
        className={`${styles.button} !bg-[#fce1e6] !rounded text-[#e94560] hover:scale-105 hover:text-[crimson] 
        font-[600] !h-[45px] text-[18px] mt-8 `}
        onClick={
          data?.status !== "Processing Refund"
            ? handleOrderUpdateStatus
            : handleRefundOrderUpdate
        }
      >
        Update Status
      </div>
    </div>
  );
};

export default ShopOrderDetails;
