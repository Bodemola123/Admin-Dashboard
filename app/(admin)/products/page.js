"use client"

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IoMdTrendingUp, IoMdTrendingDown } from "react-icons/io";
import AllProductsTable from "@/components/productsPage/allProductsTable";

const ProductPage = () => {
  const [allTools, setAllTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    setError(false);
    try {
      const cached = sessionStorage.getItem("allTools");
      if (!refreshing && cached) {
        setAllTools(JSON.parse(cached));
      } else {
        const res = await fetch(
          "https://2zztcz7h0a.execute-api.ap-southeast-2.amazonaws.com/default/voyex_tools_api"
        );
        const data = await res.json();
        const flatTools = Object.values(data.data).flat();
        setAllTools(flatTools);
        sessionStorage.setItem("allTools", JSON.stringify(flatTools));
      }
    } catch (err) {
      console.error("Failed to fetch tools", err);
      setError(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [refreshing]);

  // Metrics
  const total = allTools.length;

  const today = new Date().toISOString().split("T")[0];
  const newToday = allTools.filter(tool =>
    tool.created_at?.startsWith(today)
  ).length;

  const sponsored = allTools.filter(tool => tool.sponsored_type).length;
  const sponsoredPercent = total > 0 ? Math.round((sponsored / total) * 100) : 0;

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg text-[#A5A5A5] font-medium">Product Overview</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-2xl hover:bg-blue-600 text-sm"
          onClick={() => {
            setRefreshing(true);
            sessionStorage.removeItem("allTools");
          }}
        >
          Refresh
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-3 gap-4 w-full mb-6">
        {loading ? (
          [...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 animate-pulse h-[140px]">
              <div className="h-6 w-2/3 bg-gray-300 rounded mb-4"></div>
              <div className="h-10 w-1/2 bg-gray-300 rounded"></div>
            </div>
          ))
        ) : error ? (
          <p className="text-red-500 col-span-3">Failed to load product data.</p>
        ) : (
          <>
            {/* Total Tools */}
            <div className="flex flex-row gap-8 items-center justify-start bg-white rounded-2xl px-[17px] py-3.5">
              <Image src="/Percent.svg" alt="percent" width={60} height={60} />
              <div className="flex flex-col gap-2.5 items-start justify-center">
                <p className="text-[#202224] text-base font-medium">TOTAL PRODUCTS</p>
                <p className="text-[#202224] text-[28px] font-bold">{total}</p>
              </div>
            </div>

            {/* New Products Today */}
            <div className="flex flex-col gap-6 items-start px-[17px] py-2 rounded-2xl bg-white">
              <div className="flex flex-row gap-8">
                <Image src="/Chart.svg" alt="Chart" width={60} height={60} />
                <div className="flex flex-col gap-2.5 items-start justify-center">
                  <p className="text-[#202224] text-base font-medium">NEW TODAY</p>
                  <p className="text-[#202224] text-[28px] font-bold">{newToday}</p>
                </div>
              </div>
              <div className="flex gap-[6px] items-center text-base">
                {newToday > 0 ? (
                  <IoMdTrendingUp className="text-[#00B69B]" />
                ) : (
                  <IoMdTrendingDown className="text-[#F93C65]" />
                )}
                <p className="text-[#606060] text-base font-medium">
                  <span className={newToday > 0 ? "text-[#00B69B]" : "text-[#F93C65]"}>
                    {newToday}
                  </span>{" "}
                  {newToday > 0 ? "Added today" : "No new tools"}
                </p>
              </div>
            </div>

            {/* Sponsored Tools */}
            <div className="flex flex-col gap-6 items-start px-[17px] py-2 rounded-2xl bg-white">
              <div className="flex flex-row gap-8">
                <Image src="/Pending.svg" alt="sponsored" width={60} height={60} />
                <div className="flex flex-col gap-2.5 items-start justify-center">
                  <p className="text-[#202224] text-base font-medium">SPONSORED TOOLS</p>
                  <p className="text-[#202224] text-[28px] font-bold">{sponsored}</p>
                </div>
              </div>
              <div className="flex gap-[6px] items-center text-base">
                <p className="text-[#606060] text-base font-medium">
                  <span className="text-[#00B69B]">{sponsoredPercent}%</span> of all tools
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Products Table */}
      <AllProductsTable/>
    </div>
  );
};

export default ProductPage;
