import { montserrat } from '@/app/lib/Fonts'
import React from 'react'
import Image from 'next/image'

const AlreadyOffered = ({ hourRate,totalHours, totalIncome }: { hourRate: string  | number ; totalHours?: number;
  totalIncome?: number;}) => {
    return (
        <div className="max-w-[1100px] flex flex-col mx-auto mb-[300px]">
        <div className="!bg-[#EBE6FF] max-h-[220px] relative overflow-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" width="1100" height="217" viewBox="0 0 1280 117" fill="none">
            {/* SVG content */}
          </svg>
      
          {/* Heading and Subheadings */}
          <div className="absolute top-10 left-8 p-[16px]">
            <h1 className="text-xl mb-[36px] font-bold ">Your Offer has been Submitted!</h1>
            <div className="flex flex-row space-x-4">
              <div className="flex flex-col items-center pr-[24px] border-r-2 border-gray-400">
                <p className='text-sm font-normal'>Per hour rate</p>
                <h2 className="text-xl font-bold pr-[56px]">${hourRate}</h2>
              </div>
              <div className="flex flex-col items-center pr-[32px] border-r-2 border-gray-400">
                <p className='text-sm font-normal'>Total hours</p>
                <h2 className="text-xl font-bold pr-[24px] ">{totalHours} hrs</h2>
              </div>
              <div className="flex flex-col items-center pl-[8px] pr-[40px] ">
                <p className='text-sm font-normal'>Total Icome</p>
                <h2 className="text-xl font-bold pr-[40px] ">${totalIncome}</h2>
              </div>
            </div>
          </div>
      
          {/* Yellow Div */}
          <div className="absolute bottom-0 w-full flex justify-end items-center pr-[32px]">
            <div className="bg-[#FFF7EC] w-[560px] h-[165px] mb-[32px] mt-[48px] flex justify-between items-center rounded-xl border-dotted p-[16px] border-2 border-[#F9E2B6]">
              {/* Left Section with List */}
              <div className="w-[80%] pl-[30px]  pr-[8px]">
                <ul className="text-sm flex flex-col  space-y-[8px] list-disc">
                  <li>
                  Open this page on your cell phone to chat with the client. 
                  </li>
                  <li>You may have to wait for the client's reply.</li>
                  <li>Do not share any sensitive information (email, address, and phone numbers).</li>
                </ul>
              </div>
      
              {/* Right Section with Image */}
              <div className="h-full flex items-center justify-end pl-[32px] pr-[16px] border-l-2 border-[#F9E2B6] relative">
  {/* Transparent Mobile Image */}
  <Image
    className="relative h-[100px] w-[52px]"
    width={62}
    height={100}
    alt="mobile"
    src="/icons/mobile.svg"
  />

  {/* Message Icon Positioned Inside Mobile */}
  <div className="absolute inset-0 pl-[14px] flex items-center justify-center">
    <Image
      className="h-[24px] w-[24px]" /* Adjust size to fit inside the mobile */
      width={24}
      height={24}
      alt="message icon"
      src="/icons/messageIcon.svg"
    />
  </div>
</div>

            </div>
          </div>
        </div>
      </div>
      
      


    )
}

export default AlreadyOffered
