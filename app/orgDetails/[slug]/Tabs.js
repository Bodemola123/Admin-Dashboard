'use client'
import React, { useState } from 'react';
import { FaUserTie, FaClock, FaUserCircle } from 'react-icons/fa';
import { AiFillProduct } from "react-icons/ai";
import Basicinfo from '@/components/organizationPage/Basicinfo';
import Sessions from '@/components/organizationPage/Sessions';
import { FaPeopleCarryBox } from "react-icons/fa6";
import Account from '@/components/organizationPage/Account';
import Products from '@/components/organizationPage/Products';

const Tabs = ({orgData}) => {
const [activeTab, setActiveTab] = useState('Basic info');


const tabs = [
  { name: 'Basic info', icon: <FaUserCircle /> },
  { name: 'Products', icon: <AiFillProduct /> },
  { name: 'Sessions', icon: <FaClock /> },
  { name: 'Members', icon: <FaPeopleCarryBox /> },
];


  const content = {
  'Basic info': (
    <Basicinfo orgData={orgData} />
  ),

    'Products': (
        <Products
        orgData={orgData}/>
    ),

    'Sessions': (
      <Sessions orgData={orgData}/>
    ),

    'Members': (
      <Account orgData={orgData}/>
        
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
