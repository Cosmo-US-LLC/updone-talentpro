"use client";
import { Suspense, useEffect, useState } from "react";
import { EventTabs } from "@/app/_components/(mobile-version)/talentpro/EventTabs";
import MobileNavbar from "@/app/_components/mobile/MobileNavbar";
import useIsMobile from "@/app/lib/hooks/useMobile";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import MyEventsMobile from "./mobile/MyEventsMobile";
import UpcomingEventsMobile from "./mobile/UpcommingEventsMobile";
import PersonalDetails from "./mobile/PersonalDetails";
import LoginDetails from "./mobile/LoginDetails";
import Services from "./mobile/Services";
import PaymentMethod from "./mobile/PaymentMethod";
import OfferMobile from "./mobile/OfferMobile";
import UpcomingEventsDesktop from "./UpcommingEventsDesktop";
import Invites from "./mobile/Invites";


const PageContent = () => {
    const [activeTab, setActiveTab] = useState("upcoming");
    const [upcomingEventCount, setUpcomingEventCount] = useState(0);
    const [myEventCount, setMyEventCount] = useState(0);
    const [offeredEventCount, setOfferedEventCount] = useState(0);
    const [invitesCount, setInvitesCount] = useState(0);
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const isMobile = useIsMobile();

    useEffect(() => {
        const tab = searchParams.get('tab');
        setActiveTab(tab || 'upcoming');
    }, [pathname, searchParams]);

    const pageTitle = (() => {
        switch (activeTab) {
            case "upcoming":
                return `Upcoming Events (${upcomingEventCount})`;
            case "invites":
                return `Invites (${invitesCount})`;
            case "myevents":
                return `My Events (${myEventCount})`;
            case "personaldetails":
                return "Personal Details";
            case "logindetails":
                return "Login Details";
            case "services":
                return "Services";
            case "offered":
                return `Offered Events (${offeredEventCount})`;
            case "paymentmethod":
                return "Payment Method";
           
        }
    })();

    if (isMobile === true) {
        return (
            <div className="flex flex-col">
                <MobileNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
                <div className="w-full h-[100vh] p-6 bg-[#F6F9FC] overflow-y-auto">
                    <div className="mt-20">
                        <div className="w-fit font-semibold text-[18px] text-[#5d0abc] pb-1 border-b-2 border-[#5d0abc]">
                            <h3>{pageTitle}</h3>
                        </div>
                        {activeTab === "upcoming" && (
                            <UpcomingEventsMobile activeTab={activeTab} setEventCount={setUpcomingEventCount} />
                        )}
                        {activeTab === "invites" && (
                            <Invites activeTab={activeTab} setEventCount={setInvitesCount} />
                        )}
                        {activeTab === "myevents" && (
                            <MyEventsMobile activeTab={activeTab} setEventCount={setMyEventCount} />
                        )}
                        {activeTab === "offered" && (
                            <OfferMobile activeTab={activeTab} setEventCount={setOfferedEventCount} />
                        )}
                          {activeTab === "personaldetails" && (
                            <PersonalDetails activeTab={activeTab} />
                        )}
                          {activeTab === "logindetails" && (
                            <LoginDetails activeTab={activeTab} />
                        )}
                          {activeTab === "services" && (
                            <Services activeTab={activeTab} />
                        )}
                          {activeTab === "paymentmethod" && (
                            <PaymentMethod activeTab={activeTab}/>
                        )}
                    </div>
                </div>
            </div>
        );
    }
    if (isMobile === false) {
        return (
            <div className="mt-2 mx-auto lg:w-[730px] xl:w-[980px]">
                <div className="flex flex-col gap-2">
                    <h2 className="text-[24px] text-[#350ABC] underline font-medium">
                        Upcoming Events
                    </h2>
                    <p className="text-[14px] text-gray-600">
                        Here you can see all the upcoming events!
                    </p>
                </div>
                <UpcomingEventsDesktop />
            </div>
        );
    }
  
};

const Page = () => {
    return (
        <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
            <PageContent />
        </Suspense>
    );
};

export default Page;
