import {
  AiOutlineCreditCard,
  AiOutlineLogin,
  AiOutlineMessage,
} from "react-icons/ai";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineTrackChanges } from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import { RxPerson } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { server } from "../../server";
import axios from "axios";
import { toast } from "react-toastify";

const ProfileSidebar = ({ active, setActive }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    axios
      .get(`${server}/user/logout`)
      .then((res) => {
        toast.success(res.data.message);
        localStorage.clear();
        navigate("/");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error.res.data.message);
      });
  };

  return (
    <div className="w-full bg-white shadow-sm rounded-[10px] p-4 pt-8 ">
      <div
        className="flex items-center w-full cursor-pointer mb-8"
        onClick={() => setActive(1)}
      >
        <RxPerson size={20} color={active === 1 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 1 ? "text-[red]" : ""
          } 800px:block hidden`}
        >
          Profile
        </span>
      </div>

      <div
        className="flex items-center w-full cursor-pointer mb-8"
        onClick={() => setActive(2)}
      >
        <HiOutlineShoppingBag size={20} color={active === 2 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 2 ? "text-[red]" : ""
          } 800px:block hidden`}
        >
          Orders
        </span>
      </div>

      <div
        className="flex items-center w-full cursor-pointer mb-8"
        onClick={() => setActive(3)}
      >
        <MdOutlineTrackChanges size={20} color={active === 3 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 3 ? "text-[red]" : ""
          } 800px:block hidden`}
        >
          Track Order
        </span>
      </div>

      <div
        className="flex items-center w-full cursor-pointer mb-8"
        onClick={() => setActive(4)}
      >
        <HiOutlineReceiptRefund size={20} color={active === 4 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 4 ? "text-[red]" : ""
          } 800px:block hidden`}
        >
          Refunds
        </span>
      </div>

      <div
        className="flex items-center w-full cursor-pointer mb-8"
        onClick={() => setActive(5)}
      >
        <AiOutlineMessage size={20} color={active === 5 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 5 ? "text-[red]" : ""
          } 800px:block hidden`}
        >
          Inbox
        </span>
      </div>

      <div
        className="flex items-center w-full cursor-pointer mb-8"
        onClick={() => setActive(6)}
      >
        <RiLockPasswordLine size={20} color={active === 6 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 6 ? "text-[red]" : ""
          } 800px:block hidden`}
        >
          Change Password
        </span>
      </div>

      <div
        className="flex items-center w-full cursor-pointer mb-8"
        onClick={() => setActive(7)}
      >
        <TbAddressBook size={20} color={active === 7 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 7 ? "text-[red]" : ""
          } 800px:block hidden`}
        >
          Address
        </span>
      </div>

      <div
        className="flex items-center w-full cursor-pointer mb-8"
        onClick={() => setActive(8) || handleLogout()}
      >
        <AiOutlineLogin size={20} color="red" />
        <span
          className={`pl-3 font-[600] ${
            active === 8 ? "text-[red]" : ""
          } 800px:block hidden`}
        >
          Log out
        </span>
      </div>
    </div>
  );
};

export default ProfileSidebar;
