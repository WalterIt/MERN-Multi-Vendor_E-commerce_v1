import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  deleteProductShop,
  getAllProductsShop,
} from "../../redux/actions/product";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import Loader from "../../components/layout/Loader";
import styles from "../../styles/styles";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import server from "../../server";
import { toast } from "react-toastify";

const ShopCoupons = () => {
  const { user } = useSelector((state) => state.seller);
  const seller = user;
  const { products } = useSelector((state) => state.products ?? {});
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [discount, setDiscount] = useState(null);
  const [minAmount, setMinAmount] = useState(null);
  const [maxAmount, setMaxAmount] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState();
  const [coupons, setCoupons] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${server}/coupon/getcoupons/${seller._id}`)
      .then((res) => {
        setLoading(false);
        setCoupons(res.data.couponCodes);
        // console.log(res.data.couponCodes);
      })
      .catch((error) => setLoading(false));
  }, [dispatch]);

  const handleDelete = async (id) => {
    axios
      .delete(`${server}/coupon/delete-coupon/${id}`)
      .then((res) => {
        toast.success("Coupon Code deleted succesfully!");
      })
      .catch((error) => toast.error(error.response.data.message));
    window.location.reload();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newForm = {
      name,
      discount,
      minAmount,
      maxAmount,
      selectedProduct,
      shopId: seller._id,
    };
    // console.log(newForm);
    axios
      .post(`${server}/coupon/create-coupon-code`, newForm)
      .then((res) => {
        toast.success("Coupon Code created Successfully!");
        setIsOpen(false);
        window.location.reload();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
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
      field: "discount",
      headerName: "Discount",
      minWidth: 100,
      flex: 0.6,
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

  coupons.length &&
    coupons.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        discount: item.discount + " %",
        sold: 22,
      });
    });

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <div className="w-full flex justify-end">
            <div
              className={`${styles.button} !w-max !h-[45px] px-3 !rounded mr-3 mb-4 hover:bg-[#000000d8] `}
              onClick={() => setIsOpen(true)}
            >
              <span className="text-white">Create Coupon Code</span>
            </div>
          </div>
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
          {isOpen && (
            <div className="fixed top-0 left-0 w-full h-screen bg-[#00000061] z-[2000] flex items-center justify-center">
              <div className="w-[90%] 800px:w-[40%] h-[80vh] bg-white rounded-md shadow-md relative p-4">
                <div
                  className="w-full flex justify-end cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  <RxCross1 size={30} />
                </div>
                <h5 className="text-[30px] font-Popins text-center ">
                  Create Coupon Code
                </h5>
                <form onSubmit={handleSubmit} aria-required={true}>
                  <div>
                    <label htmlFor="" className="py-2">
                      Name
                      <span className="text-red-500 font-extrabold">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      required
                      onChange={(e) => setName(e.target.value)}
                      className="mt-2 appearance-none block w-full mb-3 px-3 h-9 border border-gray-300 rounded placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm  "
                      placeholder="Enter your Product Name"
                    />
                  </div>

                  <div>
                    <label htmlFor="" className="py-2">
                      Discount Percentage
                      <span className="text-red-500 font-extrabold">*</span>
                    </label>
                    <input
                      type="number"
                      name="discount"
                      required
                      value={discount}
                      onChange={(e) => setDiscount(e.target.value)}
                      className="mt-2 appearance-none block w-full mb-3 px-3 h-9 border border-gray-300 rounded placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm  "
                      placeholder="Enter Discount Percentage..."
                    />
                  </div>
                  <div>
                    <label htmlFor="" className="py-2">
                      Min Amount
                    </label>
                    <input
                      type="number"
                      name="minAmount"
                      value={minAmount}
                      onChange={(e) => setMinAmount(e.target.value)}
                      className="mt-2 appearance-none block w-full mb-3 px-3 h-9 border border-gray-300 rounded placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm  "
                      placeholder="Enter your Min Amount for Product Price..."
                    />
                  </div>

                  <div>
                    <label htmlFor="" className="py-2">
                      Max Amount
                    </label>
                    <input
                      type="number"
                      name="maxAmount"
                      value={maxAmount}
                      onChange={(e) => setMaxAmount(e.target.value)}
                      className="mt-2 appearance-none block w-full mb-3 px-3 h-9 border border-gray-300 rounded placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm  "
                      placeholder="Enter Max Amount for Product Price Discount..."
                    />
                  </div>

                  <div>
                    <label htmlFor="" className="py-2">
                      Selected Product
                    </label>
                    <select
                      name=""
                      value={selectedProduct}
                      onChange={(e) => setSelectedProduct(e.target.value)}
                      className="w-full mt-2 mb-3 border h-9 rounded  "
                    >
                      <option value="Choose your Selected Product">
                        Choose a Selected Product
                      </option>
                      {products &&
                        products.map((item, i) => (
                          <option key={i} value={item.name}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div>
                    <input
                      type="submit"
                      value="Create Coupon"
                      className="mt-2 bg-black text-white font-bold tracking-widest cursor-pointer hover:bg-[#000000d8] appearance-none block w-full mb-3 px-3 h-9 border border-gray-300 rounded placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm  "
                    />
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ShopCoupons;
