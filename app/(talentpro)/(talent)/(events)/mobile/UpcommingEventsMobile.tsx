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

const UpcomingEventsMobile = ({ setEventCount, activeTab }: {activeTab:string, setEventCount: (count: number) => void }) => {
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
            fetchEvents();
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
                    <p className="font-normal leading-[24px] text-[18px]">No Upcoming Events</p>
                </div>
            }
            {
                events?.length > 0 &&
                events.map((event: any) => {
                    const truncatedTitle =
            event.title.length > MAX_TITLE_LENGTH
              ? `${event.title.substring(0, MAX_TITLE_LENGTH)}...`
              : event.title;
                    return (
                        <div className="shadow-md rounded-md flex flex-col items-start justify-start mt-4 bg-[white] border border-1 border-[#EBE6FF] pl-[16px] pt-[16px] pb-[12px]">
                            <div className="flex flex-row items-center justify-between flex-wrap">
                                <div className="mr-2 flex-shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                        <g clip-path="url(#clip0_6377_74956)">
                                            <path d="M10.5 19.8834C8.89996 18.2834 5.38346 19.2168 4.2168 19.8834L5.40525 31.1053C5.45912 31.614 5.88817 32 6.39969 32H14.1162C14.6209 32 15.0466 31.6238 15.1086 31.1229L16.5 19.8834C15 20.7167 12.1 21.4834 10.5 19.8834Z" fill="#350ABC" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.70703 3.51556H12.8633V1.40625C12.8633 0.890625 12.4413 0.46875 11.9258 0.46875H8.64453C8.12903 0.46875 7.70703 0.89075 7.70703 1.40625V3.51556Z" stroke="#774DFD" stroke-miterlimit="22.9256" />
                                            <path d="M7.70703 3.51562C6.59928 3.99488 5.48691 4.80425 4.68272 6.06181M4.23359 6.88425C3.77166 7.88581 3.48828 9.11419 3.48828 10.6093M17.082 10.6093C17.082 6.52019 14.964 4.4245 12.8633 3.51562M17.082 12.4843L15.207 30.5938C15.1539 31.1066 14.7839 31.5313 14.2695 31.5313H11.6913M10.7539 31.5313H9.81641M8.87891 31.5313H6.30078C5.78628 31.5313 5.41634 31.1067 5.36328 30.5938L3.48828 12.4843" stroke="#774DFD" stroke-miterlimit="22.9256" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.082 10.6094H3.48828C2.97272 10.6094 2.55078 11.0312 2.55078 11.5469C2.55078 12.0625 2.97266 12.4844 3.48828 12.4844H17.082C17.5975 12.4844 18.0195 12.0625 18.0195 11.5469C18.0195 11.0312 17.5975 10.6094 17.082 10.6094Z" stroke="#774DFD" stroke-miterlimit="22.9256" />
                                            <path d="M14.2696 8.26562H15.2071M13.332 6.39062H14.2695" stroke="#774DFD" stroke-miterlimit="2.6131" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M28.042 29.6562H21.4795C20.9644 29.6562 20.542 30.0781 20.542 30.5938C20.542 31.1094 20.9639 31.5312 21.4795 31.5312H28.042C28.5576 31.5312 28.9795 31.1094 28.9795 30.5938C28.9794 30.0781 28.5566 29.6562 28.042 29.6562Z" stroke="#774DFD" stroke-miterlimit="22.9256" />
                                            <path d="M21.4795 29.6563L22.8857 25.9062L21.0107 19.3438M28.5107 19.3438L26.6357 25.9062L28.042 29.6563" stroke="#774DFD" stroke-miterlimit="22.9256" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M28.5107 17.4688H21.0107C20.4956 17.4688 20.0732 17.8906 20.0732 18.4062C20.0732 18.9219 20.4951 19.3438 21.0107 19.3438H28.5107C29.0263 19.3438 29.4482 18.9219 29.4482 18.4062C29.4482 17.8906 29.0254 17.4688 28.5107 17.4688Z" stroke="#774DFD" stroke-miterlimit="22.9256" />
                                            <path d="M22.8857 25.9062H26.6358" stroke="#774DFD" stroke-miterlimit="22.9256" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_6377_74956">
                                                <rect width="32" height="32" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                                <div className=" flex-grow min-w-0 mr-20">
                                    <h3 className="text-[12px] ">
                                        Requested Service
                                    </h3>
                                    <p className="text-[14px] font-semibold">
                                    {event.service_name}
                                    </p>
                                </div>
                                <div className="ml-auto flex-shrink-0">
                                   
                                <p className="text-[#0076E6] ml-2 text-[12px] bg-[#E7F4FD] w-fit px-4 py-1 rounded-full text-center font-[500]">
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
                                <p className="text-start text-[14px]  w-[250px] font-semibold truncate ">
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
                                <h3 className="text-[12px]">
                                    Time
                                </h3>
                                <p className="text-[14px] font-semibold">
                                {event.working_time.number_of_hours} <span className=""> - from {event.working_time.time} </span>
                                </p>
                                </div>
                                </div>
                            </div>
                            <div className="h-[1px] bg-[#EBE6FF] w-full my-4 self-center" />
                           
                            {/* <div className="flex w-full items-start justify-end mt-8"> */}
                            <div className="flex flex-row w-full items-start justify-end mt-1 ">
                            <div
  onClick={() => {
    const url = `/staff/job-detail/${event.id}?tab=${activeTab}`;
    handleButtonClick(event.id, url);
  }}
  className="w-[50%] py-[10px] self-center"
>
  <p
    className={`flex items-center justify-center text-[14px] font-[500] leading-[24px] cursor-pointer ${
      event.has_offered
        ? "text-[#5d0abc] underline ml-4"
        : "text-[white] bg-[#350ABC] py-[10px] px-[16px] rounded-sm mr-4"
    }`}
  >
    {buttonLoadingState[event.id] ? (
      <Loader2 className="w-5 h-5 animate-spin" />
    ) : (
      event.has_offered ? "View Offer" : "Make an offer"
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

export default UpcomingEventsMobile;
