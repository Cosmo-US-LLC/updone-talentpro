"use client";
import { Loader } from "@/app/_components/ui/dashboard-loader";
import { apiRequest } from "@/app/lib/services";
import { selectAuth } from "@/app/lib/store/features/authSlice";
import { useAppSelector } from "@/app/lib/store/hooks";
import { Loader2 } from 'lucide-react';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const UpcomingEventsDesktop = () => {
    const { auth: storedData } = useAppSelector(selectAuth);
    const [isLoading, setIsLoading] = useState(false);
    const [events, setEvents] = useState([]);
    const [loadingEventId, setLoadingEventId] = useState<string | null>(null);
    const router = useRouter();

    const serviceImages: { [key: string]: string } = {
        "Bartender": "/images/mobile/service-icons/bartender-black.svg",
  "Barback": "/images/mobile/service-icons/bar-back-black.svg",
  "Promo Model": "/images/mobile/service-icons/promo-model-black.svg",
  "Waiter": "/images/mobile/service-icons/waiter-black.svg",
  "Cocktail Server": "/images/mobile/service-icons/coctail-server-black.svg",
  "Event Helper": "/images/mobile/service-icons/event-helper-black.svg" 
    };

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setIsLoading(true);
                const response = await apiRequest("/talentpro/upcoming-events", {
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
            fetchEvents();
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
                        alt="no-events"
                        width={200}
                        height={200}
                        quality={100}
                        objectFit="fill"
                    />
                    <p className="font-normal leading-[24px] text-[18px]">No Upcoming Events</p>
                </div>
            }
            {
                events?.length > 0 &&
                events.map((event: any) => {
                    return (
                        <div key={event.id} className="shadow-md rounded-[24px] flex flex-col items-start justify-start mt-4 bg-[white] border border-1 border-[#EBE6FF] p-4">
                            <div className="bg-[#E7F4FD] p-2 w-fit min-w-[100px] rounded-full">
                                <p className="text-[#0076E6] text-center font-[500]">
                                    {event.status}
                                </p>
                            </div>
                            <p className="text-start text-[24px] font-medium pt-4">
                                {event.title}
                            </p>
                            <p className="text-start text-[14px] text-gray-400 font-medium pt-4">
                                {event.description}
                            </p>
                            <div className="flex flex-row items-center justify-between w-fit pt-4 gap-4">
                                <Image
                                    src={serviceImages[event.service_name] || "/images/mobile/service-icons/event-helper-black.svg"}
                                    alt="event-service"
                                    width={24}
                                    height={24}
                                    quality={100}
                                    objectFit="fill"
                                />
                                <p className="text-start text-[14px] font-medium text-gray-400">
                                    {event.service_name}
                                </p>
                            </div>
                            <div className="flex flex-row items-center justify-between w-fit pt-4 gap-4">
                                <Image
                                    src="/images/mobile/talentpro/map_pin.svg"
                                    alt="event-location"
                                    width={24}
                                    height={24}
                                    quality={100}
                                    objectFit="fill"
                                />
                                <p className="text-start text-[14px] font-medium text-gray-400">
                                    {event.event_location}
                                </p>
                            </div>
                            <div className="h-[1px] bg-[#EBE6FF] w-full my-4 self-center" />
                            <div className="flex flex-row items-center justify-between w-full">
                                <div className="flex flex-row items-center w-full">
                                    <Image
                                        src="/images/mobile/talentpro/calendar.svg"
                                        alt="event-date"
                                        width={36}
                                        height={40}
                                        quality={100}
                                        objectFit="fill"
                                    />
                                    <div className="flex flex-col items-start justify-center ml-4">
                                        <p className="text-start text-[16px] font-medium">
                                            {event.working_time.date}
                                        </p>
                                        <p className="text-start text-[14px] font-medium text-gray-400">
                                            {event.working_time.time}
                                            <span className="ml-2">{event.working_time.number_of_hours}</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-row items-start justify-end w-[20%]">
                                    <div
                                        onClick={() => {
                                            setLoadingEventId(event.id);
                                            router.push(`/staff/job-detail/${event.id}`);
                                        }}
                                        className="w-full cursor-pointer bg-[#350ABC] rounded-full py-4 self-center"
                                    >
                                        <p className="flex items-center justify-center text-center text-[white] font-[500] text-[18px] leading-[24px]">
                                            {loadingEventId === event.id ? (
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                            ) : (
                                                event.has_offered ? "View Offer" : "Make an offer"
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
};

export default UpcomingEventsDesktop;
