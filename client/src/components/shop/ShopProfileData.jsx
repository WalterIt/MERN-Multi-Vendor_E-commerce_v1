import React, { useEffect, useState } from "react";
import { productData } from "../../static/data";
import ProductCard from "../ProductCard";
import { Link, useParams } from "react-router-dom";
import styles from "../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../redux/actions/product";
import Ratings from "../products/Ratings";
import { getAllEventsShop } from "../../redux/actions/event";

const ShopProfileData = ({ isOwner }) => {
  const [active, setActive] = useState(1);
  const { allProducts } = useSelector((state) => state.products);
  const { events } = useSelector((state) => state.events);
  const { seller } = useSelector((state) => state.seller);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(id));
    dispatch(getAllEventsShop(seller._id));
  }, [dispatch]);

  const allReviews =
    allProducts && allProducts.map((product) => product.reviews).flat();

  // console.log(allReviews);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between ">
        <div className="w-full flex">
          <div className="flex items-center" onClick={() => setActive(1)}>
            <h5
              className={`font-[600] text-[20px] ${
                active === 1 ? "text-red-500" : "text-[#333]"
              } cursor-pointer pr-8 `}
            >
              Shop Products
            </h5>
          </div>

          <div className="flex items-center " onClick={() => setActive(2)}>
            <h5
              className={`font-[600] text-[20px] ${
                active === 2 ? "text-red-500" : "text-[#333]"
              } cursor-pointer pr-8 `}
            >
              Running Events
            </h5>
          </div>
          <div className="flex items-center" onClick={() => setActive(3)}>
            <h5
              className={`font-[600] text-[20px] ${
                active === 3 ? "text-red-500" : "text-[#333]"
              } cursor-pointer pr-8 `}
            >
              Shop Reviews
            </h5>
          </div>
        </div>

        <div>
          {isOwner && (
            <div className="">
              <Link to="/dashboard">
                <div className={`${styles.button} !rounded h-10 `}>
                  <span className="text-white">Go to Dashboard</span>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
      <br />

      {active === 1 && (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4 xl:gap-5 mb-12 border-0">
          {allProducts &&
            allProducts.map((item, i) => (
              <ProductCard data={item} key={i} isShop={true} />
            ))}
        </div>
      )}

      {active === 2 && (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4 xl:gap-5 mb-12 border-0">
          {events &&
            events.map((item, i) => (
              <ProductCard data={item} key={i} isShop={true} isEvent={true} />
            ))}
        </div>
      )}

      {active === 3 && (
        <div className="w-full">
          {allReviews &&
            allReviews.map((item, i) => (
              <div key={i} className="w-full flex my-2">
                <img
                  src={item.user.avatar}
                  alt={item.user.name}
                  className="w-[50px] h-[50px] object-cover rounded-full "
                />
                <div className="pl-2">
                  <div className="w-full flex items-center">
                    <h1 className="mr-3 font-[600] ">{item.user.name}</h1>
                    <Ratings rating={item?.rating} />
                  </div>
                  <p className="font-[400] ">{item.comment} </p>
                  <p className="font-[400] text-[14px] text-[#000000a7] ">
                    {item?.createdAt.slice(0, 10)}
                  </p>
                </div>
              </div>
            ))}
        </div>
      )}

      {allProducts && allProducts.length === 0 && (
        <h5 className="w-full text-center py-5 text-[18px] ">
          No Products Found!
        </h5>
      )}
    </div>
  );
};

export default ShopProfileData;
