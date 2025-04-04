import { montserrat } from '@/app/lib/Fonts'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const Completed = ({ myWorkingDetails, isAssignedToMe }: any) => {
    const router = useRouter();
    
    return (
        <div className='lg:max-w-[700px] 2xl:max-w-[1100px] mx-auto flex mb-[300px]'>
            <div className="bg-[#FFE9E9] w-full h-[130px] flex items-center border-2 border-[#FFB8B8] lg:px-2 2xl:px-6">
                
                {/* Left Section (Icon + Event Complete Message) */}
                <div className="flex items-center">
                    <svg width="62" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M36 66C52.5685 66 66 52.5685 66 36C66 19.4315 52.5685 6 36 6C19.4315 6 6 19.4315 6 36C6 52.5685 19.4315 66 36 66Z" stroke="#C70101" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M36 48V36" stroke="#C70101" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M36 24H36.03" stroke="#C70101" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                    {/* Event Message in Column Format */}
                    <div className="ml-4 flex flex-col">
                        <h2 className='text-3xl font-medium'>This event is complete!</h2>
                        {isAssignedToMe ? (
                            <h3 className="text-xl mt-2">
                                We hope you had a great experience.
                            </h3>
                        ) : (
                            <h3 className="text-xl mt-2">
                                Make sure to check your email for more opportunities. Better Luck Next Time, 
                                <span className="pl-1 pr-1 font-semibold">
                                    {myWorkingDetails?.full_name}
                                </span>.
                            </h3>
                        )}
                    </div>
                </div>

                {/* Right Section - View Upcoming Events */}
                {isAssignedToMe && (
                    <div 
                        className=" bg-[#350ABC] text-white  px-6 py-2 rounded-sm cursor-pointer ml-auto lg:text-[14px] 2xl:text-[18px]"
                        onClick={() => router.push(`/`)}
                    >
                        View Upcoming Events
                    </div>
                )}
            </div>
        </div>
    )
}

export default Completed;
