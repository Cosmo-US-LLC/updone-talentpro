"use client";

import Tooltip from "@/app/_components/common/tooltip";
import VerificationIcon from "@/app/_components/ui/shield";
import { VerificationStatus } from "@/app/_components/ui/verified-status-check-tooltip";
import { setOffersId } from "@/app/lib/store/features/bookingSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

const Offers = ({ offers, job, setSelectedOffer, selectedOffer, isInModal }: { offers: any[]; job: any, setSelectedOffer: any, selectedOffer: any, isInModal: any }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const payPayment = (invite_id: any) => {
    dispatch(setOffersId(invite_id));
    router.push(`/events/payment/${invite_id}`);
  };

  return (
    <div className={`flex flex-col`}>
      {
        offers?.length > 0 &&
        offers.map((offer: any) => (
          <div key={offer.id} className="flex flex-row items-center justify-between border border-1 border-[#EBE6FF] px-2 h-[120px] mb-4 mx-2 rounded-xl">
            <div className="flex flex-row items-center justify-start gap-2">
              <Image
                width={100}
                height={100}
                className="h-[52px] w-[52px] object-cover rounded-[50%] border-2 border-[#F3F0FF]"
                src={offer.worker.profile_pic}
                alt="user"
              />
              <div className="flex flex-col">
                <div className="flex flex-row items-center">
                  <p className="text-[16px] font-[500] leading-[8px]">
                    {
                      offer.worker.full_name.length > 17
                        ? `${offer.worker.full_name.slice(0, 17)}...`
                        : offer.worker.full_name
                    }
                  </p>
                  <Tooltip
                    content={
                      <VerificationStatus
                        id_is_verified={offer.worker.id_is_verified}
                        contact_is_verified={
                          offer.worker.contact_is_verified
                        }
                      />
                    }
                  >
                    <div className=" text-white pr-4 pl-2  rounded">
                      <VerificationIcon
                        id_is_verified={offer.worker.id_is_verified}
                        contact_is_verified={
                          offer.worker.contact_is_verified
                        }
                        height={30}
                        width={30}
                      />
                    </div>
                  </Tooltip>
                </div>
                <div className="flex flex-row gap-2">
                  <Image
                    width={12}
                    height={12}
                    src={"/images/client-portal/event-details/star.svg"}
                    alt="star"
                  />
                  <p className="text-[#4C4B4B] text-[14px] font-[400] leading-[24px]">{parseFloat(offer?.worker?.rating).toFixed(1)}/5</p>
                </div>
              </div>
            </div>

            <div className="flex flex-row items-center justify-end gap-4">
              <div>
                <p className="text-[#4C4B4B] font-[400] text-[12px] leading-[20px]">Offered Rate</p>
                <p className="text-[#4C4B4B] font-[500] text-[18px] leading-[27px]">${offer?.offered_price === "default" ? offer?.worker?.per_hours_rate : offer?.offered_price}/hour</p>
              </div>
              <div className="ml-1 mb-0.5">
                <p className="text-[#4C4B4B] font-[400] text-[12px] leading-[20px]">Total</p>
                <p className="text-[#4C4B4B] font-[500] text-[18px] leading-[27px]">${offer?.total_price}</p>
              </div>
              {
                isInModal !== true &&
                <>
                  <button
                    disabled={
                      job.status === "assigned" || job.status === "completed"
                    }
                    className={`bg-[#2C2240] rounded-full flex justify-center items-center gap-2 h-[42px] ${selectedOffer?.id === offer?.id ? "w-[262px]" : "w-[162px]"} text-white text-[14px] font-[400] leading-[24px] tracking-[-0.28px] capitalize
    transition-all duration-300 ease-in-out grow_ellipse
    active:scale-95 active:shadow-inner ${job.status === "assigned" || job.status === "completed"
                        ? "cursor-not-allowed opacity-50"
                        : "cursor-pointer"
                      }`}
                    onClick={() => {
                      if (job.status !== "assigned") {
                        payPayment(offer.invite_id);
                      }
                    }}
                  >
                    {/* <Image
                  width={12}
                  height={12}
                  src={"/images/hero/tick.svg"}
                  alt="tick"
                /> */}
                    {job.status === "assigned"
                      ? "Already Assigned"
                      : job.status === "completed"
                        ? "Completed"
                        : "Hire Me"}
                  </button>

                  {
                    selectedOffer?.id !== offer?.id &&
                    <div onClick={() => { setSelectedOffer(offer) }}
                      className="relative gap-2 group cursor-pointer border border-1 h-[38px] w-[123px] rounded-full flex flex-row items-center justify-center
    border-[black] bg-white hover:bg-[#774DFD] hover:text-white hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out"
                    >
                      {
                        offer?.unread_message_count > 0 &&
                        <div className="p-2 flex flex-row justify-center items-center absolute bg-[#C70101] h-[24px] w-[24px] rounded-full bottom-[24px] right-0">
                          <p className="text-[white] text-[12px]">{offer?.unread_message_count > 10 ? "10+" : offer?.unread_message_count}</p>
                        </div>
                      }

<div className="transition-transform duration-300 ease-in-out hover:scale-110">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
         className="fill-gray-500 group-hover:fill-white transition-colors duration-300 ease-in-out"
          >
        
          <g clipPath="url(#clip0_8554_93605)">
            <path d="M8 0C3.58867 0 0 3.58867 0 8C0 12.4113 3.58867 16 8 16H16V8C16 3.58867 12.4113 0 8 0ZM15.3333 15.3333H8C3.95667 15.3333 0.666667 12.0433 0.666667 8C0.666667 3.95667 3.95667 0.666667 8 0.666667C12.0433 0.666667 15.3333 3.95667 15.3333 8V15.3333ZM8.66667 8C8.66667 8.368 8.368 8.66667 8 8.66667C7.632 8.66667 7.33333 8.368 7.33333 8C7.33333 7.632 7.632 7.33333 8 7.33333C8.368 7.33333 8.66667 7.632 8.66667 8ZM12 8C12 8.368 11.7013 8.66667 11.3333 8.66667C10.9653 8.66667 10.6667 8.368 10.6667 8C10.6667 7.632 10.9653 7.33333 11.3333 7.33333C11.7013 7.33333 12 7.632 12 8ZM5.33333 8C5.33333 8.368 5.03467 8.66667 4.66667 8.66667C4.29867 8.66667 4 8.368 4 8C4 7.632 4.29867 7.33333 4.66667 7.33333C5.03467 7.33333 5.33333 7.632 5.33333 8Z" />
          </g>
          <defs>
            <clipPath id="clip0_8554_93605">
              <rect width="16" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
                      <p className="font-[400] text-[14px] leading-[24px]">Let's Talk</p>
                    </div>
                  }

                </>
              }
            </div>
          </div>
        ))
      }
      {isLoading === false && offers.length === 0 && (
        <>
          <div className="flex justify-center  items-start relative">
            <div>
              <div className="w-[100%]">
                <Image
                  quality={100}
                  className="relative bottom-[5px] right-[-20px]"
                  width={200}
                  height={180}
                  src={"/images/booking/offers/Frame 1410127070 (1).png"}
                  alt="tick"
                />
              </div>
              <div className="flex justify-center py-[10px]">
                <h4 className="text-[16px] text-center font-[600] text-[#2C2240] my-[20px]">
                  No offers yet, check back in couple <br /> of hours or invite
                  more talent!
                </h4>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// export default React.memo(Offers);
export default Offers;
