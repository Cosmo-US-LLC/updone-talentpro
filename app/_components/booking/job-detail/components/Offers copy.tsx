"use client";

import Tooltip from "@/app/_components/common/tooltip";
import VerificationIcon from "@/app/_components/ui/shield";
import { VerificationStatus } from "@/app/_components/ui/verified-status-check-tooltip";
import { useError } from "@/app/lib/context/ErrorProvider";
import { montserrat } from "@/app/lib/Fonts";
import { selectAuth } from "@/app/lib/store/features/authSlice";
import { setOffersId } from "@/app/lib/store/features/bookingSlice";
import { selectStaff } from "@/app/lib/store/features/staffSlice";
import { useAppSelector } from "@/app/lib/store/hooks";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useState } from "react";
import { LuMapPin } from "react-icons/lu";
import { useDispatch } from "react-redux";

const Offers = ({ offers, job, setSelectedOffer }: { offers: any[]; job: any, setSelectedOffer: any }) => {
  const { auth: storedData } = useAppSelector(selectAuth);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { jobData } = useAppSelector(selectStaff);
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { handleError } = useError();

  const payPayment = (workerId: string) => {
    dispatch(setOffersId(workerId));
    router.push(`/events/payment/${workerId}`);
  };

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className={` space-y-[38px] flex gap-[30px] pb-[60px] flex-row flex-wrap justify-center items-center ${offers?.length > 0 ? "pt-10" : "min-h-0"}`}>
      {
        offers?.length > 0 &&
        offers.map((offer: any) => (
          <div
            key={offer.id}
            className="rounded-[8px] flex justify-center items-center shadow-sm bg-[#FFFFFF] !border-[1px] border-[#F7F7F7] !m-0 mx-[32px]"
          >
            <div className="flex flex-col items-start">
              <div className="flex justify-center items-center gap-[20px] border-b-[1px] border-[#F7F7F7] p-[16px] mb-4">
                <Image
                  width={100}
                  height={100}
                  className="h-[110px] w-[106px] object-cover rounded-[50%] border-2 border-[#F3F0FF]"
                  src={offer.worker.profile_pic}
                  alt="user"
                />
                <div className="space-y-[24px]">
                  <div className="flex justify-between w-full gap-[80px] items-center mb-1 ">
                    <div className="flex justify-start items-center">
                      <h3
                        style={{
                          letterSpacing: "-1%",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                        className={`text-[20px] flex justify-start items-center min-w-auto gap-2 text-[#2C2240] relative bottom-[1px] font-[600] ${montserrat.className}`}
                      >
                        {offer.worker.full_name.length > 17
                          ? `${offer.worker.full_name.slice(0, 17)}...`
                          : offer.worker.full_name}
                      </h3>
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
                    <h3 className="flex justify-center items-center gap-1 font-[500] leading-[24px] translate-[-2%] text-[16px]">
                      <span className="mb-[2px] mr-1 leading-[24px] text-[#2C2240] font-[600] tracking-[-0.28px] text-[16px]">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 20 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.0002 0.833374L12.8327 6.57171L19.1668 7.49754L14.5835 11.9617L15.6652 18.2684L10.0002 15.2892L4.33516 18.2684L5.41683 11.9617L0.833496 7.49754L7.16766 6.57171L10.0002 0.833374Z"
                            fill="#F79809"
                            stroke="#F79809"
                            strokeWidth="1.33333"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      {parseFloat(offer.worker.rating).toFixed(1)}/5
                    </h3>
                  </div>
                  <div className="flex justify-between w-full gap-[80px] items-center">
                    <h2
                      style={{ color: "rgba(0, 0, 0, 0.50)" }}
                      className="flex justify-center items-center gap-2 leading-[24px] font-[400] tracking-[ -0.24px] !text-[16px] text-[#00000080]"
                    >
                      <LuMapPin className="text-[#000000] text-[16px]" />
                      Los Angeles
                    </h2>
                    <h3
                      style={{ color: "rgba(0, 0, 0, 0.50)" }}
                      className="flex justify-center items-center gap-1 text-[#2C2240] leading-[24px] tracking-[-0.24px] text-[16px] font-[400]"
                    >
                      {offer.worker.total_jobs_count} Jobs
                    </h3>
                  </div>
                </div>
              </div>
              <div
                className={`${job.status === "assigned" || job.status === "completed"
                  ? "justify-center  items-center"
                  : "justify-between  items-center"
                  } flex  w-[94%] mx-auto`}
              >
                <div>
                  <span className="text-[#6B6B6B] text-[14px] leading-[24px] font-[400]">
                    Total Amount
                  </span>
                  <p className="text-[#2C2240] text-[36px] font-[500] leading-normal flex justify-center items-center">
                    ${offer?.total_price}
                  </p>
                </div>
                {job.status === "assigned" || job.status === "completed" ? (
                  <></>
                ) : (
                  <button
                    disabled={
                      job.status === "assigned" || job.status === "completed"
                    }
                    className={`bg-[#350ABC] rounded-[4px] mb-4 flex justify-center items-center gap-2 py-[14px] w-[162px] text-[#dfdbec] text-[14px] font-[400] leading-[24px] tracking-[-0.28px] capitalize
    transition-transform duration-150 ease-in-out  grow_ellipse
    active:scale-95 active:shadow-inner ${job.status === "assigned" || job.status === "completed"
                        ? "cursor-not-allowed opacity-50"
                        : "cursor-pointer"
                      }`}
                    onClick={() => {
                      if (job.status !== "assigned") {
                        setSelectedOffer(offer);
                        // payPayment(offer.id);
                      }
                    }}
                  >
                    <Image
                      width={12}
                      height={12}
                      src={"/images/hero/tick.svg"}
                      alt="tick"
                    />
                    {job.status === "assigned"
                      ? "Already Assigned"
                      : job.status === "completed"
                        ? "Completed"
                        : "hire now"}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))
      }
      {isLoading === false && offers.length === 0 && (
        <>
          <div className="flex justify-center  items-start relative">
            <div>
              <div>
                {/* <h3 className="staff-text  absolute top-[25px] z-10">
                                        no offer yet to show
                                    </h3> */}
              </div>
              <div className="w-[100%]">
                <Image
                  quality={100}
                  className="relative bottom-[5px] right-[51px]"
                  width={571}
                  height={528}
                  src={"/images/booking/offers/Frame 1410127070 (1).png"}
                  alt="tick"
                />
              </div>
              <div className="flex justify-center py-[10px]">
                <h4 className="text-[30px] text-center font-[600] text-[#2C2240] my-[20px]">
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

export default React.memo(Offers);
