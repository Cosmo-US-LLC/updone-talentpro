'use client'
import React, { Suspense } from 'react'
const Testimonials = dynamic(() => import('../../home/testimonials'), {
    ssr: false, // Do not SSR for this component
    loading: () => <><p className='flex justify-center items-center w-full'>Loading...</p></>, // Display loader while loading
});
const StaffImageGrid = dynamic(() => import('./components/StaffImages'), {
    ssr: false, // Do not SSR for this component
    loading: () => <><p className='flex justify-center items-center'>Loading...</p></>, // Display loader while loading

});
const StaffHistory = dynamic(() => import('./components/StaffHistory'), {
    ssr: false, // Do not SSR for this component
    loading: () => <><p className='flex justify-center items-center'>Loading...</p></>, // Display loader while loading

});

import Image from 'next/image'
import { PiLineVerticalThin } from 'react-icons/pi'
import { GoDotFill } from 'react-icons/go'
import dynamic from 'next/dynamic';
import { useBookingContext } from '@/app/lib/context/BookingContext';
import HOME_TESTIMONINAL_CONTENT from '../../home/testimonials/constants';


export const highlightedDatesNotAvailable = [''];
export const highlightedDatesAvailable = ['2024-07-21', '2024-07-24'];
const StaffDetail = () => {
    const {staff } = useBookingContext();
    return (
        <div>
            {/* upper section */}
            <div className='h-[225px] bg-[#f3f0ff] flex justify-center items-end'>
                <div className='h-[152px] w-full max-w-[1276px]  flex'>
                    <div className='w-[16%]'>
                        {/* <!-- Content for the left side --> */}
                        <div className='absolute top-[215px]'>
                            <GoDotFill className='text-[40px] absolute right-0 top-[-70px] z-[1] left-[4px]  text-[#350ABC]' />
                            <Image
                                className="relative bottom-[100px] border-solid border-8 border-white object-cover w-34 h-34 mt-3 mr-3 rounded-full"
                                //@ts-ignore
                                src={staff?.profile_pic} // Fallback to a default image if staff?.img is undefined
                                //@ts-ignore
                                alt={staff?.name}
                                width={130}
                                height={180}
                                objectFit="cover"
                                quality={100} // This ensures the highest quality
                            />

                        </div>
                    </div>
                    <div className='w-[84%] flex justify-center items-center gap-[64px] mb-[27px]'>
                        <div className='w-2/5 space-y-4'>
                            <div className="text-center mb-[21px] flex justify-between w-full items-center font-bold text-lg">
                                <h3 style={{ letterSpacing: '-2%' }} className='text-[44px] text-[#000000] text-start font-semibold '>  {staff?.name?.length > 8 ? `${staff?.name?.slice(0, 8)}` : staff?.name}</h3>
                                <div className="flex items-center ">
                                    <span className='mb-[4px] mr-1'>
                                        <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.0002 0.833374L12.8327 6.57171L19.1668 7.49754L14.5835 11.9617L15.6652 18.2684L10.0002 15.2892L4.33516 18.2684L5.41683 11.9617L0.833496 7.49754L7.16766 6.57171L10.0002 0.833374Z" fill="#F79809" stroke="#F79809" stroke-width="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>

                                    <span style={{ letterSpacing: '-2%' }} className="ms-1 text-[16px] leading-[26px] font-normal text-[#000000]">5.0/5</span>
                                </div>
                            </div>
                            <div className="flex justify-start items-center text-start w-full space-x-1 mb-2 ">
                                <p className='text-[14px] font-normal text-[#6B6B6B] leading-[24px] tracking-[-2%]'>Cocktail Server</p>
                                <span><PiLineVerticalThin /></span>

                                <p className='text-[14px] font-normal text-[#6B6B6B] leading-[24px] tracking-[-2%]'>Cocktail Server</p>
                                <span>  <PiLineVerticalThin /></span>

                                <p className='text-[14px] font-normal text-[#6B6B6B] leading-[24px] tracking-[-2%]'>Cocktail Server</p>

                            </div>
                            <div className="text-center text-[16px] font-normal  text-[#2C2240] flex gap-2">
                                <span>
                                    <Image width={16} height={16} alt='verified' src='/images/staff-listing/map.svg' />
                                </span>
                                <div className='relative bottom-[5px] text-[16px] font-normal leading-[26px] tracking-[-2%] text-[#2C2240]'>
                                    {`${staff?.city}`}
                                </div>
                            </div>
                            <div className="flex justify-between items-center text-start w-full space-x-3 mb-2 ">
                                <span className='relative bottom-[5px]'>
                                    <Image width={14} height={14} alt='verified' src='/images/staff-listing/phone.svg' />
                                </span>
                                <div style={{ letterSpacing: '-2%', marginRight: '25px' }} className='relative bottom-[5px] text-[14px] font-normal flex justify-center items-center gap-2 text-[#000000]'>
                                    {`Contact Number`}
                                    <Image width={58} height={12} alt='verified' src='/images/staff-listing/vertified.svg' />
                                </div>

                                <span className='relative bottom-[6px]'>
                                    <Image width={16} height={16} alt='verified' src='/images/staff-listing/person.svg' />
                                </span>
                                <div style={{ letterSpacing: '-2%', marginRight: '25px' }} className='relative bottom-[5px] text-[14px] font-normal flex justify-center items-center gap-2 text-[#000000]'>
                                    {`ID`}
                                    <Image width={82} height={16} alt='verified' src='/images/staff-listing/not-verfied.svg' />

                                </div>


                            </div>
                        </div>

                        <div className='w-3/5'>
                            <h3 style={{ letterSpacing: '-1%', lineHeight: 'auto' }} className=' text-[#2C2240] text-[24px] font-semibold'>
                                About Me
                            </h3>
                            <p style={{ letterSpacing: '-2%' }} className='text-[#6B6B6B] text-[14px] font-normal leading-[24px]'>
                                I'm Sarah Miller, a vibrant and outgoing individual passionate about creating memorable experiences. As a cocktail server, I ensure guests feel welcome and enjoy their time.  As a promo model, I bring brands to life with high energy and a captivating smile.
                            </p>
                        </div>
                    </div>

                </div>
            </div>

            <div className="max-w-[1276px] mx-auto h-auto pt-[80px]">
                {/* staff history section */}
                <div className="h-[465px] flex gap-[25px] mt-[100px] mb-6">
                    <Suspense fallback={<p className='w-[50%] flex justify-center items-center'>Loading...</p>}>
                        <StaffHistory />
                    </Suspense>
                    <Suspense fallback={<p className='w-[50%] flex justify-center items-center'>Loading...</p>}>
                        <StaffImageGrid />
                    </Suspense>
                </div>

            </div>
            <div>
                <Suspense fallback={<p className='w-full flex justify-center items-center'>Loading...</p>}>
                    <Testimonials isDetailTestonial testimonials={HOME_TESTIMONINAL_CONTENT} />
                </Suspense>
            </div>

        </div>
    )
}

export default StaffDetail
