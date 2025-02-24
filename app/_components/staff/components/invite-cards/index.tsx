import Tooltip from '@/app/_components/common/tooltip';
import VerificationIcon from '@/app/_components/ui/shield';
import { VerificationStatus } from '@/app/_components/ui/verified-status-check-tooltip';
import ViewOfferModal from '@/app/_components/ui/viewOfferModal';
import { montserrat } from '@/app/lib/Fonts';
import Image from 'next/image';
import { useState } from 'react';

type StaffMapProps = {
    data: any;
    handleStaffClick?: (arg: any) => void
    setModalOpen?: (arg: boolean) => void;
    modalOpen?: boolean;
    index?: number;
    isInvited?: boolean
    isJobDetailInvite?: boolean
}
export interface TimeRange {
    start_time: string;
    end_time: string;
}
const InviteCard = ({ data, isInvited }: StaffMapProps) => {
    const [modalOpen, setModalOpen] = useState(false);
    const staff = data?.worker;

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <>
            <div key={staff?.id} className={`${isInvited ? 'bg-[#FFFBF6] !border-[1px] !border-[#FFE2BE]' : 'bg-white'} py-1 px-2 pb-0 max-w-full mx-auto rounded-[4px] overflow-hidden shadow-whiteeee z-10 border-[1px] border-[#F7F7F7]`}>
                <div className={`flex flex-row w-full items-center justify-between px-2`}>
                    <Image
                        className={`w-[64px] h-[64px] ${isInvited && '!border-[1px] !border-[#FFE2BE]'} rounded-full object-cover !border-[2px] border-[#f3f0ff] bg-[#f3f0ff]`}
                        src={staff?.profile_pic ? staff?.profile_pic : '/images/testiminial/testi3.jpg'}
                        quality={100}
                        objectFit='fill'
                        width={64}
                        height={64}
                        alt=''
                        priority={true}
                    />
                    <div className={`w-fit ${isInvited ? "bg-[#FFE2BE]" : "bg-[#e6e0fa]"} text-[#350abc] rounded-md gap-2 py-[6px] px-[14px]`}>
                        <p className='!text-[16px] !font-[400] tracking-[-2%] leading-[28px]'>${parseFloat(staff?.per_hours_rate).toFixed(0)}/hr</p>
                    </div>
                </div>
                <div className='flex flex-col items-start relative bottom-[18px] px-2'>
                    <div className="flex flex-col mt-6 items-center w-full relative z-50">
                        <div className="text-center flex justify-between w-full items-center font-bold text-lg mb-[16px]">
                            <div className='flex justify-start items-center'>
                                <h3 style={{
                                    letterSpacing: '-1%',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                }} className={`text-[20px] flex justify-start items-center min-w-auto gap-2 text-[#2C2240] relative font-[600] ${montserrat.className}`}>
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
                                <div className='relative'>
                                    <svg className="w-4 h-4 text-[#F79809] me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                    </svg>
                                </div>
                                <p className="ms-1 text-[14px] leading-[24px] font-[400] text-[#000000]">{parseFloat(staff?.rating).toFixed(1)}/5</p>
                            </div>
                        </div>
                        <div className="text-center flex justify-between w-full items-center font-bold text-lg">
                            <div className="text-center text-[14px] font-normal  text-[#989898] flex gap-2">
                                <Image src='/images/gallery/location.svg' alt='location-svg' width={16} height={16} />  <span className='flex justify-start items-center !text-[16px] !font-[400] leading-[28px] !text-[#00000080] cursor-pointer'>{staff?.city}</span>
                            </div>
                            <span className='text-[16px] !text-[#6B6B6B] font-[400]'>{staff?.total_jobs_count} Jobs</span>
                        </div>
                    </div>

                    <div className="flex justify-start items-center w-full">
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
                    <div>
                    </div>
                </div>
                {/* <div className="border-[1px] border-[#F7F7F7] w-full my-1"></div> */}
                <div className={`flex justify-center items-center border-t-[1px] border-[#F7F7F7] pb-2`}>
                    <p className='font-[500] text-[36px] text-[#350ABC]'>${staff?.total_price}</p>
                    <p className='self-end leading-10 text-[#6B6B6B] text-[14px]'>Total</p>
                    {
                        isInvited === true && data.job_status === 'open' &&
                        <button onClick={() => {
                            openModal();
                        }} className='ml-6 text-[14px] font-[400] py-[10px] flex items-center text-[#fff] px-[12px] rounded-[4px] bg-[#350ABC] 
                        transition-transform duration-150 ease-in-out transform active:scale-95 hover:scale-105'>
                            View Offer
                            <span className='ml-[8px]'>
                                <Image width={16} height={16} src={'/images/client-portal/send.svg'} alt='tick' />
                            </span>
                        </button>
                    }
                </div>
            </div>
            {
                modalOpen &&
                <ViewOfferModal
                    closeModal={closeModal}
                    hoursRequired={data.hours_required}
                    ratePerHour={staff?.offered_price}
                    totalPrice={staff?.total_price}
                    offerId={data.id}
                />
            }
        </>
    )
}

export default InviteCard;
