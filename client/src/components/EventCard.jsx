import styles from "../styles/styles";
import { Link } from "react-router-dom";
import CountDown from "./CountDown";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/actions/cart";
import { toast } from "react-toastify";

const EventCard = ({ active, allEvents }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleAddToCart = (allEvents) => {
    const ifItemExists =
      cart && cart.find((item) => item._id === allEvents._id);
    if (ifItemExists) {
      toast.error(`Already added to cart!`);
    } else {
      if (allEvents.stock < 1) {
        toast.error(`Product stock limited!`);
      } else {
        const item = { ...allEvents, quantity: 1 };
        dispatch(addToCart(item));
        toast.success("Item added to Cart successfully!");
      }
    }
  };

  return (
    <div
      className={`w-full block bg-white rounded-lg ${
        active ? "unset" : "mb-12"
      } lg:flex p-2`}
    >
      <div className="w-full lg:w-[50%] m-auto px-6 py-6 ">
        <img src={allEvents?.images} alt={allEvents?.name} loading="lazy" />
      </div>
      <div className="w-full lg:w-[50%] flex flex-col justify-center mr-6 ">
        <h2 className={`${styles.productTitle}`}>
          {allEvents && allEvents?.name}
        </h2>
        <p>{allEvents && allEvents?.description}</p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through ">
              {allEvents &&
                new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(allEvents.originalPrice)}
            </h5>
            <h5 className="font-bold text-[20px] text-[#333] font-Roboto ">
              {allEvents &&
                new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(allEvents.discountPrice)}
            </h5>
          </div>
          <span className="pr-3 font-[400] text-[17px] text-[#44a55e]  ">
            {allEvents && allEvents.soldOut} sold
          </span>
        </div>
        <CountDown allEvents={allEvents} />
        <div className="flex items-center gap-4">
          <Link to={`/product/${allEvents?._id}?isEvent=true`}>
            <div
              className={`${styles.button} text-white font-semibold hover:scale-105`}
            >
              See Details
            </div>
          </Link>
          <div
            className={`${styles.button} text-white font-semibold hover:scale-105`}
            onClick={() => handleAddToCart(allEvents)}
          >
            Add to Cart
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
