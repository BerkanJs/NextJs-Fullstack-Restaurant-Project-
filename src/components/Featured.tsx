import React from "react";
import Image from "next/image";
import { ProductType } from "@/types/types";
//import { featuredProducts } from "./data";

const getData = async () => {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const Featured = async () => {
  const featuredProducts: ProductType[] = await getData();

  return (
    <div className="w-screen overflow-x-scroll text-blue-700">
      {/*Wrapper*/}
      <div className="w-max flex">
        {/*Single Item*/}
        {featuredProducts.map((item) => (
          <div
            key={item.id}
            className="w-screen h-[60vh] flex flex-col items-center justify-around p-4 hover:bg-blue-50 transition-all duration-300 md:w-[50vw] xl:w-[33vw] xl-h[90vh]"
          >
            {/*Image Container*/}
            {item.img && (
              <div className="relative flex-1 w-full hover:rotate-[60deg] transition-all duration-500">
                <Image src={item.img} alt="" fill objectFit="contain" />
              </div>
            )}
            {/*Text Container*/}
            <div className="flex-1 flex flex-col gap-4 items-center text-center justify-center">
              <h1 className="text-xl font-bold xl:text-2xl 2xl:text-3xl">
                {item.title}
              </h1>
              <p className="p-4 2xl:p-8">{item.desc}</p>
              <span className="text-xl font-bold">{item.price} TL</span>
              <button className="bg-blue-700 text-white p-2 rounded-md">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;
