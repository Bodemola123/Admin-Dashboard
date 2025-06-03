'use client'
import React, { useState } from 'react';
import { FaUserTie, FaClock, FaUserCircle } from 'react-icons/fa';
import { AiFillProduct } from "react-icons/ai";
import { FaPeopleCarryBox } from "react-icons/fa6";
import { MdManageAccounts, MdPayments } from 'react-icons/md';
import Payments from '@/components/usersPage/Payments';
import Sessions from '@/components/usersPage/Sessions';
import Account from '@/components/usersPage/Account';
import Basicinfo from '@/components/usersPage/Basicinfo';

const Tabs = ({userData}) => {
const [activeTab, setActiveTab] = useState('Basic info');


const tabs = [
  { name: 'Basic info', icon: <FaUserCircle /> },
  { name: 'Payments', icon: <MdPayments /> },
  { name: 'Sessions', icon: <FaClock /> },
  { name: 'Account', icon: <MdManageAccounts /> },
];


  const content = {
  'Basic info': (
    <Basicinfo userData={userData} />
  ),

    'Payments': (
        <Payments
        userData={userData}/>
    ),

    'Sessions': (
      <Sessions userData={userData}/>
    ),

    'Account': (
      <Account userData={userData}/>
        
    ),
  };

  return (
    <div className="">
    
<div className="flex flex-row justify-between w-full items-center bg-[#FFFFFF] py-2 px-4 rounded-[20px]">
  {tabs.map((tab) => (
    <button
      key={tab.name}
      onClick={() => setActiveTab(tab.name)}
      className={`flex items-center gap-2 px-4 py-2 text-[15px] font-medium transition-colors ${
        activeTab === tab.name ? 'text-[#46BA3C]' : 'text-[#6d6d6d]'
      } hover:text-[#46BA3C]`}
    >
      <span className="flex items-center gap-2">
        <span className="text-[16px]">{tab.icon}</span>
        <span>{tab.name}</span>
      </span>
    </button>
  ))}
</div>

      <div className="mt-4 ">{content[activeTab]}</div>
    </div>
  );
};

export default Tabs;
