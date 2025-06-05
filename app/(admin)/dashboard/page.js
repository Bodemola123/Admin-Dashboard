"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const DashboardPage = () => {
  const [orgs, setOrgs] = useState([]);
  const [users, setUsers] = useState([]);
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const orgCache = sessionStorage.getItem("DashboardOrg");
      const userCache = sessionStorage.getItem("DashboardUser");
      const toolCache = sessionStorage.getItem("DashboardTool");

      const [orgData, userData, toolData] = await Promise.all([
        orgCache
          ? JSON.parse(orgCache)
          : fetch("https://p2xeehk5x9.execute-api.ap-southeast-2.amazonaws.com/default/org_voyex_api")
              .then((res) => res.json())
              .then((data) => {
                sessionStorage.setItem("DashboardOrg", JSON.stringify(data));
                return data;
              }),
        userCache
          ? JSON.parse(userCache)
          : fetch("https://cqceokwaza.execute-api.eu-north-1.amazonaws.com/default/users_voyex_api")
              .then((res) => res.json())
              .then((data) => {
                sessionStorage.setItem("DashboardUser", JSON.stringify(data));
                return data;
              }),
        toolCache
          ? JSON.parse(toolCache)
          : fetch("https://2zztcz7h0a.execute-api.ap-southeast-2.amazonaws.com/default/voyex_tools_api")
              .then((res) => res.json())
              .then((data) => {
                const flat = data?.data ? Object.values(data.data).flat() : [];
                sessionStorage.setItem("DashboardTool", JSON.stringify(flat));
                return flat;
              }),
      ]);

      setOrgs(orgData);
      setUsers(userData);
      setTools(toolCache ? JSON.parse(toolCache) : toolData);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError("Failed to load data. Please try again.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getTopToolsByViews = () => {
    return [...tools]
      .sort((a, b) => b?.page_views?.views - a?.page_views?.views)
      .slice(0, 5);
  };

  const getViewsByCategory = () => {
    const result = {};
    tools.forEach(tool => {
      result[tool.category] = (result[tool.category] || 0) + (tool.page_views?.views || 0);
    });
    return result;
  };

  const getPricingModelDistribution = () => {
    const dist = {};
    tools.forEach(tool => {
      dist[tool.pricing_model] = (dist[tool.pricing_model] || 0) + 1;
    });
    return dist;
  };

  const getAverageRatingByCategory = () => {
    const categoryRatings = {};
    tools.forEach(tool => {
      if (!categoryRatings[tool.category]) {
        categoryRatings[tool.category] = { total: 0, count: 0 };
      }
      categoryRatings[tool.category].total += tool.rating;
      categoryRatings[tool.category].count += 1;
    });
    return Object.fromEntries(
      Object.entries(categoryRatings).map(([cat, val]) => [cat, val.total / val.count])
    );
  };

  const topTools = getTopToolsByViews();
  const viewsByCategory = getViewsByCategory();
  const pricingModelDist = getPricingModelDistribution();
  const avgRatings = getAverageRatingByCategory();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg text-[#A5A5A5] font-medium">Dashboard Overview</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-2xl hover:bg-blue-600 text-sm"
          onClick={() => {
            setRefreshing(true);
            sessionStorage.clear();
            fetchData();
          }}
        >
          {refreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
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
        {[{ title: "TOTAL ORG", value: orgs.length },
          { title: "TOTAL USER", value: users.length },
          { title: "TOTAL PRODUCTS", value: tools.length }].map((item, idx) => (
          <div key={idx} className="flex flex-row gap-8 items-center justify-start bg-white rounded-2xl px-[17px] py-3.5 shadow">
            <Image src="/Percent.svg" alt="percent" width={60} height={60} />
            <div className="flex flex-col gap-2.5 items-start justify-center">
              <p className="text-[#202224] text-base font-medium">{item.title}</p>
              <p className="text-[#202224] text-[28px] font-bold">{item.value}</p>
            </div>
          </div>
        ))}
        </>
        )}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6 mt-4">
        <ApexChart
          type="bar"
          series={[{
            name: "Views",
            data: topTools.map(t => t.page_views?.views || 0),
          }]}
          options={{
            chart: { id: "top-tools" },
            xaxis: { categories: topTools.map(t => t.tool_name) },
            title: { text: "Top 5 Tools by Views" },
          }}
        />

        <ApexChart
          type="pie"
          series={Object.values(viewsByCategory)}
          options={{
            labels: Object.keys(viewsByCategory),
            title: { text: "Tool Views by Category" },
          }}
        />

        <ApexChart
          type="donut"
          series={Object.values(pricingModelDist)}
          options={{
            labels: Object.keys(pricingModelDist),
            title: { text: "Pricing Model Distribution" },
          }}
        />

        <ApexChart
          type="bar"
          series={[{
            name: "Average Rating",
            data: Object.values(avgRatings).map(val => +val.toFixed(2)),
          }]}
          options={{
            xaxis: { categories: Object.keys(avgRatings) },
            title: { text: "Average Rating by Category" },
          }}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
