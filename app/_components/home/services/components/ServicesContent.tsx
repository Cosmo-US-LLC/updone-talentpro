"use client";
import { montserrat } from "@/app/lib/Fonts";
import { setSelectedService } from '@/app/lib/store/features/jobCreateSlice';
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const ServicesContent = ({ name, description, serviceSrc, id }: any) => {

  const dispatch = useDispatch();
  
  const handleClick = () => {
    dispatch(setSelectedService({ name, id }));
   
  };

  return (
    <div className="w-[100%] m-auto relative z-10 bottom-[95px] md:right-[5px] lg:right-[14px] xl:right-[19.5px]">
      <Image
        src="/images/services/serivceContent.svg"
        alt="service"
        className={`xl:max-w-[436px] lg:max-w-[340px] md:max-w-[320px] h-[253px] 2xl:h-[285px] ${
          name === "Event Helper" && "relative top-[5px]"
        } ${name === "Cocktail server" && "relative bottom-[12px]"}`}
        quality={100}
        width={810}
        height={692}
      />
      <Image
        src="/images/services/contentShadow.svg"
        alt="service"
        className={`absolute bottom-[202px]`}
        quality={100}
        width={820}
        height={700}
      />
      <div className="flex justify-between items-start h-full gap-4 flex-col">
        <div
          className={`${
            name === "Cocktail server" && "relative bottom-[236px]"
          } 2xl:bottom-[237px] w-[80%] relative bottom-[224px] md:left-[40px] lg:left-[50px] xl:left-[64px]`}
        >
          <div className="flex justify-end items-end w-full relative md:right-[8px] lg:right-[-10px] xl:right-[-15px] md:bottom-[-35px] lg:bottom-[-30px] xl:bottom-[-12px]">
            <Image
              quality={100}
              src={serviceSrc}
              alt="service"
              width={
                name === "Event Helper"
                  ? 41
                  : name === "Cocktail server"
                  ? 36
                  : 36
              }
              height={36}
            />
          </div>
          <h3
            className={`${montserrat.className} text-[24px] font-[600] leading-normal pb-2 translate-[-0.24px] text-[#000000]`}
          >
            {name}
          </h3>
          <p className="text-[#6B6B6B] text-[16px] font-[400] leading-[28px] ">
            {description}
          </p>
        </div>
        <div>
          <Link
            href="/add-job?step=event-location"
            onClick={handleClick}
            className={`text-[16px] font-[500] text-[#350ABC] ${
              name === "Cocktail server" ? "bottom-[240px]" : "bottom-[227px]"
            } hover:text-[#350ABC] leading-[28px] tracking-[-0.28px] flex justify-start relative lg:left-[3.2rem] xl:left-[4.2rem] gap-2 items-center w-full
        transition-transform duration-150 ease-in-out transform active:scale-95 active:shadow-inner  group`}
          >
            Hire a {name}
            <span className="text-[#350ABC] group-hover:text-[#350ABC]">
              <svg
                width="35"
                height="8"
                viewBox="0 0 35 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 3.5C0.723858 3.5 0.5 3.72386 0.5 4C0.5 4.27614 0.723858 4.5 1 4.5V3.5ZM34.3536 4.35355C34.5488 4.15829 34.5488 3.84171 34.3536 3.64645L31.1716 0.464466C30.9763 0.269204 30.6597 0.269204 30.4645 0.464466C30.2692 0.659728 30.2692 0.976311 30.4645 1.17157L33.2929 4L30.4645 6.82843C30.2692 7.02369 30.2692 7.34027 30.4645 7.53553C30.6597 7.7308 30.9763 7.7308 31.1716 7.53553L34.3536 4.35355ZM1 4.5H34V3.5H1V4.5Z"
                  fill="currentColor"
                />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServicesContent;
