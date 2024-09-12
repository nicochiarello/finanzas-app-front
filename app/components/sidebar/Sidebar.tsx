"use client";

import Link from "next/link";
import { IoPersonSharp } from "react-icons/io5";
import { PiSignOutLight } from "react-icons/pi";
import { sidebarItems } from "./items";
import { usePathname, useSearchParams } from "next/navigation";
import { signout } from "./actions";

export default function Sidebar({
  user,
}: {
  user: { name: string; email: string };
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const month = searchParams.get("month");
  const year = searchParams.get("year");

  const handleHref = (href: string) => {
    if (month && year) {
      return `${href}?year=${year}&month=${month}`;
    }
    return href;
  };

  return (
    <div className="w-[16rem] h-full flex flex-col gap-8 py-6 bg-white">
      <h1 className="text-2xl px-6 font-bold">Finanzas 💸</h1>
      <nav className="flex-1">
        <ul className="flex flex-col">
          {sidebarItems.map((item) => {
            return (
              <Link
                key={item.label}
                href={handleHref(item.href)}
                className={`px-6 flex gap-6 ${
                  pathname === item.href
                    ? "bg-zinc-100 py-6 text-indigo-500"
                    : "py-2"
                }`}
              >
                <item.icon className="text-2xl" />
                <p>{item.label}</p>
              </Link>
            );
          })}
        </ul>
      </nav>
      <div className="flex flex-col gap-1 text-gray-700">
        <div className="flex gap-2 items-center px-6 text-sm">
          <div>
            <IoPersonSharp />
          </div>
          <p>{user.name}</p>
        </div>
        <div className="flex gap-2 items-center px-6 text-sm cursor-pointer hover:text-black">
          <div>
            <PiSignOutLight />
          </div>
          <form action={signout}>
            <button type="submit">Signout</button>
          </form>
        </div>
      </div>
    </div>
  );
}
