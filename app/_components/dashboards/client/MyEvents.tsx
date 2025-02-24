import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const MyEvents = () => {
  const router = useRouter();
  return (
    <div className="h-full min-h-fit flex w-full flex-col justify-center items-center">
      <div className="text-center pb-[48px]">
        <h1 className="text-[48px] font-[400] tracking-[-1.28px] leading-normal text-[#000000]">
          Lets find a{" "}
          <span className="bg-[#350ABC] rounded-[4px] text-[#FFF] px-3">
            TALENT
          </span>
        </h1>
        <p className="text-[32px] font-[400] tracking-[-1.28px] leading-normal text-[#000000]">
          for your upcoming event or project
        </p>
      </div>
      <Image
        src="/images/client-portal/no event creative image.webp"
        height={400}
        width={400}
        alt="No Event Image"
        priority={true}
        quality={100}
        layout="intrinsic"
      />
      <button
        onClick={() => router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/add-job?step=event-location`)}
        className="mt-[40px] bg-[#774DFD] py-[16px] text-[#F3F0FF] text-[18px] leading-[30px] flex justify-center items-center gap-2 tracking-[ -0.36px] font-[400] px-[24px] rounded-[4px]"
      >
        Post your first event{" "}
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
          >
            <path
              d="M4.86523 10.3691H16.136"
              stroke="#F3F0FF"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.5 4.73389L16.1354 10.3693L10.5 16.0047"
              stroke="#F3F0FF"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
    </div>
  );
};

export default MyEvents;
