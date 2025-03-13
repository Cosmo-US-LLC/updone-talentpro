import { formatDateMobile, formatTimeMobile } from "@/app/lib/helpers/formatDateTime";
import Image from "next/image";

const JobDetailsMobile = ({ jobData }: any) => {
    const eventDate = formatDateMobile(jobData?.working_times[0]?.date);
    const eventTume = formatTimeMobile(jobData?.working_times[0]?.date, jobData?.working_times[0]?.start_time, jobData?.working_times[0]?.end_time);

    const serviceImages: { [key: string]: string } = {
        "Bartender": "/images/mobile/service-icons/bartender.svg",
        "Barback": "/images/mobile/service-icons/bar-back.svg",
        "Promo Model": "/images/mobile/service-icons/promo-model.svg",
        "Waiter": "/images/mobile/service-icons/waiter.svg",
        "Cocktail server": "/images/mobile/service-icons/coctail-server.svg",
        "Event Helper": "/images/mobile/service-icons/event-helper.svg" 
    };

    return (
        <div className="flex flex-col items-start gap-4 pt-4 ">
            <p className="text-[20px] font-[500] leading-[32px]">{jobData?.title}</p>
            <p className="text-[16px] font-[500] leading-[8px]">Event Description</p>
            <p className="text-[#575555] text-[14px] font-[400] leading-[24px]">{jobData?.description}</p>
            <div className="h-[1px] bg-[#EBE6FF] w-full" />
            <div className="flex flex-col gap-4">
                <div className="flex flex-row items-center justify-start gap-2">
                    <Image 
                        src={serviceImages[jobData?.service?.name] || "/images/mobile/service-icons/event-helper.svg"} 
                        width={37} 
                        height={37} 
                        alt="service-icon" 
                    />
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
