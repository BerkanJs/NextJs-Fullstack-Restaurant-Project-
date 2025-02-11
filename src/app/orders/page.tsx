"use client";

import { OrderType } from "@/types/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";

const OrdersPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Router hazır olmadan işlemi yapma
  useEffect(() => {
    if (router.isReady && status === "unauthenticated") {
      router.push("/");
    }
  }, [router.isReady, status]);

  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/api/orders");
      return res.json();
    },
  });
  const queryClient=useQueryClient()
  
  const mutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const response = await fetch(`http://localhost:3000/api/orders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update order");
      }
  
      return response.json();
    },
    onSuccess: () => queryClient.invalidateQueries("orders"),
    onError: (error) => console.error("Mutation failed:", error),
  });
  
  const handleUpdate = (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements[0] as HTMLInputElement;
    const status = input.value.trim();
  
    if (!status) {
      alert("Status cannot be empty!");
      return;
    }
  
    mutation.mutate({ id, status });
    toast.success("The order status has been changed")
    // Sayfayı yenilemek için bir süre bekle
    setTimeout(() => {
      window.location.reload();
    }, 1000);

    
  
    
  };
  
  if (isLoading || status === "loading") return "Loading...";
  if (!data) return "No data found.";
  if (!session) {
    return <div>Please log in</div>;
  }

  if (!Array.isArray(data)) {
    return <div>No valid data found.</div>;
  }


  return (
    <div className="p-4 lg:px-20 xl:px-40">
      <table className="w-full border-separate border-spacing-2">
        <thead>
          <tr className="text-left">
            <th className="hidden md:block">Order ID</th>
            <th>Date</th>
            <th>Price</th>
            <th className="hidden md:block">Products</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item: OrderType) => (
            <tr className={`${item.status !=="delivered" && "bg-red-50"} text-sm md:text-base odd:bg-slate-50`} key={item.id}>
              <td className="hidden md:block py-6 px-1">{item.id}</td>
              <td className="py-6 px-1">
                {item.createdAt.toString().slice(0, 10)}
              </td>
              <td className="py-6 px-1">{item.price}</td>
              <td className="hidden md:block">{item.products[0].title}</td>
              {session?.user.isAdmin ? (
                <td>
                  <form className="flex items-center justify-center gap-4" onSubmit={(e)=>handleUpdate(e,item.id)} >
               

                  <input
                    placeholder={item.status}
                    className="p-2 ring-1 ring-blue-700 rounded-md"
                  />
                  <button className="text-2xl px-4 py-1 mx-4 rounded-md bg-blue-600 text-white">Edit</button>
                  </form>
                </td>
              ) : (
                <td className="py-6 px-1">{item.status}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;
