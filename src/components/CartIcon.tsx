"use client"
import { useCartStore } from '@/utils/store';
import React, { useEffect } from 'react'

import { BsCart4 } from "react-icons/bs";
const CartIcon = () => {
    const {  totalItems } = useCartStore();
      useEffect(()=>{
        useCartStore.persist.rehydrate()
      },[])
    
  return (
    <div className='flex justify-center item-center gap-1 md:gap-2 lg:gap-2 p-2 bg-blue-500 text-white rounded-xl  '>
        <div className='relative w-8 h-8 text-4xl flex items-center justify-center'>
        <BsCart4 />


        </div>
        <span className='text-lg'>

            Cart ({totalItems})
        </span>
    
    
    </div>
  )
}

export default CartIcon