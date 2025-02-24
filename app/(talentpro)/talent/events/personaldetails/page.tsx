"use client";
import useIsMobile from "@/app/lib/hooks/useMobile";
import PersonalDetailsDesktop from "./PersonalDetailsDesktop";

const Page = () => {

    const isMobile = useIsMobile();

    if (isMobile === false) {
        return (
            <div className="mx-auto mt-2 ">
                <PersonalDetailsDesktop />
            </div>
        );
    }
};

export default Page;
