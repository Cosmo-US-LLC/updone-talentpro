import Link from 'next/link';
import React, { useState } from 'react';
import { IoIosStarOutline } from "react-icons/io";
import { PiUsersThree } from "react-icons/pi";
import { PiCurrencyDollar } from "react-icons/pi";
import { SlLocationPin } from "react-icons/sl";

// Define an array of link objects

const Settings = ({activeIndex,setActiveIndex,linksSetting}:any) => {
    // State to track the active link

    return (
                <div className="w-full">
                    {linksSetting.map((link:any, index:number) => (
                        <Link 
                            href={link.path} 
                            key={index} 
                            className={`flex flex-col gap-[18px] items-center mb-4 w-full pt-4 pb-2 rounded-[12px] ${
                                activeIndex === index ? 'bg-[#F8F6FF]' : ''
                            }`} 
                            onClick={() => setActiveIndex(index)}
                        >
                            <link.icon className={`h-6 w-6  ${
                                activeIndex === index ? 'text-[#350ABC]' : 'text-[#2C2240]'
                            }`} />
                            <span className={`text-[14px] leading-[24px] font-[400] ${
                                activeIndex === index ? 'text-[#350ABC]' : 'text-[#2C2240]'
                            }`}>{link.name}</span>
                        </Link>
                    ))}
                </div>
    );
};

export default Settings;
