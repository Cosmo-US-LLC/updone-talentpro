"use client";
import useIsMobile from "@/app/lib/hooks/useMobile";
import InvitesDesktop from "./InvitesDesktop";

const Page = () => {

    const isMobile = useIsMobile();

    if (isMobile === false) {
        return (
            <div className="mx-auto mt-2 lg:w-[730px] xl:w-[980px]">
                <div className="flex flex-col gap-2">
                    <h2 className="text-[24px] text-[#350ABC] underline font-medium">
                        Open Invites
                    </h2>
                    <p className="text-[14px] text-gray-600">
                        Here you can see all the events you have been invited to!
                    </p>
                </div>
                <InvitesDesktop />
            </div>
        );
    }
};

export default Page;
