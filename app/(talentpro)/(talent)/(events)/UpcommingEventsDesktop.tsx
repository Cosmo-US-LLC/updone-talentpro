"use client";
import { Loader } from "@/app/_components/ui/dashboard-loader";
import { apiRequest } from "@/app/lib/services";
import { selectAuth } from "@/app/lib/store/features/authSlice";
import { useAppSelector } from "@/app/lib/store/hooks";
import { Loader2 } from 'lucide-react';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LuSparkle, LuSparkles } from "react-icons/lu";

const UpcomingEventsDesktop = () => {
    const { auth: storedData } = useAppSelector(selectAuth);
    const [isLoading, setIsLoading] = useState(false);
    const [events, setEvents] = useState([]);
    const [loadingButton, setLoadingButton] = useState<{ eventId: string | null; type: string | null }>({
        eventId: null,
        type: null,
    });
    const router = useRouter();

    const serviceImages: { [key: string]: string } = {
        "Bartender": "/images/mobile/service-icons/bartender.svg",
        "Barback": "/images/mobile/service-icons/bar-back.svg",
        "Promo Model": "/images/mobile/service-icons/promo-model.svg",
        "Waiter": "/images/mobile/service-icons/waiter.svg",
        "Cocktail server": "/images/mobile/service-icons/coctail-server.svg",
        "Event Helper": "/images/mobile/service-icons/event-helper.svg"
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
                            <div className="flex flex-row items-center gap-1 justify-between w-full">
                                <div className="bg-[#E7F4FD] p-2 w-fit min-w-[100px] rounded-full">
                                    <p className="text-[#0076E6] text-center font-[500]">
                                        {event.status}
                                    </p>
                                </div>
                                {event.is_invited && (
                                    <div className="bg-yellow-100 flex flex-row items-center gap-2 py-2 px-6 w-fit min-w-[100px] rounded-full">
                                        <LuSparkles className="w-4 h-4 text-yellow-800" />
                                        <p className="text-yellow-800 text-[14px] text-center font-[500]">The client invited you to this event</p>
                                    </div>
                                )}
                            </div>
                            <p className="text-start text-[24px] font-medium pt-4">
                                {event.title}
                            </p>
                            <p className="text-start text-[14px] text-gray-600 font-medium pt-4">
                                {event.description}
                            </p>
                            <div className="flex flex-row pt-4 gap-4">
                                <Image
                                    src={serviceImages[event.service_name] || "/images/mobile/service-icons/event-helper.svg"}
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
                                    src="/images/mobile/talent/map-pin.svg"
                                    alt="event-location"
                                    width={26}
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
                                    src="/images/mobile/talent/schedule.svg"
                                    alt="event-date"
                                    width={26}
                                    height={24}
                                    quality={100}
                                    objectFit="fill"
                                />
                                <div className="flex flex-col items-start justify-center ">
                                    <p className="text-start text-[14px] font-semibold">
                                        Date
                                    </p>
                                    <p className="text-start text-[14px] font-medium text-gray-400">
                                        {event.working_time.date}

                                    </p>
                                </div>

                            </div>
                            <div className="flex flex-row pt-4 gap-4">
                                <Image
                                    src="/icons/time-icon.svg"
                                    alt="event-date"
                                    width={24}
                                    height={24}
                                    quality={100}
                                    objectFit="fill"
                                />
                                <div className="flex flex-col items-start justify-center ">
                                    <p className="text-start text-[14px] font-semibold">
                                        Time
                                    </p>
                                    <p className="text-start text-[14px] font-medium text-gray-400">
                                        {event.working_time.time} <span className="">  ({event.working_time.number_of_hours}) </span>
                                    </p>
                                </div>

                            </div>
                            <div className="h-[1px] bg-[#EBE6FF] w-full my-4 self-center" />
                            <div className="flex flex-row items-center justify-end w-full">

                                <div className={`flex flex-row items-start justify-end ${event.has_offered ? "w-[40%]" : "w-[20%]"}`}>
                                    <div
                                        onClick={() => {
                                            setLoadingButton({ eventId: event.id, type: 'viewOffer' });
                                            router.push(`/staff/job-detail/${event.id}`);
                                        }}
                                        className="w-full cursor-pointer py-4 self-center relative group"
                                    >
                                        <p className="flex items-center justify-center text-center text-[#350ABC] font-[500] text-[18px] leading-[24px]">
                                            {loadingButton === event.id ? (
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                            ) : (
                                                event.has_offered ? "View Offer" : "Make an offer"
                                            )}
                                        </p>

                                        {/* Underline hover animation */}
                                        <span className="absolute bottom-0 left-1/2 w-0 group-hover:w-full transition-all duration-300 ease-in-out h-[2px] bg-[#350ABC] transform -translate-x-1/2"></span>
                                    </div>

                                    {event.has_offered && (
                                        <div
                                            onClick={() => {
                                                setLoadingButton({ eventId: event.id, type: 'talkToClient' });
                                                router.push(`/staff/job-detail/${event.invite_id}/chat`);
                                            }}
                                            className="w-full cursor-pointer bg-[#350ABC] rounded-full py-4 self-center ml-1"
                                        >
                                            <p className="flex items-center justify-center text-center text-[white] font-[500] text-[18px] leading-[24px]">
                                                {loadingButton === event.id ? (
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                ) : (
                                                    "Talk to Client"
                                                )}
                                            </p>
                                        </div>
                                    )}

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
