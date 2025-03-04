"use client";
import { EventTabs } from "@/app/_components/(mobile-version)/talentpro/EventTabs";
import MobileNavbar from "@/app/_components/mobile/MobileNavbar";
import useIsMobile from "@/app/lib/hooks/useMobile";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MyEventsMobile from "../mobile/MyEventsMobile";
import UpcomingEventsDesktop from "../UpcommingEventsDesktop";
import UpcomingEventsMobile from "../mobile/UpcommingEventsMobile";
import MyEventsDesktop from "./MyEventsDekstop";

const Page = () => {
    // const [activeTab, setActiveTab] = useState("upcoming");
    // const [upcomingEventCount, setUpcomingEventCount] = useState(0);
    // const [myEventCount, setMyEventCount] = useState(0);
    // const router = useRouter();
    const isMobile = useIsMobile();

    // const pageTitle =
    //     activeTab === "upcoming"
    //         ? `Upcoming Events (${upcomingEventCount})`
    //         : `My Events(${myEventCount})`;

    // if (isMobile === true) {
    //     return (
    //         <div className="flex flex-col">
    //             <MobileNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
    //             <div className="w-full p-6 bg-[#F6F9FC]">

    //                 {/* <div
    //                 onClick={() => router.push(`${process.env.NEXT_PUBLIC_BASE_URL}`)}
    //                 className="p-2 pt-20 flex flex-row items-center justify-start gap-1 mb-2"
    //             >
    //                 <Image
    //                     src="/images/mobile/talentpro/left.svg"
    //                     alt="np-events"
    //                     width={20}
    //                     height={20}
    //                     quality={100}
    //                     objectFit="fill"
    //                 />
    //                 <p>Home</p>
    //             </div> */}
    //                 <EventTabs setActiveTab={setActiveTab} activeTab={activeTab} />
    //                 <div className="mt-8">
    //                     <div className="w-fit font-semibold text-[18px] text-[#5d0abc] pb-1 border-b-2 border-[#5d0abc]">
    //                         <h3>
    //                             {pageTitle}
    //                         </h3>
    //                     </div>
    //                     {activeTab === "upcoming" && (
    //                         <UpcomingEventsMobile setEventCount={setUpcomingEventCount} activeTab={activeTab} />
    //                     )}
    //                     {activeTab === "myevents" && <MyEventsMobile setEventCount={setMyEventCount} activeTab={activeTab}/>}
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // }

    if (isMobile === false) {
        return (
            <div className="mt-2 mx-auto lg:w-[800px] xl:w-[1000px]">
                <MyEventsDesktop />
            </div>
        );
    }
};

export default Page;
