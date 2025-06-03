'use client';

import React from 'react';
import { FaRegCheckCircle } from 'react-icons/fa';
import { CiCircleInfo } from 'react-icons/ci';

// Tailwind-safe color class map
const colorClassMap = {
  individual: 'text-blue-600',
  enterprise: 'text-green-600',
  pro: 'text-purple-600',
  business: 'text-orange-500',
  free: 'text-cyan-600',
  basic: 'text-teal-600',
  professional: 'text-indigo-700',
  agency: 'text-pink-600',
  starter: 'text-orange-400',
};

// Check icon color class map (lighter tint for icons)
const iconColorClassMap = {
  individual: 'text-blue-400',
  enterprise: 'text-green-500',
  pro: 'text-purple-400',
  business: 'text-orange-400',
  free: 'text-cyan-500',
  basic: 'text-teal-500',
  professional: 'text-indigo-500',
  agency: 'text-pink-500',
  starter: 'text-orange-300',
};

// Plan description map
const descriptionMap = {
  individual: 'Create an account for yourself and start using.',
  enterprise: 'Create an account for your Organization and start using.',
  pro: 'Professional-grade tools for power users.',
  business: 'Tailored solutions for business teams.',
  free: 'Get started with basic features at no cost.',
  basic: 'Start simple and upgrade when ready.',
  professional: 'Advanced features for professionals.',
  agency: 'Perfect for agencies managing multiple clients.',
  starter: 'All the essentials to get going quickly.',
};

const PlansAndFeatures = ({ productData }) => {
  const planEntries = Object.entries(productData?.plan_benefits || {});

  const gridColsClass =
    planEntries.length === 1
      ? 'lg:grid-cols-1'
      : planEntries.length === 2
      ? 'lg:grid-cols-2'
      : 'lg:grid-cols-3';

  return (
    <div className="bg-white py-4 px-8 gap-4 rounded-[23px] flex flex-col overflow-y-auto scrollbar-hide w-full text-[#032400]">
      <div className="flex justify-start items-center">
        <p className="font-bold text-[22.46px] leading-[33.7px]">Deal Terms and Conditions</p>
      </div>

      <div className={`mt-8 grid sm:grid-cols-1 md:grid-cols-2 ${gridColsClass} gap-6`}>
        {planEntries.map(([planKey, benefits], index) => {
          const colorClass = colorClassMap[planKey] || 'text-blue-600';
          const iconColorClass = iconColorClassMap[planKey] || 'text-blue-400';
          const capitalizedName = planKey.charAt(0).toUpperCase() + planKey.slice(1);
          const description = descriptionMap[planKey] || 'Explore this plan and start using.';

          return (
            <div
              key={index}
              className="rounded-3xl flex flex-col gap-16 border border-[#313131] p-9 bg-secondary"
            >
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                  <span className={`text-4xl font-medium ${colorClass}`}>
                    {capitalizedName}
                  </span>
                  <span className="text-[#AFAFAF]">{description}</span>
                </div>
                <ul className="flex flex-col gap-2">
                  {benefits?.length > 0 ? (
                    benefits.map((benefit, i) => (
                      <li key={i} className="flex flex-row gap-6 items-center">
                        <FaRegCheckCircle className={`w-6 h-6 ${iconColorClass}`} />
                        <span className="flex flex-row gap-2 items-center">
                          {benefit}
                          <CiCircleInfo className="text-gray-400" />
                        </span>
                      </li>
                    ))
                  ) : (
                    <li className="text-[#AFAFAF] italic">None for this plan</li>
                  )}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlansAndFeatures;
