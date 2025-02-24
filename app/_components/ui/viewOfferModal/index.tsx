import React from 'react';
import { useRouter } from 'next/navigation'
import { montserrat } from '@/app/lib/Fonts';
import { LiaLongArrowAltRightSolid } from "react-icons/lia";

const ViewOfferModal = ({ closeModal, hoursRequired, ratePerHour, totalPrice, offerId }: any) => {
    const router = useRouter()

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-10 backdrop-blur-md">
            <div className="bg-white overflow-hidden rounded-lg p-8 max-w-md w-full relative modal-content z-10">
                {/* Close Button */}
                <div onClick={closeModal} className="absolute top-4 !text-[32px] right-4 text-gray-400 hover:text-gray-600 cursor-pointer ">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_2136_43770)">
                            <path d="M1.57576 14.891C1.6193 14.9346 1.67099 14.9691 1.7279 14.9927C1.7848 15.0163 1.8458 15.0285 1.9074 15.0285C1.969 15.0285 2.03 15.0163 2.08691 14.9927C2.14381 14.9691 2.19551 14.9346 2.23904 14.891L7.99998 9.13005L13.7633 14.891C13.8512 14.9789 13.9705 15.0284 14.0949 15.0284C14.2193 15.0284 14.3386 14.9789 14.4265 14.891C14.5145 14.803 14.5639 14.6837 14.5639 14.5593C14.5639 14.435 14.5145 14.3157 14.4265 14.2277L8.66326 8.46676L14.4242 2.70348C14.5122 2.61553 14.5616 2.49623 14.5616 2.37184C14.5616 2.24745 14.5122 2.12816 14.4242 2.0402C14.3362 1.95225 14.2169 1.90283 14.0926 1.90283C13.9682 1.90283 13.8489 1.95225 13.7609 2.0402L7.99998 7.80348L2.2367 2.04255C2.14703 1.96575 2.03168 1.92562 1.91371 1.93018C1.79573 1.93474 1.68382 1.98364 1.60034 2.06713C1.51686 2.15061 1.46795 2.26252 1.4634 2.38049C1.45884 2.49846 1.49897 2.61381 1.57576 2.70348L7.3367 8.46676L1.57576 14.23C1.48846 14.3179 1.43945 14.4367 1.43945 14.5605C1.43945 14.6844 1.48846 14.8032 1.57576 14.891Z" fill="#BCB4D9" />
                        </g>
                        <defs>
                            <clipPath id="clip0_2136_43770">
                                <rect width="15" height="15" fill="white" transform="translate(0.5 0.966797)" />
                            </clipPath>
                        </defs>
                    </svg>

                </div>

                {/* Modal Content */}
                <h2 className={`text-[24px] font-[600] text-center mb-2  text-[#100F14] ${montserrat.className}`}>Offer Breakdown</h2>
                <p className='text-[#6B6B6B] font-[400] text-center leading-[24px] mb-[50px] text-[16px]'>This is the breakdown of the total amount that you will need to pay.</p>
                {/* Breakdown Info */}
                <div className="flex justify-between mb-2">
                    <span className='text-[#2C2240] text-[16px] leading-[20px] font-[500]'>Total number of hours</span>
                    <span className='text-[#2C2240] text-[16px] font-[400]'>{hoursRequired}h</span>
                </div>
                <div className="!border-[.2px] border-[#ECE6FF] w-full  mt-6 mb-6"></div>
                <div className="flex justify-between mb-4">
                    <span className='text-[#2C2240] text-[16px] leading-[20px] font-[500]'>Rate per hour</span>
                    <span className='text-[#2C2240] text-[16px] font-[400]'>${ratePerHour}</span>
                </div>

                <div className="mt-8 text-[#6B6B6B] text-center rounded-full py-4 text-[16px] font-[500] mb-4">
                    Total. <span className={`${montserrat.className} text-[32px] text-[#2C2240] font-[600]`}>${totalPrice}</span>
                </div>

                {/* Action Button */}
                <div className="flex justify-center">
                    <button onClick={() => {
                        router.push(`/events/payment/${offerId}`);
                    }}
                        className='justify-center gap-2 text-[14px] font-[400] py-[10px] px-[60px] flex items-center m-0 text-[#fff] rounded-[4px] bg-[#774DFD] transition-transform duration-150 ease-in-out transform active:scale-95 hover:scale-105'>
                      <LiaLongArrowAltRightSolid size={20}/>  Hire Now
                    </button>
                </div>
            </div>

            {/* Absolute red background using ::before */}
            <style jsx>{`
                .modal-content::before {
                    content: "";
                    position: absolute;
                    height:200px;
                    left: -44px;
                    width:120% !important;
                    right: 0;
                    bottom: -30px;
                    background-color: #F3F0FF !important;
                    z-index: -1;
                    border-top-left-radius: 200%; /* same as your modal content */
                    border-top-right-radius: 200%;
                }
            `}</style>
        </div>
    );
};

export default ViewOfferModal;
