import Link from "next/link";
import React from "react";
import { IoPersonSharp } from "react-icons/io5";
import { PiSignOutLight } from "react-icons/pi";
import { signout } from "../actions";
import { version } from "../../../../version";
import { IoArrowForward } from "react-icons/io5";

const MobileSidebar = ({
  sidebarItems,
  pathname,
  handleHref,
  user,
  onClose,
}: {
  sidebarItems: {
    label: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    href: string;
  }[];
  pathname: string;
  handleHref: (href: string) => string;
  user: { name: string; email: string };
  onClose: () => void;
}) => {
  return (
    <div className="md:hidden absolute top-0 w-screen h-screen popup-container-bg z-50 flex justify-end">
      <div className="relative pt-14 pb-4 w-full max-w-[20rem] h-screen bg-white flex flex-col justify-between">
        <p
          onClick={() => onClose()}
          className="absolute top-2 right-2 text-3xl cursor-pointer"
        >
          <IoArrowForward />
        </p>
        {
          <ul className="flex flex-col gap-4">
            {sidebarItems.map((item) => {
              return (
                <Link
                  onClick={() => onClose()}
                  key={item.label}
                  href={handleHref(item.href)}
                  className={`px-2 xl:px-6 flex items-center gap-2 xl:gap-6 ${
                    pathname === item.href
                      ? "bg-zinc-100 py-6 text-indigo-500"
                      : "py-2"
                  }`}
                >
                  <item.icon className="text-2xl" />
                  <p className="truncate">{item.label}</p>
                </Link>
              );
            })}
          </ul>
        }
        <div className="flex-col gap-1 text-gray-700">
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
                <p className="truncate">Signout</p>
              </button>
            </form>
          </div>
          <p className="text-xs px-7 text-gray-700 py-2">v{version}</p>
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;
