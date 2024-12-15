"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useCartStore } from "@/utils/store";
const CartPage = () => {
  const { products, totalItems, totalPrice, removeFromCart } = useCartStore();
    useEffect(()=>{
      useCartStore.persist.rehydrate()
    },[])
  
  return (
    <div className="h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col text-blue-700 lg:flex-row">
      <div className="h-1/2 p-4 flex flex-col justify-center overflow lg:h-full lg:w-2/3">
        {products.map((item) => (
          <div key={item.id} className="flex items-center justify-between mb-4">
           {item.img && <Image src={item.img} alt="" width={100} height={100} />}
            <div className="">
              <h1 className="uppercase text-xl font-bold">{item.title} x {item.quantity}</h1>
              <span>{item.optionTitle}</span>
            </div>
            <h2 className="font-bold">{item.price} TL</h2>
            <span onClick={()=>removeFromCart(item)} className="cursor-pointer">X</span>
          </div>
        ))}
      </div>

      <div className="h-1/2 p-4 bg-blue-50 flex flex-col gap-4 justify-center lg:h-full lg:w-1/3 ">
        <div className="flex justify-between">
          <span className="font-bold">Subtotal({totalItems})</span>
          <span className="">{totalPrice} TL</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold">Service Cost</span>
          <span className="">0.00 TL</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold">Delivery Costs</span>
          <span className="text-yellow-400">Free</span>
        </div>

        <hr className="my-2" />
        <div className="flex justify-between">
          <span className="font-bold">Total (INCL. VAT)</span>
          <span className="font-bold">{totalPrice} TL</span>
        </div>
        <button className="bg-blue-700 text-white p-3 rounded-md w-1/3 self-end">
          Check Out
        </button>
      </div>
    </div>
  );
};

export default CartPage;
