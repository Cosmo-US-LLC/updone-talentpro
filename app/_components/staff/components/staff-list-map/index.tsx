import Image from 'next/image'
import React, { useState, useRef, useEffect } from 'react'
import { montserrat } from '@/app/lib/Fonts';
import { useSelector } from 'react-redux';
import { selectBooking } from '@/app/lib/store/features/bookingSlice';
import VerificationIcon from '@/app/_components/ui/shield';
import Tooltip from '@/app/_components/common/tooltip';
import { VerificationStatus } from '@/app/_components/ui/verified-status-check-tooltip';

type StaffMapProps = {
    staff: any;
    handleStaffClick?: (arg: any) => void
    setModalOpen?: (arg: boolean) => void;
    modalOpen?: boolean;
    index?: number;
    isInvited?: boolean
    isJobDetailInvite?: boolean,
    jobApiData: any
}
export interface TimeRange {
    start_time: string;
    end_time: string;
}
const StaffMap = ({ isJobDetailInvite, staff, handleStaffClick, isInvited, jobApiData }: StaffMapProps) => {
    const selectedService = useSelector(selectBooking)
    const [openBreakDown, setOpenCastBreakDown] = useState(false)
    const [sendInvite, setSendInvite] = useState(false)
    const uninviteRenderCount = useRef(0);

    useEffect(() => {
        if (sendInvite || isInvited || staff?.alreadyInvited) {
            uninviteRenderCount.current += 1;
        }
    });

    const handleOpenCastBreakdown = () => {
        setOpenCastBreakDown(true)
    }
    const handleCloseCastBreakdown = () => {
        setOpenCastBreakDown(!openBreakDown)
    }
    const handleSendInvite = () => {
        handleStaffClick?.(staff)
        setSendInvite(!sendInvite)
        //@ts-ignore
    }

    function calculateTotalHours(timeRange: TimeRange): number {

        function timeToMinutes(timeStr: string): number {
            const [time, period] = timeStr.split(' ');
            const [hours, minutes] = time.split(':').map(Number);
            const adjustedHours = period === 'PM' && hours !== 12 ? hours + 12 : hours;
            const totalMinutes = (adjustedHours % 12) * 60 + minutes;
            return totalMinutes;
        }

        var start_time = '';
        var end_time = '';

        if (timeRange) {
            start_time = timeRange?.start_time;
            end_time = timeRange?.end_time;

            const startMinutes = timeToMinutes(start_time);
            const endMinutes = timeToMinutes(end_time);

            const totalMinutes = endMinutes - startMinutes;
            const totalHours = totalMinutes / 60;

            return totalHours;
        } else {
            return 0;
        }


    }
    function calculateTotal(hourRate: number, amount: number) {
        return (Number(hourRate) * Number(amount));
    }


    return (
        <>
            <Image
                className="w-[115px] h-[115px] rounded-full object-cover relative left-[22px] top-[71px] p-[4px] bg-[#f3f0ff]"
                src={staff.profile_pic ? staff.profile_pic : '/images/testiminial/testi3.jpg'}
                quality={100}
                objectFit='fill'
                width={120}
                height={120}
                alt=''
                placeholder='blur'
                blurDataURL="data:image/jpeg;base64,..." 
                priority={true}
            />
            <div key={staff.id} className="py-3 px-5 pb-0 h-[330px] max-w-full mx-auto rounded-[4px] overflow-hidden shadow-whiteeee z-10 bg-white border-[1px] border-[#F7F7F7]">
                <div className='text-center  justify-center w-[100px] relative top-[8px] left-[167.5px] bg-[#e6e0fa] text-[#350ABC] rounded-md inline-flex gap-2 py-[6px] px-[14px]'>
                    <span className='text-[16px]  font-[400] tracking-[-2%] leading-[28px]'>${parseFloat(staff?.per_hours_rate).toFixed(0)}/hr</span>
                </div>


                <div className='flex flex-col h-[94%] items-start relative bottom-[18px] mt-[34px]'>

                    <div className="flex flex-col mt-[30px] items-center w-full relative z-50">
                        <div className="text-center flex justify-between w-full items-center font-bold text-lg mb-[21px]">
                            <div className='flex justify-start items-center'>
                                <h3 style={{
                                    letterSpacing: '-1%',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                }} className={`text-[20px] flex justify-start items-center min-w-auto gap-2 text-[#2C2240] relative bottom-[1px] font-[600] ${montserrat.className}`}>
                                    {staff?.full_name?.length > 18 ? `${staff?.full_name?.slice(0, 18)}...` : staff?.full_name}
                                </h3>
                                <Tooltip content={
                                    <VerificationStatus
                                        id_is_verified={staff.id_is_verified}
                                        contact_is_verified={staff.contact_is_verified}
                                    />
                                }>
                                    <div className=" text-white pr-4 pl-2  rounded">
                                        <VerificationIcon id_is_verified={staff.id_is_verified} contact_is_verified={staff.contact_is_verified} height={30} width={30} />
                                    </div>
                                </Tooltip>
                            </div>
                            <div className="flex items-center justify-center">
                                <div className='relative bottom-[2px]'>
                                    <svg className="w-4 h-4 text-[#F79809] me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                    </svg>
                                </div>
                                <p className="ms-1 text-[14px]  font-normal text-black">{parseFloat(staff?.rating).toFixed(1)}/5</p>
                            </div>
                        </div>
                        <div className="text-center flex justify-between w-full items-center font-bold text-lg mb-1">
                            <div className="text-center text-[14px] font-normal  text-[#989898] flex gap-2">
                                <Image src='/images/gallery/location.svg' alt='location-svg' width={16} height={16} />  <span className='flex justify-start items-center !text-[16px] !font-[400] text-[#00000080] cursor-pointer'>{staff?.city}</span>
                            </div>
                            <span className='text-[16px] font-[400] leading-[28px] text-[#6B6B6B]'>{staff?.total_jobs_count} Jobs</span>
                        </div>
                    </div>

                    <div className="flex justify-start items-center mt-2 w-full">
                        <div className="flex items-center ">
                            <p style={{ wordSpacing: '-1px' }} className="relative top-[5px] leading-[24px] py-[4px] px-[10px] !text-[11px] font-normal inline-flex items-center rounded-[100px] bg-[#F6F6F6] whitespace-nowrap overflow-hidden text-ellipsis text-sm">
                                <span className="mr-2 flex-shrink-0">
                                    <svg width="16" height="16" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_464_1076)">
                                            <path d="M10.8333 3.79163H2.16659C1.56828 3.79163 1.08325 4.27665 1.08325 4.87496V10.2916C1.08325 10.8899 1.56828 11.375 2.16659 11.375H10.8333C11.4316 11.375 11.9166 10.8899 11.9166 10.2916V4.87496C11.9166 4.27665 11.4316 3.79163 10.8333 3.79163Z" stroke="#2C2240" strokeWidth="1.08333" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M8.66658 11.375V2.70833C8.66658 2.42102 8.55245 2.14547 8.34928 1.9423C8.14612 1.73914 7.87057 1.625 7.58325 1.625H5.41659C5.12927 1.625 4.85372 1.73914 4.65055 1.9423C4.44739 2.14547 4.33325 2.42102 4.33325 2.70833V11.375" stroke="#2C2240" strokeWidth="1.08333" strokeLinecap="round" strokeLinejoin="round" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_464_1076">
                                                <rect width="13" height="13" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </span>
                                Last job was on {staff?.last_job}
                            </p>

                        </div>
                    </div>
                </div>
            </div>
            <div className={`flex justify-around items-center flex-col mt-0 ${staff?.alreadyInvited && "h-[110px]"} mt-[32px] relative bottom-[142.9px] w-full space-x-2  pt-2 pb-[17.5px] rounded-bl-[4px] rounded-br-[4px] border-x-[1px] border-[#F7F7F7] ${isJobDetailInvite && "h-[21.6%]"}`}>
                {openBreakDown &&
                    <img src="/images/shadow pic.png" alt="" className='absolute bottom-[262px] z-20' />

                }
                {openBreakDown &&
                    <div className='!h-[10.8rem] !m-0 absolute z-[99]  bg-[#fff] text-[#2C2240] !pb-4 w-full  bottom-[84px] space-y-2 capitalize'>
                        <div onClick={handleCloseCastBreakdown} className='w-full flex justify-center items-center cursor-pointer'><span className='rotate-180 relative top-[8px]'><svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17 11.5L12 6.5L7 11.5" stroke="#2C2240" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M17 18.5L12 13.5L7 18.5" stroke="#2C2240" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        </span ></div>
                        <div className='text-[12px] font-[400] leading-[24px] tracking-[-2%] px-3 flex justify-between items-center py-2 border-b border-[#F3F0FF]'>
                            <h2>Worker fee per hour</h2><h2 className='!font-[500] !text-[12px] !leading-[24px] !tracking-[-2%]'>${parseFloat(staff?.per_hours_rate)}</h2>
                        </div>
                        <div className='text-[12px] font-[400] leading-[24px] tracking-[-2%] px-3 flex justify-between items-center py-2 border-b border-[#F3F0FF]'>
                            <h2>Total Numbers of hours</h2><h2 className='!font-[500] !text-[12px] !leading-[24px] !tracking-[-2%] lowercase'>{calculateTotalHours(jobApiData ? jobApiData?.working_times?.timing : selectedService?.working_hours?.timing)}h</h2>
                        </div>
                        <div className='text-[12px] font-[400] leading-[24px] tracking-[-2%] px-3 flex justify-between items-center py-2'>
                            <h2>Worker fee calculation</h2><h2 className='!font-[500] !text-[12px] !leading-[24px] !tracking-[-2%] lowercase'><small className='mr-2 !text-[10px] text-[#9F9F9F] font-[400] leading-[24px] tracking-[-0.2px]'>{calculateTotalHours(jobApiData ? jobApiData?.working_times?.timing : selectedService.working_hours.timing)} h ✕ ${parseFloat(staff?.per_hours_rate)}</small> ${calculateTotal((staff?.per_hours_rate), calculateTotalHours(jobApiData ? jobApiData?.working_times?.timing : selectedService.working_hours.timing))}</h2>
                        </div>
                    </div>
                }
                <div className='mt-[31px] w-[86%]'>

                    <div className={`space-x-[20px] !m-0 flex justify-between  ${sendInvite || isInvited || staff?.alreadyInvited && "!justify-center"} items-center `}>
                        <div style={{ right: isInvited ? "right-[0px]" : "", position: 'relative' }} className={`relative text-[#350ABC] font-[500] text-[26px] z-[999] ${staff?.alreadyInvited || isInvited ? "!right-[0px] top-1" : ""}`}>${calculateTotal((staff?.per_hours_rate), calculateTotalHours(jobApiData ? jobApiData?.working_times?.timing : selectedService.working_hours.timing))} <span className='!text-[12px] !leading-[14.63px] !mr-[4px] !text-[#6B6B6B]'>Total.</span></div>

                        {!staff?.alreadyInvited &&
                            !isJobDetailInvite &&
                            <button
                                onClick={handleSendInvite}
                                type="button"
                                className={`!text-[#F3F0FF]   ${sendInvite || isInvited || staff?.alreadyInvited ? "bg-[#774DFD]" : "bg-[#2c2240]"} rounded-[4px] text-[13px] font-[400] w-[120px] py-[10px] text-center inline-flex items-center tracking-[-2%] leading-[24px] me-2 
transition-transform duration-150 ease-in-out transform active:scale-95  grow_ellipse`}
                            >
                                <span className={`flex justify-center items-center  ${sendInvite || isInvited || staff?.alreadyInvited ? "ml-[35px]" : "ml-[18px]"}`}>
                                    {sendInvite || isInvited || staff?.alreadyInvited ? (
                                        "Uninvite"
                                    ) : (
                                        <>
                                            {"Send Invite "}
                                            <small className='relative top-[1px] text-md ml-2'>➤</small>
                                        </>
                                    )}

                                    <span className='ml-[9.33px]'>
                                        {!sendInvite || isInvited &&
                                            <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M15.1666 1.33337L7.83325 8.66671M15.1666 1.33337L10.4999 14.6667L7.83325 8.66671M15.1666 1.33337L1.83325 6.00004L7.83325 8.66671" stroke="#F3F0FF" stroke-width="0.7" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        }
                                        {!sendInvite || !isInvited || !staff?.alreadyInvited &&
                                            <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M15.1666 1.33337L7.83325 8.66671M15.1666 1.33337L10.4999 14.6667L7.83325 8.66671M15.1666 1.33337L1.83325 6.00004L7.83325 8.66671" stroke="#F3F0FF" stroke-width="0.7" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        }
                                    </span>
                                </span>
                            </button>


                        }


                    </div>
                </div>
                {/* <button className={`text-[14px] font-normal py-[2px] text-[#413853] rounded-md `}><div className={`${montserrat.className} text-[#2C2240] absolute ${isJobDetailInvite ? "right-[111px]" : "right-[188px]"} text-[24px] ${staff?.alreadyInvited && "left-[100px]"} bottom-[30px] font-[600] tracking-[-1%] leading-[19.5px]`}><span className='!text-[12px] !leading-[14.63px] !mr-[4px] !text-[#6B6B6B]'>Total.</span>${calculateTotal((staff?.per_hours_rate), calculateTotalHours(selectedService.working_hours.timing))}</div></button> */}
            </div>
        </>
    )
}

export default StaffMap;
