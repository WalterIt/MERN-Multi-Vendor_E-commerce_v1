import React, { useEffect } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersUser } from "../../redux/actions/order";

const AllRefundOrders = () => {
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersUser(user._id));
  }, [dispatch]);

  const eligibleOrders =
    orders && orders.filter((order) => order.status === "Processing Refund");

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 250, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
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
            <Link to={`/user/order/${params.id}`}>
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

  eligibleOrders &&
    eligibleOrders.forEach((item, i) => {
      row.push({
        id: item._id,
        itemsQty: item.cart?.length,
        total: new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(
          (+item.cart[i].discountPrice || +item.cart[i].originalPrice) * 0.1 +
            (+item.cart[i].discountPrice || +item.cart[i].originalPrice)
        ),
        status: item?.status,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        getRowId={(row) => row.id}
        columns={columns}
        pageSize={10}
        autoHeight
        disableSelectionOnClick
      />
    </div>
  );
};

export default AllRefundOrders;
