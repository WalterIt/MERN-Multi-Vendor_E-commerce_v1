import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { useEffect } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { useState } from "react";

const AdminProducts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`${server}/product/admin-all-products`).then((res) => {
      setData(res.data.products);
    });
  }, []);

  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 220, flex: 0.7 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "Stock",
      headerName: "Stock",
      type: "number",
      minWidth: 80,
      flex: 0.5,
    },

    {
      field: "sold",
      headerName: "Sold out",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "Preview",
      flex: 0.8,
      minWidth: 100,
      headerName: "Preview",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/product/${params.id}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  data &&
    data.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(item.discountPrice || item.originalPrice),
        Stock: item.stock,
        sold: item?.soldOut,
      });
    });

  return (
    <>
      <div className="w-full flex justify-center pt-5">
        <div className="w-[97%]">
          <h3 className="text-[22px] font-Poppins pb-2">All Products</h3>
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
      </div>
    </>
  );
};

export default AdminProducts;
