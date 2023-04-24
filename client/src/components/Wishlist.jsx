import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { BsCartPlus } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import styles from "../styles/styles";
import { useState } from "react";
import { BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWhislist } from "../redux/actions/wishlist";
import { toast } from "react-toastify";
import { addToCart } from "../redux/actions/cart";

const Wishlist = ({ setOpenWishlist }) => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist || []);

  const handleRemoveFromWishlist = (data) => {
    dispatch(removeFromWhislist(data));
  };

  const handleAddToCart = (data) => {
    const newData = { ...data, quantity: 1 };
    dispatch(addToCart(newData));
    setOpenWishlist(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004d] h-screen z-10 ">
      <div className="fixed top-0 right-0 h-full w-[25%] bg-white overflow-y-scroll scrollbar-hide flex flex-col justify-between shadow-sm ">
        {wishlist && wishlist.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenWishlist(false)}
              />
            </div>
            <h5 className="uppercase font-bold tracking-widest text-lg text-red-600 ">
              Wishlist is Empty!
            </h5>
          </div>
        ) : (
          <>
            <div>
              <div className="flex w-full justify-end pt-5 pr-5">
                <RxCross1
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setOpenWishlist(false)}
                />
              </div>
              <div className={`${styles.noramlFlex} p-4`}>
                <AiOutlineHeart size={25} />
                <h5 className="pl-2 text-[20px] font-[500] ">
                  {wishlist.length} Items
                </h5>
              </div>
              <div className="w-full border-t pt-1">
                {wishlist &&
                  wishlist.map((item, i) => (
                    <WishlistItem
                      key={i}
                      data={item}
                      handleRemoveFromWishlist={handleRemoveFromWishlist}
                      handleAddToCart={handleAddToCart}
                    />
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const WishlistItem = ({ data, handleRemoveFromWishlist, handleAddToCart }) => {
  // const [quantity, setQuantity] = useState(1);
  // const totalPrice = data.price * quantity;

  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <BsCartPlus
          size={40}
          className="cursor-pointer ml-1"
          title="Add to Cart"
          color="teal"
          fontWeight={900}
          onClick={() => handleAddToCart(data)}
        />

        <img
          src={data.images[0]}
          alt={data.name}
          loading="lazy"
          className="w-[80px] h-auto ml-2 "
        />

        <div className="pl-[5px] ">
          <h1>{data.name}</h1>
          <h4 className="font-[600] pt-1 text-[17px] text-[#c40000e7] font-Roboto ">
            US
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(data.discountPrice || data.originalPrice)}
          </h4>
        </div>

        <BiTrash
          size={40}
          color="red"
          className="cursor-pointer"
          onClick={() => handleRemoveFromWishlist(data)}
        />
      </div>
    </div>
  );
};

export default Wishlist;
