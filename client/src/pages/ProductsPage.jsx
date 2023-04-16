import { useEffect, useState } from "react";
import styles from "../styles/styles";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useSelector } from "react-redux";

const ProductsPage = () => {
  const { products, isLoading } = useSelector((state) => state.products ?? {});
  const [searchParams] = useSearchParams();
  const categoryData = searchParams?.get("category");
  const [data, setData] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (categoryData === null) {
      const productData =
        products && [...products].sort((a, b) => a.soldOut - b.soldOut);
      setData(productData);
    } else {
      const productData =
        products &&
        [...products].filter((item) => item.category === categoryData);
      setData(productData);
    }

    window.scrollTo(0, 0);
  }, []);
  // console.log(items);

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
