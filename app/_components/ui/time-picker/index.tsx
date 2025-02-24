import { Button } from '@/components/ui/button';
import React, { useEffect, useRef, useState } from 'react';
import { GoChevronDown } from "react-icons/go";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/lib/store/store';
import { setSelectedTime, setAmPm } from '@/app/lib/store/features/jobCreateSlice';


const TimePicker = ({ eventStartTimeError, setEventStartTimeError }: any) => {
    const dispatch = useDispatch();
    const reduxSelectedTime = useSelector((state: RootState) => state.jobCreate.selectedTime);
    const reduxAmPm = useSelector((state: RootState) => state.jobCreate.amPm);
    const [isOpen, setIsOpen] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
    const times = Array.from({ length: 12 }, (_, i) => `${i + 1}:00`);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleSelect = (time: string) => {
        dispatch(setSelectedTime(time));
        setIsOpen(false);
        setEventStartTimeError("");
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'ArrowDown') {
            event.preventDefault();
            setIsOpen(true);
            setFocusedIndex((prevIndex) => (prevIndex === null ? 0 : Math.min(prevIndex + 1, times.length - 1)));
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            setIsOpen(true);
            setFocusedIndex((prevIndex) => (prevIndex === null ? times.length - 1 : Math.max(prevIndex - 1, 0)));
        } else if (event.key === 'Enter' && focusedIndex !== null) {
            handleSelect(times[focusedIndex]);
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div>
            <div ref={dropdownRef} className="relative w-[123px]">
                <div>
                    <p className="text-[14px] pl-[3px] font-[500] mb-2 text-[#161616]">
                        Start Time <span className='text-[#C20000]'>*</span>
                    </p>
                        <div onClick={toggleDropdown} className='flex justify-center items-center !cursor-pointer relative left-[27px]'>
                        <Button
                            onKeyDown={handleKeyDown}
                            className={`${eventStartTimeError !== "" ? "shadow-[0px_0px_20px_0px_rgba(194,0,0,0.22)]" : ""} w-full py-2 pl-4 !pr-[10rem]  flex justify-start items-center border ${eventStartTimeError === "" ? "border-[#EFEFEF]" : "border-[#FF8F8F]"} rounded-md text-left bg-white h-[56px] hover:text-gray-600 hover:bg-gray-50`}
                            style={{
                                color: '#9F9F9F',
                                fontSize: '14px',
                                fontWeight: '400',
                            }}
                        >
                            {reduxSelectedTime ? `${reduxSelectedTime} ${reduxAmPm}` : <span className='text-[#9F9F9F] font-[400] leading-[24px] text-[14px]'>Select start time</span>}
                        </Button>
                        <span className='absolute z-[999] right-[-20px] text-[#9F9F9F]'><GoChevronDown size={20} /></span>
                    </div>
                    {isOpen && (
                        <ul
                            className="absolute w-full mt-1 py-[4px] px-[8px] border border-[#EBE6FF] rounded-md bg-white min-w-48 overflow-y-auto z-[9999]"
                            style={{ height: '200px', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {times.map((time, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleSelect(time)}
                                    className={`flex items-center justify-between py-[12px] px-[8px] cursor-pointer !text-[#6B6B6B] font-[400] leading-[20px] text-[14px] 
                                ${reduxSelectedTime === time ? 'bg-[#F9F7FF] rounded-[4px] !text-[#774DFD]' : ' hover:!bg-[#F9F7FF] !rounded-[4px]'} 
                                ${focusedIndex === index ? 'bg-[#F0EFFF]' : ''} 
                                transition-colors duration-200 ease-linear`}
                                    style={{
                                        backgroundColor: reduxSelectedTime === time ? '#F9F7FF' : focusedIndex === index ? '#F0EFFF' : 'white',
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F9F7FF'}
                                    onMouseLeave={(e) => {
                                        if (reduxSelectedTime !== time) {
                                            e.currentTarget.style.backgroundColor = 'white';
                                        }
                                    }}
                                >
                                    <span className={`${reduxSelectedTime === time && '!text-[#774DFD]'}`}>{time}</span>
                                    {reduxSelectedTime === time && (
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
                    )}
                </div>
                <div className='relative left-[155px] bottom-[56px]'>
                    <div className="flex mt-2 w-full justify-center ml-[60px] items-center cursor-pointer rounded-[12px] border border-[#EBE6FF] absolute">
                        <div
                            onClick={() => dispatch(setAmPm('AM'))}
                            className={`w-1/2 py-2 font-[400] flex justify-center items-center leading-[24px] text-[14px] rounded-l-[12px] ${reduxAmPm === 'AM' ? 'bg-[#2C2240] text-[#FFF]' : 'bg-white hover:!bg-gray-50 text-[#6B6B6B]'}`}
                        >
                            AM
                        </div>
                        <div
                            onClick={() => dispatch(setAmPm('PM'))}
                            className={`w-1/2 py-2 rounded-r-[12px] font-[400] flex justify-center items-center leading-[24px] text-[14px] ${reduxAmPm === 'PM' ? 'bg-[#2C2240] text-white' : 'bg-white hover:!bg-gray-50 text-[#6B6B6B]'}`}
                        >
                            PM
                        </div>
                    </div>
                </div>
            </div>
            <p
                className={`text-[#C20000] text-[12px] pt-[5px] font-[400] leading-[20px] transition-opacity duration-500 ease-linear ${eventStartTimeError !== "" ? 'opacity-100' : 'opacity-0'} ${eventStartTimeError !== "" ? 'max-h-20' : 'max-h-0'} overflow-hidden`}
            >
                {eventStartTimeError}
            </p>
        </div>
    );
};

export default TimePicker;
