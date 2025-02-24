"use client";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useState } from "react";
import Image from "next/image";
import InviteCard from "@/app/_components/staff/components/invite-cards";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import InviteMoreTalents from "./InviteMoreTalents";
import { apiRequest } from "@/app/lib/services";
import { selectAuth } from "@/app/lib/store/features/authSlice";
import { useAppSelector } from "@/app/lib/store/hooks";
import { Loader } from "@/app/_components/ui/dashboard-loader";

const Invites = ({ data, jobId }: any) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [inviteMore, setInviteMore] = useState(false);
  const [selectedTalentsLocal, setSelectedTalentsLocal] = useState([]);
  const [loading, setLoading] = useState(false);

  const { auth: storedData } = useAppSelector(selectAuth);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const handleInviteClick = () => {
    setInviteMore(true);
  };

  const handleInviteSelected = () => {
    // console.log(selectedTalentsLocal);
    inviteMoreTalentApi();
  };

  const inviteMoreTalentApi = async () => {
    setLoading(true);
    try {
      const body = {
        job_id: Number(jobId),
        invited_workers: selectedTalentsLocal?.map((talent: any) => {
          return talent.id;
        }),
      };
      const newData = await apiRequest("/job/inviteMoreWorkers", {
        method: "POST",
        body: body,
        headers: {
          "Content-Type": "application/json",
          ...(storedData && { Authorization: `Bearer ${storedData.token}` }),
        },
      });
    } catch (error) {
      console.error("Error submitting data:", error);
    } finally {
      setLoading(false);
      setInviteMore(false);
      setSelectedTalentsLocal([]);
      window.location.reload();
    }
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
      ) : data?.some(
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

      <Dialog open={inviteMore} onOpenChange={setInviteMore}>
        {/* <DialogTrigger>Open</DialogTrigger> */}
        <DialogContent className="w-[70vw] max-w-5xl max-h-[80svh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Invite More Talents</DialogTitle>
            <DialogDescription hidden></DialogDescription>
          </DialogHeader>
          {loading ? (
            <>
              <Loader />
            </>
          ) : (
            <InviteMoreTalents
              jobId={jobId}
              selectedTalentsLocal={selectedTalentsLocal}
              setSelectedTalentsLocal={setSelectedTalentsLocal}
              handleInviteSelected={handleInviteSelected}
              setInviteMore={setInviteMore}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

// export default React.memo(Invites);
export default Invites;
