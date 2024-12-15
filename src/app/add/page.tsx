"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type Inputs = {
  title: string;
  desc: string;
  price: number;
  catSlug: string;
};

type Option = {
  title: string;
  additionalPrice: number;
};

const AddPage = () => {
  const { data: session, status } = useSession();
  const [inputs, setInputs] = useState<Inputs>({
    title: "",
    desc: "",
    price: 0,
    catSlug: "",
  
  });

  const [option, setOption] = useState<Option>({
    title: "",
    additionalPrice: 0,
  });

  const [options, setOptions] = useState<Option[]>([]);

  const router = useRouter();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated" || !session?.user.isAdmin) {
    router.push("/");
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const changeOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOption((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // JSON formatında veri gönderildiğini belirt
        },
        body: JSON.stringify({
          ...inputs,
          options, // Seçenekler doğru şekilde gönderiliyor
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to create product");
      }

      const data = await res.json();
      //router.push(`/product/${data.id}`);
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  return (
    <div className="p-4 lg:px-20 xl:px-40 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex items-center justify-center text-blue-700">
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-6">
        <h1 className="text-4xl mb-2 text-gray-300 font-bold">
          Add New Product
        </h1>

        <div className="w-full flex flex-col gap-2">
          <label className="text-sm">Title</label>
          <input
            className="ring-1 ring-blue-200 p-4 rounded-sm placeholder:text-blue-200 outline-none"
            type="text"
            placeholder="Bella Napoli"
            name="title"
            onChange={handleChange}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="text-sm">Description</label>
          <textarea
            rows={3}
            className="ring-1 ring-blue-200 p-4 rounded-sm placeholder:text-blue-200 outline-none"
            placeholder="A timeless favorite..."
            name="desc"
            onChange={handleChange}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="text-sm">Price</label>
          <input
            className="ring-1 ring-blue-200 p-4 rounded-sm placeholder:text-blue-200 outline-none"
            type="number"
            placeholder="29"
            name="price"
            onChange={handleChange}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="text-sm">Color</label>
          <input
            className="ring-1 ring-blue-200 p-4 rounded-sm placeholder:text-blue-200 outline-none"
            type="text"
            placeholder="e.g. Red"
            name="color" // 'color' alanını ekliyoruz
            onChange={handleChange}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="text-sm">Category</label>
          <input
            className="ring-1 ring-blue-200 p-4 rounded-sm placeholder:text-blue-200 outline-none"
            type="text"
            placeholder="pizzas"
            name="catSlug"
            onChange={handleChange}
          />
        </div>

    
        <div className="w-full flex flex-col gap-2">
          <label className="text-sm">Options</label>
          <div className="flex">
            <input
              className="ring-1 ring-blue-200 p-4 rounded-sm placeholder:text-blue-200 outline-none"
              type="text"
              placeholder="Title"
              name="optTitle"
              onChange={changeOption}
            />
            <input
              className="ring-1 ring-blue-200 p-4 rounded-sm placeholder:text-blue-200 outline-none"
              type="number"
              placeholder="Additional Price"
              name="optPrice"
              onChange={changeOption}
            />
            <button
              className="bg-gray-500 p-2 text-white"
              onClick={() => setOptions((prev) => [...prev, option])}
            >
              Add Option
            </button>
          </div>
          <div className="flex flex-wrap gap-4 mt-2">
            {options.map((opt) => (
              <div
                key={opt.title}
                className="p-2  rounded-md cursor-pointer bg-gray-200 text-gray-400"
                onClick={() =>
                  setOptions((prev) =>
                    prev.filter((item) => item.title !== opt.title)
                  )
                }
              >
                <span>{opt.title}</span>
                <span className="text-xs"> (+ ${opt.additionalPrice})</span>
              </div>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="bg-red-500 p-4 text-white w-48 rounded-md relative h-14 flex items-center justify-center"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddPage;
