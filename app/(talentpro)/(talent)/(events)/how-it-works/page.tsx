"use client";
import useIsMobile from "@/app/lib/hooks/useMobile";
import HowitDesktop from "./HowitDesktop";

const Page = () => {

    const isMobile = useIsMobile();

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
