import React, { useState } from "react";
import Image from "next/image";
import { AiOutlineLoading3Quarters } from "react-icons/ai"; // Using an icon for the loader

interface NoDataFoundProps {
  title: string;
  description: React.ReactNode;  // Allow description to be JSX/ReactNode
  image: string;
  isSettlement?: boolean;
}

const NoDataFound: React.FC<NoDataFoundProps> = ({ title, description, image, isSettlement }) => {
  const [isLoading, setIsLoading] = useState(true); // Track image loading state

  return (
    <div className={`${isSettlement && "flex-col justify-center items-center"} flex gap-[100px] h-full w-full`}>
      {/* Left Section - Title and Description */}
      <div className="w-1/2 flex flex-col justify-center pl-6">
        {!isSettlement && <h2 className="text-[48px] font-[300] leading-[52px] text-[#000000]">{title}</h2>}
        <p className="text-[16px] font-[400] leading-[24px] text-[#6B6B6B] mt-6">
          {description}
        </p>
      </div>

      {/* Right Section - Image */}
      <div className="w-1/2 flex justify-center items-center relative h-full">
        {isLoading && (
          <div className="absolute inset-0 flex justify-center items-center">
            <AiOutlineLoading3Quarters className="text-4xl text-[#774DFD] animate-spin" />
          </div>
        )}
        <Image
          src={image}
          alt="No Data"
          priority
          layout="fill"
          objectFit="contain"
          quality={100}
          className="rounded-lg w-full h-auto sm:w-[300px] sm:h-[300px] md:w-[500px] md:h-[500px] lg:w-[700px] lg:h-[700px]"
          onLoadingComplete={() => setIsLoading(false)}  // Hide loader when loading completes
        />
      </div>
      {isSettlement && <h2 className="text-[48px] relative bottom-20 font-[300] leading-[52px] text-[#000000]">{title}</h2>}
    </div>
  );
};

export default NoDataFound;
