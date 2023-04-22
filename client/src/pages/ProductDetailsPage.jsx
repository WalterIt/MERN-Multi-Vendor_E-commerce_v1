import { useParams } from "react-router-dom";
import ProductDetails from "../components/products/ProductDetails";
import { useEffect, useState } from "react";
import SuggestedProducts from "../components/products/SuggestedProducts";
import { useSelector } from "react-redux";

const ProductDetailsPage = () => {
  const { products } = useSelector((state) => state.products);
  const { name } = useParams();
  const [data, setData] = useState(null);
  const productName = name?.replace(/-/g, " ");

  window.scrollTo(0, 0);

  useEffect(() => {
    const data = products?.find((item) => item.name === productName);
    setData(data);
  }, []);

  // console.log(data);

  return (
    <div>
      <ProductDetails data={data} />
      {data && <SuggestedProducts data={data} />}
    </div>
  );
};

export default ProductDetailsPage;
