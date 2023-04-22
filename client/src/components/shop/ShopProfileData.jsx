import React, { useEffect, useState } from "react";
import { productData } from "../../static/data";
import ProductCard from "../ProductCard";
import { Link, useParams } from "react-router-dom";
import styles from "../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../redux/actions/product";

const ShopProfileData = ({ isOwner }) => {
  const [active, setActive] = useState(1);
  const { allProducts } = useSelector((state) => state.products);
  const { events } = useSelector((state) => state.events);
  const { user } = useSelector((state) => state.seller);
  const seller = user;
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(id));
    // dispatch(getAllEventsShop(seller._id));
  }, [dispatch]);

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

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4 xl:gap-5 mb-12 border-0">
        {allProducts &&
          allProducts.map((item, i) => (
            <ProductCard data={item} key={i} isShop={true} />
          ))}
      </div>
    </div>
  );
};

export default ShopProfileData;
