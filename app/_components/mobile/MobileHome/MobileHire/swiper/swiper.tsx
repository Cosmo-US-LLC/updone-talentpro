import React, { useState, useEffect } from "react";
import { Swiper as SwiperType } from "swiper/types";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./swiper.css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import Image from "next/image";

const SwiperWithProgress = () => {
  const slides = [
    {
      id: 1,
      title: "Post a Job for your Event",
      image: "/Frame 1410126545.webp",
      para: "Select the skills needed, event zip, event date, and a brief description.",
    },
    {
      id: 2,
      title: "Invite the Best Talent",
      image: "/Frame 1410126546.webp",
      para: "Once posted, review talent profiles and invite the best candidates to staff your event. Talent will be notified in real time for fast response.",
    },
    {
      id: 3,
      title: "Receive and Review Offers",
      image: "/Frame 1410126849.webp",
      para: "Review offers from talents at a glance. Compare profiles, ratings, and experience to make an informed decision.",
    },
    {
      id: 4,
      title: "Select Your Talent and Your Are Done!",
      image: "/Frame 1410126496.webp",
      para: "Once you select your choice, you will be able to communicate with your talent to finalize any details.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex);
    setProgress(0); // Reset progress when slide changes
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress < 100 ? prevProgress + 1.43 : 0
      );
    }, 100);

    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <div className="swiper-container">
      <Swiper
        modules={[Autoplay, Navigation]}
        autoplay={{
          delay: 7000,
          disableOnInteraction: false,
        }}
        slidesPerView={1}
        loop={true}
        navigation
        onSlideChange={handleSlideChange}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="slide-content h-[600px]">
              <Image
                src={slide.image}
                alt="hire"
                width={360}
                height={360}
                quality={100}
              />
              <div className="mt-[50px]">
                <div className="progress-bar-container h-[6px] w-full bg-gray-300 rounded">
                  <div
                    className="progress-bar h-full bg-[#3E2392] transition-all"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <div className="flex flex-row items center gap-2">
                  <div>
                    <h3 className="text-[#3E2392] text-[18px] font-[400] mt-4">
                      {slide.id}.
                    </h3>
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-[#3E2392] text-[18px] font-[400] mt-4">
                      {slide.title}
                    </h3>
                    <p className="text-[14px] font-[400] leading-[24px] text-[#6B6B6B]">
                      {slide.para}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperWithProgress;
