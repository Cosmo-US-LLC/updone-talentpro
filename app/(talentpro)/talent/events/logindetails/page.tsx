"use client";
import useIsMobile from "@/app/lib/hooks/useMobile";
import LoginDetailsDesktop from "./LoginDetailsDesktop";

const Page = () => {
    const isMobile = useIsMobile();


    if (isMobile === false) {
        return (
            <div className="mt-2 mx-auto">
                <LoginDetailsDesktop />
            </div>
        );
    }
};

export default Page;
