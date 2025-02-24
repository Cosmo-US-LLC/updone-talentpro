"use client"
import React, { useEffect } from "react";
import SwiperCore from "swiper";
import "swiper/swiper-bundle.css";
import { Autoplay, Pagination } from "swiper/modules";
import "./index.css";
import { montserrat } from "@/app/lib/Fonts";
import TestimonialCard from "@/app/_components/home/testimonials/components/TestimonialCard";
// Initialize Swiper modules
SwiperCore.use([Autoplay, Pagination]);
// Initialize Swiper modules
SwiperCore.use([Autoplay, Pagination]);

interface Testimonial {
  avatarSrc: string;
  name: string;
  content: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
  isDetailTestonial?: boolean;
}

const MobileTestimonials: React.FC<TestimonialsProps> = ({
  testimonials,
  isDetailTestonial,
}) => {
  useEffect(() => {
    const swiper = new SwiperCore(".mySwiper", {
      slidesPerView: 1,
      spaceBetween: 10,
      loop: true,
      centeredSlides: true,
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 6,
        },
        640: {
          spaceBetween: 32,
        },
        768: {
          spaceBetween: 32,
        },
        1024: {
          spaceBetween: 32,
        },
      },
    });

    return () => {
      if (swiper && swiper.destroy) swiper?.destroy();
    };
  }, []);

  return (
    <>
      {isDetailTestonial ? (
        <section>
          <div>
            <h2 className={` text-center font-[400] text-[#000] !text-[28px] `}>
              Testimonials
            </h2>
            <p className="text-[#6B6B6B] !text-[16px] font-[400] leading-[28px] text-center">
              At Updone we are commited to pushing the boundries of what’s
              possible.
            </p>
          </div>
          <div className="px-[100px] pb-[87px] bg-[#F3F0FF] relative top-[12px] w-[90%] m-auto">
            <div className="relative bottom-[85px]">
              <div className="mx-auto flex justify-center items-center">
                <div className="px-[30px] swiper mySwiper max-w-[1279px] mx-auto">
                  <div className="swiper-wrapper w-max">
                    {testimonials?.map((testimonial, index) => (
                      <div key={index} className="swiper-slide">
                        <TestimonialCard
                          isDetailTestonial={isDetailTestonial}
                          name={testimonial.name}
                          content={testimonial.content}
                          avatarSrc={testimonial.avatarSrc}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="swiper-button-next"></div>
                  <div className="swiper-button-prev"></div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="swiper-pagination absolute top-4 left-0 right-0 flex justify-center z-10 "
            style={{ bottom: "100px" }}
          ></div>
        </section>
      ) : (
        <section className="relative py-[70px]">
          <div className="absolute top-[-102px]  z-[999] right-0">
            {/* <svg width="300" height="300" viewBox="0 0 574 595" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path opacity="0.1" d="M1096 47C1096 349.652 850.652 595 548 595C245.348 595 0 349.652 0 47C0 -255.652 245.348 -501 548 -501C850.652 -501 1096 -255.652 1096 47ZM3.99622 47C3.99622 347.445 247.555 591.004 548 591.004C848.445 591.004 1092 347.445 1092 47C1092 -253.445 848.445 -497.004 548 -497.004C247.555 -497.004 3.99622 -253.445 3.99622 47Z" fill="#350ABC" />
            </svg> */}
          </div>
          <div className="absolute bottom-[-11px] left-[-140px]">
            {/* <svg width="258" height="269" viewBox="0 0 498 269" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path opacity="0.1" d="M498 256C498 397.385 383.385 512 242 512C100.615 512 -14 397.385 -14 256C-14 114.615 100.615 0 242 0C383.385 0 498 114.615 498 256ZM-3.71143 256C-3.71143 391.703 106.297 501.711 242 501.711C377.703 501.711 487.711 391.703 487.711 256C487.711 120.297 377.703 10.2886 242 10.2886C106.297 10.2886 -3.71143 120.297 -3.71143 256Z" fill="#350ABC" />
            </svg> */}
          </div>
          {/* Testimonials heading and description */}

          <div className="w-[90%] m-auto">
            <h2 className={` text-center font-[400] text-[#000] !text-[28px] `}>
              Testimonials
            </h2>
            <p className="text-[#6B6B6B] text-[16px] font-[400] leading-[28px] text-center">
              At Updone we are commited to pushing the boundries of what’s
              possible.
            </p>
          </div>

          {/* Testimonials Slider */}
          <div className="max-w-[1279px] m-auto w-[90%] 2xl:max-w-[1440px]">
            <div className="mx-auto h-[50vh] flex justify-center items-center">
              <div className="px-[30px] swiper mySwiper">
                <div className="swiper-wrapper w-max">
                  {testimonials?.map((testimonial, index) => (
                    <div key={index} className="swiper-slide">
                      <TestimonialCard
                        name={testimonial.name}
                        content={testimonial.content}
                        avatarSrc={testimonial.avatarSrc}
                      />
                    </div>
                  ))}
                </div>
                <div className="swiper-button-next"></div>
                <div className="swiper-button-prev"></div>
              </div>
            </div>
          </div>

          {/* Pagination outside Testimonials Slider */}
          <div className="swiper-pagination absolute top-4 left-0 right-0 flex justify-center z-10 mt-[12px]"></div>

          {/* Random colored circles with blur */}
          <div className="absolute inset-0 flex justify-end items-center space-x-4 space-y-4  z-[-1]">
            <div className="absolute top-0 right-[495px] w-32 h-32 rounded-full">
              <svg
                width="518"
                height="495"
                viewBox="0 0 718 695"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.14" filter="url(#filter0_f_35_3168)">
                  <path
                    d="M618 336C618 479.042 502.042 595 359 595C215.958 595 100 479.042 100 336C100 192.958 215.958 77 359 77C502.042 77 618 192.958 618 336ZM209.091 336C209.091 418.792 276.208 485.909 359 485.909C441.792 485.909 508.909 418.792 508.909 336C508.909 253.208 441.792 186.091 359 186.091C276.208 186.091 209.091 253.208 209.091 336Z"
                    fill="#350ABC"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_f_35_3168"
                    x="0"
                    y="-23"
                    width="718"
                    height="718"
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
                      stdDeviation="50"
                      result="effect1_foregroundBlur_35_3168"
                    />
                  </filter>
                </defs>
              </svg>
            </div>
            <div className="absolute left-[35%] -translate-x-1/2 top-[30%] transform -translate-y-1/2 w-32 h-32 rounded-full">
              <svg
                width="572"
                height="434"
                viewBox="0 0 772 534"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.1" filter="url(#filter0_f_35_3170)">
                  <path
                    d="M434.599 303.692C528.317 376.833 642.172 387.587 567.176 483.682C492.18 579.776 355.41 598.384 261.692 525.243C167.974 452.101 152.796 314.908 227.792 218.814C302.788 122.719 340.88 230.55 434.599 303.692Z"
                    fill="#BC0AB5"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_f_35_3170"
                    x="0.140137"
                    y="0.818359"
                    width="771.359"
                    height="749.104"
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
                      stdDeviation="90"
                      result="effect1_foregroundBlur_35_3170"
                    />
                  </filter>
                </defs>
              </svg>
            </div>
            <div className="absolute bottom-[682px] left-0 w-32 h-32 rounded-full">
              <svg
                width="573"
                height="583"
                viewBox="0 0 673 683"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.5" filter="url(#filter0_f_35_3166)">
                  <circle cx="331.5" cy="341.5" r="91.5" fill="#B292F7" />
                </g>
                <defs>
                  <filter
                    id="filter0_f_35_3166"
                    x="-10"
                    y="0"
                    width="683"
                    height="683"
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
                      result="effect1_foregroundBlur_35_3166"
                    />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default MobileTestimonials;
