import { montserrat } from '@/app/lib/Fonts'
import Image from 'next/image'
import React from 'react'

const Completed = ({ myWorkingDetails, isAssignedToMe }: any) => {
    return (
        <div className='max-w-[1100px] mx-auto flex mb-[300px]'>
            <div className="bg-[#FFE9E9] w-full h-[130px] flex justify-between items-center  border-2 border-[#FFB8B8]">
                <div className=" h-full flex justify-start items-center mr-[100px] mb-[0px] ">
                    <div className='flex flex-row pl-4'>
                        <div className='flex mt-2'>
                            <svg width="62" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M36 66C52.5685 66 66 52.5685 66 36C66 19.4315 52.5685 6 36 6C19.4315 6 6 19.4315 6 36C6 52.5685 19.4315 66 36 66Z" stroke="#C70101" stroke-width="3" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M36 48V36" stroke="#C70101" stroke-width="3" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M36 24H36.03" stroke="#C70101" stroke-width="3" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>

                        </div>
                        <div className='flex flex-col ml-[16px] mb-[8px]'>
                            <h2 className='text-3xl font-medium mt-2'> This event is completed.</h2>
                            {isAssignedToMe ? (
                                <h3 className="text-xl mt-2">
                                    We hope you had a great experience,  
                                    <span className="pl-1 pr-1 font-bold">
                                        {myWorkingDetails?.full_name}!
                                    </span>
                                     Make sure to check for your email more opportunities.
                                    
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
                </div>
            </div>
        </div>
    )
}

export default Completed
