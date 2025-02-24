// import React from "react";
import Image from "next/image";
import loadable from "../../ui/lazy-load";
import { FIRST_SECTION_ITEMS, SECOND_SECTION_ITEMS } from "@/app/lib/constants";

const SecurityItemListLazy = loadable(
  () => import("./componets/SecurityItemList")
);

const Security = () => {
  return (
    <div className="security-bg  bg-white">
      <div className="content relative z-[999] min-w-[1024px] max-w-[1280px] mx-auto px-6 ">
        <div className="flex lg:w-[95%] xl:w-[100%] h-[70vh] relative flex-row gap-12 ">
          <div className=" flex flex-col justify-center w-[30%] text-white lg:mr-8 xl:mr-0">
            <h2 className="why-choose mb-4">
              Why <br /> Choose
            </h2>
            <Image
              className="mb-6"
              src="/images/security/logo.svg"
              alt="updone_logo"
              width={305}
              height={89}
            />
            <p className="text-[16px] font-[400] leading-[normal] text-left">
              Plan your event with ease and confidence, we have you covered!
            </p>
          </div>
          <div className="w-[calc(100%-30%)] text-white ">
            <div className="h-[100%] flex gap-4 ">
              <div className="h-full  lg:w-1/2 md:w-[40%] mt-20">
                <SecurityItemListLazy items={FIRST_SECTION_ITEMS} />
              </div>
              <div className="m-auto flex justify-start items-center h-[115%]">
                <Image
                  className="w-[1px] 2xl:h-[600px] border-l border-[#e3e3e3] xl:h-[530px] lg:h-[550px] md:h-[400px] sm:h-[400px] h-[400px]"
                  src="/images/security/horizontal.svg"
                  alt="streamlined"
                  width={1}
                  height={520}
                />
              </div>
              <div className="h-full lg:w-1/2 md:w-[40%] mt-6">
                <SecurityItemListLazy items={SECOND_SECTION_ITEMS} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;
