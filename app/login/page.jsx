"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const [formData, setFormData] = useState({});
  const [message , setMessage] = useState("اطلاعات خود را وارد کنید");
  const [error , setError] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formData),
      },
    );

    if (res.ok) {
      router.push("/");
    } else {
      setMessage("نام کاربری یا رمز عبور اشتباه است");
      setError(true);
    }
  };

  const handleChange = (e) => {
    
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(false);
    setMessage("اطلاعات خود را وارد کنید")
  };

  return (
    <div className="p-8 bg-gray-800 w-full h-full gap-5 flex flex-col items-center text-gary-800  justify-center">
      <div className="bg-white flex flex-col gap-5  rounded-lg min-w-full sm:min-w-[400px] p-10">
        <div className="flex flex-col gap-2 items-center text-gray-800">
          <h1 className="text-lg font-bold">ورود به پنل ادمین</h1>
          <p className={`text-xs ${error ? "text-red-800" : ""}`}>
            { message}
           </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white flex flex-col gap-2  rounded-lg "
        >
          <label>نام کاربری</label>
          <input
            onChange={handleChange}
            name="username"
            value={formData.username || ""}
            dir="ltr"
            type="text"
            className={` py-2 px-1 border-2 rounded-md  outline-none ${error ? "border-red-800" : "border-gray-800"}`}
          ></input>

          <label className="mt-3">رمز عبور</label>
          <input
            onChange={handleChange}
            value={formData.password || "" } 
            name="password"
            dir="ltr"
            type="password"
            className={` py-2 px-1 border-2 rounded-md  outline-none ${error ? "border-red-800" : "border-gray-800"}`}
           
          ></input>
          <button
            type="submit"
            className="mt-8 cursor-pointer bg-gray-800 rounded-lg p-3 text-white"
          >
            ورود
          </button>
        </form>
      </div>
    </div>
  );
}
