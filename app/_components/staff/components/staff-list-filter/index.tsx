import CommonSelect from '@/app/_components/common/select-option'
import { HERO_FILTER_STAFF, LOCATION, SERVICE, services, TIMES_CONST } from '@/app/lib/constants/index'
import { selectBooking } from '@/app/lib/store/features/bookingSlice'
import Image from 'next/image'
import React from 'react'
import { useSelector } from 'react-redux'

type StaffFiltersProps = {
    handleTimeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    handleLocationChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    scrollY?: number;
    modalOpen?: boolean;
    isFilterBookingFlow?: boolean;
    selectedService?: any
    isAlreadyCreted?: string,
    jobApiData: any
    
}

const StaffFilters = ({ isAlreadyCreted, isFilterBookingFlow, handleTimeChange, handleLocationChange, scrollY = 0, modalOpen, jobApiData }: StaffFiltersProps) => {

    const selectedService = useSelector(selectBooking)
    const dateStr = jobApiData?.working_times?.date ? jobApiData?.working_times?.date : selectedService?.working_hours?.date;
    const dateObject = new Date(dateStr);
    const formattedDate = dateObject.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    const formatDate = (dateString: any) => {
        const dateObj = new Date(dateString);

        // Get the day of the month and add the appropriate ordinal suffix
        const day = dateObj.getDate();
        const dayWithSuffix = day + (day % 10 === 1 && day !== 11 ? 'st' :
            (day % 10 === 2 && day !== 12 ? 'nd' :
                (day % 10 === 3 && day !== 13 ? 'rd' : 'th')));

        // Get the weekday, month, and year
        const weekday = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
        const month = dateObj.toLocaleDateString('en-US', { month: 'short' });
        const year = dateObj.getFullYear();

        return `${weekday}, ${dayWithSuffix} ${month}, ${year}`;
    };

    return (
        <div className='w-full h-40 flex justify-center items-start'>
            {modalOpen ? "" :
                <div className={scrollY
                    ? `!transition-all !delay-500 w-full h-44 ${!isFilterBookingFlow && ""} flex justify-center fixed z-50 items-start bottom-0 top-10 left-0 right-0`
                    : 'w-full flex justify-center !transition-all !duration-500 !ease-in fixed z-50 items-start'}
                >
                    <div style={{
                        boxShadow: scrollY
                            ? '0px -1px 10px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                            : ''
                    }}
                        className={`fixed bg-[#ffffff91] py-[12px] w-[770px] z-50 mb-[65px] font-normal rounded-tl-[8px] rounded-tr-[8px] ${isAlreadyCreted === "Invite-Members" && "mt-[5.5%]"} mt-[2.5%] shadow-sm`}
                    >
                        <div style={{ ...HERO_FILTER_STAFF, height: scrollY ? "50px" : "75px", paddingBottom: scrollY ? "10px" : "0px" }} className="flex space-x-3 w-full p-1 text-black justify-center items-center text-center">
                            <div style={{ width: '28%' }} className="text-start space-y-2">
                                <div className='flex justify-start items-center gap-1.5 pl-[10px]'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 13 13" fill="none">
                                        <g clip-path="url(#clip0_580_9968)">
                                            <path d="M10.8335 3.79166H2.16683C1.56852 3.79166 1.0835 4.27668 1.0835 4.87499V10.2917C1.0835 10.89 1.56852 11.375 2.16683 11.375H10.8335C11.4318 11.375 11.9168 10.89 11.9168 10.2917V4.87499C11.9168 4.27668 11.4318 3.79166 10.8335 3.79166Z" stroke="#2C2240" stroke-width="1.08333" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M8.66683 11.375V2.70833C8.66683 2.42102 8.55269 2.14547 8.34953 1.9423C8.14636 1.73914 7.87081 1.625 7.5835 1.625H5.41683C5.12951 1.625 4.85396 1.73914 4.6508 1.9423C4.44763 2.14547 4.3335 2.42102 4.3335 2.70833V11.375" stroke="#2C2240" stroke-width="1.08333" strokeLinecap="round" strokeLinejoin="round" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_580_9968">
                                                <rect width="13" height="13" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <h2 className="font-[400] block appearance-none w-full rounded focus:outline-none focus:shadow-outline staff-filter-style text-[#2C2240] md:text-[16px] 2xl:text-[16px] !transition-all !duration-1000 !ease-in">
                                        Selected Service
                                    </h2>
                                </div>
                                <span
                                    style={{ fontSize: scrollY ? "12px" : "14px" }}
                                    className='flex justify-center gap-[8px] items-center 2xl:text-[14px] text-start pl-[10px] md:text-[14px] font-[400] text-[#6B6B6B] py-[6px] w-[145px] !px-[8px] rounded-[35px]'
                                >
                                    <Image height={16} width={16} src='/images/booking/filter-service.svg' alt='' />
                                    {jobApiData?.service_name ? jobApiData?.service_name : selectedService.selectedServiceFromHome || selectedService.selectedService}
                                </span>

                            </div>
                            <Image style={{ margin: 0 }} src="/images/Line 4.png" alt="" width={2.5} height={2.5} />
                            <div style={{ width: '36%' }} className="text-start space-y-2">
                                <div className='flex justify-start items-center gap-1.5 pl-[10px]'>
                                    <Image src='/images/gallery/date-time.svg' alt='location-svg' width={16} height={16} />
                                    <h2 className="font-[400] block appearance-none w-full rounded focus:outline-none focus:shadow-outline staff-filter-style text-[#2C2240] md:text-[16px] 2xl:text-[16px] !transition-all !duration-1000 !ease-in">
                                        Event Date
                                    </h2>
                                </div>
                                <span
                                    style={{ fontSize: scrollY ? "12px" : "14px" }}
                                    className='py-[6px] !transition-all !duration-1000 !ease-in block 2xl:text-[14px] text-start pl-[10px] md:text-[14px] font-[400] text-[#6B6B6B]'>
                                    {formattedDate && `${formatDate(formattedDate)} `}
                                    <span style={{ marginLeft: '4px' }}>
                                        {
                                            jobApiData?.working_times ?
                                                `${jobApiData?.working_times?.timing?.start_time} - ${jobApiData?.working_times?.timing?.end_time}`
                                                :
                                                `${selectedService?.working_hours?.timing?.start_time} - ${selectedService?.working_hours?.timing?.end_time}`
                                        }
                                    </span>
                                </span>

                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default React.memo(StaffFilters);
