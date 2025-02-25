"use client";
import { montserrat } from "@/app/lib/Fonts";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { formatWorkingTimes } from "@/app/lib/helpers/formatDateTime";
import { useRouter } from "next/navigation";
import { GoDotFill } from "react-icons/go";
import { AiOutlineUser } from "react-icons/ai";
import Offered from "./components/Offered";
import Assigned from "./components/Assigned";
import AlreadyOffered from "./components/AlreadyOffered";
import Completed from "./components/Completed";
import { useAppSelector } from "@/app/lib/store/hooks";
import { selectAuth } from "@/app/lib/store/features/authSlice";
import { formatDateTime } from "@/app/lib/helpers/formatDateTime";
import LoginForm from "../../ui/login";
import { apiRequest } from "@/app/lib/services";
import MyModal from "../../common/modal/Modal";
import { RiRecycleLine } from "react-icons/ri";
import { selectStaff } from "@/app/lib/store/features/staffSlice";
import { useError } from "@/app/lib/context/ErrorProvider";
import AssignedToOther from "./components/AssignedToOther";
import BlurredOverlay from "./components/BlurredOverlay";
import { Loader } from "@/app/_components/ui/dashboard-loader";

interface JobDetailWorkerProps {
  jobId: any;
}
const JobDetailWorker = ({ jobId }: JobDetailWorkerProps) => {
  const [isCompleted] = useState(false);
  const [isOpenresetPasswordModal, setIsOpenResetPasswordModal] =
    useState(false);
  const [jobDetailData, setData] = useState<any>([]);
  const [datas, setDatas] = useState<any>();
  const { jobData } = useAppSelector(selectStaff);
 
  const [loadingJobDetail, setLoadingJobDetail] = useState(true);   // Separate loading states
  const [loadingDataDetail, setLoadingDataDetail] = useState(true);
  const [hoursWorked, setHoursWorked] = useState<number>(0);
  const router = useRouter();
  const { auth: storedData } = useAppSelector(selectAuth);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const loginMenuRef = useRef<HTMLDivElement>(null);
  const { handleError } = useError();

  useEffect(() => {
    const fetchDataIfNeeded = async () => {
      setLoadingJobDetail(true);
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
        
        // If newData is available, perform the refresh and then update the state
        if (newData) {
          router.refresh(); // Ensure refresh completes
          setData(newData); // Update state with fetched data
        }
      } catch (error) {
        // Handle errors appropriately
        console.error("Error fetching data:", error);
      }
      finally {
        setLoadingJobDetail(false);
      }
    };

    fetchDataIfNeeded(); // Call the function to fetch data
  }, [router, jobData?.id, storedData?.token]);

  function calculateHours(start_time: any, end_time: any) {
    // Parse the start and end times
    const [startHours, startMinutes, startSeconds] = start_time.split(':').map(Number);
    const [endHours, endMinutes, endSeconds] = end_time.split(':').map(Number);

    // Convert both times to minutes since midnight
    const startTotalMinutes = startHours * 60 + startMinutes;
    let endTotalMinutes = endHours * 60 + endMinutes;

    // Handle case where end time is on the next day
    if (endTotalMinutes < startTotalMinutes) {
      // Add 24 hours (1440 minutes) to the end time
      endTotalMinutes += 1440;
    }

    // Calculate the difference in minutes
    const totalMinutesDiff = endTotalMinutes - startTotalMinutes;

    // Convert minutes to hours (integer)
    return Math.floor(totalMinutesDiff / 60);
  }

  useEffect(() => {
    const fetchDataIfNeeded = async () => {
      setLoadingDataDetail(true);
      const body = {
        job_id: Number(jobId),
      };
      try {
        const newData = await apiRequest(
          `/job/getDetails`,
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
       
        setDatas(newData);
        const startTime = newData?.job?.working_times[0]?.start_time;
        const endTime = newData?.job?.working_times[0]?.end_time;
        const calculatedHours = calculateHours(startTime, endTime);
        setHoursWorked(calculatedHours);
        
      } catch (error) { }
      finally{
        setLoadingDataDetail(false);
      }
    };
    fetchDataIfNeeded();
  }, [jobId, storedData]);

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

  const toggleMenu = () => {
    setIsMenuVisible((prev) => !prev);
  };

  const getHourlyRate = () => {
    if (datas?.invite) {
      if (datas?.invite?.offered_price === "default") {
        return Math.floor(Number(datas?.myWorkingDetails?.per_hours_rate));
      } else {
        return Math.floor(Number(datas?.invite?.offered_price));
      }
    } else {
      return Math.floor(Number(datas?.myWorkingDetails?.per_hours_rate));
    }
  };


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

  if (loadingJobDetail===true || loadingDataDetail) {
    return <Loader/>
  }
else if (loadingJobDetail===false && loadingDataDetail===false){
  return (
    <>
      <div className="relative">
        {/* Blurred overlay */}
        {!storedData?.token && <BlurredOverlay />}
        <div className={`relative ${!storedData?.token ? "blur-md" : ""}`}>
          <section className={`max-w-[1100px]  mx-auto !bg-[#FFF] flex-col bg-[#FFF] flex gap-[32px] !p-4`}>
            <div className="w-full flex justify-start items-center">
              <div className="w-[100%] flex justify-between border-b border-[#86868626] ">
                <div className=" flex flex-col pb-[16px]">
                  <h2
                    style={{ wordBreak: "break-word" }}
                    className={`${jobDetailData?.status === "completed" &&
                      "opacity-[50%] !text-gray-300"
                      } tracking-[0.2px] text-[#000000] !font-[600] text-[16px]`}
                  >
                    {loadingJobDetail ? (
                      <div className="h-6 animate-pulse !bg-gray-200 rounded-full mt-4 w-60"></div>
                    ) : (
                      jobDetailData?.title
                    )}
                  </h2>

                  <div
                    style={{ wordBreak: "break-word" }}
                    className={`flex justify-start items-center  gap-[6px] !text-[14px] font-[400] tracking-[-0.32px] leading-[22px] text-[#6B6B6B] !w-[101%] ${jobDetailData?.status === "completed" &&
                      "opacity-[50%] !text-gray-300"
                      }`}
                  >
                    {loadingJobDetail ? (
                      <>
                        <div className="h-3 animate-pulse !bg-gray-200 rounded-full mt-4 w-96"></div>
                      </>
                    ) : (
                      jobDetailData?.description
                    )}
                  </div>
                </div>
                <p
                  className={`${!loadingJobDetail &&
                    `h-[26px] flex px-[16px] rounded-[32px] items-center gap-1 text-[14px] font-[500] border-none leading-[30px]
                         ${jobDetailData?.status === "assigned"
                      ? "text-[#0C9000] bg-[#EAFDE7]"
                      : jobDetailData?.status === "completed"
                        ? "text-[#E60000] bg-[#FDE7E7]"
                        : "text-[#0076E6] bg-[#E7F4FD]"
                    }`
                    }  `}
                >
                  {loadingJobDetail ? (
                    <>
                      {" "}
                      <div className="h-7 animate-pulse !bg-gray-200 rounded-full w-16"></div>
                    </>
                  ) : (
                    jobDetailData?.status && jobDetailData?.status
                  )}
                </p>
              </div>
            </div>

            <div
              className={`${jobDetailData?.status === "completed" &&
                "opacity-[50%] !text-gray-300 "
                }`}
            >
              <div className="max-w-[900px]">
                <div className="flex flex-row justify-between pb-[16px]">

                  <div className="flex flex-row gap-[14px] items-start ">
                    {loadingJobDetail ? (
                      <>
                        <div className="h-10 animate-pulse !bg-gray-200 rounded-md mt-1.5 w-60"></div>
                      </>
                    ) : (
                      <Image
                        className="relative"
                        width={32}
                        height={28}
                        alt="verified"
                        src="/images/staff-listing/glass.svg"
                      />
                    )}

                    <div>
                      <div
                        className={`flex flex-col ${jobDetailData?.status === "completed" &&
                          "opacity-[50%] !text-gray-300"
                          }`}
                      >
                        {jobDetailData?.event_location && (
                          <>
                            {/* First part of the location */}
                            <div className=" text-[#161616] text-[14px] leading-normal font-[600]">
                              {loadingJobDetail ? (
                                <>
                                  <div className="h-2 animate-pulse !bg-gray-200 rounded-full mt-4 w-20"></div>
                                </>
                              ) : (
                                <>Required Service</>
                              )}
                            </div>
                            <p className="text-[14px] font-[400] leading-[28px] text-[#6B6B6B]">
                              {loadingJobDetail ? (
                                <>
                                  <div className="h-2 animate-pulse !bg-gray-200 rounded-full mt-2 w-40"></div>
                                </>
                              ) : (
                                jobDetailData?.service_name
                              )}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className=" flex flex-row items-start gap-[14px] ml-[52px]">
                    {loadingJobDetail ? (
                      <>
                        <div className="h-10 animate-pulse !bg-gray-200 rounded-md mt-1.5 w-60"></div>
                      </>
                    ) : (
                      <Image
                        className="relative"
                        width={32}
                        height={28}
                        alt="verified"
                        src="/images/staff-listing/calander.svg"
                      />
                    )}

                    <div
                      className={`  flex flex-col ${jobDetailData?.status === "completed" &&
                        "opacity-[50%] !text-gray-300"
                        }`}
                    >
                      {jobDetailData?.event_location && (
                        <>
                          {/* First part of the location */}
                          <div className="  text-[#161616] text-[14px] leading-[28px] font-[400]">
                            {jobDetailData?.working_times &&
                              formatWorkingTimes(
                                jobDetailData?.working_times
                              )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-row gap-[14px] items-start mr-[52px]
                     ">
                    {loadingJobDetail ? (
                      <>
                        <div className="h-10 animate-pulse !bg-gray-200 rounded-md mt-1.5 w-60"></div>
                      </>
                    ) : (
                      <Image
                        className="relative"
                        width={32}
                        height={28}
                        alt="verified"
                        src="/images/staff-listing/map.svg"
                      />
                    )}

                    <div
                      className={`flex flex-col ${jobDetailData?.status === "completed" &&
                        "opacity-[50%] !text-gray-300"
                        }`}
                    >
                      {jobDetailData?.event_location && (
                        <>
                          <div className=" text-[#161616] text-[16px] leading-normal font-[600]">
                            {loadingJobDetail ? (
                              <>
                                <div className="h-2 animate-pulse !bg-gray-200 rounded-full  w-20"></div>
                              </>
                            ) : (
                              formatLocation(jobDetailData?.event_location)
                                .firstPart
                            )}
                          </div>

                          <div className="text-[14px] font-[400] leading-[28px] text-[#6B6B6B]">
                            {loadingJobDetail ? (
                              <>
                                <div className="h-2 animate-pulse !bg-gray-200 rounded-full mt-2 w-40"></div>
                              </>
                            ) : (
                              formatLocation(jobDetailData?.event_location)
                                .secondPart
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>


          </section>

          {!storedData?.token && (
            <div className="max-w-[1279px] mx-auto flex mb-[200px]">
              <div className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1280"
                  height="117"
                  viewBox="0 0 1280 117"
                  fill="none"
                >
                  <path
                    d="M0.5 0H1280V85C1280 102.673 1265.67 117 1248 117H553.091C536.821 117 521.659 108.758 512.81 95.1047L465.671 22.3664C456.833 8.72871 441.694 0.489129 425.443 0.471112L0.5 0Z"
                    fill="#f3f0ff"
                  />
                </svg>
                <div className="relative bottom-[123px] top-[-102px] pl-[547px] flex justify-start items-center">
                  <p
                    className={`${montserrat.className} font-[400] tracking-[-1.28px] leading-normal text-[32px] mr-[26px] text-[black]`}
                  >
                    Please Login to continue
                  </p>
                  <svg
                    width="1"
                    height="90"
                    viewBox="0 0 1 90"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      x1="0.5"
                      y1="2.18556e-08"
                      x2="0.499996"
                      y2="90"
                      stroke="black"
                    />
                  </svg>
                  <div ref={loginMenuRef} className="relative">
                    {isMenuVisible && (
                      <div className="public-login-menu-box">
                        <LoginForm
                          isOpenresetPasswordModal={isOpenresetPasswordModal}
                          setIsOpenResetPasswordModal={setIsOpenResetPasswordModal}
                        />
                      </div>
                    )}
                    <button
                      onClick={toggleMenu}
                      className={`!tracking-[-2%] ml-[50px] rounded-[4px] !text-[#F3F0FF] !font-[400] !text-[14px] !leading-[24px] !py-[18px] !px-[64px] !bg-[#0d0a19] cursor-pointer grow_ellipse`}
                    >
                      Login
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {storedData?.token && (
            
            <div>
              {datas?.is_completed ? (
                <Completed
                  hourRate={
                    datas?.invite?.offered_price === "default"
                      ? datas?.myWorkingDetails?.per_hours_rate
                      : datas?.invite?.offered_price
                  }
                  myWorkingDetails={datas?.myWorkingDetails}
                  isAssignedToMe={datas?.is_assigned_to_me}
                />
              ) : datas?.is_assigned && datas?.is_assigned_to_me ? (
                <Assigned
                  hourRate={
                    datas?.invite?.offered_price === "default"
                      ? datas?.assigned_worker?.per_hours_rate
                      : datas?.invite?.offered_price
                  }
                  totalHours={datas?.total_hours} // Passing total_hours
                  totalIncome={datas?.total_income}
                  myWorkingDetails={datas?.assigned_worker}
                  clientName={datas?.job?.user?.name}
                />
              ) : datas?.is_assigned && !datas?.is_assigned_to_me ? (
                <AssignedToOther
                  hourRate={
                    datas?.invite?.offered_price === "default"
                      ? datas?.assigned_worker?.per_hours_rate
                      : datas?.invite?.offered_price
                  }
                  totalHours={datas?.total_hours} // Passing total_hours
                  totalIncome={datas?.total_income}
                  myWorkingDetails={datas?.myWorkingDetails}
                />
              ) : !datas?.has_offered ? (
                <Offered jobId={jobId} hourRate={getHourlyRate()} hoursWorked={hoursWorked} />
              ) : (
                <AlreadyOffered
                  hourRate={
                    datas?.invite?.offered_price === "default"
                      ? parseInt(datas?.myWorkingDetails?.per_hour_rate) // Convert to integer
                      : parseInt(datas?.invite?.offered_price) // Convert to integer
                  }
                  totalHours={datas?.total_hours} // Passing total_hours
                  totalIncome={datas?.total_income}
                />
              )}
            </div>
          )}
        </div>
      </div>

    </>
  );
}
};

export default JobDetailWorker;
