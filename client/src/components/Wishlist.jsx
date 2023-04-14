import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { BsCartPlus } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import styles from "../styles/styles";
import { useState } from "react";
import { BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";

const Wishlist = ({ setOpenWishlist }) => {
  const cartData = [
    {
      name: "Iphone 14 pro max 256 gb ssd and 8gb ram sliver colour",
      description: "test",
      price: 999.05,
    },
    {
      name: "Iphone 14 pro max 256 gb ssd and 8gb ram sliver colour",
      description: "test",
      price: 245.99,
    },
    {
      name: "Iphone 14 pro max 256 gb ssd and 8gb ram sliver colour",
      description: "test",
      price: 645.5,
    },
  ];

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004d] h-screen z-10 ">
      <div className="fixed top-0 right-0 min-h-full w-[25%] bg-white flex flex-col justify-between shadow-sm ">
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
            <h5 className="pl-2 text-[20px] font-[500] ">3 Items</h5>
          </div>
          <div className="w-full border-t pt-1">
            {cartData &&
              cartData.map((item, i) => <WishlistItem key={i} data={item} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

const WishlistItem = ({ data }) => {
  const [quantity, setQuantity] = useState(1);
  const totalPrice = data.price * quantity;

  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <BiTrash
          size={55}
          color="red"
          className="cursor-pointer"
          //   onClick={() => setOpenCart(false)}
        />
        <img
          src="https://bonik-react.vercel.app/assets/images/products/Fashion/Clothes/1.SilverHighNeckSweater.png"
          alt=""
          loading="lazy"
          className="w-[80px] h-[80px] ml-2 "
        />

        <div className="pl-[5px] ">
          <h1>{data.name}</h1>
          <h4 className="font-[600] pt-1 text-[17px] text-[#c40000e7] font-Roboto ">
            US
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(totalPrice)}
          </h4>
        </div>
        <BsCartPlus
          size={55}
          className="cursor-pointer ml-6"
          title="Add to Cart"
          color="teal"
          fontWeight={900}
        />
      </div>
    </div>
  );
};

export default Wishlist;
