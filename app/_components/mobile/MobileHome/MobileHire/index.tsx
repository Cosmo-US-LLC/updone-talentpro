// import React from "react";
import SwiperWithProgress from "./swiper/swiper";

const MobileHire = () => {
  return (
    <div
    style={{background:'linear-gradient(90deg, #F3F0FF 0%, #FFF 100%)'}}
    >
      <section className="max-w-full overflow-hidden relative px-[20px]">
        <div className="space-y-[40px] pt-[74px] mb-[1rem]">
          <div className="">
            <h2 className="text-[#2C2240] text-center leading-[36px] tracking-[-1.04px] text-[28px] font-[400] tracking-[-0.28px]">
              How to <span className="text-[#350ABC]">hire professional</span>{" "}
              for your need?
            </h2>
          </div>
          <div>
            <SwiperWithProgress />
          </div>
        </div>
      </section>
    </div>
  );
};

export default MobileHire;
