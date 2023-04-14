import { useEffect, useState } from "react";
import styles from "../styles/styles";
import { useSearchParams } from "react-router-dom";
import { productData } from "../static/data";
import ProductCard from "../components/ProductCard";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams?.get("category");
  const [data, setData] = useState([]);

  useEffect(() => {
    if (categoryData === null) {
      const products =
        productData && productData.sort((a, b) => a.total_sell - b.total_sell);
      setData(products);
    } else {
      const products =
        productData &&
        productData.filter((item) => item.category === categoryData);
      setData(products);
    }

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
        {data && data.length === 0 ? (
          <h1 className="text-center w-full pb-[100px] text-[20px] ">
            No Product Found!
          </h1>
        ) : null}
      </div>
    </div>
  );
};

export default ProductsPage;
