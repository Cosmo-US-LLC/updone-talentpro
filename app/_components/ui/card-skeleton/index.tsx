'use client'
import { Staff } from '@/app/lib/types'
import React, { useState } from 'react'
interface CardSkeletonProps {
    staff: Staff
}
const CardSkeleton = ({ staff }: CardSkeletonProps) => {
    const [showAllServices, setShowAllServices] = useState(false);
    return (
        <>

            <span
                style={{
                    position: "relative",
                    left: "112px",
                    top: " 60px",
                    padding: "6px",
                    zIndex: 1
                }}
                className="w-60 h-60 rounded-full object-cover animate-pulse"
            >
                <svg className="w-20 h-20 text-gray-200 dark:text-gray-700 me-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                </svg>

            </span>
            <div className="bg-white p-3 pb-0 h-[430px] bg-gray-10 max-w-full mx-auto rounded-lg overflow-hidden shadow-whiteeee z-10  border-2 border-[#f4f4f4]">
                <div className='text-center relative top-[20px] left-[67px] rounded-md inline-flex gap-2 py-[6px] px-[22px]'>
                    <div className="animate-pulse w-24 h-10 bg-gray-200 rounded-md dark:bg-gray-700"></div>
                </div>

                <div className='flex flex-col h-[94%] items-start justify-center relative bottom-[22px] mt-[35px]'>

                    <div className="flex flex-col mt-4 items-center w-full">
                        <div className="text-center flex justify-between w-full items-center font-bold text-lg mb-2">
                            <h2 style={{ letterSpacing: '-1%' }} className='text-[20px] text-[#2C2240] font-semibold '><div className="animate-pulse w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div></h2>
                            <div className="flex items-center ">
                                <svg className="w-4 h-4 text-gray-200 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <p className="ms-1 text-[14px]  font-normal text-black"><div className="w-12 h-2 animate-pulse bg-gray-200 rounded-full dark:bg-gray-700"></div></p>
                            </div>
                        </div>
                        <div className="text-center flex justify-between w-full items-center font-bold text-lg mb-1">
                            <div className="text-center text-[14px] font-normal  text-[#989898] flex gap-2">
                                <div className="animate-pulse w-4 h-4 row-full relative bottom-1 bg-gray-200 rounded-full dark:bg-gray-700"></div>   <div className="animate-pulse w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                            </div>
                            <h2 className='text-[14px] font-semibold'><div className="animate-pulse w-6 rounded-md h-2 row-full relative bottom-1 bg-gray-200  dark:bg-gray-700"></div> </h2>
                        </div>
                    </div>
                    <div className="flex justify-center items-center mt-2 w-full">
                        <div className="flex items-center ">
                            <p style={{ wordSpacing: '-1px' }} className="leading-[24px] py-[6px] px-[10px] text-[11px] font-normal inline-flex items-center rounded-[100px] bg-[#F6F6F6] whitespace-nowrap overflow-hidden text-ellipsis text-sm">
                                <span className="mr-2 flex-shrink-0">
                                    <div className="animate-pulse w-4 rounded-md h-3 row-full relative bg-gray-200  dark:bg-gray-700"></div>
                                </span>
                                <div className="animate-pulse w-60 rounded-md h-2 row-full relative bg-gray-200  dark:bg-gray-700"></div>
                            </p>

                        </div>
                    </div>
                    <div className="flex justify-center items-center mt-[24px] w-full">
                        <div className="flex items-center text-paragraph">
                            <svg width="256" height="1" viewBox="0 0 256 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line y1="0.7" x2="256" y2="0.7" stroke="url(#paint0_linear_464_1080)" stroke-width="0.6" />
                                <defs>
                                    <linearGradient id="paint0_linear_464_1080" x1="0" y1="1.5" x2="256" y2="1.5" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#CBCBCB" stopOpacity="0" />
                                        <stop offset="0.505" stopColor="#CBCBCB" />
                                        <stop offset="1" stopColor="#CBCBCB" stopOpacity="0" />
                                    </linearGradient>
                                </defs>
                            </svg>

                        </div>
                    </div>
                    <div className="flex flex-col items-start mt-2 w-full">
                        <h2 style={{ letterSpacing: '-2%' }} className="text-left text-[#2C2240] text-[14px] font-semibold w-full py-2"> <div className="animate-pulse w-20 rounded-md h-2 row-full relative bg-gray-200  dark:bg-gray-700"></div></h2>

                        <div className="flex gap-x-3 flex-wrap text-[#350abc]">
                            {staff?.services?.slice(0, showAllServices ? staff.services.length : 3).map((service, index) => (
                                <p key={index} className="text-left text-[14px] font-normal " style={{ margin: '0px' }}>
                                     {<div className="mt-1 animate-pulse w-20 rounded-md h-2 row-full relative bg-gray-200  dark:bg-gray-700"></div>}
                                </p>
                            ))}
                            {staff?.services?.length > 3 && !showAllServices && (
                                <button style={{ margin: '0px', letterSpacing: '-2%' }} className='font-semibold text-[12px]' onClick={() => setShowAllServices(true)}>
                                </button>
                            )}
                        </div>


                    </div>
                    <div className="flex justify-around items-center mt-4 w-full space-x-2 border-t pt-4 pb-2 border-[#f3f0ff]">
                        <button className="text-[14px] font-normal py-[2px] text-[#413853] rounded-md">View Details</button>
                        <button type="button" className="text-[#dfdbec] bg-[#2c2240]  rounded-[4px] text-[14px] font-normal px-[30px] py-[10px] text-center inline-flex items-center  me-2 ">
                            <span className='mr-2'>
                                <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.3334 4L6.00008 11.3333L2.66675 8" stroke="#F3F0FF" stroke-width="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>

                            Book Now
                        </button>

                    </div>
                </div>
            </div>
        </>
    )
}

export default CardSkeleton
