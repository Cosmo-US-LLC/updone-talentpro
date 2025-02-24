"use client";
import { useError } from '@/app/lib/context/ErrorProvider';
import { apiRequest } from '@/app/lib/services';
import { selectAuth } from '@/app/lib/store/features/authSlice';
import { selectOfferDetailData } from '@/app/lib/store/features/bookingSlice';
import { useAppSelector } from '@/app/lib/store/hooks';
import {
    useStripe
} from "@stripe/react-stripe-js";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const SettlementPaymentSuccessfull = ({ offerId, clientSecret }: any) => {
    const stripe = useStripe();
    const router = useRouter();

    const offerDetailData = useSelector(selectOfferDetailData);
    const { auth: storedData } = useAppSelector(selectAuth);
    const { handleError } = useError();

    const handleRedirect = () => {
        router.push(`/settlements`);
    }

    function calculateTotal(hourRate: number, amount?: number): string | number {
        // Check if the amount is not provided or is 0, then return "N/A"
        if (!amount || amount === 0) {
            return "Amount is loading...";
        }

        // Calculate and return the total
        return Number(hourRate) * Number(amount);
    }

    const paymentSuccessfullApi = async (paymentIntent: any) => {
        const bodyData: any = {
            offerId: offerId,
            paymentIntent: paymentIntent,
            purpose: 'settlement'
        };
        try {
            const response = await apiRequest(`/stripe/paymentSuccessfull`, {
                method: 'POST',
                headers: {
                    ...(storedData && { 'Authorization': `Bearer ${storedData.token}` })
                },
                body: bodyData
            }, handleError);
            await acceptExtraHours();
            // remove query params here
            // const urlWithoutQuery = window.location.pathname;
            // router.replace(urlWithoutQuery);
        } catch (err) {
            console.error('Error processing payment:', err);
        } finally {
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

            // window.location.reload();
        } catch (err) {
            console.error('Error processing payment:', err);
        }
    }

    useEffect(() => {
        const updatePaymentStatus = async () => {
            if (stripe && clientSecret) {
                const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);
                if (paymentIntent && paymentIntent.status === 'succeeded') {
                    paymentSuccessfullApi(paymentIntent);
                } else {

                }
            }
        }
        updatePaymentStatus();
    }, [stripe]);


    return (
        <div className="flex flex-col  items-center justify-center min-h-[100%] !px-8">
            {/* Container */}
            <div className="flex flex-col  !max-h-[520px] items-center justify-center p-8 bg-white rounded-xl shadow-lg max-w-lg mx-auto">
                {/* Success SVG */}
                <div className="mb-4 relative bottom-0">
                    <Image
                        width={100}
                        height={100}
                        alt="Payment Success"
                        className='relative bottom-[35px]'
                        src="/images/client-portal/payment/paymentSuccess.svg"
                    />
                </div>

                <div className='relative bottom-[50px]'>
                    {/* Title */}
                    <h2 className="text-[24px] font-[400] text-center text-[#000000] mb-4 mt-6">
                        Settlement Resolved Successfully!
                    </h2>

                    {/* Description */}
                    <p className="text-[#6B6B6B] text-[16px] font-[400] leading-[24px] text-center mb-4">
                        Done! You’ve paid the requested amount.
                    </p>
                    <p className="text-[#6B6B6B] text-[16px] font-[400] leading-[24px] text-center">Click the button to view contact details.</p>
                    <div style={{ boxShadow: '0px 8px 26px 0px rgba(0, 0, 0, 0.10)' }} className='bg-[#FFF] my-[32px] rounded-[8px] px-[24px] py-[16px] flex justify-between items-center w-full'>
                        <div className='text-[#350ABC] text-[28px] font-[400]'>
                            ${calculateTotal(offerDetailData?.working_hours, offerDetailData?.offered_amount)} <span className='text-[#6B6B6B] text-[14px] font-[400]'>Payment Successful !</span>
                        </div>
                        <span><svg width="78" height="78" viewBox="0 0 78 78" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="39" cy="39" r="39" fill="#F4FFE1" />
                            <circle cx="38.5" cy="39" r="28" fill="#EAFFC8" />
                            <path d="M35.607 50C38.7208 41.2 47.4997 31.6667 51.5 28C43.1968 30.3294 37.445 38.6765 35.607 42.5588L30.7418 36.4118C27.7949 35.8311 26.5674 38.1163 26.5027 39.5266C26.49 39.8036 26.6811 40.0323 26.9114 40.1867C28.8402 41.4803 33.5965 47.0921 35.607 50Z" fill="#0C9000" />
                        </svg>
                        </span>
                    </div>
                    <div className="flex justify-center">
                        <button
                            onClick={handleRedirect}
                            className="text-[14px] font-[400] py-[16px] flex items-center text-[#fff] px-[60px] rounded-[4px] bg-[#350ABC] transition-transform duration-150 ease-in-out transform active:scale-95 grow_ellipse"
                        >
                            Go Back to Settlements
                            <span className='ml-2'><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 12L10 8L6 4" stroke="#F3F0FF" stroke-width="1.4" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettlementPaymentSuccessfull;
