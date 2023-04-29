import { useParams, useSearchParams } from "react-router-dom";
import ProductDetails from "../components/products/ProductDetails";
import { useEffect, useState } from "react";
import SuggestedProducts from "../components/products/SuggestedProducts";
import { useSelector } from "react-redux";

const ProductDetailsPage = () => {
  const { products } = useSelector((state) => state.products);
  const { allEvents } = useSelector((state) => state.events);
  const [searchParams] = useSearchParams();
  const eventData = searchParams.get("isEvent");
  const { id } = useParams();
  const [data, setData] = useState(null);

  window.scrollTo(0, 0);

  useEffect(() => {
    if (eventData !== null) {
      const data = allEvents?.find((item) => item._id === id);
      setData(data);
    } else {
      const data = products?.find((item) => item._id === id);
      setData(data);
    }
  }, [products, allEvents]);

  // console.log(data);

  return (
    <div>
      <ProductDetails data={data} />
      {data && <SuggestedProducts data={data} />}
    </div>
  );
};

export default ProductDetailsPage;
