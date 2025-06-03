import Image from "next/image";
import { FaSortDown } from "react-icons/fa";
import { RiSearchLine } from "react-icons/ri";

function Header({userData}) {
  return (
    <header className="flex items-center justify-between mb-12">
      <h1 className="text-xl text-[#A5A5A5] font-normal uppercase tracking-[0.3em]">
        {userData.fullname || "No Name inputted"}
      </h1>
      <div className="flex items-center gap-[1.8rem] product-sans">
        <div className="relative block max-w-[630px]">
          <input
            type="text"
            placeholder="Search Assets"
            className="h-14 rounded-full w-full pl-14 pr-3 outline-[#5796F066]"
          />
          <RiSearchLine className="absolute top-1/2 left-6 -translate-y-1/2 text-xl text-[#A1A7BA] placeholder:text-[#A1A7BA] placeholder:text" />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="block text-[#003366] text-sm font-medium capitalize">
              henry osuji
            </div>
            <span className="text-xs font-normal capitalize px-3 py-2 rounded-full bg-[#4300991A] ml-2">
              admin
            </span>
          </div>
          <span className="w-[1px] h-7 bg-[#A1A7BA]"></span>
          <div className="flex items-center gap-1">
            <Image src="/user.png" alt="user" width={40} height={40} />
            <FaSortDown />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
