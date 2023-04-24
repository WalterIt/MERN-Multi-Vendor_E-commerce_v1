import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { categoriesData } from "../../static/data.jsx";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import DropDown from "./DropDown";
import Navbar from "./Navbar.jsx";
import { useSelector } from "react-redux";
import Cart from "../Cart";
import Wishlist from "../Wishlist";
import { RxCross1 } from "react-icons/rx";

const Header = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user ?? {});
  const { cart } = useSelector((state) => state.cart ?? {});
  const { wishlist } = useSelector((state) => state.wishlist || []);
  const { products } = useSelector((state) => state.products ?? {});
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSearchChange = (e) => {
    const term = e.target.value;

    setSearchTerm(term);

    const filteredProducts =
      products &&
      products.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );

    if (filteredProducts === "") {
      setSearchData(null);
    }

    setSearchData(filteredProducts);
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  return (
    <>
      <div className={`${styles.section}`}>
        <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex  items-center justify-between">
          <div>
            <Link to="/">
              <img
                src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                alt="logo"
              />
            </Link>
          </div>
          <div className="w-[50%] relative">
            <input
              type="text"
              placeholder="Search Product..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-sm"
              // onBlur={() => setSearchData(null)}
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-1.5 cursor-pointer"
            />
            {searchData && searchData.length !== 0 ? (
              <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                {searchData &&
                  searchData.map((item, i) => {
                    return (
                      <Link
                        key={i}
                        to={`/product/${item._id}`}
                        onClick={() => setSearchData(null)}
                      >
                        <div className="w-full flex items-start justify-items-center py-3">
                          <img
                            src={item.images[0]}
                            alt={item.name}
                            className="w-[40px] h-auto mr-[10px]"
                          />
                          <h1>{item.name}</h1>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            ) : null}
          </div>
          <div className={`${styles.button}`}>
            <Link to="/create-shop">
              <h1 className="text-[#fff] flex items-center">
                Become a Seller <IoIosArrowForward className="ml-1" />
              </h1>
            </Link>
          </div>
        </div>
      </div>
      <div
        className={`${
          active ? "shadow-sm  fixed top-0 left-0 z-10" : null
        } transition hidden 800px:flex items-center justify-between w-full bg-[#3321c8] h-[70px]`}
      >
        <div
          className={`${styles.section} relative ${styles.noramlFlex} justify-between`}
        >
          <div onClick={() => setDropDown(!dropDown)}>
            <div className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block">
              <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
              <button
                className={`h-[100%] w-full  flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md`}
              >
                All Categories
              </button>
              <IoIosArrowDown
                size={20}
                className="absolute right-2 top-4 cursor-pointer"
                onClick={() => setDropDown(!dropDown)}
              />
              {dropDown ? (
                <DropDown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              ) : null}
            </div>
          </div>
          <div className={`${styles.noramlFlex}`}>
            <Navbar active={activeHeading} />
          </div>

          <div className="flex">
            <div className={`${styles.noramlFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenWishlist(true)}
              >
                <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
                <span className="absolute right-0 top-[-5px] rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center ">
                  {wishlist.length}
                </span>
              </div>
            </div>

            <div className={`${styles.noramlFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenCart(true)}
              >
                <AiOutlineShoppingCart
                  size={30}
                  color="rgb(255 255 255 / 83%)"
                />
                <span className="absolute right-0 top-[-5px] rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center ">
                  {cart.length}
                </span>
              </div>
            </div>

            <div className={`${styles.noramlFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                {isAuthenticated ? (
                  <Link to="/profile">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      title={user.name}
                      className="w-[40px] h-[40px] object-cover rounded-full "
                    />
                  </Link>
                ) : (
                  <Link to="/login">
                    <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                  </Link>
                )}
              </div>
            </div>

            {/* / WISHLIST POPUP / */}
            {openWishlist ? (
              <Wishlist setOpenWishlist={setOpenWishlist} />
            ) : null}

            {/* / CART POPUP / */}
            {openCart ? <Cart setOpenCart={setOpenCart} /> : null}
          </div>
        </div>
      </div>

      {/* MOBILE HEADER  */}
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10 " : null
        }  w-full h-[60px] fixed  bg-white z-50 top-0 left-0 800px:hidden`}
      >
        <div className="w-full flex items-center justify-between">
          <div>
            <BiMenuAltLeft
              size={40}
              className="ml-4"
              onClick={() => setOpen(true)}
            />
          </div>
          <div>
            <Link to="/">
              <img
                src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                alt="logo"
                className="mt-3 cursor-pointer"
              />
            </Link>
          </div>
          <div>
            <div className="relative mr-[20px] ">
              <AiOutlineShoppingCart size={30} />
              <span className="absolute right-0 top-[-5px] rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center ">
                {cart.length}
              </span>
            </div>
          </div>
        </div>

        {/*  HEADER SIDEBAR */}
        {open && (
          <div
            className={` fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0 `}
          >
            <div className="fixed w-[60%] bg-white h-screen top-0 left-0 z-10 overflow-y-scroll ">
              <div className="w-full flex justify-between pr-3">
                <div>
                  <div className="relative mr-[15px] ">
                    <AiOutlineHeart size={30} className="mt-5 ml-3" />
                    <span className="absolute right-0 top-[-5px] rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center ">
                      {wishlist.length}
                    </span>
                  </div>
                </div>
                <RxCross1
                  size={25}
                  className="ml-4 mt-5"
                  onClick={() => setOpen(false)}
                />
              </div>

              <div className="my-8 w-[92%] relative  m-auto h-[40px] ">
                <input
                  type="text"
                  placeholder="Search Product..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-sm"
                />
                <AiOutlineSearch
                  size={25}
                  className="absolute right-2 top-2 cursor-pointer"
                />
                {searchData && (
                  <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                    {searchData &&
                      searchData.map((item, i) => {
                        const data = item.name;

                        const productName = data.replace(/\s+/g, "-");

                        return (
                          <Link to={`/product/${productName}`}>
                            <div className="w-full flex items-start-py-3">
                              <img
                                src={item.image_Url[0].url}
                                alt={data}
                                className="w-[40px] h-[40px] mr-[10px]"
                              />
                              <h1>{data}</h1>
                            </div>
                          </Link>
                        );
                      })}
                  </div>
                )}
              </div>
              <Navbar active={activeHeading} />
              <div className={`${styles.button} ml-4 !rounded-[4px] `}>
                <Link to="/create-shop">
                  <h1 className="text-[#fff] flex items-center">
                    Become a Seller <IoIosArrowForward className="ml-2" />
                  </h1>
                </Link>
              </div>
              <div className="flex w-full justify-center mt-8">
                {isAuthenticated ? (
                  <div>
                    <Link to="/profile">
                      <img
                        src={user.avatar}
                        alt=""
                        className="w-[75px] h-[75px] rounded-full border-[3px] border-[#0eae88]"
                      />
                    </Link>
                  </div>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-[18px] pr-[10px] text-[#000000b7]"
                    >
                      Login /
                    </Link>
                    <Link
                      to="/sign-up"
                      className="text-[18px] text-[#000000b7]"
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
