"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AddAdmin() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "operator",
  });
  const path = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
      method: "POST",
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert("کاربر با موفقیت اضافه شد.")
      path.push("/users");
    }
  };

  return (
    <div className="flex flex-col max-w-[500px]  gap-4">
      <h1 className="text-base font-bold ">افزودن کاربر جدید</h1>
      <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-xl">
        <label className="block mb-2 ">نام کاربری</label>
        <input
          dir="ltr"
          className={`w-full mb-4 p-2 border border-gray-100 rounded-md outline-none bg-gray-50`}
          type="text"
          name="username"
          onChange={handleChange}
          value={formData.username}
        ></input>
        <label className="block mb-2 ">رمز عبور</label>
        <input
          dir="ltr"
          className={`w-full mb-3 p-2 border border-gray-100 rounded-md outline-none bg-gray-50`}
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        ></input>
        <label className="block mb-1 ">نقش</label>
        <select
          className="w-full py-1 border border-gray-100 rounded-md outline-none bg-gray-50"
          name="role"
          onChange={handleChange}
        >
          <option value="operator">اپراتور</option>
          <option value="admin">ادمین</option>
        </select>
        <button className="mt-10 self-center w-fit cursor-pointer py-2 px-3 rounded-lg bg-blue-400 text-white ">
          {" "}
          اضافه کردن کاربر{" "}
        </button>
      </form>
    </div>
  );
}
