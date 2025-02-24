"use client";
import Image from "next/image";
import React from "react";
import { SecurityItemTypes } from "@/app/lib/types";

const SecurityItem: React.FC<SecurityItemTypes> = ({
  src,
  alt,
  title,
  description,
}) => {
  return (
    <div className=" relative flex items-start gap-4 pt-0 mx-0 mt-4 overflow-hidden bg-transparent shadow-none rounded-xl bg-clip-border">
      <Image src={src} alt={alt} width={34} height={36} />
      <div className="flex w-full flex-col space-y-[20px]">
        <div className="flex items-center justify-between">
          <h3 className="mt-[5px] text-[18px] font-medium leading-normal text-white font-poppins">
            {title}
          </h3>
        </div>
        <p className="text-white font-poppins text-[16px] font-normal leading-[28px] mt-[5px]">
          {description}
        </p>
      </div>
    </div>
  );
};

export default React.memo(SecurityItem);
