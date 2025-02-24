import React from "react";
import Marquee from "react-fast-marquee";
import "./sponsors.css";
import Image from "next/image";

const imageSources = [
  "/images/sponsor/trut (6).svg",
  "/images/sponsor/trut (5).svg",
  "/images/sponsor/trut (4).svg",
  "/images/sponsor/trut (3).svg",
  "/images/sponsor/trut (2).svg",
  "/images/sponsor/trut (1).svg",
];

const OurSponsors: React.FC = () => {
  return (
    <div
      className="App bg-[#FFFFFF]"
      style={{
        background:
          "linear-gradient(0deg, #F7F7F7 31.32%, rgba(255, 255, 255, 0.00) 100%)",
      }}
    >
      <div className=" min-w-[1024px] max-w-[1280px] px-6 mx-auto">
        <div className="title">
          <h2 className="trusted-text text-[26px] font-[600] tracking-[-0.48px]">
            Trusted by hundreds of small and large businesses
          </h2>
        </div>
        <div className="flex flex-row justify-around">
          {/* <Marquee direction="left" speed={100} delay={5}> */}
          {imageSources.map((src, index) => (
            <Image
              key={index}
              className="text-gray-900  w-[140px] h-[140px]"
              src={src}
              alt={`sponsor${index}`}
              width={20}
              height={20}
              quality={100}
            />
          ))}
          {/* </Marquee> */}
        </div>
      </div>
    </div>
  );
};

export default OurSponsors;
