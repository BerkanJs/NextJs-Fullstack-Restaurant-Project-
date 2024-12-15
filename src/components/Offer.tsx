import React from 'react'
import Image from 'next/image'
import CountDown from './CountDown'
const Offer = () => {
  return (
    <div className='bg-gradient-to-r from-gray-900 via-slate-700 to-slate-500 h-screen flex flex-col md:flex-row md:justify-between md:h-[70vh] '>
    <div className='flex-1 flex flex-col items-center justify-center gap-8 p-6'>
      <h1 className='text-white text-5xl font-bold xl:text-6xl'> Lorem ipsum dolor sit amet.</h1>
      <p className='text-white xl:text-xl'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore, porro!</p>
      <CountDown/>
      <button className='bg-blue-700 text-white rounded-md py-3 px-6'>Order Now !</button>

    </div>

    <div className='relative w-full flex-1 md:h-full'>
      <Image src="/OfferIMG.png" alt=''  fill objectFit='contain'/>
      
    </div>











  </div>

  )
}

export default Offer