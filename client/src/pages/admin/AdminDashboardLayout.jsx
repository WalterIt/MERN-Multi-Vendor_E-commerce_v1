import { Outlet, useLocation } from "react-router-dom";
import AdminHeader from "../../components/admin/layout/AdminHeader";
import AdminSidebar from "../../components/admin/layout/AdminSidebar";
import { useEffect, useState } from "react";

const AdminDashboardLayout = () => {
  const { pathname } = useLocation();
  const [active, setActive] = useState();

  useEffect(() => {
    switch (pathname) {
      case "/admin":
        setActive(1);
        break;
      case "/admin/orders":
        setActive(2);
        break;
      case "/admin/sellers":
        setActive(3);
        break;
      case "/admin/users":
        setActive(4);
        break;
      case "/admin/products":
        setActive(5);
        break;
      case "/admin/events":
        setActive(6);
        break;
      case "/admin/withdraw-request":
        setActive(7);
        break;
      case "/profile":
        setActive(8);
        break;
      default:
        // code to handle other routes
        break;
    }
  }, [pathname]);

  return (
    <div>
      <AdminHeader />
      <div className="flex justify-between  w-full">
        <div className="w-[80px]  800px:w-[270px] ">
          <AdminSidebar active={active} />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
