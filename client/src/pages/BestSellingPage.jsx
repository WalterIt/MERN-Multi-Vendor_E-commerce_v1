import { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import styles from "../styles/styles";
import { useSearchParams } from "react-router-dom";
import { productData } from "../static/data";
import ProductCard from "../components/ProductCard";

const BestSellingPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const products =
      productData && productData.sort((a, b) => b.total_sell - a.total_sell);
    setData(products);
    window.scrollTo(0, 0);
  }, []);

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
