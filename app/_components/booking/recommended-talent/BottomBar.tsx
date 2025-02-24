import React, { useState, useEffect } from "react";
import ConfirmDetailsModal from "./ConfirmDetailsModal";
// import SignIn from "../../ui/modal-forms/signin";
import SignIn from "../../ui/modal-forms/signIn";
import SignUp from "../../ui/modal-forms/signUp";
import ResetPassword from "../../ui/modal-forms/resetPassword";
import { useAppSelector } from "@/app/lib/store/hooks";
import { selectAuth } from "@/app/lib/store/features/authSlice";
import { useDispatch } from "react-redux";
import {
  resetJobCreate,
  setSelectedTalents,
} from "@/app/lib/store/features/jobCreateSlice";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { apiRequest } from "@/app/lib/services";
import { useError } from "@/app/lib/context/ErrorProvider";

interface BottomBarProps {
  selectedTalentsLocal: any[]; // Replace `any` with your talent type
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const BottomBar: React.FC<BottomBarProps> = ({
  selectedTalentsLocal,
  setStep,
}: any) => {
  const router = useRouter();
  const pathname = usePathname();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false); // For Confirm Details Modal
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false); // For Auth Modals
  const [currentForm, setCurrentForm] = useState<
    "signIn" | "signUp" | "resetPassword"
  >("signIn");
  const { auth: storedData } = useAppSelector(selectAuth);
  const { handleError } = useError();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isInviteMore, setIsInviteMore] = useState(false);
  const [jobIdInParams, setJobIdInParams] = useState<any>(null);

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

  const handleOpenModal = () => {
    if (isInviteMore) {
      inviteMoreTalentApi();
    } else {
      if (storedData?.token) {
        setModalIsOpen(true); // Open Confirm Details Modal if logged in
      } else {
        setAuthModalOpen(true); // Open Auth Modal if not logged in
      }
    }
  };

  const inviteMoreTalentApi = async () => {
    setLoading(true);

    try {
      const body = {
        job_id: Number(jobIdInParams),
        invited_workers: selectedTalentsLocal?.map((talent: any) => {
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

  const handleCloseAuthModal = () => {
    setAuthModalOpen(false);
    setCurrentForm("signIn"); // Reset to Sign In form
  };

  const switchToSignUp = () => setCurrentForm("signUp");
  const switchToSignIn = () => setCurrentForm("signIn");
  const switchToResetPassword = () => setCurrentForm("resetPassword");

  useEffect(() => {
    dispatch(setSelectedTalents(selectedTalentsLocal)); // Update talents in Redux store
  }, [selectedTalentsLocal, dispatch]);

  useEffect(() => {
    // Disable scrolling when auth modal is open
    if (authModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [authModalOpen]);

  return (
    <>
      {/* Confirm Details Modal */}
      <ConfirmDetailsModal
        setStep={setStep}
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        selectedTalents={selectedTalentsLocal}
      />

      {/* Bottom Bar */}
      {!modalIsOpen && (
        <div
          className="flex md:w-[600px] lg:w-[650px] xl:w-[866px] p-6 justify-between items-center rounded-lg border 
          border-[#F7D9AB] bg-[#FFEFD7] fixed z-[999] bottom-4 lg:min-w-[700px] xl:min-w-[1000px] max-w-[1280px]"
        >
          <div className="flex flex-row items-center">
            <div className="flex items-center gap-2">
              <span className="text-[54px] font-medium">
                {selectedTalentsLocal.length}
              </span>
            </div>
            <div className="ml-4">
              <h3 className="text-[20px] font-medium">
                {selectedTalentsLocal.length === 1
                  ? "1 talent will be sent an invitation."
                  : `${selectedTalentsLocal.length} talents will be sent invitations.`}
              </h3>
              <p className="text-[14px] font-normal leading-[20px] text-[#2C2240]  lg:min-w-[40%] max-w-[90%] sm:max-w-[80%] lg:max-w-[60%]">
                You can post a job without inviting anyone, but we recommend
                inviting many to get the best offers.
              </p>
            </div>
          </div>
          <button
            className="flex min-h-[48px] h-fit w-[250px] px-[32px] justify-center items-center rounded-[4px] bg-[#350ABC] text-white text-[16px]"
            onClick={handleOpenModal}
          >
            {isInviteMore === true
              ? loading
                ? "Inviting More Talents"
                : "Invite More Talents"
              : "Confirm Event Details"}
          </button>
        </div>
      )}

      {/* Auth Modal */}
      {authModalOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black backdrop-blur-sm bg-opacity-50 ">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full relative">
            {/* Close Button */}
            <div
              onClick={handleCloseAuthModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-black cursor-pointer"
            >
              &times;
            </div>

            {/* Render Current Form */}
            {currentForm === "resetPassword" && (
              <ResetPassword
                onSwitchToSignIn={() => setCurrentForm("signIn")}
              />
            )}
            {currentForm === "signIn" && (
              <SignIn
                onSwitchToSignUp={switchToSignUp}
                onSwitchToResetPassword={switchToResetPassword}
                onSuccess={handleCloseAuthModal}
              />
            )}
            {currentForm === "signUp" && (
              <SignUp
                onSwitchToSignIn={switchToSignIn}
                onSuccess={handleCloseAuthModal}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default BottomBar;
