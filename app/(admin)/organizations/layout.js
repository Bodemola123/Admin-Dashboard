"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { IoMdTrendingDown, IoMdTrendingUp } from "react-icons/io";
import { organizationPageNav } from "@/constant/organization";

const ORG_API_URL = "https://p2xeehk5x9.execute-api.ap-southeast-2.amazonaws.com/default/org_voyex_api";

const getToday = () => new Date().toISOString().split("T")[0];

function OrganizationLayout({ children }) {
  const [orgs, setOrgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const fetchOrganizations = async () => {
    try {
      setLoading(true);
      const cached = sessionStorage.getItem("organizationData");
      if (cached && !refreshing) {
        setOrgs(JSON.parse(cached));
        setLoading(false);
        return;
      }
      const res = await fetch(ORG_API_URL);
      const data = await res.json();
      setOrgs(data);
      sessionStorage.setItem("organizationData", JSON.stringify(data));
    } catch (err) {
      console.error("Error fetching orgs:", err);
      setError(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, [refreshing]);

  const total = orgs.length;
  const today = getToday();

  // Signup Trend (All orgs, not just verified)
  const todayCount = orgs.filter(org => org.created_at?.startsWith(today)).length;
  const beforeTodayCount = orgs.filter(org => {
    const created = org.created_at?.split("T")[0];
    return created && created < today;
  }).length;

  let trendPercent;
  let trendUp;

  if (beforeTodayCount === 0) {
    trendPercent = 100;
    trendUp = todayCount > 0;
  } else {
    const totalNow = todayCount + beforeTodayCount;
    trendPercent = (((totalNow - beforeTodayCount) / beforeTodayCount) * 100).toFixed(1);
    trendUp = todayCount > 0;
  }

  const pendingCount = orgs.filter(org => org.admin_approval === false).length;
  const pendingPercent = total === 0 ? 0 : ((pendingCount / total) * 100).toFixed(1);

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg text-[#A5A5A5] font-medium">Organization Overview</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-2xl hover:bg-blue-600 text-sm"
          onClick={() => {
            setRefreshing(true);
            sessionStorage.removeItem("organizationData");
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
          <p className="text-red-500 col-span-3">Failed to load organization data.</p>
        ) : (
          <>
            {/* Total Organizations */}
            <div className="flex flex-row gap-8 items-center justify-start bg-[#ffffff] rounded-2xl px-[17px] py-3.5">
              <Image src="/Percent.svg" alt="percent" width={60} height={60} />
              <div className="flex flex-col gap-2.5 items-start justify-center">
                <p className="text-[#202224] text-base font-medium">TOTAL NUMBER OF ORG</p>
                <p className="text-[#202224] text-[28px] font-bold">{total}</p>
              </div>
            </div>

            {/* Signup Trend */}
            <div className="flex flex-col gap-6 items-start px-[17px] py-2 rounded-2xl bg-[#ffffff]">
              <div className="flex flex-row gap-8">
                <Image src="/Chart.svg" alt="Chart" width={60} height={60} />
                <div className="flex flex-col gap-2.5 items-start justify-center">
                  <p className="text-[#202224] text-base font-medium">NEW SIGNUPS</p>
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
                  <span className={trendUp ? "text-[#00B69B]" : "text-[#F93C65]"}>{trendPercent}%</span>{" "}
                  {trendUp ? "Up" : "Down"} from yesterday
                </p>
              </div>
            </div>

            {/* Pending Verification */}
            <div className="flex flex-col gap-6 items-start px-[17px] py-2 rounded-2xl bg-[#ffffff]">
              <div className="flex flex-row gap-8">
                <Image src="/Pending.svg" alt="Chart" width={60} height={60} />
                <div className="flex flex-col gap-2.5 items-start justify-center">
                  <p className="text-[#202224] text-base font-medium">PENDING VERIFICATION</p>
                  <p className="text-[#202224] text-[28px] font-bold">{pendingCount}</p>
                </div>
              </div>
              <div className="flex gap-[6px] items-center text-base">
                <p className="text-[#606060] text-base font-medium">
                  <span className="text-[#F93C65]">{pendingPercent}%</span> of all organizations
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center justify-start gap-10 px-4 py-3 text-dovegray font-normal bg-white rounded-[10px] w-full mt-4">
        {organizationPageNav.map((nav, i) => (
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

export default OrganizationLayout;
