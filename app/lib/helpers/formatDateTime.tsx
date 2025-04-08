import { format, parseISO } from "date-fns";

interface TimeSlot {
  start_time: string;
  end_time: string;
}

interface WorkingTimes {
  [date: string]: TimeSlot[];
}

const formatDate = (inputDate: any): any => {
  // Check if the input is already a Date object
  let date = inputDate instanceof Date ? inputDate : new Date(inputDate);
  
  // Convert the date to UTC
  date = new Date(date.toISOString());

  // Validate if the date is valid
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date format.");
  }

  // Define month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Extract date components
  // const day = date.getDate();
  // const month = monthNames[date.getMonth()];
  // const year = date.getFullYear();
  const day = date.getUTCDate(); // Use UTC methods to avoid local timezone changes
  const month = monthNames[date.getUTCMonth()]; // Use UTC methods
  const year = date.getUTCFullYear(); // Use UTC methods

  // Format and return the date string
  return `${month} ${day}, ${year}`;
};

const formatTime = (timeString: string): string => {
  const [hours, minutes] = timeString.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
};

export const formatWorkingTimes = (
  workingTimes: WorkingTimes
) => {
  return Object.entries(workingTimes).map(([dateKey, timeSlots]) => (
    <div
      key={dateKey}
      className="flex flex-col justify-start items-start mr-[71px]"
    >
      <div className=" text-[#161616] !text-[14px] leading-normal tracking-[-0.28px] font-[600]">
        {formatDate(dateKey)}
      </div>

      {timeSlots.map((slot, index) => (
        <div
          key={index}
          className="text-[14px] font-[400] leading-[28px] text-[#6B6B6B] "
        >
          {formatTime(slot.start_time)} - {formatTime(slot.end_time)}
        </div>
      ))}
    </div>
  ));
};
//format date and time
export const formatDateTime = (
  date: string,
  startTime: string,
  endTime: string
): string => {
  // Parse the date
  const dateObj = new Date(`${date}T${startTime}`);

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

  // Create options for formatting the month and year
  const options = { month: "long", year: "numeric" } as const;
  const formattedMonthYear = dateObj.toLocaleDateString("en-US", options);

  // Combine day with suffix, month, and year
  const formattedDate = `${dayWithSuffix} ${formattedMonthYear.replace(
    /(\w+)\s(\d{4})/,
    "$1, $2"
  )}`;

  // Convert and format start time
  const formattedStartTime = dateObj.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  // Convert and format end time
  const endDateObj = new Date(`${date}T${endTime}`);
  const formattedEndTime = endDateObj.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  // Combine everything into the desired format
  return `${formattedDate}, ${formattedStartTime} - ${formattedEndTime}`;
};

export const formatDateMobile = (date: any): string => {
  return formatDate(date);
};

export const formatTimeMobile = (
  date: string,
  startTime: string,
  endTime: string
): string => {
  const dateObj = new Date(`${date}T${startTime}`);
  // Convert and format start time
  const formattedStartTime = dateObj.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  // Convert and format end time
  const endDateObj = new Date(`${date}T${endTime}`);
  const formattedEndTime = endDateObj.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return `${formattedStartTime} - ${formattedEndTime}`;
};

interface Event {
  date: string;
  start_time: string;
  end_time: string;
}

export const formatEvent = (event: Event) => {
  const { date, start_time, end_time } = event;

  // Check if date, start_time, and end_time are defined and valid
  if (!date || !start_time || !end_time) {
    return "Invalid event data";
  }

  try {
    // Parse the date
    const formattedDate = format(parseISO(date), "MMMM d, yyyy"); // August 14, 2024

    // Parse and format the start and end times
    const startTime = format(new Date(`1970-01-01T${start_time}Z`), "h:mm a"); // 5:00 PM
    const endTime = format(new Date(`1970-01-01T${end_time}Z`), "h:mm a"); // 7:00 PM

    // Combine them into a single formatted string
    return `${formattedDate}: ${startTime} - ${endTime}`;
  } catch (error) {
    // Handle any errors that occur during formatting
    console.error("Error formatting event:", error);
    return "Error formatting event";
  }
};
export function formatDates(inputDate: string): string {
  const dateParts = inputDate?.split("-");
  const year = parseInt(dateParts?.[0]);
  const month = parseInt(dateParts?.[1]);
  const day = parseInt(dateParts?.[2]);

  // Create an array of month abbreviations
  const monthAbbreviations = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Get the day of the week (0 = Sunday, 6 = Saturday)
  const dayOfWeek = new Date(year, month - 1, day).getDay();
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const formattedDayOfWeek = dayNames[dayOfWeek];

  // Extract the hour and minute (assuming 24-hour format)
  const hour = 14; // Example: 2:30pm
  const minute = 30;

  // Convert hour to 12-hour format and determine AM/PM
  const formattedHour = hour > 12 ? hour - 12 : hour;
  const amPm = hour >= 12 ? "pm" : "am";

  // Construct the formatted date string
  const formattedDate = `${formattedDayOfWeek}, ${monthAbbreviations[month - 1]
    } ${day} at ${formattedHour}:${minute}${amPm}`;

  return formattedDate;
}
