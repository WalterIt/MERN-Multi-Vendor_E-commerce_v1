import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import ProductCard from "../ProductCard";
import { useSelector } from "react-redux";

const SuggestedProducts = ({ data }) => {
  const { products } = useSelector((state) => state.products);
  const [productData, setProductData] = useState();

  useEffect(() => {
    const suggestedProducts =
      products &&
      [...products].filter((item) => item.category === data.category);
    setProductData(suggestedProducts);
  }, []);

  return (
    <div>
      {data ? (
        <div className={`p-4 ${styles.section}`}>
          <h2
            className={`${styles.heading} text-[25px] font-[500] border-b mb-5`}
          >
            Related Products
          </h2>
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
            {productData &&
              productData.map((item, i) => <ProductCard data={item} key={i} />)}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SuggestedProducts;
