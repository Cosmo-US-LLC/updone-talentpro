"use client";
import useIsMobile from "@/app/lib/hooks/useMobile";
import ServicesDesktop from "./ServicesDesktop";


const Page = () => {

    const isMobile = useIsMobile();

    if (isMobile === false) {
        return (
            <div className="mt-2 mx-auto">
                <ServicesDesktop />
            </div>
        );
    }
};

export default Page;
