"use client";

import Link from "next/link";
import { IoPersonSharp } from "react-icons/io5";
import { PiSignOutLight } from "react-icons/pi";
import { sidebarItems } from "./items";
import { usePathname, useSearchParams } from "next/navigation";
import { signout } from "./actions";
import Image from "next/image";
import Logo from "@/public/favicon.png";
import { version } from "../../../version";
import { IoMdMenu } from "react-icons/io";
import { useState } from "react";
import { preconnect } from "react-dom";
import PreviousMap from "postcss/lib/previous-map";
import MobileSidebar from "./mobile-sidebar/MobileSidebar";

export default function Sidebar({
  user,
}: {
  user: { name: string; email: string };
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const month = searchParams.get("month");
  const year = searchParams.get("year");

  const handleHref = (href: string) => {
    if (href === "/") {
      return `${href}`;
    }
    if (href === "/tarjetas") {
      return `${href}`;
    }
    if (month && year) {
      return `${href}?year=${year}&month=${month}`;
    }
    const currentMonth = (new Date().getMonth() + 1).toString();
    const currentYear = new Date().getFullYear();

    return `${href}?year=${currentYear}&month=${currentMonth}`;
  };

  return (
    <div className="w-full md:w-[6rem] h-fit xl:w-[16rem] md:h-full flex flex-col gap-8 py-6 bg-white relative">
      {/* Sidebar mobile */}
      {sidebarOpen && (
        <MobileSidebar
          onClose={() => setSidebarOpen(false)}
          sidebarItems={sidebarItems}
          user={user}
          pathname={pathname}
          handleHref={handleHref}
        />
      )}

      <div className="flex items-center gap-4 justify-start md:justify-center px-4 xl:justify-start xl:pl-6 relative">
        <h1 className="md:hidden xl:block text-2xl font-bold">Finanzas</h1>
        <Image src={Logo} width={28} height={28} alt="Finanzas app" />
        <div
          onClick={() => {
            setSidebarOpen(true);
          }}
          className="absolute z-10 top-0 right-4 text-3xl cursor-pointer md:hidden"
        >
          <IoMdMenu />
        </div>
      </div>
      <nav className="flex-1 hidden md:block">
        <ul className="flex flex-col">
          {sidebarItems.map((item) => {
            return (
              <Link
                key={item.label}
                href={handleHref(item.href)}
                className={`px-2 xl:px-6 flex flex-col xl:flex-row items-center gap-2 xl:gap-6 ${
                  pathname === item.href
                    ? "bg-zinc-100 py-6 text-indigo-500"
                    : "py-2"
                }`}
              >
                <item.icon className="text-2xl" />
                <p className="truncate text-xs xl:text-base max-w-full">
                  {item.label}
                </p>
              </Link>
            );
          })}
        </ul>
      </nav>
      <div className="hidden md:flex flex-col gap-1 text-gray-700">
        <div className="flex gap-2 items-center px-6 text-sm">
          <div>
            <IoPersonSharp />
          </div>
          <p className="truncate">{user.name}</p>
        </div>
        <div className="flex gap-2 items-center px-6 text-sm cursor-pointer hover:text-black">
          <div>
            <PiSignOutLight />
          </div>
          <form action={signout}>
            <button type="submit">
              <p className="truncate max-w-[2rem] xl:max-w-none">Signout</p>
            </button>
          </form>
        </div>
        <p className="text-xs px-7 text-gray-700 py-2">v{version}</p>
      </div>
    </div>
  );
}
