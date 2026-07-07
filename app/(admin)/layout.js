import SideBar from "@/components/SideBar";


export default function AdminLayout({children}){
    return  (
        <>
        <SideBar></SideBar>
         <main className="flex-1 overflow-y-auto py-18 sm:py-6 px-4 ">{children}</main>
        </>
    )
}