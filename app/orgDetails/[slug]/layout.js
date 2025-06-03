'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/common/Navbar';
import Header from '@/components/organizationPage/Header';
import { MdErrorOutline } from 'react-icons/md';
import Page from './page';

function OrgDetailsLayout() {
  const { slug } = useParams();
  const [orgData, setOrgData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    const orgId = slug.split('-')[0];
    const apiUrl = `https://p2xeehk5x9.execute-api.ap-southeast-2.amazonaws.com/default/org_voyex_api?org_id=${orgId}`;

    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data?.id) {
          setOrgData(data);
          console.log("Fetched orgData:", data); // 🔍 LOG HERE
        } else {
          throw new Error('Organization data not found in response');
        }
      })
      .catch((err) => {
        console.error('Failed to fetch organization data:', err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  return (
    <>
      <Navbar />
      <main className="w-full h-screen overflow-y-scroll overflow-x-hidden scrollbar-hide p-6 bg-[#F4F4F4]">
        {loading ? (
          <div className="flex flex-col gap-2 items-center justify-center min-h-full bg-white rounded-xl shadow-sm">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-gray-700"></div>
            <p className="text-gray-700 font-medium">Loading organization data...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col gap-2 items-center justify-center min-h-full bg-white rounded-xl shadow-sm">
            <MdErrorOutline className="text-6xl text-red-700" />
            <p className="text-red-700 font-semibold">Error: {error}</p>
          </div>
        ) : (
          <>
            <Header orgData={orgData} />
            <Page orgData={orgData}/>
        </>
        )}
      </main>
    </>
  );
}

export default OrgDetailsLayout;
