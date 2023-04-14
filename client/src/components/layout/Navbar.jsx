import React from "react";
import styles from "../../styles/styles";
import { navItems } from "../../static/data";
import { Link } from "react-router-dom";

const Navbar = ({ active }) => {
  return (
    <div className={`block 800px:${styles.noramlFlex}`}>
      {navItems &&
        navItems.map((item, i) => (
          <div key={i} className="flex">
            <Link
              to={item.url}
              className={`${
                active === i + 1
                  ? "text-[#17dd1f]"
                  : "text-black 800px:text-[#fff]"
              } mb-4 800px:mb-0 font-[500] px-6 cursor-pointer`}
            >
              {item.title}
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Navbar;
