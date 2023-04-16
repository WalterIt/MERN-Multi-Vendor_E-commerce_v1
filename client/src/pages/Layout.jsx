import React, { useEffect } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../redux/actions/product";

const Layout = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [activeHeading, setActiveHeading] = useState(null);
  const path = pathname.split("/")[1];
  //   console.log(path);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

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
      <Outlet />

      <Footer />
    </>
  );
};

export default Layout;
