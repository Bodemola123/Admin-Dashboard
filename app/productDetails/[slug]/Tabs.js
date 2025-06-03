'use client'
import React, { useState } from 'react';
import {  FaBookOpen, FaClock, FaCode } from 'react-icons/fa';
import { AiFillProduct } from "react-icons/ai";
import Basicinfo from '@/components/productsPage/Basicinfo';
import { PiBookOpenText } from 'react-icons/pi';
import { BsTags } from 'react-icons/bs';
import About from '@/components/productsPage/About';
import PlansAndFeatures from '@/components/productsPage/PlansAndFeatures';
import { FaTags } from 'react-icons/fa6';

const Tabs = ({productData}) => {
  const capitalizedTitle = productData?.tool_name?.charAt(0).toUpperCase() + productData?.tool_name?.slice(1);
const [activeTab, setActiveTab] = useState('Basic info');


const tabs = [
  { name: 'Basic info', icon: <AiFillProduct /> },
  { name: `About ${capitalizedTitle}`, icon: <FaBookOpen /> },
  { name: 'Plans and features', icon: <FaTags /> },
  { name: 'From the Developer', icon: <FaCode /> },
];


  const content = {
  'Basic info': (
    <Basicinfo productData={productData} />
  ),

  [`About ${capitalizedTitle}`]: (
        <About
        productData={productData}/>
    ),

    'Plans and features': (
      <PlansAndFeatures productData={productData}/>
    ),

    'From the Developer': (
      <div className="bg-[#FFFFFF] py-4 px-8 gap-4 rounded-[23px] flex flex-col overflow-y-auto scrollbar-hide w-full text-[#032400]">
        <h2 className="text-xl font-semibold">Developers Note</h2>
        <p className="mt-4">
          {productData?.developer_note}
        </p>
      </div>
        
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
