"use client";
import { Loader } from "@/app/_components/ui/dashboard-loader";
import { apiRequest } from "@/app/lib/services";
import { selectAuth } from "@/app/lib/store/features/authSlice";
import { useAppSelector } from "@/app/lib/store/hooks";
import { Loader2 } from 'lucide-react';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MAX_TITLE_LENGTH = 25;

const serviceIcons = {
    "Bartender": "/images/mobile/service-icons/bartender.svg",
    "Barback": "/images/mobile/service-icons/bar-back.svg",
    "Promo Model": "/images/mobile/service-icons/promo-model.svg",
    "Waiter": "/images/mobile/service-icons/waiter.svg",
    "Cocktail Server": "/images/mobile/service-icons/coctail-server.svg",
    "Event Helper": "/images/mobile/service-icons/event-helper.svg"
  };

const MyEventsMobile = ({ setEventCount, activeTab }: { activeTab: string, setEventCount: (count: number) => void }) => {
    const [isButtonLoading, setIsButtonLoading] = useState(false);
    const { auth: storedData } = useAppSelector(selectAuth);
    const [isLoading, setIsLoading] = useState(false);
    const [events, setEvents] = useState([]);
    const router = useRouter();
    const [buttonLoadingState, setButtonLoadingState] = useState<{ [key: number]: boolean }>({});

    const handleButtonClick = (eventId: number, url: string) => {
        setButtonLoadingState((prevState) => ({
            ...prevState,
            [eventId]: true,
        }));

        router.push(url);
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
                const eventsData = response?.jobs || [];
                setEvents(eventsData);
                setEventCount(eventsData.length);

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
        <div className="">
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
                events.map((event: any, id:any) => {
                    const truncatedTitle =
                        event.title.length > MAX_TITLE_LENGTH
                            ? `${event.title.substring(0, MAX_TITLE_LENGTH)}...`
                            : event.title;
                    return (
                        <div key={id} className="shadow-md rounded-md flex flex-col items-start justify-start mt-4 bg-[white] border border-1 border-[#EBE6FF] pl-[16px] pt-[16px] pb-[12px]">
                            <div className="flex flex-row">
                                <div className="mr-2 ">
                                <Image 
                                        src={serviceIcons[event.service_name as keyof typeof serviceIcons] || "/images/mobile/service-icons/event-helper.svg"}
                                        alt={event.service_name}
                                        width={32}
                                        height={32}
                                        quality={100}
                                        className="text-[#5d0abc]"
                                    />
                                </div>
                                <div className=" flex flex-col mr-12">
                                    <h3 className="text-[12px] ">
                                        Requested Service
                                    </h3>
                                    <p className="text-[14px] font-semibold">
                                        {event.service_name}
                                    </p>
                                </div>
                                <div className="mt-">


                                    <p className={`text-[14px] ${event.status === "assigned" ? "bg-[#EAFDE7] text-[#0C9000] rounded-full ml-3 py-1 px-3" : "text-[#E60000] bg-[#FDE7E7] rounded-full ml-1 py-1 px-3"} text-center  font-[500]`}>
                                        {event.status}
                                    </p>

                                </div>

                            </div>

                            <div className="pt-4">
                                <p className="text-start text-[18px] font-bold">{truncatedTitle}</p>
                                {event.title.length > MAX_TITLE_LENGTH && (
                                    <button
                                        onClick={() => handleButtonClick(event.id, `/staff/job-detail/${event.id}`)}
                                        className="text-[14px] text-[#0076E6] underline mt-2"
                                    >
                                        View More
                                    </button>
                                )}
                            </div>


                            <div className=" mt-4">
                                <div className="flex flex-row">
                                    <div className="mr-2 flex items-center flex-shrink-0">
                                        <Image src='/images/mobile/talent/schedule.svg' width={30} height={30} alt="glass" />
                                    </div>
                                    <div className="flex flex-col flex-grow">
                                        <h3 className="text-[12px] ">
                                            Location
                                        </h3>
                                        <p className="text-start text-[14px] w-[250px] font-semibold truncate">
                                            {event.event_location}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3">
                                <div className="flex flex-row">
                                    <div className="mr-2 flex items-center flex-shrink-0">
                                        <Image src='/images/mobile/talent/map-pin.svg' width={30} height={28} alt="glass" />
                                    </div>
                                    <div className="flex flex-col flex-grow">

                                        <h3 className="text-[12px] ">
                                            Date
                                        </h3>
                                        <p className="text-[14px] font-semibold">
                                            {event.working_time.date}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3">
                                <div className="flex flex-row">
                                    <div className="flex items-center mr-2 flex-shrink-0">
                                        <Image
                                            src="/icons/time-icon.svg"
                                            alt="np-events"
                                            width={29}
                                            height={28}
                                            quality={100}
                                            objectFit="fill"
                                            className="rounded-sm"
                                        />
                                    </div>

                                    <div className="flex flex-col flex-grow">
                                        <h3 className="text-[12px] ">
                                            Time
                                        </h3>
                                        <p className="text-[14px] font-semibold">
                                            {event.working_time.number_of_hours} <span className=""> - from {event.working_time.time} </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="h-[1px] bg-[#EBE6FF] w-[95%] my-4 self-start" />

                            {/* <div className="flex w-full items-start justify-end mt-8"> */}
                            <div className="flex flex-row w-full items-start justify-end mt-1">
                                <div
                                    onClick={() => handleButtonClick(event.id, `/staff/job-detail/${event.id}?tab=${activeTab}`)}
                                    className="bg-[#350ABC] rounded-sm w-[50%] py-2 mr-4 self-center"
                                >
                                    <p className="flex items-center justify-center text-center text-[white] font-[500] text-[14px] leading-[24px]">
                                        {buttonLoadingState[event.id] ? (
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                        ) : (
                                            event.status === "completed" ? "View Details" : "Talk to Client"
                                        )}
                                    </p>
                                </div>
                            </div>
                            {/* </div> */}
                        </div>
                    )
                })
            }
        </div>
    );
};

export default MyEventsMobile;
