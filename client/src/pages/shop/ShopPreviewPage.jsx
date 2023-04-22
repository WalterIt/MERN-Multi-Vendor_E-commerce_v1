import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import ShopInfo from "../../components/shop/ShopInfo";
import ShopProfileData from "../../components/shop/ShopProfileData";
import { useSelector } from "react-redux";
import Header from "../../components/layout/Header";
import { useLocation } from "react-router-dom";

const ShopPreviewPage = () => {
  // const { products } = useSelector((state) => state.products);
  // console.log(products);
  const { pathname } = useLocation();
  const [activeHeading, setActiveHeading] = useState(null);
  const path = pathname.split("/")[1];
  //   console.log(path);

  window.scrollTo(0, 0);

  useEffect(() => {
    switch (path) {
      case "":
        setActiveHeading(1);
        break;
      case "best-selling":
        setActiveHeading(2);
        break;
      case "products":
        setActiveHeading(3);
        break;
      case "events":
        setActiveHeading(4);
        break;
      case "faq":
        setActiveHeading(5);
        break;
      default:
        break;
    }
  }, [path]);

  return (
    <>
      <Header activeHeading={activeHeading} />

      <div className={`${styles.section} bg-[#f5f5f5]`}>
        <div className="w-full flex py-10 justify-between">
          <div className="w-[25%] bg-[#fff] rounded-[4px] shadow-sm overflow-y-scroll h-[100vh] sticky top-10 left-0 z-0">
            <ShopInfo isOwner={false} />
          </div>
          <div className="w-[72%] rounded-[4px]">
            <ShopProfileData isOwner={false} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopPreviewPage;
