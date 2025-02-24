"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Header from "../../../_components/ui/header";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { DatePicker } from "../../../_components/ui/job-create/date-picker";
import TimePicker from "../../../_components/ui/time-picker";
import HoursPicker from "../../../_components/ui/job-create/hours-picker";
import { CiWarning } from "react-icons/ci";
import { CiCircleInfo } from "react-icons/ci";
import { MdOutlineChevronLeft } from "react-icons/md";
import RecommendedTalent from "../../../_components/booking/recommended-talent";
import BottomBar from "../../../_components/booking/recommended-talent/BottomBar";
import { useDispatch, useSelector } from "react-redux";
import {
  resetJobCreate,
  setSelectedLocation,
} from "../../../lib/store/features/jobCreateSlice";
import { RootState } from "../../../lib/store/store";
import ServicesDetail from "../../../_components/ui/job-create/services-detail";
import AddJobGuide from "../../../_components/ui/add-job-guide";

const SearchBox = dynamic<any>(
  () => import("@mapbox/search-js-react").then((mod) => mod.SearchBox as any),
  { ssr: false }
);
type Step = {
  label: string;
  icon: JSX.Element;
  component: JSX.Element;
};

const AddJobDesktop: React.FC = () => {
  const [step, setStep] = useState<number>(0);
  const {
    register,
    trigger,
    handleSubmit,
    clearErrors,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    mode: "onSubmit",
  });
  const router = useRouter();
  const dispatch = useDispatch();
  const [selectedAddress, setSelectedAddress] = useState("");
  const [isFocus, setIsFocus] = useState(true);
  const [locationError, setLocationError] = useState("Please select a location from the dropdown.");
  const [eventDateError, setEventDateError] = useState("");
  const [eventStartTimeError, setEventStartTimeError] = useState("");
  const [eventDurationrror, setEventDurationError] = useState("");
  const [eventTitleError, setEventTitleError] = useState("");
  const [eventDescriptionError, setEventDescriptionError] = useState("");
  const [yesFocusActive, setYesFocusActive] = useState(false);

  const searchBoxRef = useRef<HTMLDivElement | null>(null);
  const jobCreateState = useSelector((state: RootState) => state.jobCreate);
  const [selectedTalentsLocal, setSelectedTalentsLocal] = useState<any>(
    jobCreateState?.selectedTalents ? jobCreateState?.selectedTalents : []
  );
  const stepLabels = [
    "event-location",
    "date-time",
    "service-details",
    "recommended-talents",
  ];
  const [stepInQuery, setStepInQuery] = useState("");
  const [jobIdInQuery, setJobIdInQuery] = useState<any>(null);

  useEffect(() => {
    setTimeout(() => {
      const inputElement =
        document.querySelector<HTMLInputElement>("[class*='--Input']");
      inputElement?.click();
      inputElement?.focus();
    }, 1000);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const queryParams = new URLSearchParams(window.location.search);
      const queryStep = queryParams.get("step");
      setStepInQuery(queryStep ?? "");
      const job_id = queryParams.get("jobId");
      if (queryStep === "invite-more-talents") {
        setStep(3);
        setStepInQuery("invite-more-talents");
        setJobIdInQuery(job_id);
      } else if (stepLabels.includes(queryStep as any)) {
        const stepIndex = stepLabels.indexOf(queryStep as any);
        setStep(stepIndex);
      }
    }
  }, [router]);

  useEffect(() => {
    const handleFocus = () => {
      setIsFocus(true);
      if (!yesFocusActive) {
        setYesFocusActive(true);
      }
    };

    const handleBlur = () => setIsFocus(true);

    const searchBoxElement = searchBoxRef.current;

    if (searchBoxElement) {
      searchBoxElement.addEventListener("focus", handleFocus, true);
      searchBoxElement.addEventListener("blur", handleBlur, true);
    }
    return () => {
      if (searchBoxElement) {
        searchBoxElement.removeEventListener("focus", handleFocus, true);
        searchBoxElement.removeEventListener("blur", handleBlur, true);
      }
    };
  }, []);

  useEffect(() => {
    let timeoutId: any;

    if (!selectedAddress && !isFocus && yesFocusActive) {
      timeoutId = setTimeout(() => {
        setLocationError("Please select a location from the dropdown.");
      }, 300);
    } else {
      setLocationError("");
    }

    // Cleanup function to clear the timeout if dependencies change
    return () => {
      clearTimeout(timeoutId);
    };
  }, [selectedAddress, isFocus, yesFocusActive]); // Ensure `yesFocusActive` is included in the dependency array  
  
  
  
  // useEffect(() => {
  //     const queryParams = new URLSearchParams(window.location.search);
  //     if (queryParams.get('step')) {
  //         queryParams.set('step', 'event-location');
  //         router.replace(`${window.location.pathname}?${queryParams.toString()}`);
  //     }
  // }, [stepInQuery]);

  const handleNext = () => {
    if (
      step === 0 &&
      (!jobCreateState?.selectedLocation || locationError !== "")
    ) {
      setLocationError("Please select a location from the dropdown.");
      return;
    }
    if (
      step === 1 &&
      (!jobCreateState?.selectedDate ||
        jobCreateState?.selectedTime === "" ||
        jobCreateState?.selectedTime === "" ||
        jobCreateState?.selectedHours === "")
    ) {
      if (!jobCreateState?.selectedDate) {
        setEventDateError("Don't forget to choose your event date!");
      }
      if (jobCreateState?.selectedTime === "") {
        setEventStartTimeError("Don't forget to choose your event start time!");
      }
      if (jobCreateState?.selectedHours === "") {
        setEventDurationError("Don't forget to choose your event duration!");
      }
      return;
    }
    if (
      step === 2 &&
      (jobCreateState?.title === "" || jobCreateState?.eventDescription === "")
    ) {
      if (jobCreateState?.title === "") {
        setEventTitleError("Title is required.");
      }
      if (jobCreateState?.eventDescription === "") {
        setEventDescriptionError("Description is required.");
      }
      return;
    }
    if (step < steps.length - 1) {
      setStep((prev) => prev + 1);
      updateQueryParam(step + 1);
    }
  };

  const handleBack = () => {
    if (stepInQuery === "invite-more-talents") {
      let url;
      const baseUrl = process.env.NEXT_PUBLIC_CLIENTHUB_URL ?? "";
      url = `${baseUrl}/events/detail/${jobIdInQuery}`;
      router.push(url);
    } else if (step > 0) {
      setStep((prev) => prev - 1);
      updateQueryParam(step - 1);
    } else if (step === 0) {
      router.push(process.env.NEXT_PUBLIC_BASE_URL ?? "");
    }
  };

  const updateQueryParam = (stepIndex: number) => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("step", stepLabels[stepIndex]);
    router.push(`${window.location.pathname}?${queryParams.toString()}`);
  };

  const handleInputChange = (event: any) => {
    if (event?.features?.length > 0) {
      //setHoveredIndex(0);
      let full_address = event.features[0]?.properties?.full_address || "";
      full_address = full_address.replace(/,\s*(united states|usa)$/i, "");
      setSelectedAddress(full_address);
      dispatch(setSelectedLocation(full_address));
      if (full_address) {
        setLocationError("");
      }
      setValue("event_location", full_address);
    } else {
      setSelectedAddress("");
      setValue("event_location", null);
    }
  };
  const handleClear = () => {
    setSelectedAddress("");
    setIsFocus(true);
    setValue("event_location", null);
    dispatch(setSelectedLocation(""));
  };

  const steps: Step[] = [
    {
      label: "Location",
      icon: (
        <Image src="/icons/map.svg" height={24} width={24} alt="location" />
      ),
      component: (
        <div className="max-w-full  ">
          <h2 className="text-[26px] font-[500] leading-[24px] mb-[36px]  text-[#000000] ">
            Where will the event be held?
          </h2>

          <div className="relative !w-full flex mt-[12px]">
            <div className="w-full max-w-full overflow-hidden">
              <div className="w-auto h-8 top-[11px] left-[2px] rounded-[8px] bg-[#FFF] absolute z-[999]">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    className="ml-2 relative top-[8px] flex justify-center items-center"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z"
                      stroke="#9F9F9F"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14 14.0001L11.1 11.1001"
                      stroke="#9F9F9F"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
              <div
                ref={searchBoxRef}
                className={`search-container ${
                  isFocus ? "focused-style" : "blurred-style"
                }`}
              >
                <div
                  className="rounded-[8px] border min-h-[58px] h-fit bg-white"
                  style={{
                    border: !!locationError
                      ? "1px solid #FF8F8F"
                      : "1px solid #EFEFEF",
                    // boxShadow: !!locationError
                    //   ? " 0px 0px 20px 0px rgba(194, 0, 0, 0.22)"
                    //   : "",
                    boxShadow: "0px 4px 24px 0px rgba(147, 147, 147, 0.05)"
                  }}
                >
                  <SearchBox
                    onClear={handleClear}
                    onRetrieve={handleInputChange}
                    value={
                      jobCreateState?.selectedLocation
                        ? jobCreateState?.selectedLocation
                        : selectedAddress
                    }
                    className="custom-search-box"
                    accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
                    placeholder="Enter your event's ZIP code to get started"
                    options={{
                      country: "US",
                      bbox: [-118.9379, 33.6278, -117.5786, 34.7671],
                      // bbox: [-118.7913, 33.7037, -118.1514, 34.3373],
                    }}
                    theme={{
                      variables: {
                        padding: "14px 10px 14px 20px",
                        borderRadius: "8px",
                        fontFamily: "Poppins, sans-serif",
                        unit: "14px",
                        boxShadow: "0px 4px 24px 0px rgba(147, 147, 147, 0.05)",
                        fontWeight: "400",
                        // minHeight: "60px",
                        height: "56px",
                        background: "red",
                        color: "red",
                        fontSize: "14px",
                      },
                    }}
                  />
                </div>
                <p
                  className={`text-[#C20000] text-[12px] pt-[5px] font-[400] leading-[20px] transition-opacity duration-200 ease-linear ${
                    locationError ? "opacity-100" : "opacity-0"
                  } ${locationError ? "max-h-20" : "max-h-0"} overflow-hidden`}
                >
                  {locationError}
                </p>
              </div>
              <div
                className={`flex justify-end items-center ${
                  !!locationError
                    ? "relative right-[30px] bottom-[54px] transition-all duration-200 ease-linear text-[#C20000]"
                    : "opacity-0"
                }`}
              >
                <CiWarning size={26} className="absolute" />
              </div>
              <div className="flex w-full px-[12px] py-[16px] mt-4 items-start gap-[12px] rounded-[4px] border border-dashed border-[#FFE0B0] bg-[#FFF7EC]">
                <div className="text-[#C08328] text-[32px]">
                  <CiCircleInfo />
                </div>
                <hr className="w-[1px] h-[61px] bg-[#F9E1BE]" />
                <div className="flex gap-[12px] flex-col items-start">
                  <p className="text-[#161616] font-poppins font-medium text-[16px] leading-[8px]">
                    We’re currently available in Los Angeles.
                  </p>
                  <p className="text-[#4C4B4B] font-poppins font-normal text-[14px] leading-[24px]">
                    If you can't find your location, then select the nearest
                    one. You'll be able to chat with the Talent later and share
                    details.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex   custom-input-wrapper"></div>
          </div>
        </div>
      ),
    },
    {
      label: "Date & time",
      icon:
        step >= 1 ? (
          <Image src="/icons/time.svg" height={23} width={23} alt="time" />
        ) : (
          <Image src="/icons/time-fill.svg" height={23} width={23} alt="time" />
        ),
      component: (
        <div>
          <h2
            className={`text-[26px] font-[500] leading-[20.4px] mb-3 text-[#000000]`}
          >
            When is your event happening?{" "}
          </h2>
          <p className="text-[#6B6B6B] font-[400] leading-[24px] text-[14px] mb-[34px]">
            Choose the date and time, then let us know how long you’ll need our
            talent on site.
          </p>

          <div className="space-y-8">
            <DatePicker
              eventDateError={eventDateError}
              setEventDateError={setEventDateError}
            />
            <TimePicker
              eventStartTimeError={eventStartTimeError}
              setEventStartTimeError={setEventStartTimeError}
            />
            <HoursPicker
              eventDurationrror={eventDurationrror}
              setEventDurationError={setEventDurationError}
            />
          </div>
        </div>
      ),
    },
    {
      label: "Service Details",
      icon:
        step >= 2 ? (
          <Image
            src="/icons/bartender-icon.svg"
            height={24}
            width={24}
            className="relative right-[2px]"
            alt="bartender-icon"
          />
        ) : (
          <Image
            src="/icons/bartender-fill-icon.svg"
            className="relative right-[2px]"
            height={24}
            width={24}
            alt="bartender-icon"
          />
        ),
      component: (
        <ServicesDetail
          eventTitleError={eventTitleError}
          setEventTitleError={setEventTitleError}
          eventDescriptionError={eventDescriptionError}
          setEventDescriptionError={setEventDescriptionError}
          setSelectedTalentsLocal={setSelectedTalentsLocal}
        />
      ),
    },
    {
      label: "Invite Talent",
      icon:
        step >= 3 ? (
          <Image
            src="/icons/user-plus-fill.svg"
            height={23}
            width={23}
            className="relative right-[2px] left-[2px] bottom-[4px]"
            alt="invite-talent"
          />
        ) : (
          <Image
            src="/icons/user-plus.svg"
            className="relative right-[2px] left-[2px] bottom-[4px]"
            height={24}
            width={24}
            alt="bartender-icon"
          />
        ),
      component: (
        // <div className="md:w-[55%] lg:w-[100%] xl:w-[100%] 2xl:w-full ">
        <div className="">
          <h2 className="text-[26px] font-[500] leading-[24px] mb-[46px] text-[#000000]">
            Invite talent to receive offers.
          </h2>
          <div className="max-h-[100%] mb-[-50px]">
            <RecommendedTalent
              setSelectedTalentsLocal={setSelectedTalentsLocal}
              selectedTalentsLocal={selectedTalentsLocal}
            />
          </div>
          {/* Bottom section that shows up if at least one talent is selected */}
          <BottomBar
            selectedTalentsLocal={selectedTalentsLocal}
            setStep={setStep}
          />
        </div>
      ),
    },
  ];

  if (stepInQuery === "") {
    return <AddJobGuide setStepInQuery={setStepInQuery} />;
  } else {
    return (
      <>
        <Header />
        <div className="bg-gray-50 ">
        <div
          className={`${
            step === 2 && "pb-[190px]"
          } flex flex-col w-full max-w-[1280px] min-h-[100vh] mx-auto px-6`}
        >
          <div className=" w-full pt-[85px]">
            <Link href="/">
              <span className="text-[#2C2240] text-[14px] font-[600] leading-[24px]">
                Home
              </span>
            </Link>{" "}
            <span className="inline-block w-[5px] text-[11px]">/</span>{" "}
            <span className="text-[#6B6B6B] font-[400] leading-[24px] text-[14px]">
              {"Add Event Details"}
            </span>
          </div>
          <div
            className={`gap-12 ${
              step !== 3 && "h-[100%]"
            } bg-gray-50 w-full flex pt-[80px]`}
          >
          
            <div className="md:min-w-[180px] bg-gray-50 py-4 flex flex-col items-center relative pt-[1px]">
              {steps.map((stepItem, index) => (
                <div
                  key={index}
                  className="relative flex flex-col items-start w-full mb-6"
                >
    
                  {index < steps.length - 1 && (
                    <span
                      className={`absolute left-[11px] transform   ${
                        step === 3 && stepItem.label === "Service Details"
                          ? "top-[33px]"
                          : "top-[28px]"
                      } ${
                        step === 3 && stepItem.label === "Service Details"
                          ? "!h-[72%]"
                          : "h-[84%]"
                      } w-[1.5px] ${
                        index < step ? "bg-[#774DFD]" : "bg-[#6B6B6B] opacity-0"
                      }`}
                      style={{ zIndex: 0 }}
                    ></span>
                  )}

         
                  <div className="relative z-10 mb-2">
                    <div
                      className={`flex items-center justify-center ${
                        index === step ? "text-blue-500" : "text-[#6B6B6B]"
                      }`}
                    >
                      {stepItem.icon}
                    </div>
                  </div>

            
                  <div
                    // onClick={() => handleClickStep(index)}
                    className={`text-left relative bottom-[34.2px] transition-colors ml-12 !leading-[24px] font-[600] text-[16px] ${
                      index === step
                        ? "text-[#774DFD]"
                        : "text-[#6B6B6B] !font-[400] leading-[24px]"
                    }`}
                  >
                    {stepItem.label}
                  </div>
                </div>
              ))}
            </div>

        
            <div
              className={`flex flex-col w-full relative bottom-[46px] ${
                step !== 3 && "pr-[38%]"
              }`}
            >
              <div
                onClick={() => {
                  handleBack();
                }}
                className="!text-[#6B6B6B] flex justify-start items-center  cursor-pointer !leading-[24px] !font-[400] !text-[14px]"
              >
                <span className="mr-1 ">
                  <MdOutlineChevronLeft className="text-[#6B6B6B]" size={20} />
                </span>
                <span>
                  {stepInQuery === "invite-more-talents"
                    ? `Back to Client Hub`
                    : `Back to ${
                        step === 0
                          ? "Home"
                          : step === 1
                          ? "Location"
                          : step === 2
                          ? "Date & Time"
                          : "Service Details"
                      }`}
                </span>
              </div>
              <motion.div
                key={step}
                className="mt-[24px]"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 2, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {steps[step].component}
                {step !== 3 && (
                  <div
                    className={`transition-all duration-200 !ease-linear flex justify-end ${
                      locationError
                        ? "translate-y-[41px]"
                        : "translate-y-[34px]"
                    }`}
                  >
                    <div
                      onClick={() => {
                        if (step > 0) handleBack();
                      }}
                      className={`px-4 py-2 text-[#161616] flex justify-center items-center leading-[26px] font-[400] text-[16px] ${
                        step === 0
                          ? "cursor-not-allowed opacity-50"
                          : "cursor-pointer"
                      }`}
                    >
                      Back
                    </div>

                    <button
                      onClick={handleNext}
                      className="bg-[#350ABC] ml-8 py-[12px] text-[16px] px-[32px] font-[400] leading-[26px] text-[#e0d9f8] rounded-[4px]"
                    >
                      {step === steps.length - 1 ? "Continue" : "Continue"}
                    </button>
                  </div>
                )}
              </motion.div>
            </div>
          </div> 
          </div> 
        </div>
      </>
    );
  }
};

export default AddJobDesktop;
