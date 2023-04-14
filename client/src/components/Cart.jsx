import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import styles from "../styles/styles";
import { useState } from "react";
import { BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";

const Cart = ({ setOpenCart }) => {
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
              onClick={() => setOpenCart(false)}
            />
          </div>
          <div className={`${styles.noramlFlex} p-4`}>
            <IoBagHandleOutline size={25} />
            <h5 className="pl-2 text-[20px] font-[500] ">3 Items</h5>
          </div>
          <div className="w-full border-t pt-1">
            {cartData &&
              cartData.map((item, i) => <CartItem key={i} data={item} />)}
          </div>
          <div className="px-5 mb-3 mt-10">
            <Link to="/checkout">
              <div
                className={`h-[45px] flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px]`}
              >
                <h1 className="text-[#fff] text-[18px] font-[600]">
                  Checkout Now (USD$1080)
                </h1>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const CartItem = ({ data }) => {
  const [quantity, setQuantity] = useState(1);
  const totalPrice = data.price * quantity;

  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <div>
          <div
            className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`}
            onClick={() => setQuantity(quantity + 1)}
          >
            <HiPlus size={18} color="#fff" />
          </div>
          <span className="pl-[10px] justify-center items-center ">
            {quantity}
          </span>
          <div
            className={`bg-[#a7abb14f] items-center border border-[#30303018] rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`}
            onClick={() => setQuantity(quantity === 1 ? 1 : quantity - 1)}
          >
            <HiOutlineMinus size={16} color="#646b79" />
          </div>
        </div>
        <img
          src="https://bonik-react.vercel.app/assets/images/products/Fashion/Clothes/1.SilverHighNeckSweater.png"
          alt=""
          loading="lazy"
          className="w-[80px] h-[80px] ml-2 "
        />
        <div className="pl-[5px] ">
          <h1>{data.name}</h1>
          <h4 className="font-[400] text-[15px] text-[#00000082] ">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(data.price)}{" "}
            * {quantity}
          </h4>
          <h4 className="font-[600] pt-1 text-[17px] text-[#c40000e7] font-Roboto ">
            US
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(totalPrice)}
          </h4>
        </div>
        <BiTrash size={50} color="red" className="cursor-pointer" />
      </div>
    </div>
  );
};

export default Cart;
