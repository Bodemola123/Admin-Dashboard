"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiDashboardFill } from "react-icons/ri";
import { PiGear } from "react-icons/pi";
import { IoIosLogOut } from "react-icons/io";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { PiUsersThreeLight } from "react-icons/pi";
import { MdOutlineEventNote } from "react-icons/md";

function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`h-screen py-6 pl-6`}>
      <div
        className={`flex flex-col items-center gap-5 justify-between py-4 rounded-xl h-full px-3 mb-40 ${
          isOpen ? "w-[14rem]" : "w-[86px]"
        } bg-white transition-all duration-300 overflow-y-scroll no-scrollbar`}
      >
        <div className="flex flex-col items-center gap-[3rem] w-full">
          <div className="flex items-center justify-center w-full">
            <div
              className={`flex items-center w-full py-3 transition-all ${
                isOpen ? "justify-start pl-5" : "justify-center"
              }`}
            >
              <button onClick={toggleSidebar}>
                <Image
                  src="/collapsable.png"
                  alt="collapse"
                  width={30}
                  height={30}
                />
              </button>
              {isOpen && (
                <Link
                  href="/"
                  className="text-xl text-primary font-bold tracking-wider ml-4"
                >
                  Voyex.AI
                </Link>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full items-center justify-center pb-2">
            <div className="flex flex-col items-center w-full gap-2 z-10 tracking-wide">
              <Link
                href="/dashboard"
                className={`flex items-center w-full py-3 bg-none hover:bg-primary/20 hover:text-primary transition-all rounded-xl ${
                  pathname.includes("dashboard")
                    ? "text-primary bg-primary/20"
                    : "text-[#6D6D6D]"
                } ${isOpen ? "justify-start pl-5" : "justify-center"}`}
              >
                <RiDashboardFill
                  className={`text-2xl ${
                    pathname.includes("dashboard") && "text-primary"
                  }`}
                />
                {isOpen && (
                  <span className="text-sm font-bold ml-2 capitalize">
                    dashboard
                  </span>
                )}
              </Link>
              <Link
                href="/users"
                className={`flex items-center w-full py-3 bg-none hover:bg-primary/20 hover:text-primary transition-all rounded-xl ${
                  pathname.includes("users")
                    ? "text-primary bg-primary/20"
                    : "text-[#6D6D6D]"
                } ${isOpen ? "justify-start pl-5" : "justify-center"}`}
              >
                <HiOutlineUserCircle
                  className={`text-2xl ${
                    pathname.includes("users") && "text-primary"
                  }`}
                />
                {isOpen && (
                  <span className="text-sm font-bold ml-2 capitalize">
                    users
                  </span>
                )}
              </Link>
              <Link
                href="/organizations"
                className={`flex items-center w-full py-3 bg-none hover:bg-primary/20 hover:text-primary transition-all rounded-xl ${
                  pathname.includes("organizations")
                    ? "text-primary bg-primary/20"
                    : "text-[#6D6D6D]"
                } ${isOpen ? "justify-start pl-5" : "justify-center"}`}
              >
                <PiUsersThreeLight
                  className={`text-2xl ${
                    pathname.includes("organizations") && "text-primary"
                  }`}
                />
                {isOpen && (
                  <span className="text-sm font-bold ml-2 capitalize">
                    organizations
                  </span>
                )}
              </Link>
              <Link
                href="/products"
                className={`flex items-center w-full py-3 bg-none hover:bg-primary/20 hover:text-primary transition-all rounded-xl ${
                  pathname.includes("products")
                    ? "text-primary bg-primary/20"
                    : "text-[#6D6D6D]"
                } ${isOpen ? "justify-start pl-5" : "justify-center"}`}
              >
                <MdOutlineEventNote
                  className={`text-2xl ${
                    pathname.includes("products") && "text-primary"
                  }`}
                />
                {isOpen && (
                  <span className="text-sm font-bold ml-2 capitalize">
                    products
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        <div
          className={`flex flex-col items-center gap-2 w-full z-10 tracking-wide`}
        >
          <Link
            href="/settings"
            className={`flex items-center w-full py-3 bg-none hover:bg-primary/20 hover:text-primary transition-all rounded-xl ${
              pathname.includes("settings")
                ? "text-primary bg-primary/20"
                : "text-[#032400]"
            } ${isOpen ? "justify-start pl-5" : "justify-center"}`}
          >
            <PiGear
              className={`text-2xl ${
                pathname.includes("settings") && "text-primary"
              }`}
            />
            {isOpen && (
              <span className="text-sm font-bold ml-2 capitalize">
                settings
              </span>
            )}
          </Link>
          <button
            className={`flex items-center w-full py-3 bg-none text-[#BD0000] hover:bg-red-500/20 transition-all rounded-xl ${
              isOpen ? "justify-start pl-5" : "justify-center"
            }`}
          >
            <IoIosLogOut className={`text-2xl rotate-180`} />
            {isOpen && (
              <span className="text-sm font-bold ml-2 capitalize">logout</span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
