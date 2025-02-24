import { useState, useEffect, useRef } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarStyles.css"; // Import custom CSS file
import { montserrat } from "@/app/lib/Fonts";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { setSelectedWorkingHours } from "@/app/lib/store/features/bookingSlice";
import { CiCircleInfo } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";

// Define available hours and AM/PM options
const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
const amPm = ["AM", "PM"];

interface CustomDropdownProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  label: string;
  amPm?: string[];
  setStartAmPm?: (option: string) => void;
  startAmPm?: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  disabledOptions?: string[];
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  startAmPm,
  setStartAmPm,
  amPm,
  options,
  value,
  onChange,
  label,
  isOpen,
  setIsOpen,
  disabledOptions = [],
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToSelectedItem = () => {
    if (dropdownRef.current) {
      const itemHeight = 24;
      const selectedItem = dropdownRef.current.querySelector(
        `button[data-value="${value}"]`
      );
      if (selectedItem) {
        const containerHeight = dropdownRef.current.clientHeight;
        const itemOffset =
          selectedItem.getBoundingClientRect().top -
          dropdownRef.current.getBoundingClientRect().top;
        const scrollTop =
          itemOffset - containerHeight / 2 + selectedItem.clientHeight / 2;
        dropdownRef.current.scrollTo({
          top: scrollTop,
          behavior: "smooth",
        });
      }
    }
  };

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  const handleScroll = (direction: "up" | "down") => {
    if (dropdownRef.current) {
      const scrollAmount = 80;
      dropdownRef.current.scrollBy({
        top: direction === "up" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClose]);

  useEffect(() => {
    if (isOpen) {
      scrollToSelectedItem();
    }
  }, [isOpen, value]);

  return (
    <div className={`relative z-40 text-left ${isOpen ? "z-50" : ""}`}>
      <div
        className={`!py-[35px] cursor-pointer !px-[19px] time-style ${montserrat.className}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex">
          {value || label}
          <span
            className={`${montserrat.className} !text-[22px] relative top-[12px] left-[6px] font-[500] leading-[23.587px] tracking-[0.373px] text-[#6B6B6B]`}
          >
            {startAmPm}
          </span>
          <span>
            <FaAngleDown className="text-[20px] text-[#000000] absolute left-[153px] top-[37px]" />
          </span>
        </div>
      </div>
      {isOpen && (
        <div
          ref={containerRef}
          className="absolute bottom-[-282px] right-[-198px]"
        >
          <div
            className="absolute top-[9px] left-0 right-0 h-6 pl-[46px] text-gray-700 flex items-center justify-start cursor-pointer"
            onClick={() => handleScroll("up")}
            style={{ zIndex: 10 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M6 15L12 9L18 15"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="time-dropdwon-style px-2">
            <span className="absolute right-[4.5px] top-[0px] z-10">
              <svg
                width="190"
                height="83"
                viewBox="0 0 201 87"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  width="201"
                  height="87"
                  transform="matrix(1 0 0 -1 0 87)"
                  fill="url(#paint0_linear_125_8364)"
                />
                <rect
                  width="201"
                  height="87"
                  transform="matrix(1 0 0 -1 0 87)"
                  fill="url(#paint1_linear_125_8364)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_125_8364"
                    x1="100.5"
                    y1="0"
                    x2="100.5"
                    y2="87"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="white" stopOpacity="0" />
                    <stop offset="1" stopColor="white" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_125_8364"
                    x1="100.5"
                    y1="0"
                    x2="100.5"
                    y2="87"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="white" stopOpacity="0" />
                    <stop offset="1" stopColor="white" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            <div
              ref={dropdownRef}
              className=" z-40 space-y-2 h-[420px] hidden-scrollbar py-[60px] px-[0px]"
            >
              {options.map((option) => (
                <button
                  key={option}
                  data-value={option}
                  className={`block px-4 !p-[5px] time-style-dropdown !hover:text-[#fff]  py-2 text-sm w-full text-left ${
                    montserrat.className
                  } ${
                    disabledOptions.includes(option)
                      ? "text-gray-50 !bg-gray-50 cursor-not-allowed"
                      : " hover:text-[#FFF] hover:bg-[#350ABC]"
                  }`}
                  onClick={() =>
                    !disabledOptions.includes(option) && handleSelect(option)
                  }
                  disabled={disabledOptions.includes(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          <div className="relative left-[120px] bottom-[264px]  w-[70px]">
            {amPm?.map((option) => (
              <button
                key={option}
                type="button"
                className={`block px-4 !hover:text-[#FFF] !p-[3px] time-style-dropdown !text-[16px] ${
                  option === startAmPm
                    ? "!bg-[#2C2240] !text-[#FFFFFF]"
                    : "text-[#9F9F9F] !bg-[#FFF]"
                } !border-none !font-[400] py-2 text-sm  !w-[70px] text-left ${
                  montserrat.className
                }`}
                onClick={() => setStartAmPm && setStartAmPm(option)}
              >
                {option}
              </button>
            ))}
            <span className="relative bottom-[-128px] right-[113px]">
              <svg
                width="203"
                height="57"
                viewBox="0 0 203 57"
                className="w-[190px]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="-3"
                  width="200"
                  height="73"
                  fill="url(#paint0_linear_125_8367)"
                />
                <rect
                  x="-3"
                  width="208"
                  height="76"
                  fill="url(#paint1_linear_125_8367)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_125_8367"
                    x1="101"
                    y1="0"
                    x2="101"
                    y2="57"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="white" stopOpacity="0" />
                    <stop offset="1" stopColor="white" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_125_8367"
                    x1="101"
                    y1="0"
                    x2="101"
                    y2="57"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="white" stopOpacity="0" />
                    <stop offset="1" stopColor="white" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </div>
          <div
            className="relative bottom-[169px] left-[-0.5px] right-0 h-6 pl-[46px] text-gray-700 flex items-center justify-start cursor-pointer"
            onClick={() => handleScroll("down")}
            style={{ zIndex: 10 }}
          >
            <IoIosArrowDown size={22} />
          </div>
        </div>
      )}
    </div>
  );
};

const CalendarWithAvailability = ({
  scrollDown,
  scrollUp,
  setTimeMessage,
}: {
  scrollDown: () => void;
  scrollUp: () => void;
  setTimeMessage: (message: string) => void;
}) => {
  const [startHour, setStartHour] = useState<string>("5");
  const [startAmPm, setStartAmPm] = useState<string>("PM");
  const [endHour, setEndHour] = useState<string>("7");
  const [endAmPm, setEndAmPm] = useState<string>("PM");
  const dispatch = useDispatch();
  const [isStartDropdownOpen, setIsStartDropdownOpen] = useState(false);
  const [isEndDropdownOpen, setIsEndDropdownOpen] = useState(false);
  const [minError, setMinError] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const minDate = new Date();
  minDate.setHours(0, 0, 0, 0);

  const formatDate = (date: any): string => {
    if (!date) return "";

    // Convert the input to a Date object if it isn't one already
    const dateObj = typeof date === "string" ? new Date(date) : date;

    // Get the day of the month and add the appropriate ordinal suffix
    const day = dateObj.getDate();
    const dayWithSuffix =
      day +
      (day % 10 === 1 && day !== 11
        ? "st"
        : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
        ? "rd"
        : "th");

    // Get the formatted month and year
    const options = { month: "short", weekday: "long" } as const;
    const formattedMonthWeekday = dateObj.toLocaleDateString("en-US", options);

    // Construct the final formatted date string
    const formattedDate = `${dayWithSuffix} ${formattedMonthWeekday.replace(
      " ",
      ", "
    )}`;

    return formattedDate;
  };

  const handleDateChange: any = (value: Date) => {
    setSelectedDate(value);
    setStartHour(startHour);
    setStartAmPm(startAmPm);
    setEndHour(endHour);
    setEndAmPm(endAmPm);
  };

  useEffect(() => {
    if (scrollContainerRef.current) {
      // Scroll to the "5:00 PM" time slot initially
      const itemHeight = 24;
      const offset = 17 * itemHeight; // 5 PM is the 17th hour (0-based index)
      scrollContainerRef.current.scrollTop = offset;
    }
  }, []);
  const get24HourFormat = (hour: string, amPm: string) => {
    const hourIn24 = (parseInt(hour) % 12) + (amPm === "PM" ? 12 : 0);
    return hourIn24;
  };

  const generateDisabledEndTimes = (startHour: string, startAmPm: string) => {
    const startHourIn24 = get24HourFormat(startHour, startAmPm);
    const minEndHour = startHourIn24 + 2; // End time must be at least 2 hours after start time

    return hours.filter((hour) => {
      const hourIn24 = get24HourFormat(hour, endAmPm);
      return hourIn24 < minEndHour;
    });
  };
  const handleStartHourChange = (hour: string) => {
    // Update start hour
    setStartHour(hour);

    // Calculate start hour in 24-hour format
    const startHourIn24 = get24HourFormat(hour, startAmPm);

    // Add 2 hours to the start time
    let endHourIn24 = startHourIn24 + 2;

    // Determine the AM/PM for the end time
    let endAmPm = startAmPm;

    // Adjust for AM/PM changes
    if (endHourIn24 >= 12) {
      if (endHourIn24 >= 24) {
        endHourIn24 -= 24; // Wrap around midnight
      } else if (startHourIn24 < 12) {
        endAmPm = startAmPm === "AM" ? "PM" : "AM"; // Toggle AM/PM at noon
      }
    }

    // Format end hour for display
    const endHourFormatted =
      endHourIn24 === 0
        ? 12
        : endHourIn24 > 12
        ? endHourIn24 - 12
        : endHourIn24;
    setEndHour(endHourFormatted.toString());
    setEndAmPm(endAmPm);
  };

  useEffect(() => {
    if (startHour && startAmPm && endHour && endAmPm) {
      // Convert start and end time to 24-hour format for easier calculation
      let start = parseInt(startHour);
      let end = parseInt(endHour);
      // Adjust for AM/PM
      if (startAmPm === "PM" && startHour !== "12") start += 12;
      if (endAmPm === "PM" && endHour !== "12") end += 12;
      if (startAmPm === "AM" && startHour === "12") start = 0; // Handle 12 AM as 0 hours
      if (endAmPm === "AM" && endHour === "12") end = 0; // Handle 12 AM as 0 hours
      // Calculate the difference, considering next-day wrap-around
      let diff = end - start;
      if (diff < 0) diff += 24;
      // if (diff < 2) {
      //   setMinError("A minimum 2 hours of booking is required. ")
      //   // Optionally set an error state here if you want to display a message on the UI
      //   return;
      // } else {
      //   setMinError("")
      // }
      // If the difference is less than 2 hours, adjust the end time
      if (diff < 2) {
        setMinError("A minimum 2 hours of booking is required. ");
        end = start + 2;
        // Wrap around if end time exceeds 24 hours (i.e., crosses midnight)
        if (end >= 24) end -= 24;
        // Set the new AM/PM value for the end time
        if (end >= 12) {
          setEndAmPm(end < 24 ? "PM" : "AM");
          if (end > 12) end -= 12;
        } else {
          setEndAmPm("AM");
        }
        if (end === 0) end = 12; // Handle midnight case
        setEndHour(end.toString());
      } else {
        if (end <= start) {
          setMinError("");
          return;
        }
      }
      const timeSelection = {
        date: selectedDate,
        timing: {
          start_time: `${startHour}:00 ${startAmPm}`,
          end_time: `${endHour}:00 ${endAmPm}`,
        },
      };
      dispatch(setSelectedWorkingHours(timeSelection)); // Dispatch location on change
    }
  }, [startHour, startAmPm, endHour, endAmPm, selectedDate, dispatch]);
  const calculateTotalHours = (
    startHour: any,
    startAmPm: string,
    endHour: any,
    endAmPm: string
  ): number => {
    // Convert the start and end hours to numbers in case they come in as strings
    const startHourNumber = parseInt(startHour, 10);
    const endHourNumber = parseInt(endHour, 10);

    // Convert start and end time to 24-hour format
    const convertTo24Hour = (hour: number, period: string) => {
      if (period === "PM" && hour !== 12) {
        return hour + 12;
      } else if (period === "AM" && hour === 12) {
        return 0; // Midnight case (12 AM = 0 in 24-hour format)
      }
      return hour;
    };

    const startTime24 = convertTo24Hour(startHourNumber, startAmPm);
    const endTime24 = convertTo24Hour(endHourNumber, endAmPm);

    // Calculate total hours, considering cases where the end time is smaller than the start time (crossing midnight)
    let totalHours = endTime24 - startTime24;

    // If totalHours is negative, it means the time range crosses midnight
    if (totalHours < 0) {
      totalHours += 24; // Add 24 hours to correct the negative value
    }

    return totalHours;
  };

  return (
    <>
      <div className="gap-6">
        <div className="w-full">
          <Calendar
            className="custom-calendar w-full border-none bg-[#faf8ff]"
            onChange={handleDateChange}
            minDate={minDate}
            value={selectedDate}
          />
        </div>
      </div>
      <div className="absolute w-[62%]">
        <div className="time-selection-container min-h-screen space-y-2 max-w-[720px] pr-[20px] fixed top-[298px] 2xl:top-[275px] left-[540px] 2xl:left-[620px] h-screen w-full">
          <h2
            className={`booking-time-title mb-[10px] capitalize ${montserrat.className}`}
          >
            booking times
          </h2>
          <div className="min_time_error_style flex justify-start items-center w-full !mb-[20px]">
            <CiCircleInfo size={22} />
            {"A minimum 2 hours of booking is required."}
          </div>
          <div className="time-slots flex justify-center items-baseline gap-[102px] !mb-[52px]">
            <div>
              <label
                htmlFor="start-time"
                className="block mb-[18px] time-select-label"
              >
                Start Time
              </label>
              <div className="flex gap-2">
                <CustomDropdown
                  options={hours}
                  value={startHour}
                  onChange={(hour) => {
                    handleStartHourChange(hour);
                    setStartHour(hour);
                  }}
                  label="Select Hour"
                  amPm={amPm}
                  startAmPm={startAmPm}
                  setStartAmPm={setStartAmPm}
                  isOpen={isStartDropdownOpen}
                  setIsOpen={setIsStartDropdownOpen}
                  disabledOptions={[]} // No disabled options for start time
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="end-time"
                className="block mb-[18px] time-select-label"
              >
                End Time
              </label>
              <div className="flex gap-2">
                <CustomDropdown
                  options={hours}
                  value={endHour}
                  onChange={setEndHour}
                  label="Select Hour"
                  amPm={amPm}
                  startAmPm={endAmPm}
                  setStartAmPm={setEndAmPm}
                  isOpen={isEndDropdownOpen}
                  setIsOpen={setIsEndDropdownOpen} // Corrected variable name
                  disabledOptions={generateDisabledEndTimes(
                    startHour,
                    startAmPm
                  )}
                />
              </div>
            </div>
          </div>
          <div className="selected-time-style mx-auto flex justify-start items-center flex-col">
            <h3 className="flex justify-start items-center gap-[12px] text-[16px] font-[400] leading-[28.618px] tracking-[-0.436px] text-[#2C2240]">
              <IoIosInformationCircleOutline size={22} /> Your selected event
              day and time are
            </h3>
            <div className="flex justify-start items-center gap-[20px] pl-[35px]">
              <p className="text-[12px] text-[#350ABC] bg-[#FFF] rounded-[33.628px] border-[1px] border-[#EBE5FF] py-[9px] px-[19px]">
                {formatDate(selectedDate)}
              </p>
              <p className="text-[12px] text-[#350ABC] bg-[#FFF] rounded-[33.628px] border-[1px] border-[#EBE5FF] py-[9px] px-[19px]">
                {startHour}:00 {startAmPm} - {endHour}:00 {endAmPm}{" "}
                <span className="relative left-1 !text-gray-600">
                  ({calculateTotalHours(startHour, startAmPm, endHour, endAmPm)}
                  h)
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CalendarWithAvailability;
