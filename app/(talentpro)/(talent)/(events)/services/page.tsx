"use client";
import useIsMobile from "@/app/lib/hooks/useMobile";
import ServicesDesktop from "./ServicesDesktop";


const Page = () => {

    const isMobile = useIsMobile();

    if (isMobile === false) {
        return (
            <div className="mt-2 mx-auto">
                <div className="flex flex-col gap-2">
                    <h2 className="text-[24px] text-[#350ABC] underline font-medium">
                        Services
                    </h2>
                    <p className="text-[14px] text-gray-600">
                        Here you can add, delete and edit your services and service rates!
                    </p>
                </div>
                <ServicesDesktop />
            </div>
        );
    }
};

export default Page;
