import { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import styles from "../styles/styles";
import { useSearchParams } from "react-router-dom";
import { productData } from "../static/data";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import server from "../server";
import { useSelector } from "react-redux";

const BestSellingPage = () => {
  const { products, isLoading } = useSelector((state) => state.products ?? {});
  const [data, setData] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const productData =
      products && [...products].sort((a, b) => b.soldOut - a.soldOut);
    setData(productData);
    window.scrollTo(0, 0);
  }, []);
  // console.log(data);

  return (
    <div>
      <br />
      <br />
      <div className={`${styles.section}`}>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
          {data && data.map((item, i) => <ProductCard data={item} key={i} />)}
        </div>
      </div>
    </div>
  );
};

export default BestSellingPage;
