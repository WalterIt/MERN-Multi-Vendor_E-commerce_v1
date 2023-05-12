import { AiOutlineArrowRight, AiOutlineMoneyCollect } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { MdBorderClear } from "react-icons/md";
import { FiPackage } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllOrdersShop } from "../../redux/actions/order";
import { getAllProductsShop } from "../../redux/actions/product";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const ShopDashboardHome = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const { allProducts } = useSelector((state) => state.products);
  const [deliveredOrder, setDeliveredOrder] = useState(null);
  const [availableBalance, setAvaibleBalance] = useState(null);

  useEffect(() => {
    dispatch(getAllOrdersShop(seller._id));
    dispatch(getAllProductsShop(seller._id));

    const orderData =
      orders && orders.filter((item) => item.status === "Delivered");
    setDeliveredOrder(orderData);
  }, [dispatch]);

  useEffect(() => {
    const totalIncomeWithoutTax = deliveredOrder
      ? deliveredOrder?.reduce((acc, item) => {
          const itemTotalPrice = item.cart.reduce((total, cartItem) => {
            const price = cartItem?.discountPrice || cartItem?.originalPrice;
            return total + price;
          }, 0);
          return acc + itemTotalPrice;
        }, 0)
      : 0;

    const serviceCharge = totalIncomeWithoutTax * 0.1 || 0;

    const availableBalance = totalIncomeWithoutTax + serviceCharge || 0;

    setAvaibleBalance(availableBalance);
  }, [availableBalance]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 220,
      flex: 1,
      cellClassName: (params) => {
        const status = params.field === "status" ? params.value : "";
        return status === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/dashboard/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.map((item) => {
      const totalPrice = item.cart.reduce((total, item) => {
        const price = item?.discountPrice || item?.originalPrice;
        return (
          (total + price * item.quantity) * 0.1 +
          (total + price * item.quantity)
        );
      }, 0);

      row.push({
        id: item._id,
        itemsQty: item.cart.reduce((acc, item) => acc + item.quantity, 0),
        totalPrice: totalPrice,
        total: new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(totalPrice),
        status: item.status,
      });
    });

  return (
    <div className="w-full p-8">
      <h3 className="text-[20px] font-Poppins pb-2 ">Overview</h3>
      <div className="w-full block 800px:flex items-center justify-between ">
        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5 ">
          <div className="flex items-center">
            <AiOutlineMoneyCollect
              size={50}
              className="mr-2"
              fill="#000000a1"
            />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#000000a1] `}
            >
              Account Balance{" "}
              <span className="text-[16px] ">(with 10% service charge)</span>
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(availableBalance)}
          </h5>
          <Link to="/dashboard/withdraw-money">
            <h5 className="pt-4 pl-2 text-[#077f9c] font-semibold ">
              Withdraw Money
            </h5>
          </Link>
        </div>

        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5 ">
          <div className="flex items-center">
            <MdBorderClear size={30} className="mr-2" fill="#000000a1" />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#000000a1] `}
            >
              All Orders
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            {orders && orders.length}
          </h5>
          <Link to="/dashboard/orders">
            <h5 className="pt-4 pl-2 text-[#077f9c] font-semibold ">
              View Orders
            </h5>
          </Link>
        </div>

        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5 ">
          <div className="flex items-center">
            <FiPackage size={30} className="mr-2" color="#000000a1" />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#000000a1] `}
            >
              All Products
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            {allProducts && allProducts?.length}
          </h5>
          <Link to="/dashboard/products">
            <h5 className="pt-4 pl-2 text-[#077f9c] font-semibold ">
              View Products
            </h5>
          </Link>
        </div>
      </div>
      <h3 className="text-[22px] font-Poppins] pb-2 pt-8">Latest Orders</h3>
      <div className="w-full min-h-[45vh] bg-white rounded">
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
        />
      </div>
    </div>
  );
};

export default ShopDashboardHome;
