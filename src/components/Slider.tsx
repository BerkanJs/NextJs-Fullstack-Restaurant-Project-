"use client"
import Image from "next/image";
import React, { useEffect, useState } from "react";

const data = [
  {
    id: 1,
    title:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer elementum ",
    image: "/Slider1.png",
  },
  {
    id: 2,
    title:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
    image: "/Slider4.png",
  },
  {
    id: 3,
    title: "Lorem ipsum dolor sit amet ",
    image: "/Slider3.png",
  },
];




const Slider = () => {
  const [currentSlide,setCurrentSlide]=useState(0);
  useEffect(()=>{
    const interval=setInterval(
      ()=>setCurrentSlide((prev)=>prev ===data.length-1 ? 0 :prev+1)

    ,4000);
    return ()=>clearInterval(interval)

  },[])







  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] lg:flex-row">
      {/* Text Container */}
      <div className="h-1/2 w-full flex items-center justify-center flex-col gap-8 text-blue-700 font-bold lg:h-full lg:w-1/2 bg-gradient-to-r from-blue-50  to-white">
        <h1 className="text-4xl text-center uppercase md:p-10 p-4 md:text-5xl">{data[currentSlide].title}</h1>
        <button className="bg-blue-700 text-white px-8 py-4"> Order Now</button>
      </div>

      {/* Image Container */}
      <div className=" w-full  h-1/2 relative lg:w-1/2 lg:h-full">
        <Image src={data[currentSlide].image} alt="SliderIMG" fill objectFit="cover" />
      </div>
    </div>
  );
};

export default Slider;
