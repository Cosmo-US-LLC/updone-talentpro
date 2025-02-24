import { Button } from "@/components/ui/button";
import React, { useState, useEffect, useRef } from "react";
import { GoChevronDown } from "react-icons/go";
import { CiCircleInfo } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/lib/store/store"; // Import the root state
import { setSelectedHours } from "@/app/lib/store/features/jobCreateSlice"; // Redux action to set hours

const HoursPickerMobile = ({
  eventDurationrror,
  setEventDurationError,
}: any) => {
  const dispatch = useDispatch();
  const selectedHours = useSelector(
    (state: RootState) => state.jobCreate.selectedHours
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 700);
  const hoursOptions = Array.from({ length: 7 }, (_, i) => `${i + 2} hours`);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<HTMLLIElement | null>(null);


  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (hours: string) => {
    dispatch(setSelectedHours(hours)); // Persist the selected hours to Redux
    setIsOpen(false);
    setEventDurationError("");
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };
  const handelModelCloseClick = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 700);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isOpen && selectedRef.current) {
      selectedRef.current.scrollIntoView();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div>
      <div className="flex justify-start items-center">
        <div ref={dropdownRef} className="relative w-[123px] ">
          <p className="text-[14px] pl-[3px] font-[500]  mb-2 text-[#161616] w-[200px]">
            Approx Event Duration
            <span className="text-[#C20000]"> *</span>
          </p>
          <div
            onClick={toggleDropdown}
            className=" flex justify-center items-center !cursor-pointer relative !left-[37px]"
          >
            <Button
              className={`${eventDurationrror !== ""
                ? "shadow-[0px_0px_20px_0px_rgba(194,0,0,0.22)]"
                : ""
                } w-full py-2 pl-4 pr-[10rem] flex justify-start items-center border ${eventDurationrror === ""
                  ? "border-[#EFEFEF]"
                  : "border-[#FF8F8F]"
                } rounded-md bg-white h-[56px] hover:text-gray-600 hover:bg-gray-50`}
              style={{
                color: "#9F9F9F",
                fontSize: "14px",
                fontWeight: "400",
              }}
            >
              {selectedHours || (
                <span className="text-[#9F9F9F] font-[400] leading-[24px] text-[14px]">
                  Select no. of hours
                </span>
              )}
            </Button>
            <span className="relative left-[-27px] z-[999] text-[#9F9F9F]">
              <GoChevronDown size={20} />
            </span>
          </div>
          {isOpen &&
            (isSmallScreen ? (
              // Code for mobile screens
              <div
                className="fixed inset-0 z-[99999] flex items-center justify-center bg-black bg-opacity-50"
                onClick={handelModelCloseClick}
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white rounded-lg shadow-lg p-4 w-[90%] max-w-sm">
                  <ul
                    className="py-[4px] px-[8px] w-full mt-1 rounded-md bg-white !z-40 min-w-48 overflow-y-auto"
                    style={{
                      height: "320px",
                      scrollbarWidth: "none",
                      msOverflowStyle: "none",
                    }}
                  >
                    {hoursOptions.map((hours, index) => (
                      <li
                        key={index}
                        ref={selectedHours === hours ? selectedRef : null}
                        onClick={() => handleSelect(hours)}
                        // className={`flex items-center justify-between py-[12px] px-[8px] cursor-pointer text-[#6B6B6B] font-[400] leading-[20px] text-[14px] 
                        //             hover:bg-[#F9F7FF] rounded-[4px] transition-colors duration-200 ease-linear`}
                        className={`flex items-center justify-between py-[12px] px-[8px] cursor-pointer text-[#6B6B6B] font-[400] leading-[20px] text-[14px] 
                                      ${selectedHours === hours ? 'bg-[#F9F7FF] text-[#774DFD] rounded-[4px] ' : 'hover:bg-[#F9F7FF] !rounded-[4px]'} 
                                      transition-colors duration-200 ease-linear`}
                      >
                        <span>{hours}</span>
                        {selectedHours === hours && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            style={{ color: '#774DFD' }}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              // Code for desktop screens
              <ul
                className="absolute py-[4px] px-[8px] w-full mt-1 border border-[#EBE6FF] rounded-md bg-white !z-40 min-w-48 overflow-y-auto"
                style={{
                  height: "200px",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                {hoursOptions.map((hours, index) => (
                  <li
                    key={index}
                    onClick={() => handleSelect(hours)}
                    className={`flex items-center justify-between py-[12px] px-[8px] cursor-pointer text-[#6B6B6B] font-[400] leading-[20px] text-[14px] 
                                    hover:bg-[#F9F7FF] rounded-[4px] transition-colors duration-200 ease-linear`}
                  >
                    <span>{hours}</span>
                  </li>
                ))}
              </ul>
            ))}
        </div>
      </div>
      <p className="pt-2 font-[500] leading-[18px] flex justify-start items-center gap-2 text-[12px] text-[#F79809]">
        <CiCircleInfo size={20} /> minimum 2 hours of booking is required.
      </p>
      <p
        className={`text-[#C20000] text-[12px] pt-[5px] font-[400] leading-[20px] transition-opacity duration-500 ease-linear ${eventDurationrror !== "" ? "opacity-100" : "opacity-0"
          } ${eventDurationrror !== "" ? "max-h-20" : "max-h-0"} overflow-hidden`}
      >
        {eventDurationrror}
      </p>
    </div>
  );
};

export default HoursPickerMobile;
