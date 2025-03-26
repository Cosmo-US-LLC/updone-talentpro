"use client";
import useIsMobile from "@/app/lib/hooks/useMobile";
import PaymentsDesktop from "./PaymentsDesktop";
import MobileNavbar from "@/app/_components/mobile/MobileNavbar";
import PaymentsMobile from "./PaymentsMobile";

const Page = () => {

    const isMobile = useIsMobile();

    if (isMobile === true) {
        return (
            <div className="flex flex-col">
                <MobileNavbar />
                <div className="w-full p-6 bg-[#F6F9FC] ">
                    <div className="mt-20">
                    <div className="w-fit font-semibold text-[18px] text-[#5d0abc] pb-1 border-b-2 border-[#5d0abc] mb-4">
            <h3>Payments</h3>
          </div>
          <PaymentsMobile />

                     
                    </div>
                </div>
            </div>
        );
    }

    if (isMobile === false) {
        return (
            <div className="mx-auto mt-2 lg:w-[700px] xl:w-[980px]">
                <div className="flex flex-col gap-2">
                    <h2 className="text-[24px] text-[#350ABC] underline font-medium">
                        Payments
                    </h2>
                    <p className="text-[14px] text-gray-600">
                        Here you can see all your payments!
                    </p>
                </div>
                <PaymentsDesktop />
            </div>
        );
    }
};

export default Page;
