import React from "react";
import { FaPizzaSlice } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import Menu from "./Menu";
import Link from "next/link";
import CartIcon from "./CartIcon";
import UserLinks from "./UserLinks";
const Navbar = () => {
  
  return (
    <div className="h-12 text-blue-700 p-4 flex items-center justify-between border-b-2 border-b-blue-700 uppercase md:h-24 lg:px-20 xl:px-40 font-medium">
      <div className="hidden md:flex gap-4 flex-1">
        <Link href="/">Homepage</Link>
        <Link href="/menu">Menu</Link>
        <Link href="/">Contact</Link>
      </div>
      {/* LOGO SECTİON */}
      <div className="text-2xl font-bold flex-1 md:text-center">
        <Link className="flex items-center justify-center" href="/ ">
          <FaPizzaSlice className="mr-2 " /> PizzaHot{" "}
        </Link>
      </div>

      {/* MENU SECTİON */}
      <div className="md:hidden">
        <Menu />
      </div>

      <div className="hidden md:flex gap-7 items-center justify-end flex-1">
        <div className="flex items-center gap-2 cursor-pointer bg-orange-300 px-1 py-1 rounded-md md:absolute top-3 r-2 lg:static">
        <FaPhone />
        <span>+90 1234 122 22 22</span>

        </div>
        
       <UserLinks/>
        <Link href="/cart"><CartIcon/></Link>
        
      </div>
    </div>
  );
};

export default Navbar;
