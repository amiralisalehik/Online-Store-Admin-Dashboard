"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddProduct() {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "لپ تاپ",
    image: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  const router = useRouter();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  }

  function validate() {
    let newError = {};
    let isValid = true;

    if (!formData.title) {
      newError.title = "وارد کردن نام محصول الزامی است";
      isValid = false;
    } else if (formData.title.trim().length < 3) {
      newError.title = "نام محصول باید بیشتر از 3 کارکتر باشد";
      isValid = false;
    }
    if (!formData.price) {
      newError.price = "وارد کرد قیمت الزامی است";
      isValid = false;
    } else if (formData.price < 0) {
      newError.price = "قیمت باید یک عدد مثبت باشد";
      isValid = false;
    }
    if (!formData.image) {
      newError.image = "وارد کردن آدرس تصویر الزامی است";
      isValid = false;
    }
    setErrors(newError);
    return isValid;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    // if (!formData.title || !formData.price || !formData.image) {
    //   alert("لطفا تمام فیلدها را تکمیل کنید");
    //   return;
    // }
    // if (Number(formData.price) < 0) {
    //   alert("قیمت باید عدد مثبت باشد");
    //   return;
    // }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      router.push("/products");
    }
  }

  return (
    <div className="flex flex-col  gap-4">
      <h1 className="text-base font-bold ">افزودن محصول جدید</h1>
      <div className="flex flex-col ">
        <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-xl">
          <label className="block mb-1 ">نام محصول</label>
          <input
            className={`w-full mb-1 p-2 border ${errors.title ? "border-red-700" : "border-gray-100"}  rounded-md outline-none bg-gray-50`}
            onChange={handleChange}
            type="text"
            name="title"
            placeholder="نام محصول"
          ></input>
          {<p className="text-red-700 mb-2">{errors.title}</p>}

          <div className="flex justify-between gap-5">
            <div className="w-full">
              <label className="block mb-1 ">قیمت محصول</label>
              <input
                className={`w-full mb-1 p-2 border ${errors.price ? "border-red-700" : "border-gray-100"}  rounded-md outline-none bg-gray-50`}
                onChange={handleChange}
                type="number"
                name="price"
                placeholder="قیمت محصول به تومان"
              ></input>
              <p className="text-red-700 mb-2">{errors.price}</p>
            </div>

            <div className="w-full">
              <label className="block mb-1 ">دسته بندی</label>
              <select
                className="w-full py-1 border border-gray-100 rounded-md outline-none bg-gray-50"
                onChange={handleChange}
                name="category"
              >
                <option value="لپ تاپ">لپ تاپ</option>
                <option value="موبایل">موبایل</option>
                <option value="ایرپاد">ایرپاد</option>
              </select>
            </div>
          </div>

          <label className="block mb-1 ">آدرس تصویر</label>
          <input
            className={`w-full mb-1 p-2 border ${errors.image ? "border-red-700" : "border-gray-100"}  rounded-md outline-none bg-gray-50`}
            onChange={handleChange}
            type="text"
            name="image"
            placeholder="image url"
          ></input>
          <p className="text-red-700 mb-2">{errors.image}</p>

          <label className="block mb-1 ">توضیحات محصول</label>
          <textarea
            className="w-full h-29 resize-none overflow-y-auto  mb-3 p-2 border border-gray-100 rounded-md outline-none bg-gray-50"
            onChange={handleChange}
            type=""
            name="description"
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
