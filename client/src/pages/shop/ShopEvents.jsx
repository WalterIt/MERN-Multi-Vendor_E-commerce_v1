import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import Loader from "../../components/layout/Loader";
import { deleteEventShop, getAllEventsShop } from "../../redux/actions/event";

const ShopEvents = () => {
  const { user } = useSelector((state) => state.seller);
  const seller = user;
  const { events, isLoading } = useSelector((state) => state.events ?? {});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllEventsShop(seller._id));
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteEventShop(id));
    window.location.reload();
  };

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 250, flex: 3 },

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
      field: "stock",
      headerName: "Stock",
      minWidth: 80,
      flex: 0.5,
    },
    {
      field: "sold",
      headerName: "Sold",
      minWidth: 100,
      flex: 0.8,
    },

    {
      field: "Preview",
      flex: 0.5,
      minWidth: 100,
      headerName: "Preview",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        const data = params.row.name;
        const eventName = data.replace(/\s+/g, "-");
        return (
          <>
            <Link to={`/dashboard/product/${eventName}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: "Delete",
      flex: 0.5,
      minWidth: 100,
      headerName: "Delete",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleDelete(params.id)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];

  events &&
    events.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(item.discountPrice),
        stock: item.stock,
        sold: 22,
      });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full justify-between flex">
          <div className="w-full mx-8 pt-1 mt-10 bg-white">
            <DataGrid
              rows={row}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              autoHeight
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ShopEvents;
