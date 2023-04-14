import { useParams } from "react-router-dom";
import ProductDetails from "../components/products/ProductDetails";
import { useEffect, useState } from "react";
import { productData } from "../static/data";
import SuggestedProducts from "../components/products/SuggestedProducts";
const ProductDetailsPage = () => {
  const { name } = useParams();
  const [data, setData] = useState(null);
  const productName = name?.replace(/-/g, " ");

  window.scrollTo(0, 0);

  useEffect(() => {
    const data = productData.find((item) => item.name === productName);
    setData(data);
  }, []);

  return (
    <div>
      <ProductDetails data={data} />
      {data && <SuggestedProducts data={data} />}
    </div>
  );
};

export default ProductDetailsPage;
