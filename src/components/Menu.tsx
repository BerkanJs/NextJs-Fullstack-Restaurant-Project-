"use client";
import Link from "next/link";
import React, { useState } from "react";
import { IoMenuSharp } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import CartIcon from "./CartIcon";

const links = [
  { id: 1, title: "Homepage", url: "/" },
  { id: 2, title: "Menu", url: "/menu" },
  { id: 3, title: "Working Hours", url: "/" },
  { id: 4, title: "Contact", url: "/" },
];

const Menu = () => {
  const [open, setOpen] = useState(false);
  const user =false;
  return (
    <div>
      <div>
      {!open ? (
        <IoMenuSharp
          className="text-3xl cursor-pointer "
          onClick={() => setOpen(true)}
        />
      ) : (
        <IoClose
          className="text-3xl cursor-pointer"
          onClick={() => setOpen(false)}
        />
      )}
      </div>

{ open &&      <div className="bg-blue-700 text-white absolute left-0 top-24 w-full h-[calc(100vh-6rem)] flex flex-col gap-8 items-center justify-center text-3xl z-10">
        {
          links.map((item)=>(
            <Link onClick={()=>setOpen(false)} href={item.url} key={item.id}>{item.title}</Link>
            
          ))
        }
        {!user ? <Link onClick={()=>setOpen(false)} href="/login">Login</Link> :<Link onClick={()=>setOpen(false)} href="/orders">Orders</Link>}


        <Link onClick={()=>setOpen(false)} href="/cart">
        <CartIcon/>
        
        </Link>


      
        



      </div>}
    </div>
  );
};

export default Menu;
