'use client';
import React, { useEffect } from 'react';
import Tabs from './Tabs';

const Page = ({ productData }) => {
  useEffect(() => {
    console.log('Received productData:', productData);
  }, [productData]);

  const createdDate = productData?.created_at?.split('T')[0];
  const updatedDate = productData?.updated_at?.split('T')[0];

  // Format updated time with AM/PM
  let updatedTime = '';
  if (productData?.updated_at) {
    const updatedDateObj = new Date(productData.updated_at);
    updatedTime = updatedDateObj.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }); // e.g., "11:40 AM"
  }

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="px-8 py-4 flex flex-row justify-between border-[1.5px] border-[#EBF2FF] bg-[#ffffff] rounded-[17px]">
        <div className="flex flex-col gap-6 items-start">
          <p className="font-medium text-xl text-[#2d2d2d]">
            {productData?.tool_name || 'No name inputted'}
          </p>
          <p className="font-medium text-base text-[#6D6D6D] capitalize">
            {productData?.category}
          </p>
        </div>
        <div className="flex items-end justify-center">
          <div className="flex items-center gap-5 text-base font-normal text-[#999999] capitalize">
            <p className="flex items-center gap-2">
              created{' '}
              <span className="text-[#46BA3C] underline">{createdDate}</span>
            </p>
            <span className="w-2 h-2 rounded-full bg-[#999999]"></span>
            <p className="flex items-center gap-2">
              last edited <span className="">{updatedDate}</span>
            </p>
            <span className="w-2 h-2 rounded-full bg-[#999999]"></span>
            <span className="">{updatedTime}</span>
          </div>
        </div>
      </div>
      <Tabs productData={productData} />
    </div>
  );
};

export default Page;
