import React from "react";
import Image from "next/image";

const InfoCard = ({
  title = "How to make an impact?",
  keyPoints = [
    "Offers with details have 60% more acceptance rate.",
    "Do not share any sensitive information (email, address, and phone numbers).",
  ],
  icon = "../../public/icons/",
}) => {
  return (
    <div className="my-4 mb-12 flex p-4 items-start rounded-[4px] border border-dashed border-[#FFE0B0] bg-[#FFF7EC] shadow-lg">
      <div className="relative w-[44px] h-[24px]">
        <Image
          src={icon}
          alt={`${title} icon`}
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div className="w-[1px] h-[145px] bg-[#F9E1BE] mx-3"></div>
      <div>
        <h3
          className="text-[#161616] font-poppins text-[16px] font-medium leading-[8px] mb-2"
        >
          {title}
        </h3>
        <ul className="list-disc list-inside text-[#4C4B4B] font-poppins font-normal text-[14px] leading-[24px]">
          {keyPoints.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InfoCard;
