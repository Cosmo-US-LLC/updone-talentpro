"use client"
import Image from 'next/image';
import React from 'react';
import { MdOutlineChevronLeft } from "react-icons/md";
import { useRouter } from 'next/navigation';

const BookingHeader = ({ stepInQuery, jobIdInQuery, setStep, step, stepLabels }: any) => {
    const router = useRouter();

    const handleBack = () => {
        if (stepInQuery === "invite-more-talents") {
            let url;
            const baseUrl = process.env.NEXT_PUBLIC_CLIENTHUB_URL ?? '';
            url = `${baseUrl}/events/detail/${jobIdInQuery}`;
            router.push(url);
        } else if (step > 0) {
            setStep((prev: any) => prev - 1);
            updateQueryParam(step - 1);
        } else if (step === 0) {
            router.push(process.env.NEXT_PUBLIC_BASE_URL ?? '');
        }
    };
    const updateQueryParam = (stepIndex: number) => {
        const queryParams = new URLSearchParams(window.location.search);
        queryParams.set('step', stepLabels[stepIndex]);
        router.push(`${window.location.pathname}?${queryParams.toString()}`);
    };

    return (
        <div className='justify-between items-center flex flex-row p-2 pt-[1rem]'>
            <div
                onClick={() => {
                    handleBack();
                }}
                className='text-[#6B6B6B] flex font-[400] text-[14px] leading-[24px]'
            >
                <div className='flex flex-row items-center'>
                    <span className='mr-2 '><MdOutlineChevronLeft className='text-[#6B6B6B]' size={20} /></span>
                    <span>
                        {
                            stepInQuery === "invite-more-talents" ?
                                `Back to Client Hub` :
                                `Back to ${step === 0 ? "Home" : step === 1 ? 'Location' : step === 2 ? 'Date & Time' : 'Service Details'}`
                        }
                    </span>
                </div>
            </div>
            <Image
                className='cursor-pointer'
                src='/images/mobile/x.svg'
                height={16}
                width={16}
                alt='x-icon'
                onClick={() => {
                    router.push('/');
                }}
            />
        </div>
    )
}

export default BookingHeader;
