"use client";

import * as React from "react";
import { format, isBefore, isSameDay, addDays, startOfToday } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { CiWarning } from "react-icons/ci";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { setSelectedDate } from "@/app/lib/store/features/jobCreateSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/lib/store/store";
import { formatDate } from "@/app/lib/helpers/utils";

export function DatePickerMobile({ eventDateError, setEventDateError }: any) {
  const dispatch = useDispatch();
  const selectedDate = useSelector((state: RootState) => state.jobCreate.selectedDate);
  const [date, setDate] = React.useState<any>(selectedDate);
  const [isCalendarOpen, setCalendarOpen] = React.useState(false); // Calendar modal state
  const today = startOfToday();

  // Handle date selection
  const handleDateChange = (selectedDay: Date | undefined) => {
    if (selectedDay) {
      setDate(selectedDay);
      setEventDateError("");
    }
  };

  // Disable dates logic
  const isDateDisabled = (date: Date) => {
    return isBefore(date, today) || isSameDay(date, today) || isSameDay(date, addDays(today, 1));
  };

  // Save date and close modal
  const handleSave = () => {
    dispatch(setSelectedDate(date));
    setCalendarOpen(false);
  };
  
  const handleClose = () => {
    dispatch(setSelectedDate(date));
    setCalendarOpen(false);
  }

  return (
    <div className="relative">
      <h2 className="text-[14px] font-[500] mb-2 text-[#161616]">
        Event Date <span className="text-[#C20000]"> *</span>
      </h2>

      {/* Input Field */}
      <Button
        variant={"outline"}
        onClick={() => setCalendarOpen(true)}
        className={cn(
          `${eventDateError ? "shadow-[0px_0px_20px_0px_rgba(194,0,0,0.22)]" : ""} 
          w-[100%] !text-[14px] !font-[400] !leading-[24px] h-[56px] justify-start text-left 
          ${eventDateError ? "border-[#FF8F8F]" : "border-[#EFEFEF]"}`
        )}
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        {date ? formatDate(date) : <span>Pick a date</span>}
        {eventDateError && (
          <CiWarning size={26} className="absolute right-4 text-[#C20000]" />
        )}
      </Button>

      {/* Error Message */}
      <p
        className={`text-[#C20000] text-[12px] pt-[5px] font-[400] leading-[20px] ${
          eventDateError ? "opacity-100" : "opacity-0"
        }`}
      >
        {eventDateError}
      </p>

      {isCalendarOpen && (
  <div
    onClick={handleClose}
    className="fixed inset-0 z-[99999] flex items-center justify-center bg-black bg-opacity-50"
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="bg-white rounded-lg shadow-lg p-4 w-[90%] max-w-sm relative z-[99]"
    >
      <h3 className="text-center text-lg font-semibold mb-4">Select a Date</h3>
      <Calendar
        mode="single"
        selected={date || undefined}
        onDayClick={handleDateChange}
        disabled={isDateDisabled}
        className="!text-[#161616] mb-4"
      />
      <button
        onClick={handleSave}
        className="w-full bg-[#350ABC] py-[12px] text-[16px] font-[400] leading-[26px] text-[#FFFFFF] rounded-[4px]"
      >
        Save
      </button>
    </div>
  </div>
)}
    </div>
  );
}
