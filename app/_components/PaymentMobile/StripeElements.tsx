import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import "./payment.module.css";
import styles from "./payment.module.css";
import { apiRequest } from "@/app/lib/services"; // Assuming this is your API utility
import { selectAuth } from "@/app/lib/store/features/authSlice";
import { useAppSelector } from "@/app/lib/store/hooks";
import useIsMobile from "@/app/lib/hooks/useMobile";

export default function StripeCheckoutForm({ jobId, clientSecret }: any) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentData, setPaymentData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const paymentElementOptions = { layout: "tabs" as const };
  const isMobile = useIsMobile();

  const { auth: storedData } = useAppSelector(selectAuth);

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const token = storedData?.token;

        const data = await apiRequest(`/client/payment-request`, {
          method: "POST",
          headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: {
            job_id: jobId,
          },
        });

        setPaymentData(data);
      } catch (err) {
        console.error("Error fetching payment data:", err);
        setError("Failed to load payment data.");
      }
    };

    fetchPaymentData();
  }, [jobId, storedData]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const returnUrl = `${location.origin}/events/detail/${jobId}/payment-release/success?clientSecret=${clientSecret}`;

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: returnUrl,
      },
    });

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message);
      } else {
        setMessage("An unexpected error occurred.");
      }
    }

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col">
      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button
          disabled={isLoading || !stripe || !elements}
          id="submit"
          className={`${styles.pay_btn_style} ${isMobile === false ? "mt-8" : "mt-1"} bg-[#0055DE] hover:contrast-115 disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <span id="button-text">
            {isLoading ? (
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            ) : paymentData?.tip_amount && paymentData?.initial_payment ? (
              `Pay $${Math.round(
                paymentData.tip_amount + paymentData.initial_payment
              )}`
            ) : paymentData?.tip_amount ? (
              `Pay $${Math.round(paymentData.tip_amount)}`
            ) : paymentData?.initial_payment ? (
              `Pay $${Math.round(paymentData.initial_payment)}`
            ) : (
              "Pay now"
            )}
          </span>
        </button>

        {message && (
          <div
            className="text-gray-500 text-base leading-5 pt-3 text-center"
            id="payment-message"
          >
            {message}
          </div>
        )}
      </form>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
}
