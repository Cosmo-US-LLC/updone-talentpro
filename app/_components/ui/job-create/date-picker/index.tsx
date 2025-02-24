"use client";

import * as React from "react";
import { format, isBefore, isSameDay, addDays, startOfToday } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { CiWarning } from "react-icons/ci";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { setSelectedDate } from "@/app/lib/store/features/jobCreateSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/lib/store/store";
import { formatDate } from "@/app/lib/helpers/utils";

export function DatePicker({ eventDateError, setEventDateError }: any) {
  const dispatch = useDispatch();
  const selectedDate = useSelector((state: RootState) => state.jobCreate.selectedDate);
  const [date, setDate] = React.useState<Date | string | null>(selectedDate); // Initialize with Redux selectedDate
  const [open, setOpen] = React.useState(false);  
  const today = startOfToday();

  // Handle date change
  const handleDateChange = (day: Date | undefined) => {
    if (day) {
      setDate(day);
      dispatch(setSelectedDate(day?.toString())); // Update Redux store
      setEventDateError("");
      setOpen(false); // Close the calendar
    }
  };

    // Disable logic for dates
    const isDateDisabled = (date: Date) => {
      return isBefore(date, today) || isSameDay(date, today) || isSameDay(date, addDays(today, 1));
    };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div>
        <h2 className="text-[14px] pl-[3px] font-[500] mb-2 text-[#161616]">
          Event Date <span className="text-[#C20000]"> *</span>
        </h2>
        {/* Input Field */}
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            onClick={() => setOpen(true)} // Open calendar on input click
            className={cn(
              `${eventDateError !== "" ? "shadow-[0px_0px_20px_0px_rgba(194,0,0,0.22)]" : ""} 
               w-[543px] !text-[14px] !font-[400] !leading-[24px] h-[56px] justify-start text-left hover:!text-[#9F9F9F] 
               ${eventDateError === "" ? "border-[#EFEFEF]" : "border-[#FF8F8F]"}`,
              !date ? "!text-[#9F9F9F]" : "!text-[#6B6B6B]"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {/* {date ? format(date, "PPP") : <span>Pick a date</span>} */}
            {date ? formatDate(date) : <span>Pick a date</span>}
            <div
              className={`flex justify-start items-center left-[90%] ${
                eventDateError !== "" ? "relative text-[#C20000]" : "opacity-0"
              }`}
            >
              <CiWarning size={26} className="absolute" />
            </div>
          </Button>
        </PopoverTrigger>

        {/* Error Message */}
        <p
          className={`text-[#C20000] text-[12px] pt-[5px] font-[400] leading-[20px] transition-opacity duration-500 ease-linear ${
            eventDateError !== "" ? "opacity-100" : "opacity-0"
          } ${eventDateError !== "" ? "max-h-20" : "max-h-0"} overflow-hidden`}
        >
          {eventDateError}
        </p>

        {/* Calendar */}
        <PopoverContent className="w-auto p-0 relative left-[133px]">
          <Calendar
            mode="single"
            // @ts-ignore
            selected={date || undefined}
            onDayClick={handleDateChange} // Close when date is selected
            disabled={(day) => isDateDisabled(day)}
            initialFocus
          />
        </PopoverContent>
      </div>
    </Popover>
  );
}
