import { FiUser } from "react-icons/fi";


export default function UserPanel({ admin }) {
  return (
    <div dir="ltr"
    className="my-4  bg-gray-800 text-white rounded-lg p-5 fixed top-2 left-2">
     <div className="flex gap-2">
        <FiUser size={20} />
      <h2 className="text-base font-bold">
        {admin.username}
      </h2>
     </div>
    </div>
  );
}
