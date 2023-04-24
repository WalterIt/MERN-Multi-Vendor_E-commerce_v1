import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/styles";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import ProductCardDetails from "./ProductCardDetails";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/actions/cart";
import { toast } from "react-toastify";
import { addToWishlist, removeFromWhislist } from "../redux/actions/wishlist";

const ProductCard = ({ data }) => {
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist || []);
  const dispatch = useDispatch();
  const [click, setClick] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const productName = data.name.replace(/\s+/g, "-");

  useEffect(() => {
    if (wishlist && wishlist.find((item) => item._id === data._id)) {
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
        const item = { ...data, quantity: 1 };
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

  return (
    <>
      {data.stock > 0 ? (
        <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer ">
          <div className="flex justify-end"></div>
          <Link to={`/product/${productName}`}>
            <img
              src={data?.images[0]}
              alt={data.name}
              className="w-full h-[170px] object-contain"
              loading="lazy"
            />
          </Link>
          <Link to={`/shop/preview/${data.shop._id}`}>
            <h5 className={`${styles.shop_name}`}>{data.shop.name} </h5>
          </Link>
          <Link to={`/product/${productName}`}>
            <h4 className="pb-3 font-[500] ">
              {data.name.length > 40
                ? data.name.slice(0, 40) + "..."
                : data.name}
            </h4>
            <div className="flex">
              <AiFillStar
                className="mr-2 cursor-pointer"
                color="#F6BA00"
                size={20}
              />
              <AiFillStar
                className="mr-2 cursor-pointer"
                color="#F6BA00"
                size={20}
              />
              <AiFillStar
                className="mr-2 cursor-pointer"
                color="#F6BA00"
                size={20}
              />
              <AiFillStar
                className="mr-2 cursor-pointer"
                color="#F6BA00"
                size={20}
              />
              <AiOutlineStar
                className="mr-2 cursor-pointer"
                color="#F6BA00"
                size={20}
              />
            </div>

            <div className="py-2 flex items-center justify-between ">
              <div className="flex">
                <h5 className={`${styles.productDiscountPrice}`}>
                  {data.originalPrice === 0
                    ? new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(data.originalPrice)
                    : new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(data.discountPrice)}
                </h5>
                <h4 className={`${styles.price}`}>
                  {data.originalPrice
                    ? new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(data.originalPrice)
                    : null}
                </h4>
              </div>
              <span className="font-[400] text-[17px] text-[#68d284] ">
                {data.soldOut} sold
              </span>
            </div>
          </Link>
          <div>
            {click ? (
              <AiFillHeart
                size={22}
                className="cursor-pointer absolute right-2 top-5"
                onClick={() => handleRemoveFromWhislist(data)}
                color={click ? "red" : "#333"}
                title="Remove from Wishlist"
              />
            ) : (
              <AiOutlineHeart
                size={22}
                className="cursor-pointer absolute right-2 top-5"
                onClick={() => {
                  handleAddToWhislist(data);
                }}
                color={click ? "red" : "#333"}
                title="Add to Wishlist"
              />
            )}
            <AiOutlineEye
              size={22}
              className="cursor-pointer absolute right-2 top-14"
              onClick={() => setIsOpen(!isOpen)}
              color="#333"
              title="Quick View"
            />
            <AiOutlineShoppingCart
              size={25}
              className="cursor-pointer absolute right-2 top-24"
              color="#444"
              title="Add to Cart"
              onClick={() => handleAddToCart(data._id)}
            />
            {isOpen ? (
              <ProductCardDetails
                setIsOpen={setIsOpen}
                data={data}
                handleAddToWhislist={handleAddToWhislist}
                handleRemoveFromWhislist={handleRemoveFromWhislist}
              />
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ProductCard;
