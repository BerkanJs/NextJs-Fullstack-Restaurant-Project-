import Image from "next/image";
import React from "react";
//import { singleProduct } from "@/components/data";
import Price from "@/components/Price";
import { ProductType } from "@/types/types";
import DeleteButtons from "@/components/DeleteButtons";

const getData = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/products/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const SingleProductPage = async ({ params }: { params: { id: string } }) => {
  const singleProduct: ProductType = await getData(params.id);
  return (
    <div className="p-4 lg:px-20 xl:px-40 h-screen flex flex-col justify-around text-blue-700 md:flex-row md:gap-8 md:items-center relative">
      {singleProduct.img && (
        <div className="relative w-full h-1/2 md:h-[70%]">
          <Image src={singleProduct.img} alt="" fill objectFit="contain" />
        </div>
      )}

      <div className="h-1/2 md:h-[70%] md:justify-center md:gap-6 xl:gap-8 flex flex-col gap-4">
        <h1 className="text-3xl font-bold uppercase xl:text-5xl">
          {singleProduct.title}
        </h1>
        <p>{singleProduct.desc}</p>
        <Price product={singleProduct} />
      </div>
      <DeleteButtons id={singleProduct.id}/>
    </div>
  );
};

export default SingleProductPage;
