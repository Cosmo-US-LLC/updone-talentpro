"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import Image from "next/image";
import MobileNavbar from "@/app/_components/mobile/MobileNavbar";
import { useParams } from "next/navigation";
import { useError } from "@/app/lib/context/ErrorProvider";
import { selectAuth } from "@/app/lib/store/features/authSlice";
import { useAppSelector } from "@/app/lib/store/hooks";
import { apiRequest } from "@/app/lib/services";
import { useRouter } from "next/navigation";
import { Loader2 } from 'lucide-react';

const page: React.FC = () => {
  const { id: jobId } = useParams();
  const router = useRouter();
  const { auth: storedData } = useAppSelector(selectAuth);
  const [isLoading, setIsLoading] = useState(true);
  const { handleError } = useError();
  const [isChecked, setIsChecked] = useState<boolean>(false); // Checkbox state
  const [showNewDiv, setShowNewDiv] = useState<boolean>(false);
  const [showReceipt, setShowReceipt] = useState<boolean>(false);
  const [jobData, setJobData] = useState<any>([]);
  const [datas, setDatas] = useState<any>([]);
  const [additionalHours, setAdditionalHours] = useState<number | "">(); // Store user input for additional hours
  const hourlyRate = Math.floor(parseFloat(jobData?.per_hour_rate) || 0);
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const additionalIncome = additionalHours
    ? Math.floor(Number(additionalHours) * hourlyRate)
    : 0;

  useEffect(() => {
    const getJobDetailsApi = async () => {
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
        setJobData(newData);
        setShowReceipt(newData?.payment_status !== "release_pending");
      } catch (error) {
        console.error("following is error: ", error);
      } finally {
        setIsLoading(false); // Set loading to false after data is fetched
      }
    };
    getJobDetailsApi();
  }, []);

  const handleRequestRelease = async () => {
    setIsButtonLoading(true);
    const body = {
      job_id: Number(jobId),
      with_settlement: isChecked,
      settlement_amount: isChecked ? additionalIncome : 0,
      extra_hours: isChecked ? additionalHours : 0,
    };

    try {
      const newData = await apiRequest(
        `/job/requestReleasePayment`,
        {
          method: "POST",
          body,
          headers: {
            ...(storedData && {
              Authorization: `Bearer ${storedData.token}`,
            }),
          },
        },
        handleError
      );
      setJobData((prevData: any) => ({
        ...prevData,
        payment_status: "release_requested",
      }));

      setShowReceipt(true);
    } catch (error) {
      console.error("Error requesting payment release:", error);
    } finally {
      setIsButtonLoading(false);
    }
  };

  // Handle checkbox change
  const handleTextLink = () => {
    setIsChecked((prev) => !prev); // Toggle the state
  };


  const handleButtonClick = () => {
    if (isChecked) {
      setShowNewDiv(true);
    } else {
      setShowReceipt(true); // Directly show receipt if no additional hours
    }
  };

  const handleCloseClick = () => {
    setShowNewDiv(false);
    setIsChecked(false);
  };

  const handleBackToJobDetails = () => {
    // Navigate to the specific job detail page using the job ID
    setIsButtonLoading(true);
    router.push(`/staff/job-detail/${jobId}`);
  };

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const value = e.target.value;
  //     const parsedValue = value === "" ? "" : parseInt(value, 10);
  //     if (!isNaN(parsedValue) || value === "") {
  //         setAdditionalHours(parsedValue);
  //     }
  // };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[100dvh]">
        <div className="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!jobData) {
    return (
      <div className="flex flex-col items-center justify-center h-[100dvh]">
        <p className="text-gray-600">Failed to load job details. Please try again later.</p>
      </div>
    );
  }

  if (jobData?.job?.status !== "completed") {
    return (
      <div className="flex flex-col h-[100dvh]">
        <MobileNavbar />
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-gray-600">Job not completed yet.</p>
          <p
            onClick={() => { location.reload() }}
            className="text-blue-400 text-center">Refresh
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[100dvh]">
      <div>
        <MobileNavbar />
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-40">
        {" "}
        {/* Added padding-bottom */}
        {!showReceipt ? (
          <>
            <div className="flex justify-center mt-[120px]">
              <div className="flex flex-col items-center w-[349px] border-2 border-gray-200 rounded-xl bg-[#e0daf9] px-[11.831px] py-[15.774px]">
                <div className="mb-6">
                  <Image
                    src={jobData?.myWorkingDetails?.profile_pic}
                    className="rounded-[50%] border-2 border-white bg-[#F3F0FF]"
                    width={130}
                    height={130}
                    alt="profile_pic"
                  />
                </div>
                <div className="mb-2">
                  <h6 className="text-[26px] font-normal">
                    Good Work, {jobData?.myWorkingDetails?.full_name}
                  </h6>
                </div>
                <div className="mb-2 pb-8 border-b-2 w-full">
                  {
                    jobData.payment_status === "release_pending" &&
                    <div className="flex flex-row items-center justify-center w-full pl-8">
                      <h6 className="text-[15px] font-normal">
                        Let's ask the client to release your payment.
                      </h6>
                    </div>
                  }
                  {
                    jobData.payment_status === "release_requested" &&
                    <div className="flex flex-row items-center justify-center w-full rounded-xl border-1 border-yellow-400 bg-[#fdf3e0] h-[80px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ height: "50px", width: "50px" }}
                        className="text-yellow-800 mb-2 pl-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          fill="none"
                        />
                        <path
                          d="M9 12l2 2 4-4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <h6 className="text-[14px] flex justify-center items-center pl-4 font-[500] text-yellow-800">
                        Your payment has been requested successfully!
                      </h6>
                    </div>
                  }
                </div>
                <div className="text-[40px] font-[500]">
                  <span className="tracking-[-6px]">$ </span>
                  <span>{jobData.total_income}</span>
                </div>
                <div className="text-[13px] font-light">Total amount.</div>
              </div>
            </div>

            {/* Conditional Rendering */}
            {
              jobData.payment_status === "release_pending" &&
              <>
                {isChecked || showNewDiv ? (
                  <>
                    <div className="flex justify-center mt-[30px] mb-4">
                      <div
                        className={`w-[349px] flex flex-col rounded-xl shadow-xl border-1 px-[11.831px] py-[15.774px] ${jobData.payment_status === "release_requested"
                          ? "bg-gray-200 cursor-not-allowed"
                          : "bg-white"
                          }`}
                      >
                        <div className="pl-4 flex justify-between">
                          <h6 className="text-[20px] font-[400]">
                            Add Additional Hours
                          </h6>
                          <button
                            className="text-[30px] relative top-[-8px] font-normal text-gray-500 hover:text-gray-700 hover:bg-transparent focus:outline-none"
                            onClick={handleCloseClick}
                            disabled={
                              jobData.payment_status === "release_requested"
                            }
                          >
                            ×
                          </button>
                        </div>
                        <div className="text-[16px] pl-4 mb-4">
                          <div className="flex space-x-4">
                            {[1, 2, 3, 4].map((hour) => (
                              <button
                                key={hour}
                                className={`w-[70px] px-2 py-2 border rounded-xl ${additionalHours === hour
                                  ? "bg-[#2C2240] text-white"
                                  : "bg-gray-100 text-gray-800 hover:bg-gray-100 hover:text-gray-800"
                                  } ${jobData.payment_status === "release_requested"
                                    ? "cursor-not-allowed"
                                    : "hover:bg-[#2C2240]"
                                  }`}
                                onClick={() =>
                                  jobData.payment_status !== "release_requested" &&
                                  setAdditionalHours((prev) =>
                                    prev === hour ? undefined : hour
                                  )
                                }
                                disabled={
                                  jobData.payment_status === "release_requested"
                                }
                              >
                                {hour} hr{hour > 1 ? "s" : ""}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="pl-4 flex flex-row">
                          <div className="flex flex-col items-start border-r-2 border-gray-200 pr-16">
                            <p className="text-[14px] font-normal">Hourly Rate</p>
                            <h2 className="font-semibold">${hourlyRate}</h2>
                          </div>
                          <div className="flex flex-col items-start px-4">
                            <p className="text-[14px] font-normal">
                              Additional Income
                            </p>
                            <h2 className="font-semibold">${additionalIncome}</h2>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end mt-4 pb-2 border-b-2 mr-6">
                      <span className="text-[16px] relative top-[14px] mr-1">
                        Total Income
                      </span>
                      <span className="text-[32px] font-[500]">
                        $
                        {Math.floor(
                          Number(jobData.total_income) + additionalIncome
                        )}
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className=" w-[349px] m-6">
                      <h6 className="text-[20px] font-[400] mb-2">Did you work extra hours?</h6>
                      <button
                        onClick={handleTextLink}
                        className="text-[#350ABC] text-[16px] font-[500] underline hover:text-[#2C2240] transition-all duration-200"
                      >
                        Tap to request additional payment
                      </button>
                    </div>
                  </>
                )}
              </>
            }
          </>
        ) : (
          <>
            <div className="flex flex-col h-[100vh] justify-center px-8">
              <div className="flex flex-col items-center   ">
                <div className="mb-6">
                  <Image
                    src="/images/OBJECTS.svg"
                    className=""
                    width={208}
                    height={216}
                    alt=""
                  />
                </div>
                <div className=" mb-14 flex flex-col gap-4">
                  <h6 className="text-[24px] font-[500]">
                    {
                      jobData?.payment_status === "release_approved" ?
                        `Your Payment has been released by ${jobData?.myWorkingDetails?.full_name?.split(" ")[0]}`
                        :
                        `Invoice has been sent to your client ${jobData?.job?.user?.name}`
                    }
                  </h6>
                  {
                    jobData?.payment_status === "release_requested" &&
                    <p className=" text-[16px] font-[400]">
                      You will receive your payment in <br /> 2-3 working days.
                    </p>
                  }
                  {
                    jobData?.payment_status === "release_requested" &&
                    <p className=" text-[12px] italic font-[400]">
                      <em>The client will have the option to tip <br />
                        before the final payment!</em>
                    </p>
                  }
                </div>
              </div>

              {/* <div className="flex justify-center mt-[50px] mb-6">
                <div className="flex items-start justify-between">
                  <button
                    className="text-[#FFF] mt-6 py-[16px] px-[50px] mx-auto rounded-full leading-[16px] font-[400] text-[16px] bg-[#2C2240] hover:bg-[#6b46ff]"
                    onClick={handleBackToJobDetails}
                  >
                    Back to job details
                  </button>
                </div>
              </div> */}
            </div>
          </>
        )}
      </div>

      {/* Fixed Bottom Div */}
      <div
        style={{ boxShadow: "0 -8px 12px rgba(0, 0, 0, 0.1)" }}
        className="fixed bottom-0 left-0 w-full bg-white rounded-t-3xl shadow-xl z-10"
      >
        {/* <div className="flex justify-center items-center font-light pl-4 text-sm">
          <h6>
            The client will have the option to tip <br />
            <span className="pl-6">before the final payment!</span>
          </h6>
        </div> */}
        <div className="flex justify-center  py-6  ">
          {jobData?.payment_status === "release_requested" ? (
            <button
              disabled={isButtonLoading}
              className="text-[#FFF] py-[16px] min-w-[250px] mx-auto rounded-full leading-[16px] font-[400] text-[16px] bg-[#350ABC]"
              onClick={handleBackToJobDetails}
            >
              {isButtonLoading ? (
                <Loader2 className="w-5 h-5 animate-spin mx-auto" />
              ) : (
                "Back to job details"
              )}
            </button>
          ) : (
            <button
              className={`bg-[#350ABC] min-w-[250px] text-[#FFF] py-[16px] mx-auto rounded-full leading-[16px] font-[400] text-[16px]`}
              onClick={() => {
                if (jobData.payment_status !== "release_requested") {
                  if (jobData.payment_status === "release_approved") {
                    setIsButtonLoading(true);
                    router.push(`/staff/job-detail/${jobId}`);
                  } else {
                    if (isChecked && !showNewDiv) {
                      setShowNewDiv(true);
                      setIsButtonLoading(false);
                    } else if (isChecked && showNewDiv) {
                      handleRequestRelease();
                    } else {
                      handleRequestRelease();
                    }
                  }
                }
              }}
              disabled={jobData.payment_status === "release_requested" || isButtonLoading || jobData?.job?.status !== "completed"}
            >
              {jobData.payment_status === "release_requested"
                ? "Request Submitted!"
                :
                jobData?.payment_status === "release_approved" ?
                  <span className="flex items-center justify-center space-x-2">
                    {isButtonLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      "Go to Event Details"
                    )}
                  </span>
                  :
                  <span className="flex items-center justify-center space-x-2">
                    {isButtonLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      "Request Payment Release"
                    )}
                  </span>
              }
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
