import { montserrat } from '@/app/lib/Fonts';
import Image from 'next/image';
import { IoArrowBack } from "react-icons/io5";
import styles from '../payment/payment.module.css';
import StripeCheckoutForm from './StripeElements';
import { formatDate } from '@/app/lib/helpers/utils';

const PaymentPay = ({ data, offerId, clientSecret }: any) => {
    function calculateTotal(hourRate: number, amount: number) {
        return (Number(hourRate) * Number(amount));
    }

    function formatJobDetails(job: { date: string; start_time: string; end_time: string }) {
        const formattedDate = formatDate(job.date)
        const startTime = new Date(`${job.date}T${job.start_time}`);
        const endTime = new Date(`${job.date}T${job.end_time}`);
        const formattedStartTime = startTime.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        });
        const formattedEndTime = endTime.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        });
        return `${formattedDate}, ${formattedStartTime}, ${formattedEndTime}`;
    }

    return (
        <>
            <div className='max-w-[1279px] mx-auto relative bottom-[25px]'>
                <div
                    className="hover:text-purple-600 cursor-pointer"
                    onClick={() => {
                        const currentJobId = data?.job?.id;
                        const baseUrl = window.location.origin;
                        const redirectUrl = `${baseUrl}/events/detail/${currentJobId}`;
                        window.location.href = redirectUrl;
                    }}
                >
                    <div className='flex gap-2 cursor-pointer'>
                        <IoArrowBack size={25} />
                        <span className='hover:text-purple-600 cursor-pointer'>Back</span>
                    </div>
                </div>
            </div>
            <div className='flex gap-[18px] justify-start items-start max-w-[1279px] mx-auto mb-[100px]'>
                <div className='w-[40%] bg-[#fff] rounded-[12px]' style={{ boxShadow: '0px 4px 26px 0px rgba(0, 0, 0, 0.05)' }}>
                    <div className='py-[32px] px-[16px] text-center w-[99%] mx-auto relative top-[3px] space-y-[12px] bg-[#FAFAFC] rounded-[12px]'>
                        <h1 className='text-[#000000] tracking-[-0.18px] font-[500] text-[20px]'>{data?.serviceName}</h1>
                        <Image width={300} height={300} className='rounded-[50%] m-auto w-[90px] h-[90px]' alt='' quality={100} src={`${data?.worker?.profile_pic}`} />                    <div className='flex justify-center w-full items-center gap-[8px]'>
                            <h2 className={`${montserrat.className} leading-[24px] text-[#000000] font-[500] tracking-[-0.14px] !text-[16px]`}>{data?.worker?.full_name}</h2>
                            <h3 className='flex justify-center items-center font-[400] leading-[24px] translate-[-2%] text-[14px]'>
                                <span className='mb-[2px] mr-1 leading-[24px] text-[#2C2240] font-[600] tracking-[-0.28px] text-[16px]'>
                                    <svg width="14" height="14" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.0002 0.833374L12.8327 6.57171L19.1668 7.49754L14.5835 11.9617L15.6652 18.2684L10.0002 15.2892L4.33516 18.2684L5.41683 11.9617L0.833496 7.49754L7.16766 6.57171L10.0002 0.833374Z" fill="#F79809" stroke="#F79809" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                                {parseFloat(data?.worker?.rating).toFixed(1)}/5
                            </h3>
                        </div>
                    </div>
                    <div className='my-[32px]'>
                        <div className='px-[32px]'>
                            <div className='w-full flex justify-between items-center border-b-[1px] pb-[20px] border-[#DEDEDE]'>
                                <h2 className='tracking-[-0.14px] text-[#000000] font-[400] text-[16px] leading-[28px]'>
                                    Event Date & Time
                                </h2>
                                <p className='w-[228px] flex justify-start items-center gap-[8px] tracking-[-0.13px] text-[#6B6B6B] font-[400] text-[13px] leading-normal'>
                                    <span className='relative top-[1.2px]'>{formatJobDetails(data?.job?.working_times[0])}</span>
                                </p>
                            </div>
                            <div className='w-full flex justify-between items-center border-b-[1px] py-[20px] border-[#DEDEDE]'>
                                <h2 className='tracking-[-0.14px] text-[#000000] font-[400] text-[16px] leading-[28px]'>
                                    Event Location
                                </h2>
                                <p className='w-[228px] flex justify-start items-center gap-[8px] tracking-[-0.13px] text-[#6B6B6B] font-[400] text-[13px] leading-normal'>
                                    {data?.job?.event_location}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='relative z-50'>
                        <div className='pt-[20px] pb-[11px] px-[28px] rounded-[12px] bg-[#F8F7FF] overflow-hidden !z-50 mx-auto w-[99%] relative bottom-[2.5px]'>
                            <div className='w-full flex justify-between items-center border-b-[1px] pb-[16px] border-[#DEDEDE]'>
                                <h2 className='tracking-[-0.14px] text-[#2C2240] font-[400] text-[16px] leading-[28px]'>
                                    Worker Fee Per Hour
                                </h2>
                                <p className='tracking-[-0.28px] !text-[#2C2240] font-[400] text-[14px] leading-[24px] flex justify-center items-center'>
                                    ${parseFloat(data?.offered_amount)}
                                </p>

                            </div>
                            <div className='w-full flex justify-between items-center border-b-[1px] py-[16px] border-[#DEDEDE]'>
                                <h2 className='tracking-[-0.14px] text-[#2C2240] font-[400] text-[16px] leading-[28px]'>
                                    Total Number of Hours
                                </h2>
                                <p className='tracking-[-0.28px] !text-[#2C2240] font-[400] text-[14px] leading-[24px] flex justify-center items-center'>
                                    ${data?.working_hours} h
                                </p>
                            </div>
                            <div className='w-full flex justify-between items-center pt-[16px] pb-[28px]'>
                                <h2 className='tracking-[-0.14px] text-[#2C2240] font-[400] text-[16px] leading-[28px]'>
                                    Worker Fee Calculation
                                </h2>
                                <p className='tracking-[-0.28px] !text-[#2C2240] font-[400] text-[14px] leading-[24px] flex justify-center items-center'>
                                    <small className='mr-[16px] text-[#6B6B6B] text-[10px]'>
                                        ${data?.working_hours} hours x ${parseFloat(data?.offered_amount)}
                                    </small>
                                    ${parseFloat(data?.total_price)}
                                </p>
                            </div>
                            <div className='border-b-[1px] border-[#DEDEDE] w-[85%] m-auto'></div>
                            <div className='w-full flex justify-between items-center pt-[16px]'>
                                <h2 className={`tracking-[-0.2px] text-[#000000] font-[500] !text-[20px] leading-normal ${montserrat.className}`}>
                                    Total
                                </h2>
                                <p className={`tracking-[-0.36px] !text-[#000000] font-[600] text-[24px] leading-normal flex justify-center items-center ${montserrat.className}`}>
                                    ${calculateTotal(data?.working_hours, data?.offered_amount)}
                                </p>
                            </div>
                            <div className='w-[99%] m-auto flex justify-center items-center absolute bottom-0 z-[-1] top-1 opacity-[40%]'>
                                <Image width={180} height={260} alt='' src='/images/booking/dollar-sign.svg' quality={100} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${styles.payment_section} max-w-[600px] flex flex-col !pb-0 min-h-[42rem]`}>
                    <StripeCheckoutForm
                        offerId={offerId}
                        jobId={data?.job?.id}
                        clientSecret={clientSecret}
                    />
                </div >
            </div >
        </>
    );
};

export default PaymentPay;