import LogOutButton from "@/components/LogoutButton";
import UserPanel from "@/components/userPanel";
import  jwt  from "jsonwebtoken";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function Home() {
  const token = (await cookies()).get("admin_token")?.value;

  let decodedAdmin;
  try {
    decodedAdmin = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    redirect("/login");
  }

  return (
    <div>
      <h1 className="text-base font-bold">پنل ادمین</h1>
      
      <UserPanel admin={decodedAdmin}></UserPanel>
      <LogOutButton /> 
    </div>
  );
}
