"use client"
import React, { useEffect } from 'react'
import Header from '../../../_components/ui/header';
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { MdOutlineChevronLeft } from "react-icons/md";
import Link from 'next/link';
import useIsMobile from '@/app/lib/hooks/useMobile';
import JobGuideMobileScreen from '../../(mobile-version)/JobGuideMobile';

const AddJobGuide = ({ setStepInQuery }: any) => {
    const router = useRouter();
    const isMobile = useIsMobile();

    const JobGuideDesktopScreen = () => {
        return (
            <div className='bg-[#f6f9fc] h-screen'>
                <Header />
                <div className="pt-[8rem] text-center">
                    <div
                        onClick={() => {
                            router.push(process.env.NEXT_PUBLIC_BASE_URL ?? '');
                        }}
                        className='ml-[15rem] !text-[#6B6B6B] flex justify-start items-center cursor-pointer !leading-[24px] !font-[400] !text-[14px]'>
                        <span className='mr-1'><MdOutlineChevronLeft className='text-[#6B6B6B]' size={20} /></span>
                        <span>
                            Home
                        </span>
                    </div>
                    <p className="text-[18px] text-[#6B6B6B] font-normal leading-[20px] mb-4">Bring Your Event to Life</p>
                    <h1 className="text-[32px] font-normal text-black mt-2 leading-[20px]">Hire the Best Talent with Ease</h1>
                    <div className="mt-4 gap-4 grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto">
                        {/* Col 1 */}
                        <div className="flex flex-col gap-[10rem] p-4">
                            {/* Step 1 */}
                            <div className="flex flex-col">
                                <Image src='/images/gallery/job-guide/s1.svg' height={48} width={48} alt='step-1' />
                                <div className="flex items-center space-x-4 md:justify-end">
                                    <div className="text-left">
                                        <h3 className="text-[18px] font-medium text-black leading-[24px] mb-4">1. Set your event's location</h3>
                                        <p className="text-[14px] leading-[20px] font-medium text-[#6B6B6B]">Tell us where your event will take place. This will help us find the top talent in the vicinity.</p>
                                    </div>
                                </div>
                            </div>
                            {/* Step 3 */}
                            <div className="flex flex-col">
                                <Image src='/images/gallery/job-guide/s3.svg' height={48} width={48} alt='step-3' />
                                <div className="flex items-center space-x-4 md:justify-end">
                                    <div className="text-left">
                                        <h3 className="text-[18px] font-medium text-black leading-[24px] mb-4">3. Describe the service you need</h3>
                                        <p className="text-[14px] leading-[20px] font-medium text-[#6B6B6B]">Share details of the event and select the service you need. Our Talent prefers to come well prepared to provide top-notch service.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="z-[99] mt-[8.9rem] absolute ml-[-4px] left-1/2 transform -translate-x-1/2 rounded-full bg-[#774DFD] h-[7px] w-[7px]"></div>
                        <div className="z-[99] mt-[17.9rem] absolute ml-[-4px] left-1/2 transform -translate-x-1/2 rounded-full bg-[#774DFD] h-[7px] w-[7px]"></div>
                        <div className="z-[99] mt-[26.5rem] absolute ml-[-4px] left-1/2 transform -translate-x-1/2 rounded-full bg-[#774DFD] h-[7px] w-[7px]"></div>
                        <div className="z-[99] mt-[36rem] absolute ml-[-4px] left-1/2 transform -translate-x-1/2 rounded-full bg-[#774DFD] h-[7px] w-[7px]"></div>
                        <Image
                            className='absolute'
                            src='/images/gallery/job-guide/divider.svg'
                            height={549}
                            width={900}
                            alt='divider'
                        />
                        {/* Col 2 */}
                        <div className="flex flex-col gap-[10rem] mt-[10rem] p-4">
                            {/* Step 2 */}
                            <div className="flex flex-col">
                                <Image src='/images/gallery/job-guide/s2.svg' height={48} width={48} alt='step-2' />
                                <div className="flex items-center space-x-4 md:justify-start">
                                    <div className="text-left">
                                        <h3 className="text-[18px] font-medium text-black leading-[24px] mb-4">2. Pick a date and time</h3>
                                        <p className="text-[14px] leading-[20px] font-medium text-[#6B6B6B]">Let us know when your event is happening.</p>
                                    </div>
                                </div>
                            </div>
                            {/* Step 4 */}
                            <div className="flex flex-col">
                                <Image src='/images/gallery/job-guide/s4.svg' height={48} width={48} alt='step-4' />
                                <div className="flex items-center space-x-4 md:justify-start">
                                    <div className="text-left">
                                        <h3 className="text-[18px] font-medium text-black leading-[24px] mb-4">4. Send invites to talent</h3>
                                        <p className="text-[14px] leading-[20px] font-medium text-[#6B6B6B]">Invite the best talent for your event and get offers from them. You can hire a talent from the received offers.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => {
                            const queryParams = new URLSearchParams(window.location.search);
                            if (!queryParams.get('step')) {
                                setStepInQuery('event-location');
                                queryParams.set('step', 'event-location');
                                router.replace(`${window.location.pathname}?${queryParams.toString()}`);
                            }
                        }}
                        className="mt-10 w-[217px] h-[48px] bg-[#350ABC] text-white text-[14px] leading-[26px] font-normal rounded-md">
                        Post your event now!
                    </button>
                </div>
            </div>
        )
    }

    if (isMobile === true) {
        return (
            <JobGuideMobileScreen setStepInQuery={setStepInQuery} />
        )
    } else if (isMobile === false) {
        return (
            <JobGuideDesktopScreen />
        )
    }

}

export default AddJobGuide;