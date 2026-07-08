import SideBar from "@/components/SideBar";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export default async function AdminLayout({ children }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  let role = null;
  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);
      role = payload.role;
    } catch (error) {
      console.error("token verification failed", error);
    }
  }
  return (
    <>
      <SideBar role={role}></SideBar>
      <main className="flex-1 overflow-y-auto py-18 sm:py-6 px-4 ">
        {children}
      </main>
    </>
  );
}
