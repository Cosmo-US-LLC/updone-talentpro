"use client";

import { useError } from "@/app/lib/context/ErrorProvider";
import { montserrat } from "@/app/lib/Fonts";
import { formatWorkingTimes } from "@/app/lib/helpers/formatDateTime";
import { apiRequest } from "@/app/lib/services";
import { selectAuth } from "@/app/lib/store/features/authSlice";
import { selectStaff } from "@/app/lib/store/features/staffSlice";
import { useAppSelector } from "@/app/lib/store/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ChatBox from "./components/ChatBox";
import EmptyChatBox from "./components/EmptyChatBox";
import JobDetailsTabs from "./components/JobDetailTabs";
import TalentInfo from "./components/TalentInfo";
import Modal from "react-modal";
import { Skeleton } from "@/components/ui/skeleton";

const JobDetail = ({ jobId }: { jobId?: any }) => {
  const [isOpenresetPasswordModal, setIsOpenResetPasswordModal] =
    useState(false);
  const { jobData } = useAppSelector(selectStaff);
  const [offers, setOffers] = useState<any[]>([]);
  const [jobDetailData, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("a");
  const { auth: storedData } = useAppSelector(selectAuth);
  const router = useRouter();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const loginMenuRef = useRef<HTMLDivElement>(null);
  const [selectedOffer, setSelectedOffer] = useState<any>(null);
  const [messagesRefreshed, setMessagesRefreshed] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [releaseData, setReleaseData] = useState<any>([]);

  const [isChatVisible, setIsChatVisible] = useState(true); // State for chat visibility
  const [isChatHidden, setIsChatHidden] = useState(false);

  useEffect(() => {
    if (selectedOffer !== null) {
      setIsChatVisible(true);
      setIsChatHidden(false);
    }
  }, [selectedOffer]);

  const handleChatClose = () => {
    setSelectedOffer(null);
    setIsChatHidden(true);
  };

  const handleChatVisibilityChange = (isVisible: boolean) => {
    setIsChatVisible(isVisible); // Update chat visibility state
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "0", // Remove default padding for better control with Tailwind
      borderRadius: "30px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      width: "100%",
      maxWidth: "650px",
      border: "0px",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.57)",
      backdropFilter: "blur(4px)",
      zIndex: "1000",
    },
  };

  useEffect(() => {
    const GetOffers = async () => {
      try {
        const response = await apiRequest(
          `/invitation/fetchOffers`,
          {
            method: "POST",
            headers: {
              revalidate: true,
              ...(storedData && {
                Authorization: `Bearer ${storedData.token}`,
              }),
            },
            body: {
              job_id: jobDetailData?.id,
            },
          },
          handleError
        );

        if (response?.offers) {
          setOffers(response?.offers);
          if (
            jobDetailData?.status === "assigned" ||
            jobDetailData?.status === "completed"
          ) {
            const currentInviteId = jobDetailData?.invite?.id;
            response?.offers?.forEach((offer: any) => {
              if (offer?.invite_id === currentInviteId) {
                setSelectedOffer(offer);
              }
            });
          }
        } else {
          console.error("Unexpected data format:", response);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (jobDetailData?.id) {
      GetOffers();
    }
  }, [jobDetailData, messagesRefreshed]);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };
  const { handleError } = useError();

  useEffect(() => {
    const getJobDetailsApi = async () => {
      const body = {
        job_id: Number(jobId),
      };
      try {
        const newData = await apiRequest(
          `/client/payment-request`,
          {
            method: "POST",
            body: body,
            headers: {
              ...(storedData && {
                Authorization: `Bearer ${storedData.token}`,
              }),
            },
          },
          handleError
        );
        setReleaseData(newData);
      } catch (error) {
        console.error("following is error: ", error);
      }
    };
    getJobDetailsApi();
  }, []);

  useEffect(() => {
    const fetchDataIfNeeded = async () => {
      setLoading(true);
      try {
        if (!jobData?.id) {
          console.warn("jobData.id is not available.");
          return;
        }
        setData(null);
        let apiUrl = "/job/details";
        const headers: HeadersInit = {};

        if (storedData?.token) {
          headers["Authorization"] = `Bearer ${storedData.token}`;
        } else {
          apiUrl = "/job/details/public";
        }

        const body = { job_id: jobId };

        // Fetch data from API
        const newData = await apiRequest(
          apiUrl,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              ...headers,
            },
            body,
          },
          handleError
        );
        setLoading(false);
        // If newData is available, perform the refresh and then update the state
        if (newData) {
          router.refresh(); // Ensure refresh completes
          setData(newData); // Update state with fetched data
        }
      } catch (error) {
        // Handle errors appropriately
        console.error("Error fetching data:", error);
      }
    };

    fetchDataIfNeeded(); // Call the function to fetch data
  }, [router, jobData?.id, storedData?.token]); // Add dependencies to ensure effect is rerun if necessary

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        loginMenuRef.current &&
        !loginMenuRef.current.contains(event.target as Node)
      ) {
        setIsMenuVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatLocation = (location: string) => {
    // Check if "Los Angeles, California" is part of the location
    let formattedLocation = location.replace(
      "Los Angeles, California",
      "LA, California"
    );

    // Remove "United States" if it exists
    formattedLocation = formattedLocation.replace(", United States", "");

    // Split the location into the first part and the remaining location
    const firstCommaIndex = formattedLocation.indexOf(",");
    const firstPart = formattedLocation.substring(0, firstCommaIndex); // "1 World Way"
    const secondPart = formattedLocation.substring(firstCommaIndex + 1).trim(); // "LA, California 90045"

    return {
      firstPart: firstPart.trim(),
      secondPart: secondPart.trim(),
    };
  };

  return (
    <div className="relative flex flex-row gap-5 bg-[#F6F9FC] h-[100%]">
      {/* Main Content */}
      <div className="grow h-full">
        {loading ? (
          // Skeleton
          <div className="bg-[#FFF] rounded-tl-[29px] rounded-[12px] mt-4 flex-col flex gap-[16px] !p-8">
            <div className="space-y-3 mb-5">
              <div className="flex justify-between items-center">
                <Skeleton className="h-[22px] w-[180px]" />
                <Skeleton className="h-[26px] w-[70px] rounded-full" />
              </div>
              <Skeleton className="h-[22px] w-[280px]" />
            </div>

            <div className="grid grid-cols-3">
              <div className="flex items-start gap-3">
                <Skeleton className="h-[32px] w-[32px]" />
                <div className="space-y-3">
                  <Skeleton className="h-[22px] w-[140px]" />
                  <Skeleton className="h-[22px] w-[120px]" />
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Skeleton className="h-[32px] w-[32px]" />
                <div className="space-y-3">
                  <Skeleton className="h-[22px] w-[140px]" />
                  <Skeleton className="h-[22px] w-[120px]" />
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Skeleton className="h-[32px] w-[32px]" />
                <div className="space-y-3">
                  <Skeleton className="h-[22px] w-[140px]" />
                  <Skeleton className="h-[22px] w-[120px]" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            className={`!bg-[#FFF] flex-col ${
              !storedData?.token
                ? "rounded-tl-[29px] rounded-[12px]"
                : "rounded-[12px]"
            } bg-[#FFF] flex gap-[16px] !p-8`}
          >
            <div className="w-full flex justify-start items-center mb-6">
              <div className="w-[100%] flex justify-between ">
                <div className=" flex flex-col">
                  <h2
                    style={{ wordBreak: "break-word" }}
                    className={`${
                      jobDetailData?.status === "completed" &&
                      "opacity-[50%] !text-gray-300"
                    } tracking-[0.2px] text-[#000000] !font-[600] text-[16px]`}
                  >
                    {jobDetailData?.title}
                  </h2>

                  <div
                    style={{ wordBreak: "break-word" }}
                    className={`flex justify-start items-center  gap-[6px] !text-[14px] font-[400] tracking-[-0.32px] leading-[22px] text-[#6B6B6B] !w-[101%] ${
                      jobDetailData?.status === "completed" &&
                      "opacity-[50%] !text-gray-300"
                    }`}
                  >
                    {jobDetailData?.description}
                  </div>
                </div>
                <p
                  className={`${`h-[26px] flex px-[16px] rounded-[32px] items-center gap-1 text-[14px] font-[500] border-none leading-[30px]
                      ${
                        jobDetailData?.status === "assigned"
                          ? "text-[#0C9000] bg-[#EAFDE7]"
                          : jobDetailData?.status === "completed"
                          ? "text-[#E60000] bg-[#FDE7E7]"
                          : "text-[#0076E6] bg-[#E7F4FD]"
                      }`}  `}
                >
                  {jobDetailData?.status && jobDetailData?.status}
                </p>
              </div>
            </div>
            <div
              className={`${
                jobDetailData?.status === "completed" &&
                "opacity-[50%] !text-gray-300 "
              }`}
            >
              <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-[14px] items-start  ">
                  <Image
                    className="relative"
                    width={32}
                    height={28}
                    alt="verified"
                    src="/images/staff-listing/map.svg"
                  />

                  <div
                    className={`flex flex-col ${
                      jobDetailData?.status === "completed" &&
                      "opacity-[50%] !text-gray-300"
                    }`}
                  >
                    {jobDetailData?.event_location && (
                      <>
                        <div className=" text-[#161616] text-[16px] leading-normal font-[600]">
                          {
                            formatLocation(jobDetailData?.event_location)
                              .firstPart
                          }
                        </div>

                        <div className="text-[14px] font-[400] leading-[28px] text-[#6B6B6B]">
                          {
                            formatLocation(jobDetailData?.event_location)
                              .secondPart
                          }
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className=" flex items-start gap-[14px]">
                  <Image
                    className="relative"
                    width={32}
                    height={28}
                    alt="verified"
                    src="/images/staff-listing/calander.svg"
                  />

                  <div
                    className={`  flex flex-col ${
                      jobDetailData?.status === "completed" &&
                      "opacity-[50%] !text-gray-300"
                    }`}
                  >
                    {jobDetailData?.event_location && (
                      <>
                        {/* First part of the location */}
                        <div className="  text-[#161616] text-[14px] leading-[28px] font-[400]">
                          {jobDetailData?.working_times &&
                            formatWorkingTimes(jobDetailData?.working_times)}
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex flex-row gap-[14px] items-start">
                  <Image
                    className="relative"
                    width={32}
                    height={28}
                    alt="verified"
                    src="/images/staff-listing/glass.svg"
                  />

                  <div>
                    <div
                      className={`flex flex-col ${
                        jobDetailData?.status === "completed" &&
                        "opacity-[50%] !text-gray-300"
                      }`}
                    >
                      {jobDetailData?.event_location && (
                        <>
                          {/* First part of the location */}
                          <div className=" text-[#161616] text-[14px] leading-normal font-[600]">
                            Required Service
                          </div>
                          <p className="text-[14px] font-[400] leading-[28px] text-[#6B6B6B]">
                            {jobDetailData?.service_name}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {storedData?.token &&
          (jobDetailData?.status === "assigned" ||
            jobDetailData?.status === "completed") && (
            <>
              <TalentInfo jobDetailData={jobDetailData} />
              <div className="flex flex-row items-center justify-center w-full cursor-pointer">
                <div
                  className="mt-4 min-h-[10px] h-full p-4 rounded-full bg-[white] shadow-xl"
                  onClick={() => {
                    setModalIsOpen(true);
                  }}
                >
                  <p className="text-center text-[#4C4B4B] text-[14px] font-[400] leading-[20px]">
                    Offers & Invites
                  </p>
                </div>
              </div>
            </>
          )}

        {storedData?.token &&
          (jobDetailData?.status === "assigned" ||
            jobDetailData?.status === "completed") && (
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={() => setModalIsOpen(false)}
              style={customStyles}
            >
              <>
                {/* Tabs */}
                <div className="bg-[#FFF] rounded-[12px]">
                  <div className="w-full flex justify-center items-center mt-[20px] bg-[#FFF] rounded-tl-[24px] rounded-tr-[24px]">
                    <div className="inline-flex space-x-4 border-b max-w-full mx-auto border-[#DFDFDF]">
                      <div
                        onClick={() => handleTabClick("a")}
                        className={`cursor-pointer px-4 pb-[16px] py-2   ${
                          montserrat.className
                        } ${
                          activeTab === "a"
                            ? "text-[20px] font-[600] leading-normal border-b border-[#350ABC] text-[#350ABC] "
                            : ` text-[#6B6B6B] font-[600] leading-normal text-[20px]`
                        }`}
                      >
                        Offers{" "}
                        <span
                          className={`${
                            activeTab === "a" ? "text-[#774DFD]" : ""
                          } text-[16px] leading-[24px] font-[400]`}
                        >
                          ({offers.length.toString()})
                        </span>
                      </div>
                      <div
                        onClick={() => handleTabClick("b")}
                        className={`cursor-pointer px-4 pb-[16px] py-2 ${
                          montserrat.className
                        }  ${
                          activeTab === "b"
                            ? "text-[20px] font-[600] leading-normal border-b border-[#350ABC] text-[#350ABC]"
                            : ` text-[#6B6B6B] font-[600] leading-normal text-[20px]`
                        }`}
                      >
                        Invites Sent
                      </div>
                    </div>
                  </div>
                  <div className="h-[100%] max-h-[calc(100vh-485px)] overflow-y-auto max-w-full mx-auto bg-[#FFF] rounded-bl-[24px] rounded-br-[24px]">
                    {/* <Suspense fallback={<>Loading...</>}> */}
                    <JobDetailsTabs
                      jobId={jobId}
                      setOffers={setOffers}
                      offers={offers}
                      activeTab={activeTab}
                      setSelectedOffer={setSelectedOffer}
                      selectedOffer={selectedOffer}
                      messagesRefreshed={messagesRefreshed}
                      isInModal={true}
                    />
                    {/* </Suspense> */}
                  </div>
                </div>
              </>
            </Modal>
          )}

        {storedData?.token && jobDetailData?.status === "open" && (
          <>
            {/* Tabs */}
            <div className="bg-[#FFF] rounded-[12px]">
              <div className="w-full flex justify-center items-center mt-[12px] bg-[#FFF] rounded-tl-[24px] rounded-tr-[24px]">
                <div className="inline-flex space-x-4 border-b max-w-full mx-auto border-[#DFDFDF]">
                  <div
                    onClick={() => handleTabClick("a")}
                    className={`cursor-pointer px-4 pb-[6px] py-2 ${
                      montserrat.className
                    } ${
                      activeTab === "a"
                        ? "text-[16px] font-[600] leading-normal border-b border-[#350ABC] text-[#350ABC] "
                        : ` text-[#6B6B6B] font-[600] leading-normal text-[16px]`
                    }`}
                  >
                    Offers{" "}
                    <span
                      className={`${
                        activeTab === "a" ? "text-[#774DFD]" : ""
                      } text-[16px] leading-[24px] font-[400]`}
                    >
                      ({offers.length.toString()})
                    </span>
                  </div>
                  <div
                    onClick={() => handleTabClick("b")}
                    className={`cursor-pointer px-4 pb-[6px] py-2 ${
                      montserrat.className
                    }  ${
                      activeTab === "b"
                        ? "text-[16px] font-[600] leading-normal border-b border-[#350ABC] text-[#350ABC]"
                        : ` text-[#6B6B6B] font-[600] leading-normal text-[16px]`
                    }`}
                  >
                    Invites Sent
                  </div>
                </div>
              </div>
              <div className="h-[100%] h-[calc(100vh-430px)] overflow-y-auto max-w-full mx-auto bg-[#FFF] rounded-bl-[24px] rounded-br-[24px]">
                {/* <Suspense fallback={<>Loading...</>}> */}
                <JobDetailsTabs
                  jobId={jobId}
                  setOffers={setOffers}
                  offers={offers}
                  activeTab={activeTab}
                  setSelectedOffer={setSelectedOffer}
                  selectedOffer={selectedOffer}
                  messagesRefreshed={messagesRefreshed}
                  setIsChatHidden={setIsChatHidden}
                />
                {/* </Suspense> */}
              </div>
            </div>
          </>
        )}
      </div>
      {/* {} */}

      {/* For completed job */}
      <div className="w-[280px] flex flex-col gap-4">
        {jobData?.status === "completed" && (
          <div
            className={`flex flex-col items-center px-4 py-5 bg-[white] h-fit border border-1 border-[#EBE6FF] rounded-[12px]`}
          >
            <p className="text-left self-start text-[14px] font-[600]">
              Total Amount
            </p>
            <p className="text-left self-start text-[60px] font-[400]">
              $
              {releaseData?.includes_settlement === true
                ? releaseData?.initial_payment +
                  releaseData?.additional_amount_requested
                : releaseData?.initial_payment}
            </p>
            <button
              disabled={releaseData?.release_status !== "release_requested"}
              onClick={() => {
                if (releaseData?.release_status === "release_requested") {
                  router.push(`/events/detail/${jobId}/payment-request`);
                }
              }}
              className={`z-[1] p-4 flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:pointer-events-none min-h-[42px] w-[90%] rounded-full ${
                releaseData?.release_status === "release_requested"
                  ? "bg-[#350ABC]"
                  : "bg-[#F3F0FF]"
              } `}
            >
              <p
                className={`text-[14px] font-[400] ${
                  releaseData?.release_status === "release_approved"
                    ? "text-[black]"
                    : "text-[white]"
                } `}
              >
                {releaseData?.release_status === "release_approved"
                  ? "Payment Released"
                  : "Release Payment"}
              </p>
            </button>
            {releaseData?.release_status === "release_pending" && (
              <div className="rounded-[8px] mt-4 p-2 bg-[#F9F7FF] w-[95%] min-h-[52px] flex flex-row items-center justify-start gap-4">
                <img
                  src="/images/client-portal/event-details/exclamation.svg"
                  className="h-[16px] w-[16px]"
                  alt="info_1"
                />
                <p className="text-[14px] font-[400]">
                  You can release payment once the Talent confirms the final
                  amount.
                </p>
              </div>
            )}
            {releaseData?.release_status === "release_requested" &&
              releaseData?.includes_settlement === true && (
                <div className="rounded-[8px] mt-4 p-2 bg-[#F9F7FF] w-[95%] min-h-[52px] flex flex-row items-center justify-start gap-4">
                  <img
                    src="/images/client-portal/event-details/exclamation.svg"
                    className="h-[16px] w-[16px]"
                    alt="info_1"
                  />
                  <p className="text-[14px] font-[400]">
                    The Talent worked extra hours at your event.
                  </p>
                </div>
              )}
          </div>
        )}
        {/* Right Text Panel */}
        <div
          className={`flex bg-white rounded-[12px] ${
            jobData?.status === "completed" ? "overflow-y-auto" : "h-[100%]"
          }`}
        >
          <div className="bg-white px-3 py-8 rounded-[12px] gap-12 w-[100%] flex flex-col h-full md:overflow-hidden md:overflow-y-auto md:overflow-x-hidden">
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center gap-2">
                <img
                  src="/images/client-portal/event-details/info_1.svg"
                  className="h-[32px] w-[32px]"
                  alt="info_1"
                />
                <p className="text-[12px] 2xl:text-[14px] font-[600] leading-[16px] text-[#161616]">
                  Can I Talk To The Talent before Hiring?
                </p>
              </div>
              <p className="text-[12px] 2xl:text-[14px] font-[400] text-[#4C4B4B]">
                Of course, with our messaging feature, you can talk to any
                talent who makes an offer at your event.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center gap-2">
                <img
                  src="/images/client-portal/event-details/info_2.svg"
                  className="h-[32px] w-[32px]"
                  alt="info_2"
                />
                <p className="text-[12px] 2xl:text-[14px] font-[600] text-[#161616]">
                  Can't See Talent's Contact Information
                </p>
              </div>
              <p className="text-[12px] 2xl:text-[14px] font-[400] text-[#4C4B4B]">
                We'll share the Talent's contact information (email and phone)
                once you hire them.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center gap-2">
                <img
                  src="/images/client-portal/event-details/info_3.svg"
                  className="h-[32px] w-[32px]"
                  alt="info_3"
                />
                <p className="text-[12px] 2xl:text-[14px] font-[600] text-[#161616]">
                  Is My Payment Safe?
                </p>
              </div>
              <p className="text-[12px] 2xl:text-[14px] font-[400] text-[#4C4B4B]">
                Yes, 100%. We'll hold your payment until the event is complete.
                It will only be released to the Talent after the event.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center gap-2">
                <img
                  src="/images/client-portal/event-details/info_4.svg"
                  className="h-[32px] w-[32px]"
                  alt="info_4"
                />
                <p className="text-[12px] 2xl:text-[14px] font-[600] text-[#161616]">
                  I Want To Cancel My Event.
                </p>
              </div>
              <p className="text-[12px] 2xl:text-[14px] font-[400] text-[#4C4B4B]">
                We've got you covered. Just send an email to support@updone.com
                and we'll take care of it.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center gap-2">
                <img
                  src="/images/client-portal/event-details/info_5.svg"
                  className="h-[32px] w-[32px]"
                  alt="info_5"
                />
                <p className="text-[12px] 2xl:text-[14px] font-[600] text-[#161616]">
                  I Want To Change Event Date/Time.
                </p>
              </div>
              <p className="text-[12px] 2xl:text-[14px] font-[400] text-[#4C4B4B]">
                Easy, you can discuss this with the Talent directly before or
                after your hire them.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Chat Panel */}
      {isChatHidden === false && selectedOffer !== null && (
        <div
          className={`z-[2] absolute right-0 bottom-0 flex bg-white rounded-[12px] ${
            isChatVisible ? "h-[90%]" : "h-[63px]"
          } w-[26%] transition-all duration-300 ease-in-out`}
        >
          <ChatBox
            job={jobDetailData}
            selectedOffer={selectedOffer}
            setMessagesRefreshed={setMessagesRefreshed}
            messagesRefreshed={messagesRefreshed}
            onChatVisibilityChange={handleChatVisibilityChange}
            onChatClose={handleChatClose}
          />
        </div>
      )}
    </div>
  );
};

export default JobDetail;
