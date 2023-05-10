import { Link, useParams } from "react-router-dom";
import styles from "../styles/styles";
import { BsFillBagFill } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllOrdersUser } from "../redux/actions/order";
import axios from "axios";
import server from "../server";
import { toast } from "react-toastify";

const OrderDetails = () => {
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    dispatch(getAllOrdersUser(user._id));
  }, [dispatch]);

  const data = orders && orders.find((item) => item._id === id);

  const handleReview = async (e) => {
    await axios
      .put(`${server}/product/create-review`, {
        user,
        rating,
        comment,
        productId: selectedItem?._id,
        orderId: id,
      })
      .then((res) => {
        toast.success(res.data.message);
        dispatch(getAllOrdersUser(user._id));
        setComment("");
        setRating(null);
        setOpen(false);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleRefund = async (e) => {
    await axios
      .put(`${server}/order/order-refund/${id}`, {
        status: "Processing Refund",
      })
      .then((res) => {
        toast.success(res.data.message);
        dispatch(getAllOrdersUser(user._id));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
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
            {item.isReviewed || item.status !== "Delivered" ? null : (
              <div
                className={`${styles.button} !w-[170px] text-white hover:scale-105 `}
                onClick={() => setOpen(true) || setSelectedItem(item)}
              >
                Write a Review
              </div>
            )}
          </div>
        ))}
      {/* Review Popup  */}
      {open && (
        <div className="w-full fixed top-0 left-0 h-screen bg-[#0005] z-50 flex items-center justify-center">
          <div className="w-[50%] h-min bg-[#fff] shadow rounded-md p-3">
            <div className="w-full flex justify-end p-3">
              <RxCross1
                size={30}
                onClick={() => setOpen(false)}
                className="cursor-pointer"
              />
            </div>
            <h2 className="text-[30px] font-[500] font-Poppins text-center mb-8">
              Give a Review
            </h2>
            <div className="w-full flex mb-10">
              <img
                src={`${selectedItem?.images[0]}`}
                alt=""
                className="w-[80px] h-auto object-cover"
              />
              <div>
                <div className="pl-3 text-[20px]">{selectedItem?.name}</div>
                <h4 className="pl-3 text-[20px]">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(
                    selectedItem?.discountPrice || selectedItem?.originalPrice
                  )}{" "}
                  x {selectedItem?.quantity}
                </h4>
              </div>
            </div>

            {/* ratings */}
            <h5 className="pl-3 text-[20px] font-[500]">
              Give a Rating <span className="text-red-500 font-[900]">*</span>
            </h5>
            <div className="flex w-full ml-2 pt-1">
              {[1, 2, 3, 4, 5].map((i) =>
                rating >= i ? (
                  <AiFillStar
                    key={i}
                    className="mr-1 cursor-pointer"
                    color="rgb(246,186,0)"
                    size={25}
                    onClick={() => setRating(i)}
                  />
                ) : (
                  <AiOutlineStar
                    key={i}
                    className="mr-1 cursor-pointer"
                    color="rgb(246,186,0)"
                    size={25}
                    onClick={() => setRating(i)}
                  />
                )
              )}
            </div>

            <div className="w-full ml-3">
              <label className="block text-[20px] font-[500]">
                Write a comment
                <span className="ml-1 font-[400] text-[16px] text-[#00000098]">
                  (optional)
                </span>
              </label>
              <textarea
                name="comment"
                id=""
                cols="20"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="How was your product? Write your expression about it!"
                className="mt-2 w-[95%] border p-2 outline-none"
              ></textarea>
            </div>
            <div
              className={`${styles.button} text-white text-[20px] tracking-widest ml-3 hover:scale-105`}
              onClick={rating >= 1 ? handleReview : null}
            >
              Submit
            </div>
          </div>
        </div>
      )}

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
          {data && data.status === "Delivered" && (
            <div
              className={`${styles.button} text-white mt-12 hover:scale-105 `}
              onClick={handleRefund}
            >
              Give a Refund
            </div>
          )}
        </div>
      </div>
      <div className={`${styles.button} text-white mt-12 hover:scale-105 `}>
        Send a Message
      </div>
    </div>
  );
};

export default OrderDetails;
