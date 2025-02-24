import LoginFrom from "@/app/_components/common/login-register";
import LoginForm from "@/app/_components/ui/login";
import RegisterForm from "@/app/_components/ui/register";
import { selectAuth } from "@/app/lib/store/features/authSlice";
import { setSelectedTalents } from "@/app/lib/store/features/jobCreateSlice";
import { useAppSelector } from "@/app/lib/store/hooks";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { apiRequest } from "@/app/lib/services";
import { useError } from "@/app/lib/context/ErrorProvider";
import { resetJobCreate } from "@/app/lib/store/features/jobCreateSlice";
import ConfirmDetailsModalMobile from "./ConfirmDetailsModal";
import { BottomDrawer } from "@/app/_components/(mobile-version)/Drawer";
import Link from "next/link";
import Cookies from "js-cookie";

const BottomBarMobile = ({
  selectedTalents,
  setStep,
  updateQueryParam,
}: any) => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [openDrawer, setOpenDrawer] = useState(false);
  const { auth: storedData } = useAppSelector(selectAuth);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isInviteMore, setIsInviteMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [jobIdInParams, setJobIdInParams] = useState<any>(null);
  const [removeUpdoneText, setRemoveUpdoneText] = useState(false);
  const { handleError } = useError();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const queryParams = new URLSearchParams(window.location.search);
      const step = queryParams.get("step");
      const job_id = queryParams.get("jobId");
      if (step && step === "invite-more-talents") {
        setJobIdInParams(job_id);
        setIsInviteMore(true);
      }
    }
  }, []);

  const inviteMoreTalentApi = async () => {
    setLoading(true);

    try {
      const body = {
        job_id: Number(jobIdInParams),
        invited_workers: selectedTalents?.map((talent: any) => {
          return talent.id;
        }),
      };
      const newData = await apiRequest(
        "/job/inviteMoreWorkers",
        {
          method: "POST",
          body: body,
          headers: {
            "Content-Type": "application/json",
            ...(storedData && { Authorization: `Bearer ${storedData.token}` }),
          },
        },
        handleError
      );

      if (newData && newData.id) {
        let url;
        const baseUrl = process.env.NEXT_PUBLIC_CLIENTHUB_URL ?? "";
        url = `${baseUrl}/events/detail/${newData.id}`;
        dispatch(resetJobCreate());
        router.push(url);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
    setRemoveUpdoneText(true);
    if (isInviteMore) {
      inviteMoreTalentApi();
    } else {
      if (!storedData || !storedData.token) {
        const isUpdoneDomain = window.location.hostname.includes("updone");
        Cookies.set("callbackUrl", pathname + window?.location?.search || "", {
          expires: 2,
          path: "/",
          ...(isUpdoneDomain && { domain: ".updone.com" }),
        });
        router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/signin`)
      } else {
        updateQueryParam(4);
        setStep(4);
      }
    }
  };

  useEffect(() => {
    dispatch(setSelectedTalents(selectedTalents));
  }, [selectedTalents]);

  return (
    <>
      {/* <ConfirmDetailsModalMobile
                setStep={setStep}
                modalIsOpen={modalIsOpen}
                setModalIsOpen={setModalIsOpen}
                selectedTalents={selectedTalents}
            /> */}
      {
        // openDrawer === true &&
        <BottomDrawer
          openDrawer={openDrawer}
          setOpenDrawer={setOpenDrawer}
          version={"beforePostingEvent"}
          removeUpdoneText={removeUpdoneText}
        />
      }
      {modalIsOpen === false && openDrawer === false && (
        <div className="flex w-[353px] p-4 flex-col items-start gap-2 rounded-lg border border-[#F7D9AB] bg-[#FFEFD7] shadow-[rgba(137,137,137,0.06)_-8px_0px_26px_0px] self-center z-[999] absolute bottom-2">
          <div className="flex flex-row items-center gap-2">
            <div className="flex items-center">
              <span className="text-[34.733px] font-medium leading-[20.582px] text-[#2C2240]">
                {selectedTalents.length}
              </span>
            </div>
            <div className="">
              <div className="flex flex-row items-center gap-2">
                {selectedTalents.length === 1 ? (
                  <p className="text-[18px] font-medium leading-[32px] text-[#2C2240]  ">
                    Talent will be sent an invitation.
                  </p>
                ) : (
                  <p className="text-[18px] font-medium leading-[32px] text-[#2C2240] ">
                    Talents will be sent invitations.
                  </p>
                )}
              </div>
              <div className="flex -space-x-2">
                {selectedTalents.slice(0, 5).map((talent: any, index: any) => (
                  <img
                    key={index}
                    src={talent?.profile_pic}
                    alt="Selected Talent"
                    className="w-[28px] h-[28px] rounded-full object-cover"
                  />
                ))}

                {selectedTalents.length > 5 && (
                  <div className="w-[30px] h-[30px] rounded-full bg-gray-300 flex items-center justify-center text-white text-sm font-medium border-2 border-white">
                    +{selectedTalents.length - 5}
                  </div>
                )}
              </div>

              {isInviteMore === false && selectedTalents?.length === 0 && (
                <p className="text-[14px]   leading-[20px] text-[#2C2240]   w-full max-w-[90%] md:max-w-[80%]">
                  You can post a job without inviting anyone, but we recommend
                  inviting many to get the best offers.
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center self-center">
            <button
              disabled={loading}
              className="flex h-[48px] px-[32px] py-[16px] justify-center items-center gap-[12px] flex-1 rounded-[4px] border border-[#774DFD] bg-[#350ABC] text-white min-w-[300px]"
              onTouchEnd={handleOpenModal}
            >
              {isInviteMore === true
                ? loading
                  ? "Inviting More Talents"
                  : "Invite More Talents"
                : "Post Your Event"}
            </button>
            {/* {loading ? (
              <button
                disabled={true}
                className="flex h-[48px] px-[32px] py-[16px] justify-center items-center gap-[12px] flex-1 rounded-[4px] border border-[#774DFD] bg-[#350ABC] text-white min-w-[300px]"
                // onTouchEnd={handleOpenModal}
              >
                {isInviteMore === true
                  ? loading
                    ? "Inviting More Talents"
                    : "Invite More Talents"
                  : "Post Your Event"}
              </button>
            ) : (
              <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/signin`}>
                <button
                  className="flex h-[48px] px-[32px] py-[16px] justify-center items-center gap-[12px] flex-1 rounded-[4px] border border-[#774DFD] bg-[#350ABC] text-white min-w-[300px]"
                  // onTouchEnd={handleOpenModal}
                >
                  {isInviteMore === true
                    ? loading
                      ? "Inviting More Talents"
                      : "Invite More Talents"
                    : "Post Your Event"}
                </button>
              </Link>
            )} */}
          </div>
        </div>
      )}
    </>
  );
};

export default BottomBarMobile;
