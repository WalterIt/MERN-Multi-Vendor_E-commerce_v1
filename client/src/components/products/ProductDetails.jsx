import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import styles from "../../styles/styles";
import ProductDetailsInfo from "./ProductDetailsInfo";

const ProductDetails = ({ data }) => {
  const [quantity, setQuantity] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();

  const handleMessageSubmit = () => {
    navigate("/inbox?conversation=507ebjver884ehfdjeriv84");
  };

  return (
    <div className="bg-white  ">
      {data ? (
        <div className={` ${styles.section} w-[90%] 800px:w-[80%]  `}>
          <div className="w-full py-5">
            <div className="block w-full 800px:flex ">
              <div className="w-full 800px:w-[50%] ">
                <img
                  src={data.image_Url[select].url}
                  alt=""
                  className="w-[80%] "
                />
                <div className="w-full flex">
                  <div
                    className={`${
                      select === 0 ? "border" : "null"
                    } cursor-pointer`}
                  >
                    <img
                      src={data?.image_Url[0].url}
                      alt={data.name}
                      className=" h-[200px] object-cover"
                      onClick={() => setSelect(0)}
                    />
                  </div>
                  <div
                    className={`${
                      select === 1 ? "border" : "null"
                    } cursor-pointer`}
                  >
                    <img
                      src={data?.image_Url[1].url}
                      alt={data.name}
                      className=" h-[200px] object-cover"
                      onClick={() => setSelect(1)}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full 800px:w-[50%] pt-5 ">
                <h1 className={`${styles.productTitle}`}>{data.name} </h1>
                <p>{data.description}</p>
                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(data.discount_price)}
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(data.price)}
                  </h3>
                </div>
                <div
                  className={`${styles.noramlFlex} mt-12 justify-between pr-3`}
                >
                  <div>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={() =>
                        setQuantity(quantity === 1 ? 1 : quantity - 1)
                      }
                    >
                      -
                    </button>
                    <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[10px]">
                      {quantity}
                    </span>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <div>
                    {click ? (
                      <AiFillHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => setClick(!click)}
                        color={click ? "red" : "#333"}
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => setClick(!click)}
                        color={click ? "red" : "#333"}
                        title="Add to wishlist"
                      />
                    )}
                  </div>
                </div>
                <div
                  className={`${styles.button} !mt-6 !rounded !h-11 flex items-center`}
                >
                  <span className="text-white flex items-center">
                    Add to cart{" "}
                    <AiOutlineShoppingCart size={20} className="ml-2" />
                  </span>
                </div>
                <div className="flex items-center pt-8">
                  <img
                    src={data.shop.shop_avatar.url}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full mr-2 object-fill "
                  />
                  <div className="pr-8">
                    <h3 className={`${styles.shop_name} pb-1 pt-1`}>
                      {data.shop.name}
                    </h3>
                    <h5 className="pb-3 text-[15px] ">
                      ({data.shop.ratings}) Ratings
                    </h5>
                  </div>
                  <div
                    className={`${styles.button} bg-[#6443d1] mt-4 !rounded !h-11`}
                    onClick={handleMessageSubmit}
                  >
                    <span className="text-white flex justify-center items-center">
                      Send Message{" "}
                      <AiOutlineMessage size={20} className="ml-2" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ProductDetailsInfo data={data} />
          <br />
          <br />
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetails;
