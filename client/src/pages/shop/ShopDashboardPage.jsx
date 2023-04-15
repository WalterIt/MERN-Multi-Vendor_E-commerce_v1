import { useSelector } from "react-redux";
import DashboardHeader from "../../components/shop/layout/DashboardHeader";
import DashboardSidebar from "../../components/shop/layout/DashboardSidebar";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const ShopDashboardPage = () => {
  const { pathname } = useLocation();
  const [active, setActive] = useState();

  useEffect(() => {
    switch (pathname) {
      case "/dashboard":
        setActive(1);
        break;
      case "/dashboard/products":
        setActive(3);
        break;
      case "/dashboard/create-product":
        setActive(4);
        break;
      case "/dashboard/events":
        setActive(5);
        break;
      case "/dashboard/create-event":
        setActive(6);
        break;
      // case '/contact':
      //   // code to handle contact page
      //   break;
      default:
        // code to handle other routes
        break;
    }
  }, [pathname]);

  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between  w-full">
        <div className="w-[80px]  800px:w-[270px] ">
          <DashboardSidebar active={active} />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default ShopDashboardPage;
