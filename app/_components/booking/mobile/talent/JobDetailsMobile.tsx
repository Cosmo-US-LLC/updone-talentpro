import { formatDateMobile, formatTimeMobile } from "@/app/lib/helpers/formatDateTime";
import Image from "next/image";

const JobDetailsMobile = ({ jobData }: any) => {
    const eventDate = formatDateMobile(jobData?.working_times[0]?.date);
    const eventTume = formatTimeMobile(jobData?.working_times[0]?.date, jobData?.working_times[0]?.start_time, jobData?.working_times[0]?.end_time);

    return (
        <div className="flex flex-col items-start gap-4 pt-4 ">
            <p className="text-[20px] font-[500] leading-[32px]">{jobData?.title}</p>
            <p className="text-[16px] font-[500] leading-[8px]">Event Description</p>
            <p className="text-[#575555] text-[14px] font-[400] leading-[24px]">{jobData?.description}</p>
            <div className="h-[1px] bg-[#EBE6FF] w-full" />
            <div className="flex flex-col gap-4">
                <div className="flex flex-row items-center justify-start gap-2">
                    <Image src='/images/mobile/talent/glass.svg' width={37} height={37} alt="glass" />
                    <div className="flex flex-col items-start">
                        <p className="text-[14px] font-[600] leading-[24px]">Requested Service:</p>
                        <p className="text-[14px] font-[400] leading-[24px]">{jobData?.service?.name}</p>
                    </div>
                </div>
                <div className="flex flex-row items-center justify-start gap-2">
                    <Image src='/images/mobile/talent/schedule.svg' width={37} height={37} alt="glass" />
                    <div className="flex flex-col items-start">
                        <p className="text-[14px] font-[600] leading-[24px]">{eventDate}</p>
                        <p className="text-[14px] font-[400] leading-[24px]">{eventTume}</p>
                    </div>
                </div>
                <div className="flex flex-row items-center justify-start gap-2">
                    <Image src='/images/mobile/talent/map-pin.svg' width={37} height={37} alt="glass" />
                    <div className="flex flex-col items-start">
                        <p className="text-[14px] font-[600] leading-[24px]">{jobData?.event_location}</p>
                        <p className="text-[14px] font-[400] leading-[24px]">Los Angeles, California</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetailsMobile;
