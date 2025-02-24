"use client"
import Image from 'next/image';
import React from 'react';

const NavigationBar = ({ step }: any) => {
    return (
        <div className='shadow-sm min-h-[70px] bg-white w-full items-start'>
            <div className='flex items-center flex-row justify-between px-8 mt-2'>
                <div>
                    {
                        step === 0 &&
                        <div>
                            <Image src='/images/mobile/map-pin-fill.svg' height={24} width={24} alt='location' />
                            <p className='absolute mt-2 text-[#774DFD] text-[14px] leading-[24px] font-normal'>Add Location</p>
                        </div>
                    }
                    {
                        step > 0 &&
                        <div>
                            <Image src='/images/mobile/map-pin-fill.svg' height={24} width={24} alt='location' />
                            <Image className='absolute mt-1' src='/images/mobile/check.svg' height={24} width={24} alt='location' />
                        </div>
                    }
                </div>
                <div className='absolute bg-[red] border border-1 border-[#774DFD] w-[4rem] left-[16%]' />
                <div>
                    {
                        step === 1 &&
                        <div className=''>
                            <Image src='/images/mobile/clock-fill.svg' height={23} width={23} alt='time' />
                            <p className='absolute mt-2 text-[#774DFD] text-[14px] leading-[24px] font-normal'>Date & Time</p>
                        </div>
                    }
                    {
                        step > 1 &&
                        <div>
                            <Image src='/images/mobile/clock-fill.svg' height={23} width={23} alt='time' />
                            <Image className='absolute mt-1' src='/images/mobile/check.svg' height={24} width={24} alt='location' />
                        </div>
                    }
                    {
                        step < 1 &&
                        <div>
                            <Image src='/images/mobile/clock.svg' height={23} width={23} alt='time' />
                        </div>
                    }
                </div>
                <div className={`absolute bg-[red] border border-1 ${step > 0 ? 'border-[#774DFD]' : 'border-[#EBE6FF]'}  w-[4rem] left-[41%]`} />
                <div>
                    {
                        step === 2 &&
                        <div>
                            <Image src='/images/mobile/service-fill.svg' className='relative right-[2px]' height={24} width={24} alt='bartender-icon' />
                            <p className='absolute mt-2 text-[#774DFD] text-[14px] leading-[24px] font-normal'>Service & Details</p>
                        </div>
                    }
                    {
                        step > 2 &&
                        <div>
                            <Image src='/images/mobile/service-fill.svg' className='relative right-[2px]' height={24} width={24} alt='bartender-icon' />
                            <Image className='absolute mt-1' src='/images/mobile/check.svg' height={24} width={24} alt='location' />
                        </div>
                    }
                    {
                        step < 2 &&
                        <div>
                            <Image src='/images/mobile/service.png' height={22} width={20} className='relative right-[2px] object-contain' alt='bartender-icon' />
                        </div>
                    }
                </div>
                <div className={`absolute bg-[red] border border-1 ${step > 1 ? 'border-[#774DFD]' : 'border-[#EBE6FF]'}  w-[4rem] left-[66%]`} />
                <div>
                    {
                        step === 3 &&
                        <div>
                            <Image src='/images/mobile/user-plus-fill.svg' height={23} width={23} className='relative right-[2px] left-[2px] bottom-[4px]' alt='invite-talent' />
                            <p className='self-start right-2 absolute mt-2 text-[#774DFD] text-[14px] leading-[24px] font-normal'>Invite Talent</p>
                        </div>
                    }
                    {
                        step > 3 &&
                        <div>
                            <Image src='/images/mobile/user-plus-fill.svg' height={23} width={23} className='relative right-[2px] left-[2px] bottom-[4px]' alt='invite-talent' />
                            <Image className='absolute mt-1' src='/images/mobile/check.svg' height={24} width={24} alt='location' />
                        </div>
                    }
                    {
                        step < 3 &&
                        <div>
                            <Image src='/images/mobile/user-plus.svg' className='relative right-[2px] left-[2px] bottom-[4px]' height={24} width={24} alt='bartender-icon' />
                        </div>
                    }
                </div>
            </div>
        </div >
    )
}

export default NavigationBar;
