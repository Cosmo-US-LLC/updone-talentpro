"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { IoCaretDownSharp } from "react-icons/io5";
import { useAppSelector } from "@/app/lib/store/hooks";
import {
  clearAuth,
  selectAuth,
  setAuth,
} from "@/app/lib/store/features/authSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "../ui/skeleton";
import { ChevronDown, Settings } from "lucide-react";
import { setEmpty as setAuthEmpty } from "@/app/lib/store/features/authSlice";
import { setEmpty as setJobEmpty } from "@/app/lib/store/features/jobCreateSlice";
import { setEmpty as setBookingEmpty } from "@/app/lib/store/features/bookingSlice";
import { setEmpty as setStaffEmpty } from "@/app/lib/store/features/staffSlice";
import { FiLogOut } from "react-icons/fi";
import { PiUserLight } from "react-icons/pi";
import Link from "next/link";

function NavbarClienthub() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { auth: storedData } = useAppSelector(selectAuth);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const authData = Cookies.get("authData");
    const authToken = Cookies.get("authToken");
    if (authData) {
      dispatch(setAuth(({ token: authToken, user: JSON.parse(authData) })));
    } else {
      dispatch(clearAuth());
      dispatch(setStaffEmpty());
      dispatch(setBookingEmpty());
      dispatch(setJobEmpty());
      dispatch(setAuthEmpty());
    }
  }, [dispatch, router]);

  // Ensure the code runs only on the client-side
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogout = () => {
    const isUpdoneDomain =
      typeof window !== "undefined" &&
      window?.location?.hostname?.includes("updone");
    const role = storedData?.user?.role_id;
    const isClientHub =
      typeof window !== "undefined" &&
      window.location.hostname.includes("clienthub");

    // ✅ Clear Redux Authentication & Data States
    dispatch(clearAuth());
    dispatch(setStaffEmpty());
    dispatch(setBookingEmpty());
    dispatch(setJobEmpty());
    dispatch(setAuthEmpty());

    // alert('Redux cleared')

    // ✅ Remove Authentication Cookies
    Cookies.remove("token", {
      path: "/",
      ...(isUpdoneDomain && { domain: ".updone.com" }),
      ...(window.location.hostname.includes("localhost") && {
        domain: "localhost",
      }),
    });

    Cookies.remove("authData", {
      path: "/",
      ...(isUpdoneDomain && { domain: ".updone.com" }),
      ...(window.location.hostname.includes("localhost") && {
        domain: "localhost",
      }),
    });

    // ✅ Redirect Based on Role
    if (role === 4) {
      if (isClientHub) {
        // If on client hub, go to base URL
        router.push(process.env.NEXT_PUBLIC_BASE_URL || "/");
      } else {
        // Otherwise, reload page
        window.location.reload();
      }
    } else {
      // For other roles, simply reload the page
      window.location.reload();
    }
  };

  return (
    <header className="bg-white min-h-[65px] flex items-center shadow-md">
      <nav className="px-4 md:px-8 h-full w-full flex justify-between items-center">
        <div className="flex gap-4">
          {/* Logo */}
          <Link
            href={`${process.env.NEXT_PUBLIC_BASE_URL}/`}
            className="relative"
          >
            <p className="text-2xl font-light text-[#4A4A4A] leading-[15px]">
              Client<span className="font-medium text-[#6265F1]">Hub</span>
            </p>
            <p className="flex gap-1 w-[80px] items-center text-[12px] absolute left-[70%] whitespace-nowrap">
              by{" "}
              <span className="">
                <Image
                  src={"/logo.svg"}
                  alt="Updone"
                  height={140}
                  width={160}
                  className="w-[55px] h-fit relative"
                />
              </span>
            </p>
            <div className="h-[8px]"></div>
          </Link>
        </div>

        <div className=" flex items-center gap-3">
          <Link
            href={`${process.env.NEXT_PUBLIC_BASE_URL}/`}
            className={`${
              // !scrollBackground && pathName === "/"
              `max-md:hidden mr-2 bg-white hover:text-[#5d0abc] underline underline-offset-2 rounded-full text-black !normal-case text-[14px] font-[400] transition-colors duration-50 `
              // `!ml-[22px] bg-[#EBE6FF] hover:bg-[#d7cefc] rounded-full text-[#5d0abc] !normal-case px-[20px] py-[8px] text-[14px] font-[600] leading-[150%] transition-colors duration-300 delay-150 `
              }`}
          >
            <div>Go To Updone</div>
          </Link>
          <Link
            href={`${process.env.NEXT_PUBLIC_BASE_URL}/add-job?step=event-location`}
            className={`${
              // !scrollBackground && pathName === "/"
              // `!ml-[22px] bg-white hover:bg-[#EBE6FF] rounded-full  text-black  !normal-case px-[20px] py-[12px] text-[14px] font-[600] leading-[150%] transition-colors duration-300 delay-150 `
              `max-md:hidden bg-[#EBE6FF] hover:bg-[#d7cefc] rounded-full text-[#5d0abc] !normal-case px-[20px] py-[12px] text-[14px] font-[600] transition-colors duration-300`
              }`}
          >
            <div>Book a Talent Now</div>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 outline-none hover:bg-white hover:text-black">
              {isClient && storedData?.user?.name ? (
                <>
                  <Avatar>
                    <AvatarImage src={storedData?.user?.image} />
                    <AvatarFallback>{`
                      ${storedData?.user?.name?.split(" ")[0][0]}${storedData?.user?.name?.split(" ")?.length > 1 ? storedData?.user?.name?.split(" ")[1][0] : ''
                      }
                    `}</AvatarFallback>
                  </Avatar>
                </>
              ) : (
                <>
                  <Skeleton className="w-10 h-10 rounded-full" />
                </>
              )}
              <ChevronDown className="w-5 h-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="relative right-5 p-0">
              <DropdownMenuItem className="cursor-default pointer-events-none px-6">
                <div className="my-[8px] flex gap-1 items-center">
                  {isClient && storedData?.user?.name ? (
                    <>
                      <Avatar>
                        <AvatarImage src={storedData?.user?.image} />
                        <AvatarFallback>{`
                          ${storedData?.user?.name?.split(" ")[0][0]}${storedData?.user?.name?.split(" ").length > 1
                            ? storedData?.user?.name?.split(" ")[1][0]
                            : ""
                          }`}</AvatarFallback>
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
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => router.push(`${process.env.NEXT_PUBLIC_CLIENTHUB_URL}/settings`)}
                className="hover:!bg-[#F1EEFF] max-lg:hidden duration-0 text-[#2C2240] hover:text-[#2C2240] py-[20px] px-[40px] flex justify-start items-center !text-[14px] font-[400] leading-[24px]"
              >
                <Settings className="mr-[12px]" size={18} />
                Account Settings
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleLogout()}
                className="text-[#C20000] duration-0 hover:!bg-[#F1EEFF] hover:text-[#2C2240] py-[20px] px-[40px] flex justify-start items-center !text-[14px] font-[400] leading-[24px]"
              >
                <FiLogOut className="mr-[12px]" size={18} /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  );
}

export default NavbarClienthub;
