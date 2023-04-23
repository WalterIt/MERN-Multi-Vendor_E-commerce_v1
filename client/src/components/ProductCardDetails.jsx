import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../styles/styles";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../redux/actions/cart";

const ProductCardDetails = ({ setIsOpen, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  // const [select, setSelect] = useState(false);

  const handleMessageSubmit = () => {};

  const decrementCount = () => {
    if (count > 1) setCount(count - 1);
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  const handleAddToCart = (id) => {
    const ifItemExists = cart && cart.find((item) => item._id === id);
    if (ifItemExists) {
      toast.error(`Already added to cart!`);
    } else {
      if (data.stock < count) {
        toast.error(`Product stock limited!`);
      } else {
        const item = { ...data, quantity: count };
        dispatch(addToCart(item));
        toast.success("Item added to Cart successfully!");
      }
    }
  };

  return (
    <div className="bg-[#fff]  ">
      {data ? (
        <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center ">
          <div className="w-[90%] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-4 ">
            <RxCross1
              size={25}
              className="absolute right-3 top-3 z-50"
              onClick={() => setIsOpen(false)}
            />
            <div className="block w-full 800px:flex ">
              <div className="w-full 800px:w-[50%] ">
                <img src={data.images[0]} alt={data.name} />
                <div className="flex">
                  <Link to={`/shop/preview/${data.shop._id}`}>
                    <img
                      src={data.shop.avatar}
                      alt={data.shop.name}
                      className="w-[50px] h-[50px] rounded-full mr-2 "
                    />
                  </Link>
                  <div>
                    <Link to={`/shop/preview/${data.shop._id}`}>
                      <h3 className={`${styles.shop_name}`}>
                        {data.shop.name}
                      </h3>
                    </Link>
                    <h5 className="pb-3 text-[15px] ">
                      ({data.shop?.ratings}) Ratings
                    </h5>
                  </div>
                </div>
                <div
                  className={`${styles.button} bg-black mt-4 rounded-[4px] h-11 `}
                  onClick={handleMessageSubmit}
                >
                  <span className="text-white flex items-center ">
                    Send Message <AiOutlineMessage className="ml-1" />
                  </span>
                </div>
                <h5 className="text-[16px] text-[red] mt-5 ">
                  ({data.total_sell}) Sold Out
                </h5>
              </div>

              <div className="w-full 800px:w-[50%] pt-5 pl-[5px] pr-[5px] ">
                <h1 className={`${styles.productTitle} text-[20px] `}>
                  {data.name}
                </h1>
                <p>{data.description}</p>
                <div className="flex pt-3 ">
                  <h4 className={`${styles.productDiscountPrice} `}>
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(data.discountPrice)}
                  </h4>
                  <h3 className={`${styles.price} `}>
                    {data.originalPrice
                      ? new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format(data.originalPrice)
                      : null}
                  </h3>
                </div>
                <div className="flex items-center justify-between mt-12 pr-3">
                  <div>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={decrementCount}
                    >
                      -
                    </button>
                    <span className="bg-gray-200 text-gray-800 font-medium px-4 py-2">
                      {count}
                    </span>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-r px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={incrementCount}
                    >
                      +
                    </button>
                  </div>
                  <div>
                    {click ? (
                      <AiFillHeart
                        size={30}
                        className="cursor-pointer "
                        onClick={() => setClick(!click)}
                        color={click ? "red" : "#333"}
                        title="Remove from Wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer "
                        onClick={() => setClick(!click)}
                        color={click ? "red" : "#333"}
                        title="Add to Wishlist"
                      />
                    )}
                  </div>
                </div>
                <div
                  className={`${styles.button} mt-8 rounded-[4px] h-11 flex items-center mx-auto`}
                  onClick={() => handleAddToCart(data._id)}
                >
                  <span className="text-[#fff] flex items-center">
                    Add to Cart{" "}
                    <AiOutlineShoppingCart className="ml-1 text-xl" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductCardDetails;
