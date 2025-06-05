"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { IoMdTrendingUp, IoMdTrendingDown } from "react-icons/io";
import { userPageNav } from "@/constant/users";

const USERS_API_URL = "https://cqceokwaza.execute-api.eu-north-1.amazonaws.com/default/users_voyex_api";

const getToday = () => new Date().toISOString().split("T")[0];

function UsersLayout({ children }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const cached = sessionStorage.getItem("userCount");
      if (cached && !refreshing) {
        setUsers(JSON.parse(cached));
        setLoading(false);
        return;
      }
      const res = await fetch(USERS_API_URL);
      const data = await res.json();
      setUsers(data);
      sessionStorage.setItem("userCount", JSON.stringify(data));
    } catch (err) {
      console.error("Error fetching users:", err);
      setError(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [refreshing]);

  const total = users.length;
  const today = getToday();

  const todayCount = users.filter(user => user.created_at?.startsWith(today)).length;
  const beforeTodayCount = total - todayCount;

  const trendUp = todayCount > 0;
  const trendPercent = beforeTodayCount === 0
    ? 100
    : trendUp
      ? (((total - beforeTodayCount) / beforeTodayCount) * 100).toFixed(1)
      : 0;

  const completeProfiles = users.filter(user => {
    let filled = 0;
    if (user.fullname) filled++;
    if (user.primary_language) filled++;
    if (user.skill_level) filled++;
    if (user.country) filled++;
    return filled >= 3;
  });
  const completeCount = completeProfiles.length;
  const completePercent = total === 0 ? 0 : ((completeCount / total) * 100).toFixed(1);

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg text-[#A5A5A5] font-medium">User Overview</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-2xl hover:bg-blue-600 text-sm"
          onClick={() => {
            setRefreshing(true);
            sessionStorage.removeItem("userCount");
          }}
        >
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 w-full">
        {loading ? (
          [...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 animate-pulse h-[140px]">
              <div className="h-6 w-2/3 bg-gray-300 rounded mb-4"></div>
              <div className="h-10 w-1/2 bg-gray-300 rounded"></div>
            </div>
          ))
        ) : error ? (
          <p className="text-red-500 col-span-3">Failed to load user data.</p>
        ) : (
          <>
            {/* Total Users */}
            <div className="flex flex-row gap-8 items-center justify-start bg-[#ffffff] rounded-2xl px-[17px] py-3.5">
              <Image src="/Percent.svg" alt="percent" width={60} height={60} />
              <div className="flex flex-col gap-2.5 items-start justify-center">
                <p className="text-[#202224] text-base font-medium">TOTAL USERS</p>
                <p className="text-[#202224] text-[28px] font-bold">{total}</p>
              </div>
            </div>

            {/* New Signups Today */}
            <div className="flex flex-col gap-6 items-start px-[17px] py-2 rounded-2xl bg-[#ffffff]">
              <div className="flex flex-row gap-8">
                <Image src="/Chart.svg" alt="Chart" width={60} height={60} />
                <div className="flex flex-col gap-2.5 items-start justify-center">
                  <p className="text-[#202224] text-base font-medium">NEW SIGNUPS TODAY</p>
                  <p className="text-[#202224] text-[28px] font-bold">{todayCount}</p>
                </div>
              </div>
              <div className="flex gap-[6px] items-center text-base">
                {trendUp ? (
                  <IoMdTrendingUp className="text-[#00B69B]" />
                ) : (
                  <IoMdTrendingDown className="text-[#F93C65]" />
                )}
                <p className="text-[#606060] text-base font-medium">
                  <span className={trendUp ? "text-[#00B69B]" : "text-[#F93C65]"}>{trendPercent}%</span> {trendUp ? "Up" : "Down"} from total
                </p>
              </div>
            </div>

            {/* Complete Profiles */}
            <div className="flex flex-col gap-6 items-start px-[17px] py-2 rounded-2xl bg-[#ffffff]">
              <div className="flex flex-row gap-8">
                <Image src="/Pending.svg" alt="Chart" width={60} height={60} />
                <div className="flex flex-col gap-2.5 items-start justify-center">
                  <p className="text-[#202224] text-base font-medium">COMPLETE PROFILES</p>
                  <p className="text-[#202224] text-[28px] font-bold">{completeCount}</p>
                </div>
              </div>
              <div className="flex gap-[6px] items-center text-base">
                <p className="text-[#606060] text-base font-medium">
                  <span className="text-[#00B69B]">{completePercent}%</span> of all users
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="flex items-center justify-start gap-10 px-4 py-3 text-dovegray font-normal bg-white rounded-[10px] w-full mt-4">
        {userPageNav.map((nav, i) => (
          <button
            key={i}
            className={`text-sm capitalize ${pathname === nav.link && "text-primary font-medium"}`}
            onClick={() => router.push(`${nav.link}`)}
          >
            {nav.name}
          </button>
        ))}
      </div>

      <div className="mt-4">{children}</div>
    </section>
  );
}

export default UsersLayout;
