import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import styles from "../styles/styles";
import { useEffect, useState } from "react";
import { BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/actions/cart";
import { toast } from "react-toastify";

const Cart = ({ setOpenCart }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleQuantityChange = (data) => {
    dispatch(addToCart(data));
  };

  const handleRemoveFromCart = (data) => {
    dispatch(removeFromCart(data));
  };

  const totalPrice = cart.reduce(
    (acc, item) =>
      acc + item.quantity * (item.discountPrice || item.originalPrice),
    0
  );

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004d] h-auto  z-10 ">
      <div className="fixed top-0 right-0 h-full w-[25%] bg-white overflow-y-scroll scrollbar-hide flex flex-col justify-between shadow-sm ">
        {cart && cart.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenCart(false)}
              />
            </div>
            <h5 className="uppercase font-bold text-lg text-red-600 ">
              Cart is Empty!
            </h5>
          </div>
        ) : (
          <>
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
                <h5 className="pl-2 text-[20px] font-[500] ">
                  {cart.length} Items
                </h5>
              </div>
              <div className="w-full border-t pt-1">
                {cart &&
                  cart.map((item, i) => (
                    <CartItem
                      key={i}
                      data={item}
                      handleQuantityChange={handleQuantityChange}
                      handleRemoveFromCart={handleRemoveFromCart}
                    />
                  ))}
              </div>
              <div className="px-5 mb-8 mt-6 ">
                <Link to="/checkout">
                  <div
                    className={`h-[45px] flex items-center justify-center px-2 py-6 w-[100%] bg-[#e44343] rounded-[5px]`}
                  >
                    <h1 className="text-[#fff] text-[18px] text-center  font-[600]">
                      Checkout Now{" "}
                      <span className="whitespace-nowrap ">
                        (USD{" "}
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format(totalPrice)}
                        )
                      </span>
                    </h1>
                  </div>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CartItem = ({ data, handleQuantityChange, handleRemoveFromCart }) => {
  const [quantity, setQuantity] = useState(data.quantity);
  const totalPrice = (data.discountPrice || data.originalPrice) * quantity;

  const increment = (data) => {
    if (data.stock < quantity) {
      toast.error(`Product stock limited!`);
    } else {
      setQuantity(quantity + 1);
      const updateCartData = { ...data, quantity: quantity + 1 };
      handleQuantityChange(updateCartData);
    }
  };

  const decrement = (data) => {
    setQuantity(quantity === 1 ? 1 : quantity - 1);
    const updateCartData = {
      ...data,
      quantity: quantity === 1 ? 1 : quantity - 1,
    };
    handleQuantityChange(updateCartData);
  };

  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <div>
          <div
            className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`}
            onClick={() => increment(data)}
          >
            <HiPlus size={18} color="#fff" />
          </div>
          <span className="pl-[10px] justify-center items-center ">
            {quantity}
          </span>
          <div
            className={`bg-[#a7abb14f] items-center border border-[#30303018] rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`}
            onClick={() => decrement(data)}
          >
            <HiOutlineMinus size={16} color="#646b79" />
          </div>
        </div>
        <img
          src={data.images[0]}
          alt={data.name}
          loading="lazy"
          className="w-[80px] h-auto object-fill ml-2 "
        />
        <div className="pl-[5px] ">
          <h1>{data.name}</h1>
          <h4 className="font-[400] text-[15px] text-[#00000082] ">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(data.discountPrice || data.originalPrice)}{" "}
            * {quantity}
          </h4>
          <h4 className="font-[600] pt-1 text-[17px] text-[#c40000e7] font-Roboto ">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(totalPrice)}
          </h4>
        </div>
        <BiTrash
          size={40}
          color="red"
          className="cursor-pointer"
          onClick={() => handleRemoveFromCart(data)}
        />
      </div>
    </div>
  );
};

export default Cart;
