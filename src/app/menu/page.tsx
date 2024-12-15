//import { menu } from "@/components/data";
import Link from "next/link";
import React from "react";
import { MenuType } from "@/types/types";

const getData=async()=>{
  const res=await fetch("http://localhost:3000/api/categories",{
    cache:"no-store"
  })
  if(!res.ok){
    throw new Error("Failed")
  }

  return res.json()
}



const MenuPage = async () => {

  const menu:MenuType=await getData()



  return (
    <div className="p-4 lg:px-20 xl:px-40 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col md:flex-row items-center justify-center">
      {menu.map((item) => (
        <Link
          style={{ backgroundImage: `url(${item.img})` }}
          className="w-full h-1/3 md:h-1/2 bg-cover bg-black border-l-4  "
          key={item.id}
          href={`menu/${item.slug}`}
        >
          <div className="text-yellow-500 w-full h-full hover:backdrop-blur-sm transition-all duration-300 rounded-lg pb-5 m-5     ">
            <h1 className="uppercase font-bold text-3xl md:text-5xl">{item.title}</h1>
            <p className="text-lg md:text-xl my-8 font-bold w-2/3 text-white">{item.desc}</p>
            <button className={`hidden 2xl:block bg-yellow-500 text-white px-4 py-2 rounded-lg`}>Expore</button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MenuPage;
