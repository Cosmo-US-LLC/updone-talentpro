import { montserrat } from '@/app/lib/Fonts'
import Image from 'next/image'
import React from 'react'

const AssignedToOther = ({ myWorkingDetails, hourRate, totalHours, totalIncome }: any) => {
    return (

        <div className='max-w-[1100px] mx-auto flex mb-[300px]'>

            <div className="bg-[#fce6c9] w-full h-[130px] flex justify-between items-center  border-2 border-[#F9E2B6]">
                {/* Left Box with Image */}
                <div className=" h-full flex justify-start items-center mr-[100px] mb-[0px] ">
                    <div className='flex flex-row pl-4'>
                        <div className='flex mt-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="62" height="72" viewBox="0 0 72 72" fill="none">
                                
                                <path d="M36 66C52.5685 66 66 52.5685 66 36C66 19.4315 52.5685 6 36 6C19.4315 6 6 19.4315 6 36C6 52.5685 19.4315 66 36 66Z" stroke="#B68A49" stroke-width="3" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M36 48V36" stroke="#B68A49" stroke-width="3" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M36 24H36.03" stroke="#B68A49" stroke-width="3" strokeLinecap="round" strokeLinejoin="round" />
                                
                            </svg>
                        </div>
                        <div className='flex flex-col ml-[16px] mb-[8px]'>
                            <h2 className='text-3xl font-medium mt-2'> This event has been assigned to someone else.</h2>
                            <h3 className='text-xl mt-2'> Make sure to check your email for more opportunities. <span className='font-medium'>Better Luck Next Time, {myWorkingDetails?.full_name}</span>. </h3>
                        </div>
                    </div>
                </div>


            </div>

            {/* <div className='absolute'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1280" height="117" viewBox="0 0 1280 117" fill="none">
                            <path d="M0.5 0H1280V85C1280 102.673 1265.67 117 1248 117H553.091C536.821 117 521.659 108.758 512.81 95.1047L465.671 22.3664C456.833 8.72871 441.694 0.489129 425.443 0.471112L0.5 0Z" fill="#774DFD" />
                        </svg>
                        <div className='relative bottom-[123px] top-[-107px]  pl-[540px] flex justify-start items-center'>
                            <div className='space-y-[8px] mb-[6px]'>
                                <h3 className='text-[#FFFFFF] text-[12px] tracking-[-0.24px] leading-[24px] font-[400]'>Assignee</h3>
                                <div className='flex justify-center items-center'>
                                    <Image src={myWorkingDetails?.profile_pic} className='rounded-[50%] w-[60px] h-[60px] object-cover p-[3px] bg-[#F3F0FF] mr-[22px]' width={60} height={100} alt='' />
                                    <h3 className={`${montserrat.className} text-[24px] font-[600] mr-[22px] leading-normal tracking-[-0.24px] text-[#F3F0FF] `}>{myWorkingDetails?.full_name}</h3>
                                    <h3 className='mr-[50px] text-[#FFFFFF] flex justify-center items-center gap-1 font-[400] leading-[24px] translate-[-0.28px] text-[14px]'> <span className='mb-[2px] mr-1  leading-[24px] text-[#2C2240] font-[600] tracking-[-0.28px] text-[16px]'>
                                        <svg width="14" height="14" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.0002 0.833374L12.8327 6.57171L19.1668 7.49754L14.5835 11.9617L15.6652 18.2684L10.0002 15.2892L4.33516 18.2684L5.41683 11.9617L0.833496 7.49754L7.16766 6.57171L10.0002 0.833374Z" fill="#F79809" stroke="#F79809" stroke-width="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>{parseFloat(myWorkingDetails?.rating).toFixed(1)}/5</h3>
                                </div>
                            </div>
                            <svg width="1" height="90" viewBox="0 0 1 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line x1="0.5" y1="2.18556e-08" x2="0.499996" y2="90" stroke="white" />
                            </svg>
                            <div className='flex flex-col justify-center items-center'>
                                <h3 className='text-[#FFFFFF] text-[14px] tracking-[-0.24px] leading-[24px] font-[600]'>
                                    Offered
                                </h3>
                                <span className={`${montserrat.className} text-[#F3F0FF] ml-[90px] text-[50px] font-[500] leading-normal tracking-[-2px]`}><span className='text-[20px] relative bottom-[4px]'>$ </span>{hourRate} <small className='text-[14px] tracking-[-0.56px] leading-normal text-[#fff] relative bottom-[4px] right-[3px]'>per hour</small></span>
                            </div>
                        </div>
                    </div> */}
        </div>
    )
}

export default AssignedToOther;
