"use client";
import Image from "next/image";
import React, { useState } from "react";
import ServicesContent from "./components/ServicesContent";
import { montserrat, poppins } from "@/app/lib/Fonts";

import { useRouter } from "next/navigation";
import { services } from "@/app/lib/constants";

const Services = () => {
  const [imageLoaded, setImageLoaded] = useState(
    Array(services.length).fill(false)
  );
  const router = useRouter();

  const handleImageLoad = (index: number) => {
    setImageLoaded((prev) => {
      const newLoaded = [...prev];
      newLoaded[index] = false;
      return newLoaded;
    });
  };
  const handleHireNowClick = () => {
    localStorage?.removeItem("selectedServiceId");
    localStorage?.removeItem("selectedServiceName");
    router.push("/add-job?step=event-location");
  };
  return (
    <>
      <div className="pb-[100px] pt-[50px] bg-[FFFFFF]  min-w-[1024px] max-w-[1280px] px-6 mx-auto">
        <h2
          className={`${montserrat.className} service-text mb-[65px] font-[700]`}
        >
          What{" "}
          <span
            className={`${montserrat.className} text-[#350ABC] font-[800] tracking-[-1.12px]`}
          >
            services
          </span>{" "}
          are you <br /> looking for?
        </h2>
        <div className="relative pb-4">
          <div className="absolute top-[-337px] z-[-1] left-[-120px]">
            <svg
              width="722"
              height="745"
              viewBox="0 0 722 745"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.35" filter="url(#filter0_f_268_11105)">
                <circle cx="349.17" cy="372.5" r="122.5" fill="#CB92F7" />
              </g>
              <defs>
                <filter
                  id="filter0_f_268_11105"
                  x="-23.3301"
                  y="0"
                  width="745"
                  height="745"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feGaussianBlur
                    stdDeviation="125"
                    result="effect1_foregroundBlur_268_11105"
                  />
                </filter>
              </defs>
            </svg>
          </div>
          <div className="absolute bottom-[-381px] right-[-6px]">
            <Image
              src="/images/services/bottom-right-circle.svg"
              alt="top-left-circle"
              width={180}
              height={324}
            />
          </div>
          <div className="absolute bottom-[-470px] right-[-250px]">
            <svg
              width="722"
              height="745"
              viewBox="0 0 722 745"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.35" filter="url(#filter0_f_268_11105)">
                <circle cx="349.17" cy="372.5" r="122.5" fill="#CB92F7" />
              </g>
              <defs>
                <filter
                  id="filter0_f_268_11105"
                  x="-23.3301"
                  y="0"
                  width="745"
                  height="745"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feGaussianBlur
                    stdDeviation="125"
                    result="effect1_foregroundBlur_268_11105"
                  />
                </filter>
              </defs>
            </svg>
          </div>
          <div className="relative max-w-full m-auto">
            <div
              className={`-m-1 flex flex-wrap  gap-y-[70px] 2xl:gap-y-[40px] gap-0`}
            >
              {services.map((service, index) => (
                <div key={index} className="w-1/3 p-2">
                  <div className="w-full min-h-[280px] max-h-[320px] 2xl:max-h-[420px]">
                    {imageLoaded[index] && (
                      <div className="w-full min-h-[290px] max-h-[330px] animate-pulse bg-gray-300" />
                    )}
                    <div className={imageLoaded[index] ? "" : "bg-gray-300"}>
                      <Image
                        src={service.imgSrc}
                        alt={service.alt}
                        width={413}
                        height={240}
                        quality={75}
                        onLoad={() => handleImageLoad(index)}
                        className="w-full"
                        loading="lazy"
                      />
                    </div>
                    {!imageLoaded[index] && (
                      <ServicesContent
                        name={service.name}
                        description={service.description}
                        serviceSrc={service.serviceSrc}
                        id={service.id}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full text-center relative z-50 md:mt-[10px] 2xl:mt-[10px] mb-[10px] cursor-pointer">
        <button
          onClick={handleHireNowClick}
          className="text-[#F3F0FF] !bg-[#350ABC] rounded-full text-[18px] font-normal px-[50px] py-[18px] text-center inline-flex items-center me-2 grow_ellipse
    transition-transform duration-150 ease-in-out transform active:scale-95 active:shadow-inner "
        >
          Book a Talent Now
        </button>
      </div>
    </>
  );
};

export default Services;
