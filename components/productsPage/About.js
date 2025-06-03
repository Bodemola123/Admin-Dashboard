import React from 'react'

const About = ({productData}) => {
  return (
    <div className='bg-[#FFFFFF] py-4 px-8 gap-4 rounded-[23px] flex flex-col overflow-y-auto scrollbar-hide w-full text-[#032400]'>
          <p className='text-base font-normal'>Information</p>
    <div className='bg-[#6D6D6D] border'></div>
    <div className='flex flex-col gap-6'>
        <div className='flex flex-col gap-2'>
            <p className='text-base font-bold'>Description</p>
            <p className='text-base font-normal'>{productData.large_description}</p>
        </div>
    </div>      
    </div>
  )
}

export default About
