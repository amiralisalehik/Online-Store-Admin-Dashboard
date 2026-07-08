"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditeUser() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "",
  });

  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`,
        { credentials: "include" },
      );
      const data = await res.json();
      setFormData((prev) => ({ ...prev, ...data.admin }));
    }
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`,
      {
        method: "PUT",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formData),
      },
    );

    if (res.ok) {
      router.push("/users");
    }
  };

  return (
    <div>
      <h1 className="text-base font-bold ">تغییر مشخصات کاربری</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 ">
        <label>نام کاربری جدید</label>
        <input
          className="w-full mb-3 p-2 border border-gray-100 rounded-md outline-none bg-gray-50"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        ></input>
        <label>رمز عبور جدید</label>
        <input
          className="w-full mb-3 p-2 border border-gray-100 rounded-md outline-none bg-gray-50"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        ></input>
        <label>نقش</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full py-1 border border-gray-100 rounded-md outline-none bg-gray-50"
        >
          <option value="operator">اوپراتور</option>
          <option value="admin">ادمین</option>
        </select>

        <button
          className=" self-center w-fit cursor-pointer py-2 px-3 rounded-lg bg-blue-400 text-white"
          type="submit"
        >
          ذخیره تغییرات
        </button>
      </form>
    </div>
  );
}
