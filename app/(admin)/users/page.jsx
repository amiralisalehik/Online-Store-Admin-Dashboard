import { cookies } from "next/headers";
import Link from "next/link";
import { FiEdit, FiTrash2 } from "react-icons/fi";

export default async function Users() {
  const cookiesStore = await cookies();
  const token = await cookiesStore.get("admin_token")?.value;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
    headers: {
      Cookie: `admin_token=${token}`,
    },
  });

  const data = await res.json();
  console.log(data.admin);
  return (
    <div className="w-full  flex flex-col gap-5">
      <h1 className="text-base font-bold">لیست کاربران</h1>
      <Link href="/users/add">
        <button className="cursor-pointer py-2 px-3 rounded-lg bg-blue-400 text-white">
          اضافه کردن کاربر جدید
        </button>
      </Link>
      <div className=" w-full max-w-4xl  ">
        <table className=" w-full border-collapse text-xs ">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className=" p-3 border-b-2 border-gray-300 ">نام کاربری</th>
              <th className=" p-3 border-b-2 border-gray-300 ">نقش</th>

              <th className=" p-3 border-b-2 border-gray-300 ">عملیات</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {data.admins.map((admin, index) => (
              <tr
                className={`border-b border-gray-200 hover:bg-gray-100 transition-colors
                               ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} `}
                key={admin._id}
              >
                <td className="p-3">{admin.username}</td>
                <td className="p-3">{admin.role}</td>

                <td className="p-3 flex justify-center gap-5">
                  <Link href={`/products/edit/${admin._id}`}>
                    <FiEdit></FiEdit>
                  </Link>
                  <Link href={`/products/delete/${admin._id}`}>
                    {" "}
                    <FiTrash2></FiTrash2>{" "}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
