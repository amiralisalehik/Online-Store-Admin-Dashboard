export const dynamic = "force-dynamic";

export default async function Orders() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`);
  const res = await data.json();

  const statusMap = {
    pending: "در انتظار پرداخت",
    paid: "پرداخت شده",
    cancelled: "لغو شده",
    shipped: "ارسال شده",
  };

  return (
    <div>
      <h1 className="text-base font-bold">لیست سفارش ها</h1>
      <table className="w-full border-collapse text-xs my-3">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className=" p-3 border-b-2 border-gray-300 "> نام کاربر</th>
            <th className=" p-3 border-b-2 border-gray-300 "> ایمیل کاربر</th>
            <th className=" p-3 border-b-2 border-gray-300 "> شهر - کدپستی </th>
            <th className=" p-3 border-b-2 border-gray-300 ">جمع سبد خرید</th>
            <th className=" p-3 border-b-2 border-gray-300 ">وضعیت</th>
            <th className=" p-3 border-b-2 border-gray-300 ">تاریخ</th>
            <th className=" p-3 border-b-2 border-gray-300 ">محصولات</th>
          </tr>
        </thead>
        <tbody className="text-center text-[10px]">
          {res.map((item, index) => (
            <tr
              className={`border-b border-gray-200 hover:bg-gray-100 transition-colors
                         ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} `}
              key={item._id}
            >
              <td className="p-3">{item.user.name}</td>
              <td className="p-3 ">{item.user.email}</td>
              <td className="p-3">
                {item.user.city} - {item.user.postalCode}
              </td>
              <td className="p-3">
                {item.totalPrice.toLocaleString("fa-IR")} تومان
              </td>
              <td className="p-3">{statusMap[item.status] || item.status}</td>
              <td className="p-3">
                {new Date(item.createdAt).toLocaleDateString("fa-IR")}
              </td>
              <td className="p-3">
                {item.cart.map((product) => product.title).join("، ")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
