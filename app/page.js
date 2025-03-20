"use client";

import { homeNav } from "@/constant/home";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center text-[#6D6D6D] w-full h-full p-5">
      <h1 className="text-6xl text-center capitalize">welcome voyex admin</h1>
      <p className="mt-3">Kickstart with any page below</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10">
        {homeNav.map((nav, i) => (
          <button
            key={i}
            className="px-9 py-10 rounded-lg bg-white hover:bg-gradient-to-r hover:from-[#00a766]/20 hover:to-[#999999]/20 capitalize text-3xl hover:scale-110 transition-all duration-300"
            onClick={() => router.push(`${nav.route}`)}
          >
            {nav.name}
          </button>
        ))}
      </div>
    </div>
  );
}
