"use client";
import Image from "next/image";
import { montserrat, poppins } from "@/app/lib/Fonts";
import { useRouter } from "next/navigation";
import React from "react";
import { useAppSelector } from "@/app/lib/store/hooks";
import { selectAuth } from "@/app/lib/store/features/authSlice";
import Link from "next/link";

const Footer = ({
  isJobDetailFooter,
  isContactUs,
  isPrivacyPolicy,
}: {
  isPrivacyPolicy?: boolean;
  isJobDetailFooter?: boolean;
  isContactUs?: boolean;
}) => {
  const router = useRouter();
  const { auth: storedData } = useAppSelector(selectAuth);
  const handleHireNowClick = () => {
    router.push("/add-job?step=event-location");
  };

  return (
    <>
      {
        <div className="">
          <div
            className={`bg-[#2c2240] relative ${isJobDetailFooter && !storedData?.token && "mt-[0px]"
              } ${isPrivacyPolicy && "!mt-[250px]"}`}
          >
            <div className="md:max-w-[920px] lg:max-w-[1279px] md:!px-[3rem] lg:!px-[3rem] xl:px-[0rem] 2xl:px-[0rem] xl:max-w-[1279px] mx-auto 2xl:max-w-[1440px]">
              <footer className="relative bg-[#2c2240] text-white pt-[250px] pb-5  footer-image">
                <div className="w-[100%] mx-auto">
                  <div className="flex justify-center">
                    <div
                      style={{
                        boxShadow: isJobDetailFooter
                          ? "0px 6px 26px 0px rgba(0, 0, 0, 0.07)"
                          : "",
                      }}
                      className={`bg-[#F3F0FF] ${isJobDetailFooter || isContactUs ? "!bg-[#FFFFFF]" : ""
                        } ${isContactUs && "mt-[30px]"
                        } flex justify-between items-center px-[86px] py-[45px] rounded-[40px] absolute z-[1] top-[-21%] max-w-[982px] w-[100%]`}
                    >
                      <div>
                        <h2
                          className={`${montserrat.className} text-[#000] text-[36px] font-[600] leading-normal tracking-[-0.92px]`}
                        >
                          Let’s{" "}
                          <span
                            className={`${montserrat.className} text-[#350ABC] font-[600] tracking-[-0.92px]`}
                          >
                            find a Talent
                          </span>{" "}
                          for your
                          <br /> upcoming event or project!
                        </h2>
                        <p
                          className={`${poppins.className} text-[#2C2240] text-[18px] font-[400] leading-[60px]`}
                        >
                          We’ll help you find the best talent in a blink.
                        </p>
                      </div>
                      <div>
                        <button
                          onClick={handleHireNowClick}
                          className={`bg-[#350ABC] text-[#F3F0FF] py-[18px] px-[41px] rounded-full 
    transition-transform duration-150 ease-in-out transform active:scale-95 active:shadow-inner 
 grow_ellipse`}
                        >
                          Book a Talent Now
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center text-left lg:text-left">
                    <div className="w-[60%] flex justify-center items-center flex-col space-y-4">
                      <Image
                        src="/images/footer/footer-updone-logo.svg"
                        alt="footer"
                        width={341}
                        height={100}
                      />
                      <p
                        className={`${poppins.className} text-subheading-3 text-[18px] font-[400] leading-normal text-center`}
                      >
                        Need expert staff for your next event? Updone is your
                        solution. We connect you with skilled bartenders,
                        waiters, and event helpers to elevate any occasion.
                        Whether it's a grand party or a small gathering, find
                        the perfect team to bring your event to life.
                      </p>
                    </div>
                  </div>
                  <div>
                    <hr className="mb-5 mt-10 border-[.5px] w-[100%] mx-auto border-[#807a8c]" />
                    <div className="flex flex-wrap items-center md:justify-between justify-center">
                      <div className="w-full text-center">
                        <div className="text-paragraph py-1 flex justify-between items-center">
                          <p className="text-[14px] font-[400] ">
                            Copyright © <span id="get-current-year">2024</span>
                            {" "}
                            Updone. All rights reserved.
                          </p>
                          <div className="space-x-[34px]">
                            <Link
                              href="/about"
                              className="  hover:pb-1 text-[14px] font-[400] text-[#fff]"
                            >
                              About Us
                            </Link>
                            <Link
                              href="/contact-us"
                              className="  hover:pb-1 text-[14px] font-[400] text-[#fff]"
                            >
                              Contact Us
                            </Link>
                            <Link
                              href="/terms-condition"
                              className="  hover:pb-1 text-[14px] font-[400] text-[#fff]"
                            >
                              Terms & Conditions
                            </Link>
                            <Link
                              href="/privacy-policy"
                              className="  hover:pb-1 text-[14px] font-[400] text-[#fff]"
                            >
                              Privacy Policy
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default React.memo(Footer);
