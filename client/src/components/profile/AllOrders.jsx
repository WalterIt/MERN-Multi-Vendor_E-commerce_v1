import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
} from "react-icons/ai";

const AllOrders = () => {
  const orders = [
    {
      _id: "7463hvbfbhfbrtr28820221",
      orderItems: [
        {
          name: "Iphone 14 pro max",
        },
      ],
      totalPrice: 120,
      orderStatus: "Processing",
    },
  ];

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
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
            <Link to={`/order/${params.id}`}>
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
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(item.totalPrice),
        status: item.orderStatus,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        getRowId={(row) => row.id}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

export default AllOrders;
