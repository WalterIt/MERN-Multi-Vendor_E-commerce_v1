import React, { useEffect, useState } from "react";
import styles from "../styles/styles";
import ProductCard from "./ProductCard";
import axios from "axios";
import server from "../server";
import { useSelector } from "react-redux";

const BestDeals = () => {
  const { products, isLoading } = useSelector((state) => state.products ?? {});
  const [data, setData] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const productData =
      products &&
      [...products].sort((a, b) => b.originalPrice - a.originalPrice);
    setData(productData?.slice(0, 5));
  }, [products]);
  // console.log(data);
  // console.log(productData.slice(0, 5));

  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Best Deals</h1>
        </div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
          {data && data.map((item, i) => <ProductCard data={item} key={i} />)}
        </div>
      </div>
    </div>
  );
};

export default BestDeals;
