"use client"
import Image from "next/image";
import { montserrat } from "@/app/lib/Fonts";
import Tooltip from "@/app/_components/common/tooltip";
import { VerificationStatus } from "@/app/_components/ui/verified-status-check-tooltip";
import VerificationIcon from "@/app/_components/ui/shield-mobile";
import { useState } from "react";

const TalentInfo = ({ jobDetailData }: any) => {
    const [contactTooltipVisible, setContactTooltipVisible] = useState(false);
    const [EmailTooltipVisible, setEmailTooltipVisible] = useState(false);

    const handleCopyPhoneNumber = (text: any) => {
        copyToClipboard(text);
        setContactTooltipVisible(true);

        // Hide the tooltip after 2 seconds
        setTimeout(() => setContactTooltipVisible(false), 2000);
    };

    const handleCopyEmail = (text: any) => {
        copyToClipboard(text);
        setEmailTooltipVisible(true);

        // Hide the tooltip after 2 seconds
        setTimeout(() => setEmailTooltipVisible(false), 2000);
    };

    function copyToClipboard(text: string): void {
        if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
            // Modern browsers
            navigator.clipboard.writeText(text).catch((err) => {
                console.error('Failed to copy text to clipboard:', err);
            });
        } else {
            // Fallback for older browsers
            const textarea = document.createElement("textarea");
            textarea.value = text;
            textarea.style.position = "fixed"; // Prevent scrolling to the bottom of the page
            document.body.appendChild(textarea);
            textarea.focus();
            textarea.select();
            try {
                document.execCommand("copy");
            } catch (err) {
                console.warn("Copy to clipboard failed. Please use Ctrl+C to copy manually.");
            } finally {
                document.body.removeChild(textarea);
            }
        }
    }


    return (
        <div className="flex max-xl:flex-col xl:flex-row items-center justify-center gap-4 mt-4">
            <div className="border border-1 border-[#EBE6FF] bg-[#FFEFD7] min-h-[320px] h-full w-full rounded-[12px] p-4 flex flex-col p-8">
                <p className="font-[500] leading-[8px] text-[16px]">You are Hired!</p>
                <div className="flex items-center mt-4">
                    <div className="rounded-full overflow-hidden border-[1px] border-white">
                        <Image
                            width={53}
                            height={53}
                            quality={100}
                            className="h-[53px] w-[53px] object-cover rounded-[50%] border-2 border-[#F3F0FF]"
                            src={jobDetailData?.invite?.worker?.profile_pic}
                            alt="user"
                        />
                    </div>
                    <div className="ml-4">
                        <h2
                            className={`${montserrat.className} text-[black] leading-[27px] font-[500] text-[18px] flex items-center`}
                        >
                            {jobDetailData?.invite?.worker?.full_name}
                            <span className="ml-1 text-green-500 flex justify-center items-center">
                                <Tooltip
                                    content={
                                        <VerificationStatus
                                            id_is_verified={
                                                jobDetailData?.invite?.worker
                                                    ?.id_is_verified
                                            }
                                            contact_is_verified={
                                                jobDetailData?.invite?.worker
                                                    ?.contact_is_verified
                                            }
                                        />
                                    }
                                >
                                    <div className=" text-white pr-4 pl-2  rounded">
                                        <VerificationIcon
                                            height={30}
                                            width={30}
                                            id_is_verified={
                                                jobDetailData?.invite?.worker
                                                    ?.id_is_verified
                                            }
                                            contact_is_verified={
                                                jobDetailData?.invite?.worker
                                                    ?.contact_is_verified
                                            }
                                        />
                                    </div>
                                </Tooltip>
                            </span>
                        </h2>
                    </div>
                </div>
                <div className="mt-4 w-full rounded-[8px] min-h-[72px] h-full bg-[#FFFFFF] border border-1 border-[#EBE6FF] p-4">
                    <div className="flex items-center gap-2 relative">
                        <Image
                            src="/images/client-portal/event-details/phone-filled.svg"
                            alt="error"
                            width={48}
                            height={48}
                        />
                        <div>
                            <p className="text-[black] font-[500] text-[16px] leading-[24px]">
                                Phone Number:
                            </p>
                            <p className="text-[#4C4B4B] font-[400] text-[16px]">
                                {jobDetailData?.invite?.worker?.user?.phone_number}
                            </p>
                        </div>
                        <div className="">
                            <Image
                                src="/images/client-portal/event-details/copy.svg"
                                alt="error"
                                width={16}
                                height={16}
                                className="absolute right-0 cursor-pointer"
                                onClick={() => {
                                    handleCopyPhoneNumber(jobDetailData?.invite?.worker?.user?.phone_number);
                                }}
                            />
                            {contactTooltipVisible && (
                                <div className="absolute top-[-30px] right-0 bg-black text-white text-[12px] px-2 py-1 rounded">
                                    Copied!
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="mt-4 w-full rounded-[8px] min-h-[72px] h-full bg-[#FFFFFF] border border-1 border-[#EBE6FF] p-4">
                    <div className="flex items-center gap-2 relative">
                        <Image
                            src="/images/client-portal/event-details/email-filled.svg"
                            alt="error"
                            width={48}
                            height={48}
                        />
                        <div className="w-full truncate">
                            <p className="text-[black] font-[500] text-[16px] leading-[24px] max-w-[100%]">
                                Email Address:
                            </p>
                            <p className="text-[#4C4B4B] font-[400] text-[16px] max-w-[90%] truncate">
                                {jobDetailData?.invite?.worker?.user?.email}
                            </p>
                        </div>
                        <div className="">
                            <Image
                                src="/images/client-portal/event-details/copy.svg"
                                alt="error"
                                width={16}
                                height={16}
                                className="absolute right-0 cursor-pointer"
                                onClick={() => {
                                    handleCopyEmail(jobDetailData?.invite?.worker?.user?.email);
                                }}
                            />
                            {EmailTooltipVisible && (
                                <div className="absolute top-[-30px] right-0 bg-black text-white text-[12px] px-2 py-1 rounded">
                                    Copied!
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div >
            <div className="border border-1 border-[#EBE6FF] bg-[#FFEFD7] min-h-[320px] h-full w-full rounded-[12px] p-8 flex flex-col items-start justify-start">
                <p className="font-[500] leading-[8px] text-[18px] mb-8">Important:</p>
                <ul style={{ listStyleType: "disc" }}>
                    <li className="font-[400] leading-[24px] text-[16px] text-[#4C4B4B]">
                        Call {jobDetailData?.invite?.worker?.full_name} and discuss event details.
                    </li>
                    <li className="font-[400] leading-[24px] text-[16px] text-[#4C4B4B]">
                        If there are any changes to the event date or time, simply let {jobDetailData?.invite?.worker?.full_name} know.
                    </li>
                    <li className="font-[400] leading-[24px] text-[16px] text-[#4C4B4B] pb-1">
                        {jobDetailData?.invite?.worker?.full_name} will request you to release the payment at the end of the event.
                    </li>
                    <li className="font-[400] leading-[24px] text-[16px] text-[#4C4B4B]">
                        If you have any queries then contact us at:
                        <ul style={{ listStyleType: "circle", marginLeft: "20px" }} className="pt-2">
                            <li className="font-[400] leading-[24px] text-[16px] text-[#4C4B4B]">
                                 <a href="tel:+18006510072" className="text-blue-500 hover:underline">+1 (800) 651-0072</a>
                            </li>
                            <li className="font-[400] leading-[24px] text-[16px] text-[#4C4B4B]">
                             <a href="mailto:info@updone.com" className="text-blue-500 hover:underline">info@updone.com</a>
                            </li>
                        </ul>
                    </li>
                </ul>

            </div>
        </div >
    );
}

export default TalentInfo;