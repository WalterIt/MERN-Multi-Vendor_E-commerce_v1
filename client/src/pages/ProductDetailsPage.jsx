import { useParams } from "react-router-dom";
import ProductDetails from "../components/products/ProductDetails";
import { useEffect, useState } from "react";
import SuggestedProducts from "../components/products/SuggestedProducts";
import { useSelector } from "react-redux";

const ProductDetailsPage = () => {
  const { products } = useSelector((state) => state.products);
  const { id } = useParams();
  const [data, setData] = useState(null);

  window.scrollTo(0, 0);

  useEffect(() => {
    const data = products?.find((item) => item._id === id);
    setData(data);
  }, [products]);

  // console.log(data);

  return (
    <div>
      <ProductDetails data={data} />
      {data && <SuggestedProducts data={data} />}
    </div>
  );
};

export default ProductDetailsPage;
