'use client'

import { useRouter } from "next/navigation"
import { FaPowerOff } from "react-icons/fa";


export default function LogOutButton(){
    
    const router = useRouter();

    const handleLogeOut = async ()=> {
        await fetch(`${process.env.NEXT_PUBLIC_URL}/api/auth/logout` , {
            method : "POST",
        });
        router.push("/login")
    }
    
    return(
        <button onClick={handleLogeOut} className="cursor-pointer flex gap-2 p-5">
               <FaPowerOff size={20} />
                خروج از حساب
        </button>
    )
}