"use client";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import Image from "next/image";
import InviteCard from "@/app/_components/staff/components/invite-cards";

const Invites = ({ data, jobId }: any) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const handleInviteClick = () => {
    // Create the query string with both sort=Invite-Members and jobId
    const queryString = `${createQueryString(
      "step",
      "invite-more-talents"
    )}&jobId=${jobId}`;

    // Navigate to /add-job with the constructed query parameters
    router.push(
      `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/add-job?${queryString}`
    );
  };
  return (
    <>
      <div
        className={`flex flex-wrap justify-center items-center gap-x-[10px] ${
          data?.length > 4
            ? "justify-start content-start pb-[60px]"
            : "justify-start content-center"
        }`}
      >
        {data?.map((staff: any, index: number) => (
          <div key={staff.id} className="w-[304px] relative mt-8">
            <InviteCard
              isInvited={staff?.worker?.has_offered}
              index={index}
              data={staff}
            />
          </div>
        ))}
      </div>

      {data?.length === 0 ? (
        <>
          <div className="flex justify-center  items-start relative">
            <div>
              <div className="w-[100%]">
                <Image
                  quality={100}
                  className="relative bottom-[5px] right-[-20px]"
                  width={200}
                  height={180}
                  src={"/images/booking/invite/Cocktail bartender-bro 1.svg"}
                  alt="tick"
                />
              </div>
              <div className="flex flex-col items-center justify-center gap-y-[15px] py-[10px]">
                <h4 className="text-[16px] text-center font-[600] text-[#2C2240] my-[20px]">
                  Invite talent to your job, we’ll <br /> notify them right
                  away!
                </h4>

                <button
                  onClick={handleInviteClick}
                  className="text-[14px] mb-[60px] font-[400] py-[16px] flex items-center text-[#fff] px-[32px] rounded-[4px] !bg-[#350ABC]
                  transition-transform duration-150 ease-in-out transform active:scale-95 hover:scale-105"
                >
                  <span className="mr-[8px]">
                    <Image
                      width={16}
                      height={16}
                      src={"/images/booking/offers/plus (1).svg"}
                      alt="tick"
                    />
                  </span>
                  Invite More Talent
                </button>
              </div>
            </div>
          </div>
        </>
      ) : // <div className="w-full flex justify-center items-start">
      //   <div className="flex justify-center  items-start relative">
      //     <div>
      //       <div className="w-[100%]">
      //         <Image
      //           width={571}
      //           height={528}
      //           src={"/images/booking/invite/Cocktail bartender-bro 1.svg"}
      //           alt="invite"
      //         />
      //       </div>
      //       <div className="flex justify-center py-[10px]">
      //         <h4 className="text-[30px] text-center font-[600] text-[#2C2240] my-[20px]">
      //           Invite talent to your job, we’ll <br /> notify them right
      //           away!
      //         </h4>
      //       </div>
      //       <div className="flex justify-center">
      //   <button
      //     onClick={handleInviteClick}
      //     className="text-[14px] mb-[60px] font-[400] py-[16px] flex items-center text-[#fff] px-[32px] rounded-[4px] !bg-[#350ABC]
      //       transition-transform duration-150 ease-in-out transform active:scale-95 hover:scale-105"
      //   >
      //     <span className="mr-[8px]">
      //       <Image
      //         width={16}
      //         height={16}
      //         src={"/images/booking/offers/plus (1).svg"}
      //         alt="tick"
      //       />
      //     </span>
      //     Invite More Talent
      //   </button>
      //       </div>
      //     </div>
      //   </div>
      // </div>
      data?.some(
          (item: any) =>
            item.job_status === "assigned" || item.job_status === "completed"
        ) ? (
        <></>
      ) : (
        <div
          onClick={handleInviteClick}
          className="w-full flex justify-center items-center pb-[60px]"
        >
            <br />
            <br />
            <br />
            <br />
          <button
            onClick={handleInviteClick}
            className="bg-[#350ABC] relative rounded-[4px] flex justify-center items-center gap-2 py-[14px] px-[32px] text-[#dfdbec] text-[14px] font-[400] leading-[24px] tracking-[-0.28px] capitalize grow_ellipse"
          >
            <h2>+</h2> Invite More Talent
          </button>
        </div>
      )}
    </>
  );
};

// export default React.memo(Invites);
export default Invites;
