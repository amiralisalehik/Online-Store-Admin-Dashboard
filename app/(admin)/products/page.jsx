export const dynamic = "force-dynamic";

import Link from "next/link";
import { FiEdit, FiTrash2 } from "react-icons/fi";

export default async function Products() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
  const products = await res.json();
  products.reverse();
  return (
    <div className="w-full  flex flex-col gap-5">
      <h1 className="text-base font-bold">لیست آخرین محصولات</h1>
      <Link href="/products/add">
        <button className="cursor-pointer py-2 px-3 rounded-lg bg-blue-400 text-white">
          اضافه کردن محصول جدید
        </button>
      </Link>
      <table className="w-full border-collapse text-xs">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className=" p-3 border-b-2 border-gray-300 ">نام محصول</th>
            <th className=" p-3 border-b-2 border-gray-300 ">عملیات</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {products.map((product, index) => (
            <tr
              className={`border-b border-gray-200 hover:bg-gray-100 transition-colors
                         ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} `}
              key={product._id}
            >
              <td className="p-3">{product.title}</td>
              <td className="p-3 flex justify-center gap-5">
                <Link href={`/products/edit/${product._id}`}>
                  <FiEdit></FiEdit>
                </Link>
                <Link href={`/products/delete/${product._id}`}>
                  {" "}
                  <FiTrash2></FiTrash2>{" "}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
