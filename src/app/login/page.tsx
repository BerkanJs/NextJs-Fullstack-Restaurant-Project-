"use client"
import React from "react";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginPage = () => {

  const {data,status}=useSession();
  console.log(data,status)
  const router=useRouter();
  if(status==="loading"){
    return <p>Loading..</p>
  }
  if(status==="authenticated"){
    router.push("/")
  }







  return (
    <div className="p-4 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex items-center justify-center">
      {/*BOX */}

      <div className="h-full shadow-2xl rounded-md flex flex-col md:flex-row md:h-[70%] md:w-full lg:w-[60%] 2xl:w-1/2">
        {/*IMAGE CONTAINER */}
        <div className="relative h-1/3 w-full md:h-full md:w-1/2">
          <Image src="/Pasta1.png" alt="loginIMG" fill objectFit="contain" />



        </div>

        {/*FORM CONTAINER */}
        <div className="p-10 flex flex-col gap-8 md:w-1/2" >
          <h1 className="font-bold text-xl xl:text-3xl">Welcome</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, blanditiis?</p>
          
          <button onClick={()=>signIn("github")} className="flex gap-4 p-4 ring-1 ring-orange-100 rounded-md">
          <FaGithub className="text-4xl bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-white rounded-full p-1 " />
            <span>Sign in with Github</span>
          </button>
          <p className="text-sm">Have a problem ? <Link className="underline" href="/">Contact with us</Link></p>



        </div>
      </div>
    </div>
  );
};

export default LoginPage;
