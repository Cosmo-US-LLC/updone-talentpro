import { montserrat } from '@/app/lib/Fonts';
import Image from 'next/image'
import React from 'react'

const StaffHistory = () => {
  return (
    <div className="w-[55%]">
    <div >
        <div className='flex gap-2 justify-start items-center mb-6'>
            <h2 className={`${montserrat.className} text-[24px] font-semibold translate-[-1%] text-[#2C2240]`}>Work History</h2>
            <div className='mt-[4px]'>
                <span className='text-[#9B9B9B] text-[12px] font-normal translate-[-2%] leading-[26px] relative'>(60 jobs)</span>
            </div>
        </div>

        <div className='space-y-4'>
            <div className="font-normal  rounded-[8.007px] w-[100%]">
                <div className="space-y-1">
                    <div className='flex justify-between items-center'>
                        <h6 className={`${montserrat.className} text-[14px] leading-[18px] text-[#000000] font-medium translate-[-1%]`}>
                            The Palm Tree Terrace, Los Angeles, CA <br /> Cocktail Server
                        </h6>
                        <span className='text-[#9B9B9B] text-[12px] font-normal tracking-[-2%] leading-[24px]'>(2023 - 2024)</span>
                    </div>
                    <p className='text-[12px] leading-[26px] text-[#6B6B6B] font-normal translate-[-2%]'>
                        Provided exceptional service to restaurant patrons, ensuring a welcoming and enjoyable dining experience. <br /> Maintained a positive and engaging attitude while handling multiple tables efficiently.
                    </p>
                </div>
            </div>
            <Image width={626} height={1} alt='verified' src='/images/staff-listing/horizontalline.svg'  quality={100}
                objectFit='fill'
                layout='responsive'/>
            <div className="font-normal w-[100%]">
                <div className="space-y-1">
                    <div className='flex justify-between items-center'>
                        <h6 className={`${montserrat.className} text-[14px] leading-[18px] text-[#000000] font-medium translate-[-1%]`}>
                            The Palm Tree Terrace, Los Angeles, CA <br /> Cocktail Server
                        </h6>
                        <span className='text-[#9B9B9B] text-[12px] font-normal tracking-[-2%] leading-[24px]'>(2023 - 2024)</span>
                    </div>
                    <p className='text-[12px] leading-[26px] text-[#6B6B6B] font-normal translate-[-2%]'>
                        Provided exceptional service to restaurant patrons, ensuring a welcoming and enjoyable dining experience. <br /> Maintained a positive and engaging attitude while handling multiple tables efficiently.
                    </p>
                </div>
            </div>
            <Image width={626} height={1} alt='verified' src='/images/staff-listing/horizontalline.svg'  quality={100}
                objectFit='fill'
                layout='responsive'/>
            <div className="font-normal w-[100%]">
                <div className="space-y-1">
                    <div className='flex justify-between items-center'>
                        <h6 className={`${montserrat.className} text-[14px] leading-[18px] text-[#000000] font-medium translate-[-1%]`}>
                            The Palm Tree Terrace, Los Angeles, CA <br /> Cocktail Server
                        </h6>
                        <span className='text-[#9B9B9B] text-[12px] font-normal tracking-[-2%] leading-[24px]'>(2023 - 2024)</span>
                    </div>
                    <p className='text-[12px] leading-[24px] text-[#6B6B6B] font-normal translate-[-2%]'>
                        Provided exceptional service to restaurant patrons, ensuring a welcoming and enjoyable dining experience. <br /> Maintained a positive and engaging attitude while handling multiple tables efficiently.
                    </p>
                </div>
                <div className='flex justify-center items-center gap-2 mt-4'>
                    <span className='text-center text-[12px] leading-[26px] text-[#6B6B6B] font-normal translate-[-2%]'>Load More</span>
                    <span><svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.5 3.33325L8.5 12.6666" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M13.1665 8L8.49984 12.6667L3.83317 8" stroke="#545454" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    </span>
                </div>

            </div>
        </div>
    </div>
</div>
  )
}

export default StaffHistory
