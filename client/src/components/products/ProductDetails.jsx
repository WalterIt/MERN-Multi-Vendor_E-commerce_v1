import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import styles from "../../styles/styles";
import ProductDetailsInfo from "./ProductDetailsInfo";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getAllProductsShop } from "../../redux/actions/product";
import { addToCart } from "../../redux/actions/cart";
import { toast } from "react-toastify";
import {
  addToWishlist,
  removeFromWhislist,
} from "../../redux/actions/wishlist";

const ProductDetails = ({ data }) => {
  const { cart } = useSelector((state) => state.cart);
  const { allProducts } = useSelector((state) => state.products);
  const { wishlist } = useSelector((state) => state.wishlist || []);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();

  const totalReviewsLength =
    allProducts &&
    allProducts?.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings =
    allProducts &&
    allProducts?.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );

  const averageRating = totalRatings / totalReviewsLength || 0;

  useEffect(() => {
    dispatch(getAllProductsShop(data?.shop?._id));
  }, [dispatch, data]);

  useEffect(() => {
    if (wishlist && wishlist.find((item) => item._id === data?._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  const handleAddToCart = (id) => {
    const ifItemExists = cart && cart.find((item) => item._id === id);
    if (ifItemExists) {
      toast.error(`Already added to cart!`);
    } else {
      if (data.stock < 1) {
        toast.error(`Product stock limited!`);
      } else {
        const item = { ...data, quantity: quantity };
        dispatch(addToCart(item));
        toast.success("Item added to Cart successfully!");
      }
    }
  };

  const handleAddToWhislist = (item) => {
    dispatch(addToWishlist(item));
    setClick(!click);
    toast.success("Item added to Wishlist successfully!");
  };

  const handleRemoveFromWhislist = (item) => {
    dispatch(removeFromWhislist(item));
    setClick(!click);
    toast.success(`Item removed from wishlist successfully!`);
  };

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
                  src={data.images[select]}
                  alt=""
                  className="w-[80%] mb-6 "
                />
                <div className="w-full flex">
                  {data &&
                    data.images.map((img, i) => (
                      <div
                        key={i}
                        className={`${
                          select === i ? "border" : "null"
                        } cursor-pointer`}
                      >
                        <img
                          src={img}
                          className="w-[200px] h-auto object-cover"
                          onClick={() => setSelect(i)}
                        />
                      </div>
                    ))}
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
                    }).format(data.discountPrice)}
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(data.originalPrice)}
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
                        onClick={() => handleRemoveFromWhislist(data)}
                        color={click ? "red" : "#333"}
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => {
                          handleAddToWhislist(data);
                        }}
                        color={click ? "red" : "#333"}
                        title="Add to wishlist"
                      />
                    )}
                  </div>
                </div>
                <div
                  className={`${styles.button} !mt-6 !rounded hover:scale-105 !h-11 flex items-center`}
                  onClick={() => handleAddToCart(data._id)}
                >
                  <span className="text-white flex items-center">
                    Add to cart{" "}
                    <AiOutlineShoppingCart size={20} className="ml-2" />
                  </span>
                </div>
                <div className="flex items-center pt-8">
                  <Link to={`/shop/preview/${data.shop._id}`}>
                    <img
                      src={data.shop.avatar}
                      alt=""
                      className="w-[50px] h-[50px] rounded-full mr-2 object-fill "
                    />
                  </Link>
                  <div className="pr-8">
                    <Link to={`/shop/preview/${data.shop._id}`}>
                      <h3 className={`${styles.shop_name} pb-1 pt-1`}>
                        {data.shop.name}
                      </h3>
                    </Link>
                    <h5 className="pb-3 text-[15px] ">
                      ({averageRating}/5) Ratings
                    </h5>
                  </div>
                  <div
                    className={`${styles.button} bg-[#6443d1] hover:scale-105 mt-4 !rounded !h-11`}
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
          <ProductDetailsInfo
            data={data}
            products={allProducts}
            totalReviewsLength={totalReviewsLength}
            averageRating={averageRating}
          />
          <br />
          <br />
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetails;
