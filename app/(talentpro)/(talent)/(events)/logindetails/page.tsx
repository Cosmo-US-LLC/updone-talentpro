"use client";
import useIsMobile from "@/app/lib/hooks/useMobile";
import LoginDetailsDesktop from "./LoginDetailsDesktop";

const Page = () => {
    const isMobile = useIsMobile();


    if (isMobile === false) {
        return (
            <div className="mt-2 mx-auto">
                <div className="flex flex-col gap-2">
                    <h2 className="text-[24px] text-[#350ABC] underline font-medium">
                        Login Details
                    </h2>
                    <p className="text-[14px] text-gray-600">
                        Here you can view and edit your login details!
                    </p>
                </div>
                <LoginDetailsDesktop />
            </div>
        );
    }
};

export default Page;
