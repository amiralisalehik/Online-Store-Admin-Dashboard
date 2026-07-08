"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function DeleteUser() {
  const router = useRouter();
  const { id } = useParams();

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: { "content-type": "application/json" },
        },
      );

      if (!res.ok) {
        const error = await res.json();
        alert(error.error || "خطا در حذف کاربر");
      } else {
        alert("کاربر با موفقیت حذف شد");
      }

      router.push("/users");
    } catch (error) {
      alert("خطا در ارتباط با سرور");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <h1 className="text-base">آیا از حذف کاربر اطمینان دارید؟</h1>
      <div className="my-3 flex gap-3">
        <button
          onClick={handleDelete}
          className="cursor-pointer py-2 px-3 rounded-lg bg-red-400 text-white"
        >
          بله حذف شود
        </button>

        <Link href="/users">
          <button className="cursor-pointer py-2 px-3 rounded-lg bg-blue-400 text-white">
            خیر حذف نشود
          </button>
        </Link>
      </div>
    </div>
  );
}
