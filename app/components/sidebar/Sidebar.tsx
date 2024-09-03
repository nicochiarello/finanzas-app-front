"use client";

import Link from "next/link";
import { sidebarItems } from "./items";
import { usePathname, useSearchParams } from "next/navigation";

export default function Sidebar() {
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
      <nav>
        <ul className="flex flex-col">
          {sidebarItems.map((item) => {
            return (
              <Link
                key={item.label}
                href={handleHref(item.href)}
                className={`px-6 flex gap-6 ${
                  pathname === item.href
                    ? "bg-zinc-100 py-6 text-indigo-600"
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
    </div>
  );
}
