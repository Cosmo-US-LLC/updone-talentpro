import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { CiCalendar, CiDollar } from 'react-icons/ci';
import { PiMapPinLineThin, PiTimerThin } from 'react-icons/pi';
import styles from '../payment/payment.module.css';
import { montserrat } from '@/app/lib/Fonts';
import { formatDates, formatEvent } from '@/app/lib/helpers/formatDateTime';
import { CardElement, useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import { useAppSelector } from '@/app/lib/store/hooks';
import { selectAuth } from '@/app/lib/store/features/authSlice';
import { apiRequest } from '@/app/lib/services';
import MyModal from '../common/modal/Modal';
import { RiRecycleLine } from 'react-icons/ri';
import { FaCcVisa, FaCcMastercard } from 'react-icons/fa';
import Breadcrumbs from '../ui/bread-crumbs';
import { useError } from '@/app/lib/context/ErrorProvider';
import StripeCheckoutForm from './StripeElements';

interface Event {
    date: string;
    start_time: string;
    end_time: string;
}

const SettlementPayment = ({ data, offerId, clientSecret }: any) => {
    const { auth: storedData } = useAppSelector(selectAuth);
    const [loading, setLoading] = useState(false);
    const [loadingRejection, setLoadingRejection] = useState(false);
    const { handleError, errorMessage: error } = useError();
    const [isCardValid, setIsCardValid] = useState({
        cardNumber: false,
        cardExpiry: false,
        cardCvc: false,
    });
    const [cardHolderName, setCardHolderName] = useState('');
    const [isNameValid, setIsNameValid] = useState<boolean>(true);
    const [savePaymentMethod, setSavePaymentMethod] = useState<boolean>(false);
    const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
    const nameRegex = /^[A-Za-z\s]{1,40}$/;
    const isSavedPaymentMethodSelected = selectedPaymentMethod !== null;



    const handleCardChange = (event: any, field: any) => {
        setIsCardValid((prevState) => ({
            ...prevState,
            [field]: event.complete,
        }));
    };



    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isSavedPaymentMethodSelected && (!cardHolderName || !isNameValid)) {
            setIsNameValid(false); // Show error message if the name field is invalid
            return;
        }

        setLoading(true);

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        let paymentMethodId;

        if (isSavedPaymentMethodSelected) {
            // Use the saved payment method ID
            paymentMethodId = selectedPaymentMethod; // Assuming selectedPaymentMethod stores the saved method's ID
        } else {
            const cardNumberElement = elements.getElement(CardNumberElement);
            const cardExpiryElement = elements.getElement(CardExpiryElement);
            const cardCvcElement = elements.getElement(CardCvcElement);

            if (!cardNumberElement || !cardExpiryElement || !cardCvcElement) {
                console.error('Card elements not found');
                return;
            }

            const { paymentMethod, error } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardNumberElement,
                billing_details: {
                    name: cardHolderName,
                    email: storedData.user.email,
                },
            });

            if (error) {
                console.error(error);
                setLoading(false);
                return;
            }

            paymentMethodId = paymentMethod.id;
        }

        const bodyData: any = {
            email: storedData.user.email,
            amount: data?.settlementDetails?.settlement_amount,
            job_id: data?.job?.id,
            payment_method_id: paymentMethodId,
            offerId: offerId,
            save_payment_method: savePaymentMethod,
            useExistingCard: isSavedPaymentMethodSelected,
            purpose: 'settlement'
        };

        try {
            const response = await apiRequest(`/stripe/chargeV1`, {
                method: 'POST',
                headers: {
                    ...(storedData && { 'Authorization': `Bearer ${storedData.token}` })
                },
                body: bodyData
            }, handleError);

            if (response?.paymentIntent?.id) {
                setPaymentSuccess(true);
                setTimeout(async () => {
                    await acceptExtraHours();
                }, 3000);
            } else {
                setPaymentSuccess(false);
            }
        } catch (err) {
            console.error('Error processing payment:', err);
        } finally {
            setLoading(false);
        }
    };

    const acceptExtraHours = async () => {
        const bodyData: any = {
            invite_id: offerId
        };

        try {
            const response = await apiRequest(`/invitation/acceptExtraHours`, {
                method: 'POST',
                headers: {
                    ...(storedData && { 'Authorization': `Bearer ${storedData.token}` })
                },
                body: bodyData
            }, handleError);

            window.location.reload()
        } catch (err) {
            console.error('Error processing payment:', err);
        }
    };

    function formatJobDetails(job: { date: string; start_time: string; end_time: string }) {
        const options: Intl.DateTimeFormatOptions = {
            month: 'long',
            year: 'numeric',
        };

        // Convert date to a Date object
        const dateObj = new Date(job.date);

        // Get the day of the month with an ordinal suffix
        const day = dateObj.getDate();
        const dayWithSuffix = day + (day % 10 === 1 && day !== 11 ? 'st' :
            (day % 10 === 2 && day !== 12 ? 'nd' :
                (day % 10 === 3 && day !== 13 ? 'rd' : 'th')));

        // Format the date with day and then month and year separated by a comma
        const formattedDate = `${dayWithSuffix} ${dateObj.toLocaleDateString('en-US', options).replace(/(\w+)\s(\d{4})/, '$1, $2')}`;

        // Create Date objects for start time and end time using the job date
        const startTime = new Date(`${job.date}T${job.start_time}`);
        const endTime = new Date(`${job.date}T${job.end_time}`);

        // Format the times without UTC conversion
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

    const handleNameChange = (e: any) => {
        const name = e.target.value;
        setCardHolderName(name);
        setIsNameValid(nameRegex.test(name));
    };


    const isFormValid = Object.values(isCardValid).every(Boolean) && isNameValid;

    return (
        <>
            <div className='flex gap-[18px] max-w-[1279px] mx-auto'>
                <div className='w-[40%] bg-[#fff] rounded-[12px]' style={{ boxShadow: '0px 4px 26px 0px rgba(0, 0, 0, 0.05)' }}>
                    <div className='py-[32px] px-[16px] text-center w-[99%] mx-auto relative top-[3px] space-y-[12px] bg-[#FAFAFC] rounded-[12px]'>
                        <h1 className='text-[#000000] tracking-[-0.18px] font-[500] text-[20px]'>Settlement Details</h1>
                        <Image width={300} height={300} className='rounded-[50%] m-auto w-[90px] h-[90px]' alt='' quality={100} src={`${data?.worker?.profile_pic}`} />
                        <div className='flex justify-center w-full items-center gap-[8px]'>
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
                                    Extra Hours Claimed
                                </h2>
                                <p className='tracking-[-0.28px] !text-[#2C2240] font-[400] text-[14px] leading-[24px] flex justify-center items-center'>
                                    ${data?.settlementDetails?.extra_hours}h
                                </p>
                            </div>
                            <div className='w-full flex justify-between items-center pt-[16px] pb-[28px]'>
                                <h2 className='tracking-[-0.14px] text-[#2C2240] font-[400] text-[16px] leading-[28px]'>
                                    Settlement amount
                                </h2>
                                <p className='tracking-[-0.28px] !text-[#2C2240] font-[400] text-[14px] leading-[24px] flex justify-center items-center'>
                                    <small className='mr-[16px] text-[#6B6B6B] text-[10px]'>
                                        ${data?.settlementDetails?.extra_hours} hours x ${parseFloat(data?.offered_amount)}
                                    </small>
                                    ${parseFloat(data?.settlementDetails?.settlement_amount)}
                                </p>
                            </div>
                            <div className='border-b-[1px] border-[#DEDEDE] w-[85%] m-auto'></div>
                            <div className='w-full flex justify-between items-center pt-[16px]'>
                                <h2 className={`tracking-[-0.2px] text-[#000000] font-[500] !text-[20px] leading-normal ${montserrat.className}`}>
                                    Total
                                </h2>
                                <p className={`tracking-[-0.36px] !text-[#000000] font-[600] text-[24px] leading-normal flex justify-center items-center ${montserrat.className}`}>
                                    ${parseFloat(data?.settlementDetails?.settlement_amount)}
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
                        isSettlement={true}
                    />
                </div>
            </div >
        </>
    );
};

export default SettlementPayment;
