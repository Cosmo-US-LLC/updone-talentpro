import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";

const LoginToUnlock = ({ isClient = false }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLoginClick = () => {
    const isUpdoneDomain = window.location.hostname.includes("updone");

    // Save the current URL to redirect back after login
    Cookies.set("callbackUrl", pathname + window.location.search || "", {
      expires: 2,
      path: "/",
      ...(isUpdoneDomain && { domain: ".updone.com" }),
    });

    // Redirect to the sign-in page
    router.push(`/signin?from=unlock`);
  };

  return (
    <>
    <div className="flex items-center justify-center h-screen bg-[#F6F9FC] relative overflow-hidden">
      <Image
        className="absolute w-full h-auto object-contain"
        src="/images/mobile/talent/talent-bg.png"
        alt="talent-bg"
        fill
      />
      <div className="flex flex-col p-4 gap-4 z-[10] justify-center h-full mb-[6rem] bg-gradient-to-b from-[rgba(246,249,252,0)] to-[#F6F9FC] backdrop-blur-[3px]">
        <Image
          src="/images/mobile/talent/orange-glass.svg"
          width={100}
          height={100}
          alt="blue-glass"
        />
        <div className="flex flex-col gap-2 max-w-md mx-auto">
          
            <p className="text-[#161616] font-poppins text-[20px] font-[500] leading-[32px]">
              You've been invited to an event!
            </p>
          
        </div>

        {/* Login Button */}
        <button
          onClick={handleLoginClick}
          className="w-[12rem] flex justify-center items-center p-2 gap-3 self-stretch rounded border border-[#350ABC] bg-[#350ABC] text-white text-[16px] font-[400] leading-[26px] mt-4 mb-2"
        >
          Login
        </button>
      </div>
    </div>
    </>
  );
};

export default LoginToUnlock;
