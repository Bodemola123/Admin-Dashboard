'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/common/Navbar';
import { MdErrorOutline } from 'react-icons/md';
import Page from './page';
import Header from '@/components/usersPage/Header';

function UserDetailsLayout() {
  const { slug } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    const UserId = slug.split('-')[0];
    const apiUrl = `https://cqceokwaza.execute-api.eu-north-1.amazonaws.com/default/users_voyex_api?user_id=${UserId}`;

    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data?.user_id) {
          setUserData(data);
          console.log("Fetched UserData:", data); // 🔍 LOG HERE
        } else {
          throw new Error('User data not found in response');
        }
      })
      .catch((err) => {
        console.error('Failed to fetch User data:', err);
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
            <p className="text-gray-700 font-medium">Loading User data...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col gap-2 items-center justify-center min-h-full bg-white rounded-xl shadow-sm">
            <MdErrorOutline className="text-6xl text-red-700" />
            <p className="text-red-700 font-semibold">Error: {error}</p>
          </div>
        ) : (
          <>
            <Header userData={userData} />
            <Page userData={userData}/>
        </>
        )}
      </main>
    </>
  );
}

export default UserDetailsLayout;
