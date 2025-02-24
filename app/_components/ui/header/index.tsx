"use client";

import React, { useEffect, useState } from "react";
import styles from "./header.module.css";
import Link from "next/link";
import Image from "next/image";
import { useAppSelector } from "@/app/lib/store/hooks";
import {
  clearAuth,
  selectAuth,
  setAuth,
} from "@/app/lib/store/features/authSlice";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";
import { IoCaretDownSharp } from "react-icons/io5";
import { setEmpty as setAuthEmpty } from "@/app/lib/store/features/authSlice";
import { setEmpty as setJobEmpty } from "@/app/lib/store/features/jobCreateSlice";
import { setEmpty as setBookingEmpty } from "@/app/lib/store/features/bookingSlice";
import { setEmpty as setStaffEmpty } from "@/app/lib/store/features/staffSlice";
import { PiUserLight } from "react-icons/pi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { apiRequest } from "@/app/lib/services";
// import { setEmpty } from "@/app/lib/store/features/staffSlice";

const Header = ({ isClientHub }: { isClientHub?: boolean }) => {
  const { auth: storedData } = useAppSelector(selectAuth);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [scrollBackground, setScrollBackground] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    const authData = Cookies.get("authData");
    const authToken = Cookies.get("authToken");
    if (authData) {
      dispatch(setAuth({ token: authToken ,user: JSON.parse(authData)}));
    } else {
      // alert("Clearing auth from header")
      dispatch(clearAuth());
      dispatch(setStaffEmpty());
      dispatch(setBookingEmpty());
      dispatch(setJobEmpty());
      dispatch(setAuthEmpty());
    }
  }, [dispatch, router]);

  useEffect(() => {
    setIsClient(true);

    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollBackground(position > 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const handleLogout = async () => {
    await apiRequest("/logout", {
      method: "POST",
      headers: {
        revalidate: true,
        ...(storedData && { Authorization: `Bearer ${storedData?.token}` }),
      },
      body: {}
    }).then((res)=>{
      console.log(res)
      // ✅ Clear Redux Authentication & Data States
      dispatch(clearAuth());
      dispatch(setStaffEmpty());
      dispatch(setBookingEmpty());
      dispatch(setJobEmpty());
      dispatch(setAuthEmpty());
  
      // alert('Redux cleared')
  
      // ✅ Remove Authentication Cookies
      Cookies.remove("authToken");
      Cookies.remove("authData");
  
      // ✅ Redirect Based on Role
      router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/logout?status=200`);
    });
  };

  // if (!isClient) {
  //   return null; // Render nothing on the server side
  // }

  return (
    <header
      className={`${styles.header} ${
        !scrollBackground && pathName === "/"
          ? "!bg-[rgba(0,0,0,0.1)] !shadow-none transition ease-in-out delay-150"
          : "bg-[#FFF] !shadow-sm transition ease-in-out delay-150"
      }`}
    >
      <nav
        className={`border-gray-200 h-auto flex justify-between items-center py-[15px] w-full mx-auto min-w-[1024px] max-w-[1280px] px-6 ${
          !scrollBackground && pathName === "/"
            ? "bg-transparent !shadow-none transition ease-in-out delay-150"
            : "!bg-[#FFF] transition ease-in-out delay-150"
        }`}
      >
        <div
          className="justify-between items-center relative flex"
          style={{ cursor: "pointer", display: "contents" }}
        >
          <Link
            href={process.env.NEXT_PUBLIC_BASE_URL || "/"}
            className="flex items-center"
          >
            <Image
              src={
                !scrollBackground && pathName === "/"
                  ? "icons/logo-home.svg"
                  : "/logo.svg"
              }
              alt="header-logo"
              width={104}
              height={35}
              quality={100}
              objectFit="fill"
            />
          </Link>
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex justify-center items-center flex-col mt-4 text-[#0B0B0B] text-[14px] font-[500] leading-[150%] capitalize lg:flex-row lg:space-x-3 lg:mt-0">
              <li className="relative">
                <Link
                  href="/about"
                  className={`relative text-[14px] font-[400] leading-[150%] capitalize cursor-pointer py-1 px-4
                    transition-colors duration-300 delay-150 group
                    ${
                      !scrollBackground && pathName === "/"
                        ? "text-white hover:text-white"
                        : "text-[#0B0B0B] hover:text-[#350ABC]"
                    }
                  `}
                >
                  About Us
                  <div
                    className={`absolute bottom-0 left-0 h-[1.5px] bg-current w-0 transition-all duration-300 ease-in-out group-hover:w-full`}
                  ></div>
                </Link>
              </li>
              {isClient && storedData?.user?.name ? (
                <>
                  <li
                    onClick={() =>
                      router.push(
                        `${process.env.NEXT_PUBLIC_BASE_URL}/add-job?step=event-location`
                      )
                    }
                    className={`${
                      !scrollBackground && pathName === "/"
                        ? `!ml-[22px] bg-white hover:bg-[#EBE6FF] rounded-full  text-black  !normal-case px-[20px] py-[12px] text-[14px] font-[600] leading-[150%] transition-colors duration-300 delay-150 `
                        : `!ml-[22px] bg-[#EBE6FF] hover:bg-[#d7cefc] rounded-full text-[#5d0abc] !normal-case px-[20px] py-[12px] text-[14px] font-[600] leading-[150%] transition-colors duration-300 delay-150 `
                    }`}
                  >
                    <div>Book a Talent Now</div>
                  </li>
                  <li className="relative">
                    <div
                      onClick={toggleUserMenu}
                      className="flex justify-center gap-2 items-center"
                    >
                      {isClient && storedData?.user?.name ? (
                        <>
                          <Avatar>
                            <AvatarImage src={storedData?.user?.image} />
                            <AvatarFallback>{`
                              ${storedData?.user?.name?.split(" ")[0][0]}${
                              storedData?.user?.name?.split(" ").length > 1
                                ? storedData?.user?.name?.split(" ")[1][0]
                                : ""
                            }
                            `}</AvatarFallback>
                          </Avatar>
                        </>
                      ) : (
                        <>
                          <Skeleton className="w-10 h-10 rounded-full" />
                        </>
                      )}
                      <IoCaretDownSharp />
                    </div>

                    {userMenuOpen && (
                      <div
                        className={styles.menuBox_user}
                        style={{
                          position: "absolute",
                          top: "130%",
                          right: "0",
                          zIndex: 1000,
                        }}
                      >
                        <div className="flex px-[20px] border-b-[1px] pt-[20px] hover:bg-[#F1EEFF] group border-[#EBEBEB] cursor-default">
                          <div className="mb-[16px] flex gap-1">
                            {isClient && storedData?.user?.name ? (
                              <>
                                <Avatar>
                                  <AvatarImage src={storedData?.user?.image} />
                                  <AvatarFallback>{`
                                    ${
                                      storedData?.user?.name?.split(" ")[0][0]
                                    }${
                                    storedData?.user?.name?.split(" ").length >
                                    1
                                      ? storedData?.user?.name?.split(" ")[1][0]
                                      : ""
                                  }
                                  `}</AvatarFallback>
                                </Avatar>
                              </>
                            ) : (
                              <>
                                <Skeleton className="w-10 h-10 rounded-full" />
                              </>
                            )}
                            <div className="group-hover:!text-[#2C2240]">
                              <h3 className="text-[#2C2240] group-hover:text-[#2C2240] text-[16px] font-[500] leading-[19.93px] tracking-[0.316px]">
                                {storedData?.user?.name}
                              </h3>
                              <p
                                style={{ textTransform: "none" }}
                                className="text-[#6B6B6B] text-[12px] font-[400] leading-normal group-hover:text-[#2C2240]"
                              >
                                {storedData?.user?.email}
                              </p>
                            </div>
                          </div>
                        </div>
                        {storedData?.token && (
                          <div
                            onClick={() => {
                              if (storedData?.user?.role_id === 4) {
                                router.push(
                                  `${
                                    process.env.NEXT_PUBLIC_CLIENTHUB_URL ?? ""
                                  }/events`
                                );
                              } else if (storedData?.user?.role_id === 3) {
                                router.push(
                                  `${
                                    process.env.NEXT_PUBLIC_TALENTPRO_URL ?? ""
                                  }/talent/events`
                                );
                              }
                            }}
                            className="flex hover-state-color border-b-[1px] px-[20px] border-[#EBEBEB] hover:!bg-[#F1EEFF] group"
                          >
                            <div className="mb-[14px] flex gap-1">
                              <PiUserLight
                                className="mr-[12px] relative top-6 text-[#2C2240] group-hover:text-[#2C2240]"
                                size={18}
                              />
                              <h3 className="text-[#2C2240] mt-[23px] mb-[6px] flex justify-start items-center !text-[14px] font-[400] leading-[24px] group-hover:text-[#2C2240]">
                                {storedData?.user?.role_id === 3
                                  ? "TalentPro"
                                  : "My Account"}
                              </h3>
                            </div>
                          </div>
                        )}
                        <div
                          onClick={handleLogout}
                          className={`text-[#C20000] px-[20px] hover:bg-[#F1EEFF] hover:text-[#2C2240] py-[20px] flex justify-start items-center !text-[14px] font-[400] leading-[24px]`}
                        >
                          <FiLogOut
                            className="mr-[12px] text-[text-[#C20000]]"
                            size={18}
                          />{" "}
                          Logout
                        </div>
                      </div>
                    )}
                  </li>
                </>
              ) : (
                <>
                  <li className="relative">
                    <Link
                      href="/signup"
                      className={`relative text-[14px] font-[400] leading-[150%] capitalize cursor-pointer py-1 px-4
                    transition-colors duration-300 delay-150 group
                    ${
                      !scrollBackground && pathName === "/"
                        ? "text-white hover:text-white"
                        : "text-[#0B0B0B] hover:text-[#350ABC]"
                    }
                  `}
                    >
                      Sign up
                      <div
                        className={`absolute bottom-0 left-0 h-[1.5px] bg-current w-0 transition-all duration-300 ease-in-out group-hover:w-full`}
                      ></div>
                    </Link>
                  </li>
                  <li className="relative">
                    <Link
                      href="/signin"
                      className={`relative text-[14px] font-[400] leading-[150%] capitalize cursor-pointer py-1 px-4
                    transition-colors duration-300 delay-150 group
                    ${
                      !scrollBackground && pathName === "/"
                        ? "text-white hover:text-white"
                        : "text-[#0B0B0B] hover:text-[#350ABC]"
                    }
                  `}
                    >
                      Log in
                      <div
                        className={`absolute bottom-0 left-0 h-[1.5px] bg-current w-0 transition-all duration-300 ease-in-out group-hover:w-full`}
                      ></div>
                    </Link>
                  </li>
                  {/* <li className="relative">
                    <div className="flex flex-row gap-2">
                      <div className="relative">
                        <div className="flex flex-row gap-2">
                          <div
                            onClick={() => router.push("/signup")}
                            className={`relative text-[14px] font-[400] leading-[150%] capitalize cursor-pointer 
                            py-2 pr-4 rounded-md transition-colors duration-300 group
                            ${
                              !scrollBackground && pathName === "/"
                                ? "text-white"
                                : "text-[#0B0B0B]"
                            }`}
                          >
                            Sign up
                            <span
                              className={`absolute bottom-0 left-0 h-[1.5px] bg-current w-0 transition-all duration-300 ease-in-out group-hover:w-full 
                              ${
                                !scrollBackground && pathName === "/"
                                  ? "border-white"
                                  : "border-[#350ABC]"
                              }`}
                            ></span>
                          </div>

                          <div
                            onClick={() => router.push("/signin")}
                            className={`relative  text-[14px] font-[400] leading-[150%] capitalize cursor-pointer 
                            py-2 pr-4 rounded-md transition-colors duration-300 group
                            ${
                              !scrollBackground && pathName === "/"
                                ? "text-white"
                                : "text-[#0B0B0B]"
                            }`}
                          >
                            Log in
                            <span
                              className={`absolute bottom-0 left-0 h-[1.5px] bg-current w-0 transition-all duration-300 ease-in-out group-hover:w-full 
                              ${
                                !scrollBackground && pathName === "/"
                                  ? "border-white"
                                  : "border-[#350ABC]"
                              }`}
                            ></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li> */}
                  <li
                    onClick={() => router.push("/add-job?step=event-location")}
                    className={`${
                      !scrollBackground && pathName === "/"
                        ? `!ml-[22px] bg-white hover:bg-[#EBE6FF] rounded-full text-black !normal-case px-[20px] py-[12px] text-[14px] font-[600] leading-[150%] transition-colors duration-300 delay-150 `
                        : `!ml-[22px] bg-[#EBE6FF] hover:bg-[#d7cefc] rounded-full text-[#5d0abc] !normal-case px-[20px] py-[12px] text-[14px] font-[600] leading-[150%] transition-colors duration-300 delay-150 `
                    }`}
                  >
                    <span>Book a Talent Now</span>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
