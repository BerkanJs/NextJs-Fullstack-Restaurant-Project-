import React from "react";
//import { pizzas } from "@/components/data";
import Link from "next/link";
import Image from "next/image";
import { ProductType } from "@/types/types";

const getData = async (category: string) => {
  const res = await fetch(
    `http://localhost:3000/api/products?cat=${category}`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

type Props = {
  params: {
    category: string;
  };
};


const CategoryPage = async ({ params }: Props) => {
  const products: ProductType[] = await getData(params.category);

  return (
    <div className="flex flex-wrap text-blue-500">
      {products.map((item) => (
        <Link
          key={item.id}
          className="w-full h-[60vh] border-r-2 border-b-2 border-blue-200 sm:w-1/2 lg:w-1/3 flex flex-col justify-between group odd:bg-blue-50 "
          href={`/products/${item.id}`}
        >
          {/*image */}
          {item.img && (
            <div className="relative h-[80%]">
              <Image src={item.img} alt="pastaIMG" fill objectFit="contain" />
            </div>
          )}

          {/* text */}
          <div className="flex items-center justify-between font-bold ">
            <h1 className="text-2xl uppercase p-2">{item.title}</h1>
            <h2 className="group-hover: text-xl">{item.price} TL</h2>
            <button className="hidden group-hover:block duration-300 transition-all uppercase bg-blue-500 text-white p-2 rounded-md">
              Add to Cart
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryPage;
