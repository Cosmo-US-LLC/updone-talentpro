import { montserrat } from "@/app/lib/Fonts";
import Image from "next/image";
import { IoArrowBack } from "react-icons/io5";
import styles from "../payment/payment.module.css";
import StripeCheckoutForm from "./StripeElements";

const StripeMobile = ({ jobId, clientSecret }: any) => {
  return (
    // ${is-Mobile === false ? "w-[40%] mt-4 mx-auto" : "w-full"}
    <div className={`w-full lg:w-[40%] lg:mt-4 lg:mx-auto px-8 mt-16 flex flex-col justify-center  gap-6  bg-white`}>
      <div className={`flex flex-col gap-2`}>
        <h1 className="text-[#000] text-[18px] font-[600]">Payment Methods</h1>
        <div className="bg-gray-200 rounded-full px-6 py-2 text-center text-black text-sm font-medium">
          Credit or Debit Card
        </div>
      </div>
      <div className="w-full">
        <StripeCheckoutForm
          jobId={jobId}
          clientSecret={clientSecret}
        />
      </div>
      <div className="flex flex-col">
        <p className="text-[12px] font-[400] text-[#CBCBCB] ">By providing your card information, you allow Brilliant Worldwide, Inc. to charge your card for future payments in accordance with their terms.</p>
        <div className="flex flex-row items-center  justify-center gap-2">
          <p className="text-gray-600 text-[12px]">Powered by</p>
          <Image width={60} height={60} alt="" src="/images/stripe.svg" className={`w-[60px] h-[60px] lg:w-[100px] lg:h-[100px]`} />
        </div>
      </div>
    </div>
    // ${is-Mobile === false ? "w-[100px] h-[100px]" : "w-[60px] h-[60px]"}
  );
};

export default StripeMobile;
