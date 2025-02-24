"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { montserrat, poppins } from "@/app/lib/Fonts";
import { useRouter } from "next/navigation";

const MobileFooter = () => {
  const router = useRouter();
  const handleHireNowClick = () => {
    router.push("/add-job?step=event-location");
  };

  return (
    <div className="bg-[#2c2240] text-white relative z-[1] mt-[100px] pb-[80px]">
      <footer className="relative bg-[#2c2240] text-white pt-16 pb-8 px-4">
        {/* Hero Section */}
        <div
          className="bg-[#F3F0FF] px-6 py-8 rounded-[20px] absolute top-[-10%] left-[50%] translate-x-[-50%] w-[95%] z-[2] shadow-lg"
          style={{ boxShadow: "0px 6px 26px 0px rgba(0, 0, 0, 0.07)" }}
        >
          <div className="flex flex-col justify-center items-center text-center space-y-4">
            <h2
              className={`${montserrat.className} text-[#000] text-[20px] font-[600] leading-snug`}
            >
              Let’s{" "}
              <span
                className={`${montserrat.className} text-[#350ABC] font-[600]`}
              >
                find a Talent
              </span>{" "}
              for your event
            </h2>
            <p
              className={`${poppins.className} text-[#2C2240] text-[14px] font-[400] leading-[20px]`}
            >
              We’ll help you find the best resource in a blink
            </p>
            <button
              onClick={handleHireNowClick}
              className="bg-[#350ABC] text-[#F3F0FF] py-3 px-6 rounded-[4px] transition-transform duration-150 ease-in-out transform active:scale-95"
            >
              Book a Talent Now!
            </button>
          </div>
        </div>

        {/* Logo and Description */}
        <div className="flex flex-col mt-[140px] space-y-4">
          <Image
            src="/images/footer/footer-updone-logo.svg"
            alt="footer"
            width={200}
            height={60}
          />
          <p
            className={`${poppins.className} text-[#F3F0FF] text-[14px] font-[400] leading-[24px]`}
          >
            Need expert staff for your next event? Updone is your solution. We
            connect you with skilled bartenders, waiters, and event helpers to
            elevate any occasion. Whether it's a grand party or a small
            gathering, find the perfect team to bring your event to life.
          </p>
        </div>

        {/* Links Section */}
        <div className="mt-6">
          {/* <hr className="mb-5 border-[.5px] w-full mx-auto border-[#807a8c]" /> */}
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-4">
              <Link
                href="/about"
                className="w-full text-left pb-4 border-b border-[#4B3A6E] hover:border-b-[#FFFFFF] text-[14px] font-[400] text-[#FFFFFF]"
              >
                About Us
              </Link>
              <Link
                href="/contact-us"
                className="w-full text-left pb-4 border-b border-[#4B3A6E] hover:border-b-[#FFFFFF] text-[14px] font-[400] text-[#FFFFFF]"
              >
                Contact Us
              </Link>
              <Link
                href="/terms-condition"
                className="w-full text-left pb-4 border-b border-[#4B3A6E] hover:border-b-[#FFFFFF] text-[14px] font-[400] text-[#FFFFFF]"
              >
                Terms & Conditions
              </Link>
              <Link
                href="/privacy-policy"
                className="w-full text-left pb-4 border-b border-[#4B3A6E] hover:border-b-[#FFFFFF] text-[14px] font-[400] text-[#FFFFFF]"
              >
                Privacy Policy
              </Link>
            </div>
            <p className="text-[14px] font-[400] text-center mt-4">
              Copyright © <span id="get-current-year">2024</span> Updone. All
              rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MobileFooter;
