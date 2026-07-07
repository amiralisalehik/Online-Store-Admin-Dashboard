"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";


export default function DeleteProduct() {
  const router = useRouter();
  const { id } = useParams();
  async function handleDelete() {
    try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
        const error = await res.json();
      alert(error.message || "خطا در حذف محصول")
    }
    router.push("/products");
  }catch(error){
        alert("خطا در ارتباط با سرور");
    }
}

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <h1 className="text-base">آیا از حذف محصول اطمینان دارید؟</h1>
      <div className="my-3 flex gap-3">
        <button
          onClick={handleDelete}
          className="cursor-pointer py-2 px-3 rounded-lg bg-red-400 text-white"
        >
          بله حذف شود
        </button>

        <Link href="/products">
          <button className="cursor-pointer py-2 px-3 rounded-lg bg-blue-400 text-white">
            خیر حذف نشود
          </button>
        </Link>
      </div>
    </div>
  );
}
