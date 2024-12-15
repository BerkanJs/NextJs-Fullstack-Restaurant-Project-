"use client";

import React from "react";

import { useSession } from "next-auth/react";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const DeleteButtons = ({ id }: { id: string }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated" || !session?.user.isAdmin) {
    return;
  }

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: "DELETE",
      });
  
      if (res.status === 200) {
        router.push("/menu");
        toast("The product has been deleted!");
      } else {
        // Yanıtın boş olup olmadığını kontrol et
        const data = res.headers.get("content-type")?.includes("application/json")
          ? await res.json()
          : { message: "An unexpected error occurred" };
        toast.error(data.message);
      }
    } catch (error) {
      console.error("An error occurred while deleting the product:", error);
      toast.error("Something went wrong. Please try again later.");
    }
  };
  

  return (
    <button
      onClick={handleDelete}
      className="bg-blue-700 p-2 rounded-full absolute top-4 right-4 text-white"
    >
      Delete Button
    </button>
  );
};

export default DeleteButtons;
