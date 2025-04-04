"use client";
import useIsMobile from "@/app/lib/hooks/useMobile";
import HowitDesktop from "./HowitDesktop";
import MobileNavbar from "@/app/_components/mobile/MobileNavbar";
import Howitworks from "./HowitMobile";

const Page = () => {

    const isMobile = useIsMobile();

    if (isMobile === true) {
        return (
            <div className="flex flex-col">
                <MobileNavbar />
                <div className="w-full h-[100dvh] p-6 bg-[#F6F9FC] overflow-y-auto">
                    <div className="mt-20">
                    <div className="w-fit font-semibold text-[18px] text-[#5d0abc] pb-1 border-b-2 border-[#5d0abc] mb-4">
            <h3>How It Works</h3>
          </div>
          <Howitworks />

                     
                    </div>
                </div>
            </div>
        );
    }

    if (isMobile === false) {
        return (
            <div className="mx-auto mt-2 lg:w-[730px] xl:w-[980px]">
                <div className="flex flex-col gap-2">
                    <h2 className="text-[24px] text-[#350ABC] underline font-medium">
                        How to make offer on events
                    </h2>
                    <p className="text-[14px] text-gray-600">
                        Here is demo video on how to make offers to get hired for events!
                    </p>
                </div>
                <HowitDesktop/>
            </div>
        );
    }
};

export default Page;
