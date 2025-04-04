"use client"
import { montserrat } from '@/app/lib/Fonts'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'

const Assigned = ({ myWorkingDetails, hourRate, totalHours, totalIncome, clientName, jobId }: any) => {
  const router = useRouter();
  const [loadingButton, setLoadingButton] = useState<{ jobId: string | null; type: string | null }>({
    jobId: null,
    type: null,
  });
  return (

    <div className='lg:max-w-[700px] 2xl:max-w-[1100px]  mx-auto flex mb-[300px]'>

      <div className="bg-[#fce6c9] w-full h-[330px] flex justify-between items-center  border-2 border-[#F9E2B6]">
        {/* Left Box with Image */}
        <div className="w-[50%] h-full flex justify-center items-center lg:mr-[20px] 2xl:mr-[100px] mb-[0px] ">
          <div className='flex flex-col pl-4'>
            <Image
              src={myWorkingDetails?.profile_pic}
              className="rounded-[50%] w-[160px] h-[160px] object-cover p-[6px] bg-[#F3F0FF] mr-[22px]"
              width={60}
              height={100}
              alt=""
            />
            <h2 className='lg:text-xl 2xl:text-3xl mt-2'> Congratulations {myWorkingDetails?.full_name}</h2>
            <h3 className='xl:text-lg 2xl:text-xl 2xl:mt-2'> You have been hired</h3>
          </div>
        </div>

        {/* Right Box with Lighter Yellow Background */}
        <div className="bg-[#fef7e3] w-[80%] min-w-[400px] h-[280px] flex flex-col justify-center items-center border-l border-[#F9E2B6] rounded-lg lg:mr-[20px] 2xl:mr-[70px] overflow-hidden">
          <div className="bg-white relative h-[40%] w-full flex justify-center items-center">
            <div className="absolute w-full lg:px-2 2xl:px-6">
              <div className="flex flex-row justify-between items-center">
                {/* My Offer */}
                <div className="flex flex-col items-center 2xl:pr-2">
                  <p className="font-bold text-">My Offer</p>
                </div>

                {/* Per Hour Rate */}
                <div className="flex flex-col items-center border-r-2 border-gray-200 lg:px-1 2xl:px-4">
                  <p className="text-sm font-normal">Per hour rate</p>
                  <h2 className="font-bold">${hourRate}</h2>
                </div>

                {/* Total Hours */}
                <div className="flex flex-col items-center border-r-2 border-gray-200 lg:px-1 2xl:px-4">
                  <p className="text-sm font-normal">Total hours</p>
                  <h2 className="font-bold">{totalHours} hrs</h2>
                </div>

                {/* Total Income */}
                <div className="flex flex-col items-center lg:px-1 2xl:px-4">
                  <p className="text-sm font-normal">Total Income</p>
                  <h2 className="font-bold">${totalIncome}</h2>
                </div>
              </div>
            </div>
          </div>


          {/* Bottom Yellow Section */}
          <div className="bg-[#fef7e3] h-[70%] w-full flex justify-center items-center">
            <div className=" relative w-[28%] pl-[18px] lg:mr-1 xl:mr-0">
              {/* Transparent Mobile Image */}
              <Image
                className="relative h-[100px] w-[52px]"
                width={62}
                height={100}
                alt="mobile"
                src="/icons/mobile.svg"
              />

              {/* Message Icon Positioned Inside Mobile */}
              <div className="absolute inset-0 lg:pl-[15px] 2xl:pr-[45px] 2xl:pl-[0px] flex items-center justify-center">
                <Image
                  className="h-[24px] w-[24px]" /* Adjust size to fit inside the mobile */
                  width={24}
                  height={24}
                  alt="message icon"
                  src="/icons/messageIcon.svg"
                />
              </div>
            </div>

            <div className="h-[80%] w-[2px] bg-[#F9E2B6]"></div>

            {/* Right Section with Image */}
            <div className=" flex items-center justify-end pl-[32px] pr-[16px]  relative">
              <ul className="text-sm flex flex-col p-4  space-y-[8px] list-disc">
                <li>We have shared your contact information with the {clientName}.</li>
                <li>Discuss all the requirement with the Client in detail.</li>
                <li>Contact us at info@updone.com in case you have any queries.</li>
                {/* <li>In case {clientName} doesn't contact you, message them within the platform.
                  
                </li> */}
              <div
                    onClick={() => {
                      setLoadingButton({ jobId: String(jobId), type: 'talkToClient' });
                      router.push(`/staff/job-detail/${jobId}/chat`);
                    }}
                    className="w-fit cursor-pointer bg-[#350ABC] rounded-full py-2 px-10 self-center mx-auto"
                  >
                    <p className="flex items-center justify-center text-center text-[white] font-[500] text-[18px] leading-[24px]">
                      {loadingButton.jobId === String(jobId) && loadingButton.type === 'talkToClient' ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        "Talk to Client"
                      )}
                    </p>
                  </div>
              </ul>
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

export default Assigned
