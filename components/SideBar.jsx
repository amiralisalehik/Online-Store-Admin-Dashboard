"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  FiUser,
  FiMenu,
  FiX,
  FiHome,
  FiBox,
  FiShoppingCart,
} from "react-icons/fi";

const urls = [
  { id: 0, title: "داشبورد", src: "/", icon: FiHome },
  { id: 1, title: "محصولات", src: "/products", icon: FiBox },
  { id: 2, title: "سفارش ها", src: "/orders", icon: FiShoppingCart },
];

export default function SideBar({ role }) {
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const visibleUrls =
    role === "admin"
      ? [...urls, { id: 3, title: "کاربران", src: "/users", icon: FiUser }]
      : urls;

  return (
    <>
      {/* backdrop */}
      {isOpen && (
        <div
          className="sm:hidden fixed inset-0 z-20 bg-black/50"
          onClick={() => setIsOpen(false)}
        />
      )}

      <button
        className="sm:hidden fixed top-4 right-4 z-50 p-2 bg-gray-800 text-white rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      <div
        className={` pt-15 sm:pt-5 z-40 
    fixed sm:static right-0 top-0  h-full
        w-[180px] text-white flex flex-col gap-2 bg-gray-800 py-5 px-2
        transition-transform
    
       ${isOpen ? "translate-x-0" : "translate-x-full sm:translate-x-0"}`}
      >
        {visibleUrls.map((url) => {
          const Icon = url.icon;
          return (
            <Link
              onClick={() => {
                setIsOpen(false);
              }}
              className={`flex items-center gap-2 hover:bg-gray-400 p-3 rounded-md ${pathName === url.src ? "bg-white text-gray-800" : ""}`}
              key={url.id}
              href={url.src}
            >
              <Icon size={20}></Icon>
              {url.title}
            </Link>
          );
        })}
      </div>
    </>
  );
}
