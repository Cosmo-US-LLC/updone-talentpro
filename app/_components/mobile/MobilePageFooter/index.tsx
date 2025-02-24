"use client";
import Image from "next/image";
import { montserrat, poppins } from "@/app/lib/Fonts";
import { useRouter } from "next/navigation";
import React from "react";
import { useAppSelector } from "@/app/lib/store/hooks";
import { selectAuth } from "@/app/lib/store/features/authSlice";
import Link from "next/link";

const MobilePageFooter = ({
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
        <div className="pt-20">
          <div
            className={`bg-[#2c2240] relative ${isJobDetailFooter && !storedData?.token && "mt-[80px]"
              } ${isPrivacyPolicy && "!mt-[250px]"} mt-[80px] pb-[100px]`}
          >
            <div className="md:max-w-[920px] lg:max-w-[1279px] md:!px-[3rem] lg:!px-[3rem] xl:px-[0rem] 2xl:px-[0rem] xl:max-w-[1279px] mx-auto 2xl:max-w-[1440px] m-auto w-[100%]">
              <footer className="relative bg-[#2c2240] text-white pt-[150px] pb-5 footer-image">
                <div className="w-[100%]">
                  <div className="flex justify-center">
                    <div
                      style={{
                        boxShadow: isJobDetailFooter
                          ? "0px 6px 26px 0px rgba(0, 0, 0, 0.07)"
                          : "",
                      }}
                      className={`bg-[#F6F9FC] ${isJobDetailFooter || isContactUs ? "!bg-[#FFFFFF]" : ""
                        } ${isContactUs && "mt-[30px]"
                        } py-[24px] rounded-[12px] absolute z-[1] top-[-18%] max-w-[352px] w-[100%]`}
                    >
                      <div>
                        <h2
                          className={`${montserrat.className} text-center text-[#000] text-[20px] font-[400] leading-normal`}
                        >
                          Let’s{" "}
                          <span
                            className={`${montserrat.className} text-[#350ABC] font-[400] `}
                          >
                            find talent
                          </span>{" "}
                          for your event
                        </h2>
                        <p
                          className={`${poppins.className} text-center text-[#2C2240] text-[14px] font-[400] leading-[24px]`}
                        >
                          We’ll help you find the best resource in a blink
                        </p>
                      </div>
                      <div className="flex justify-center itens-center">
                        <button
                          onClick={handleHireNowClick}
                          className={`text-[14px] mt-[30px] font-[400] leading-[14px] bg-[#350ABC] text-[#F3F0FF] py-[12px] px-[16px] rounded-[4px] max-w-[205px] mx-auto w-[100%] h-[38px]
    transition-transform duration-150 ease-in-out transform active:scale-95 active:shadow-inner 
 grow_ellipse`}
                        >
                          Book a Talent Now
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center text-left lg:text-left">
                    <div className="space-y-[24px] mx-6">
                      <Image
                        className=""
                        src="/images/footer/footer-updone-logo.svg"
                        alt="footer"
                        width={164}
                        height={48}
                      />
                      <p
                        className={`${poppins.className} text-subheading-3 text-[14px] font-[400] leading-[24px] `}
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
                    <div className="flex flex-wrap items-center md:justify-between justify-center">
                      <div className="w-full text-center">
                        <div className="py-1 ">
                          <div className="mx-6">
                            <Link
                              href="/about"
                              className="border-b border-b-[#4B3A6E]  text-[14px] text-start font-[400] text-[#fff] py-[24px]  block"
                            >
                              About Us
                            </Link>
                            <Link
                              href="/contact-us"
                              className="border-b border-b-[#4B3A6E]   text-[14px] text-start font-[400] text-[#fff] py-[24px]  block"
                            >
                              Contact Us
                            </Link>
                            <Link
                              href="/terms-condition"
                              className="border-b border-b-[#4B3A6E]  text-[14px] font-[400] text-[#fff] py-[24px] block text-start"
                            >
                              Terms & Conditions
                            </Link>
                            <Link
                              href="/privacy-policy"
                              className="border-b border-b-[#4B3A6E]  text-[14px] font-[400] text-[#fff] py-[24px] block text-start"
                            >
                              Privacy Policy
                            </Link>
                          </div>
                          <p className="text-[14px] py-[24px] font-[400] text-center ">
                            © <span id="get-current-year">2024</span>
                            {" "}
                            Updone. All rights reserved.
                          </p>
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

export default React.memo(MobilePageFooter);
