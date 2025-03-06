"use client";
import useIsMobile from "@/app/lib/hooks/useMobile";
import PersonalDetailsDesktop from "./PersonalDetailsDesktop";

const Page = () => {

    const isMobile = useIsMobile();

    if (isMobile === false) {
        return (
            <div className="mx-auto mt-2 ">
                <div className="flex flex-col gap-2">
                    <h2 className="text-[24px] text-[#350ABC] underline font-medium">
                        Personal Details
                    </h2>
                    <p className="text-[14px] text-gray-600">
                        Here you can view and edit your personal details!
                    </p>
                </div>
                <PersonalDetailsDesktop />
            </div>
        );
    }
};

export default Page;
