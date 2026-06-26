import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import SideBar from "@/components/SideBar";

const iransans = localFont({
  src: [
    {
      path: "../public/fonts/IRANSans_UltraLight.ttf",
      weight: "200",
    },
    {
      path: "../public/fonts/IRANSans.ttf",
      weight: "400",
    },
    {
      path: "../public/fonts/IRANSans_Medium.ttf",
      weight: "700",
    },
    {
      path: "../public/fonts/IRANSans_Bold.ttf",
      weight: "900",
    },
  ],
  variable: "--font-iransans",
});

export const metadata = {
  title: "Dashboard Next App",
  description: "a complite modern dashboard for ecommerce application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" className={`${iransans.variable} h-full antialiased`}>
      <body className="h-screen flex text-xs">
        <SideBar></SideBar>
        <main className="flex-1 overflow-y-auto py-18 sm:py-6 px-4 ">{children}</main>
      </body>
    </html>
  );
}
