"use client";
import { useError } from "@/app/lib/context/ErrorProvider";
import { apiRequest } from "@/app/lib/services";
import { selectAuth } from "@/app/lib/store/features/authSlice";
import { selectOfferDetailData } from "@/app/lib/store/features/bookingSlice";
import { useAppSelector } from "@/app/lib/store/hooks";
import { useStripe } from "@stripe/react-stripe-js";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
// import useIsMobile from "@/app/lib/hooks/useMobile";
import { Loader2 } from "lucide-react";

const PaymentSuccessfull = ({ jobId, clientSecret }: any) => {
  const stripe = useStripe();
  const router = useRouter();
  // const isMobile = useIsMobile();
  const offerDetailData = useSelector(selectOfferDetailData);
  const { auth: storedData } = useAppSelector(selectAuth);
  const { handleError } = useError();
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const paymentSuccessfullApi = async (paymentIntent: any) => {
    setIsButtonLoading(true);
    const bodyData: any = {
      job_id: jobId,

      paymentIntent: paymentIntent,
    };
    try {
      const response = await apiRequest(
        `/stripe/releaseRequestPaymentSuccessfull`,
        {
          method: "POST",
          headers: {
            ...(storedData && { Authorization: `Bearer ${storedData.token}` }),
          },
          body: bodyData,
        },
        handleError
      );
    } catch (err) {
      console.error("Error processing payment:", err);
    } finally {
      setIsButtonLoading(false);
    }
  };

  useEffect(() => {
    const updatePaymentStatus = async () => {
      if (stripe && clientSecret) {
        const { paymentIntent } = await stripe.retrievePaymentIntent(
          clientSecret
        );
        if (paymentIntent && paymentIntent.status === "succeeded") {
          paymentSuccessfullApi(paymentIntent);
        } else {
        }
      }
    };
    updatePaymentStatus();
  }, [stripe]);

  return (
    // ${is-Mobile === false ? "w-[50%] m-auto" : "bg-[#F3F0FF] min-h-screen"}
    <div
      className={`max-lg:bg-[#F3F0FF] max-lg:min-h-screen lg:w-[50%] lg:m-auto flex flex-col items-center justify-center`}
    >
      <div className="flex items-center justify-center w-24 h-24 rounded-full bg-gray-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-16 h-16 text-gray-800"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12.75l6 6 9-13.5"
          />
        </svg>
      </div>

      <h1 className="text-[18px] font-poppins font-[600] text-[#161616] mt-4">
        Payment released successfully!
      </h1>
      <p className="w-[280px] text-[16px] font-poppins font-[400] text-[#4C4B4B] mt-2 text-center">
        Talent is notified and will receive the payment in the next 48 hours.
      </p>
      <div className="max-lg:hidden">
        <button
          disabled={isButtonLoading}
          onClick={() => {
            setIsButtonLoading(true);
            router.push(`/events/detail/${jobId}`);
          }}
          className="mt-6 py-4 min-w-[200px] bg-[#350ABC] text-white rounded-lg shadow-md"
        >
          {isButtonLoading ? (
            <Loader2 className="w-5 h-5 animate-spin mx-auto" />
          ) : (
            "Back to Job Details"
          )}
        </button>
      </div>
      <div className="lg:hidden">
        <Link href="/" passHref>
          <button
            disabled={isButtonLoading}
            onClick={() => {
              setIsButtonLoading(true);
            }}
            className="mt-6 py-4 min-w-[200px] bg-[#350ABC] text-white rounded-lg shadow-md"
          >
            {isButtonLoading ? (
              <Loader2 className="w-5 h-5 animate-spin mx-auto" />
            ) : (
              "Back to Home"
            )}
          </button>
        </Link>
      </div>
      {/* {
        is-Mobile === false ?
          <button
            disabled={isButtonLoading}
            onClick={() => {
              setIsButtonLoading(true);
              router.push(`/events/detail/${jobId}`);
            }}
            className="mt-6 py-4 min-w-[200px] bg-[#350ABC] text-white rounded-lg shadow-md">
            {isButtonLoading ? (
              <Loader2 className="w-5 h-5 animate-spin mx-auto" />
            ) : (
              "Back to Job Details"
            )}
          </button>
          :
          <Link href="/" passHref>
            <button
              disabled={isButtonLoading}
              onClick={() => {
                setIsButtonLoading(true);
              }}
              className="mt-6 py-4 min-w-[200px] bg-[#350ABC] text-white rounded-lg shadow-md">
              {isButtonLoading ? (
                <Loader2 className="w-5 h-5 animate-spin mx-auto" />
              ) : (
                "Back to Home"
              )}
            </button>
          </Link>
      } */}
    </div>
  );
};

export default PaymentSuccessfull;
