"use client";
import useIsMobile from "@/app/lib/hooks/useMobile";
import OfferedDesktop from "./OfferedDesktop";

const Page = () => {

    const isMobile = useIsMobile();

    if (isMobile === false) {
        return (
            <div className="mx-auto mt-2 lg:w-[800px] xl:w-[1000px]">
                <OfferedDesktop />
            </div>
        );
    }
};

export default Page;
