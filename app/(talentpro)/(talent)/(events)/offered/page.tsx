"use client";
import useIsMobile from "@/app/lib/hooks/useMobile";
import OfferedDesktop from "./OfferedDesktop";
import { useState } from "react";
import MobileNavbar from "@/app/_components/mobile/MobileNavbar";
import OfferMobile from "./OfferedMobile";
import { useSearchParams } from "next/navigation";


const Page = () => {
    const searchParams= useSearchParams()
    const returnUrl = searchParams.get("returnUrl");

    const isMobile = useIsMobile();
        const [eventCount, setEventCount] = useState(0);
    
        if (isMobile === true) {
            return (
                <div className="flex flex-col">
                    <MobileNavbar />
                    <div className="w-full h-[100dvh] p-6 bg-[#F6F9FC] overflow-y-auto">
                        <div className="mt-20">
                        <div className="w-fit font-semibold text-[18px] text-[#5d0abc] pb-1 border-b-2 border-[#5d0abc] mb-4">
                <h3>My Offers ({eventCount})</h3>
              </div>
              <OfferMobile setEventCount={setEventCount} />
    
                         
                        </div>
                    </div>
                </div>
            );
        }

    if (isMobile === false) {
        return (
            <div className="mx-auto mt-2 lg:w-[700px] xl:w-[980px]">
                <div className="flex flex-col gap-2">
                    <h2 className="text-[24px] text-[#350ABC] underline font-medium">
                        Offered Events
                    </h2>
                    <p className="text-[14px] text-gray-600">
                        Here you can see all the events you have made offers to!
                    </p>
                </div>
                <OfferedDesktop />
            </div>
        );
    }
};

export default Page;
