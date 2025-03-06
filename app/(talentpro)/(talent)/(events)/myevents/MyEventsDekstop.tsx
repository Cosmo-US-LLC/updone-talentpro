"use client";
import { Loader } from "@/app/_components/ui/dashboard-loader";
import { apiRequest } from "@/app/lib/services";
import { selectAuth } from "@/app/lib/store/features/authSlice";
import { useAppSelector } from "@/app/lib/store/hooks";
import { Loader2 } from 'lucide-react';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MyEventsDesktop = () => {
    const [loadingEventId, setLoadingEventId] = useState<string | null>(null);
    const [isButtonLoading, setIsButtonLoading] = useState(false);
    const { auth: storedData } = useAppSelector(selectAuth);
    const [isLoading, setIsLoading] = useState(false);
    const [events, setEvents] = useState([]);
    const router = useRouter();

    
    const serviceImages: { [key: string]: string } = {
        "Bartender": "/images/mobile/service-icons/bartender-black.svg",
  "Barback": "/images/mobile/service-icons/bar-back-black.svg",
  "Promo Model": "/images/mobile/service-icons/promo-model-black.svg",
  "Waiter": "/images/mobile/service-icons/waiter-black.svg",
  "Cocktail Server": "/images/mobile/service-icons/coctail-server.svg",
  "Event Helper": "/images/mobile/service-icons/event-helper-black.svg" 
    };

    useEffect(() => {
        const fetchMyEvents = async () => {
            try {
                setIsLoading(true);
                const response = await apiRequest("/talentpro/my-events", {
                    method: "POST",
                    headers: {
                        revalidate: true,
                        ...(storedData && { Authorization: `Bearer ${storedData?.token}` }),
                    },
                    body: {
                        page_number: 1,
                        page_size: 100,
                    },
                });
                setEvents(response?.jobs);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (storedData?.token) {
            fetchMyEvents();
        }
    }, [storedData]);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="pb-8">
            {
                events?.length === 0 &&
                <div className="w-full h-[80dvh] flex flex-col items-center justify-center gap-4">
                    <Image
                        src="/images/mobile/talentpro/no-events.svg"
                        alt="np-events"
                        width={200}
                        height={200}
                        quality={100}
                        objectFit="fill"
                    />
                    <p className="font-normal leading-[24px] text-[18px]">No Assigned Events</p>
                </div>
            }
            {
                events?.length > 0 &&
                events.map((event: any, id) => {
                    return (
                        <div key={id} className="shadow-md rounded-[24px] flex flex-col items-start justify-start mt-4 bg-[white] border border-1 border-[#EBE6FF] p-4">
                            <div className={`${event.status === "assigned" ? "bg-[#EAFDE7]" : "bg-[#FDE7E7]"}  py-2 px-4 w-fit rounded-full`}>
                                <p className={`${event.status === "assigned" ? "text-[#0C9000]" : "text-[#E60000]"} text-center  font-[500]`}>
                                    {event.status}
                                </p>
                            </div>
                            <p className="text-start text-[24px] font-medium pt-4">
                                {event.title}
                            </p>
                            <p className="text-start text-[14px] text-gray-600 font-medium pt-4">
                                {event.description}
                            </p>
                            <div className="flex flex-row pt-4 gap-4">
                            <Image
                                    src={serviceImages[event.service_name] || "/images/mobile/service-icons/event-helper-black.svg"}
                                    alt="event-service"
                                    width={24}
                                    height={24}
                                    quality={100}
                                    objectFit="fill"
                                />
                               
                            <div className="flex flex-col  ">
                            <p className="text-start text-[14px] font-semibold ">
                                Requested Service
                                </p>
                                <p className="text-start text-[14px] font-medium text-gray-400">
                                    {event.service_name}
                                </p>
                            </div>
                            </div>
                            <div className="flex flex-row pt-4 gap-4">
                                <Image
                                    src="/images/mobile/talentpro/map_pin.svg"
                                    alt="event-location"
                                    width={24}
                                    height={24}
                                    quality={100}
                                    objectFit="fill"
                                />
                               <div className="flex flex-col    ">
                            <p className="text-start text-[14px] font-semibold ">
                                Location
                                </p>
                                <p className="text-start text-[14px] font-medium text-gray-400">
                                    {event.event_location}
                                </p>
                            </div>
                            </div>
                            <div className="flex flex-row pt-4 gap-4">
                                    <Image
                                        src="/images/mobile/talentpro/calendar.svg"
                                        alt="event-date"
                                        width={24}
                                        height={24}
                                        quality={100}
                                        objectFit="fill"
                                    />
                                    <div className="flex flex-col items-start justify-center ">
                                        <p className="text-start text-[14px] font-semibold">
                                            Date & Time
                                        </p>
                                        <p className="text-start text-[14px] font-medium text-gray-400">
                                            {event.working_time.date} from
                                            <span className="ml-2">{event.working_time.time}</span>
                                        </p>
                                    </div>
                                </div>
                            <div className="h-[1px] bg-[#EBE6FF] w-full my-4 self-center" />
                            <div className="flex flex-row items-center justify-end w-full">
                                
                                <div className="flex flex-row items-start justify-end w-[50%]">
                                    <div
                                        onClick={() => {
                                            setLoadingEventId(event.id);
                                            router.push(`/staff/job-detail/${event.id}`);
                                        }}
                                        className="cursor-pointer bg-[#350ABC] rounded-full w-[50%] py-4 self-center"
                                    >
                                        <p className="flex items-center justify-center text-center text-[white] font-[500] text-[18px] leading-[24px]">
                                            {loadingEventId === event.id ? (
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                            ) : (
                                                event.status === "completed" ? "View Details" : "Talk to Client"
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default MyEventsDesktop;
