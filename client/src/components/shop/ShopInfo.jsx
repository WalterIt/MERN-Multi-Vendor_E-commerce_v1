import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/styles";
import { useNavigate, useParams } from "react-router-dom";
import server from "../../server";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect, useState } from "react";

const ShopInfo = ({ isOwner }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allProducts } = useSelector((state) => state.products);
  const { seller } = useSelector((state) => state.seller);
  const { id } = useParams();
  const [data, setData] = useState({});
  // const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    axios
      .get(`${server}/shop/logout`)
      .then((res) => {
        toast.success(res.data.message);
        localStorage.clear();
        navigate("/login-shop");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error.res.data.message);
      });
  };

  useEffect(() => {
    axios
      .get(`${server}/shop/getshop-info/${id}`)
      .then((res) => {
        setData(res.data.shop);
        // setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        // setIsLoading(false);
      });
  }, []);

  // console.log(data);

  return (
    <div className="">
      <div className="w-full h-auto py-5 px-2">
        <div className="w-full flex items-center justify-center">
          <img
            src={data?.avatar}
            alt={data?.name}
            title={data?.name}
            className="w-[150px] h-[150px] object-fit rounded-full"
          />
        </div>
        <h3 className="text-center py-2 text-[20px] ">{data.name}</h3>
        <p className="text-[16px] text-[#000000a6] p-[10px] flex items-center ">
          {data.description}
        </p>
      </div>
      <div className="p-4">
        <h5 className="font-[600] ">Address</h5>
        <h4 className="text-[#000000a6]">{data.address}</h4>
      </div>

      <div className="p-4">
        <h5 className="font-[600] ">Phone Number</h5>
        <h4 className="text-[#000000a6]">{data.phoneNumber}</h4>
      </div>

      <div className="p-4">
        <h5 className="font-[600] ">Total Products</h5>
        <h4 className="text-[#000000a6]">{allProducts.length} Products</h4>
      </div>

      <div className="p-4">
        <h5 className="font-[600] ">Shop Ratings</h5>
        <h4 className="text-[#000000a6]">4/5</h4>
      </div>

      <div className="p-4">
        <h5 className="font-[600] ">Joined on:</h5>
        <h4 className="text-[#000000a6]">{data?.createdAt?.slice(0, 10)} </h4>
      </div>
      {isOwner && (
        <div className="py-3 px-4">
          <div className={`${styles.button} !w-full !h-[42px] !rounded `}>
            <span className="text-white font-semibold tracking-widest">
              Edit Shop
            </span>
          </div>

          <div
            className={`${styles.button} !bg-red-600 !w-full !h-[42px] !rounded `}
            onClick={() => handleLogout()}
          >
            <span className="text-white font-semibold tracking-widest">
              Log Out
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopInfo;
