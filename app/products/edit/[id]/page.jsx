"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditProduct() {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "لپ تاپ",
    image: "",
    description: "",
  });

  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    async function fetchProduct() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`);
      const data = await res.json();
      setFormData((prev) => ({...prev , ...data.product }))
    }
    fetchProduct();
  }, []);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      router.push("/products");
    }
  }

  return (
    <div className="flex flex-col  gap-4">
      <h1 className="text-base font-bold ">ویرایش محصول</h1>
      <div className="flex flex-col ">
        <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-xl">
          <label className="block mb-1 ">نام جدید محصول</label>
          <input
            className="w-full mb-3 p-2 border border-gray-100 rounded-md outline-none bg-gray-50"
            onChange={handleChange}
            type="text"
            name="title"
            value={formData.title}
            placeholder="نام محصول"
          ></input>

          <div className="flex justify-between gap-5">
            <div className="w-full">
              <label className="block mb-1 ">قیمت جدید محصول</label>
              <input
                className="w-full mb-3 p-2 border border-gray-100 rounded-md outline-none bg-gray-50"
                onChange={handleChange}
                type="number"
                name="price"
                min={0}
                value={formData.price}
                placeholder="قیمت محصول به تومان"
              ></input>
            </div>

            <div className="w-full">
              <label className="block mb-1 ">دسته بندی</label>
              <select
                className="w-full py-1 border border-gray-100 rounded-md outline-none bg-gray-50"
                onChange={handleChange}
                name="category"
                value={formData.category}
              >
                <option value="لپ تاپ">لپ تاپ</option>
                <option value="موبایل">موبایل</option>
                <option value="ایرپاد">ایرپاد</option>
              </select>
            </div>
          </div>

          <label className="block mb-1 ">آدرس تصویر جدید</label>
          <input
            className="w-full mb-3 p-2 border border-gray-100 rounded-md outline-none bg-gray-50"
            onChange={handleChange}
            type="text"
            name="image"
            value={formData.image}
            placeholder="image url"
          ></input>

          <label className="block mb-1 ">توضیحات جدید</label>
          <textarea
            className="w-full h-29 resize-none overflow-y-auto  mb-3 p-2 border border-gray-100 rounded-md outline-none bg-gray-50"
            onChange={handleChange}
            type=""
            name="description"
            value={formData.description}
            placeholder="توضیحات محصول"
          ></textarea>
          <button
            className="self-center w-fit cursor-pointer py-2 px-3 rounded-lg bg-blue-400 text-white"
            type="submit"
          >
            {" "}
            ذخیره تغییرات
          </button>
        </form>
      </div>
    </div>
  );
}
