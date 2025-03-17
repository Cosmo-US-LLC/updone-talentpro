"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Link from "next/link";
import { BsPlusLg } from "react-icons/bs";
import { X } from "lucide-react";
import { LuLogOut } from "react-icons/lu";
import Cookies from "js-cookie";
import { useAppSelector } from "@/app/lib/store/hooks";
import { clearAuth, selectAuth } from "@/app/lib/store/features/authSlice";
import { setEmpty as setAuthEmpty } from "@/app/lib/store/features/authSlice";
import { setEmpty as setJobEmpty } from "@/app/lib/store/features/jobCreateSlice";
import { setEmpty as setBookingEmpty } from "@/app/lib/store/features/bookingSlice";
import { setEmpty as setStaffEmpty } from "@/app/lib/store/features/staffSlice";
import { useDispatch } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { MdOutlinePayment } from "react-icons/md";
import { MdOutlineReviews } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { TbCalendarUp } from "react-icons/tb";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { Skeleton } from "@/components/ui/skeleton";
import { apiRequest } from "@/app/lib/services";


const MobileNavbar = ({ ...props }) => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const { auth: storedData } = useAppSelector(selectAuth);
  const [isOpen, setIsOpen] = useState(false);
  const [isEventAccordionOpen, setIsEventAccordionOpen] = useState(true);
  const [isComingAccordionOpen, setIsComingAccordionOpen] = useState(true);
  const [isOfferAccordionOpen, setIsOfferAccordionOpen] = useState(true);
  const [isProfileAccordionOpen, setIsProfileAccordionOpen] = useState(true);
  const [isProfileSheetOpen, setIsProfileSheetOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleEventAccordion = () =>
    setIsEventAccordionOpen(!isEventAccordionOpen);
  const toggleComingAccordion = () =>
    setIsComingAccordionOpen(!isComingAccordionOpen);
  const toggleProfileAccordion=()=>{
    setIsProfileAccordionOpen(!isProfileAccordionOpen)
  }

  // Function to determine if the page belongs to "Talent Pro"
  const isTalentProPage =
    typeof window !== "undefined" &&
    window.location.hostname.startsWith("talentpro");

  const userName = storedData?.user?.name || "";
  const userInitials = userName.substring(0, 2).toUpperCase();
 

  const logout = async () => {
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
      Cookies.remove("token");
      Cookies.remove("authToken");
      Cookies.remove("authData");
  
      // ✅ Redirect Based on Role
      router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/logout?status=200`);
    });
  };
  const handleClickUpcoming = () => {
    // Check if the current URL path is the job detail page
    if (pathname.includes("/job-detail")) {
      // Redirect to the events page with the correct tab
      router.push(`/?tab=upcoming`);
    } else {
      // Just set the active tab if it's not the job detail page
      props.setActiveTab("upcoming");
    }
  };
  const handleClickEvents = () => {
    // Check if the current URL path is the job detail page
    if (pathname.includes("/job-detail")) {
      // Redirect to the events page with the correct tab
      router.push(`/?tab=myevents`);
    } else {
      // Just set the active tab if it's not the job detail page
      props.setActiveTab("myevents");
    }
  };

  const handleClickPersonal = () => {
    // Check if the current URL path is the job detail page
    if (pathname.includes("/job-detail")) {
      // Redirect to the events page with the correct tab
      router.push(`/?tab=personaldetails`);
    } else {
      // Just set the active tab if it's not the job detail page
      props.setActiveTab("personaldetails");
    }
  };

  const handleClickLogin = () => {
    // Check if the current URL path is the job detail page
    if (pathname.includes("/job-detail")) {
      // Redirect to the events page with the correct tab
      router.push(`/?tab=logindetails`);
    } else {
      // Just set the active tab if it's not the job detail page
      props.setActiveTab("logindetails");
    }
  };

  const handleClickServices = () => {
    // Check if the current URL path is the job detail page
    if (pathname.includes("/job-detail")) {
      // Redirect to the events page with the correct tab
      router.push(`/?tab=services`);
    } else {
      // Just set the active tab if it's not the job detail page
      props.setActiveTab("services");
    }
  };

  const handleClickPayment = () => {
    // Check if the current URL path is the job detail page
    if (pathname.includes("/job-detail")) {
      // Redirect to the events page with the correct tab
      router.push(`/?tab=paymentmethod`);
    } else {
      // Just set the active tab if it's not the job detail page
      props.setActiveTab("paymentmethod");
    }
  };

  const handleClickOffered = () => {
    // Check if the current URL path is the job detail page
    if (pathname.includes("/job-detail")) {
      // Redirect to the events page with the correct tab
      router.push(`/?tab=offered`);
    } else {
      // Just set the active tab if it's not the job detail page
      props.setActiveTab("offered");
    }
    };

  const handleClickInvites = () => {
    // Check if the current URL path is the job detail page
    if (pathname.includes("/job-detail")) {
      // Redirect to the events page with the correct tab
      router.push(`/?tab=invites`);
    } else {
      // Just set the active tab if it's not the job detail page
      props.setActiveTab("invites");
    }
  };

  const handleClickHowit = () => {
    // Check if the current URL path is the job detail page
    if (pathname.includes("/job-detail")) {
      // Redirect to the events page with the correct tab
      router.push(`/?tab=howitworks`);
    } else {
      // Just set the active tab if it's not the job detail page
      props.setActiveTab("howitworks");
    }
  };

  useEffect(()=>{
    setIsOpen(false);
  }, [pathname])

  return (
    <div className="flex items-center justify-between z-[10000] bg-[#fff] fixed w-full px-[24px] h-[76px]">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          
          <Image
            src={"/images/hamburger.png"}
            alt="ham"
            width={32}
            height={32}
            className={`transition-transform z-[80] duration-500 ease-in-out ${isOpen ? "scale-x-[-1]" : "scale-x-[1]"
              }`}
          />      
        </SheetTrigger>
        <SheetContent
          side={"left"}
          className="fixed z-[60] w-[80%] flex flex-col bg-gray-50 h-[calc(100dvh-75px)] top-[75px]  overflow-y-auto"
        >
          <SheetHeader hidden>
            <SheetTitle hidden></SheetTitle>
            <SheetDescription hidden></SheetDescription>
          </SheetHeader>
          <div className="grow pt-0 px-2 flex flex-col justify-between">
            <ul className="list-none space-y-6">
              {/* Use setActiveTab to switch between tabs */}
                  <li className="space-y-8">
                    {/* Dropdown Menu */}
                    <div>
                      <button
                        onClick={toggleEventAccordion}
                        className="w-full flex  items-center justify-between bg-[#d7cefc] px-4 py-2 rounded-full text-left font-medium text-[#5d0abc]"
                      >
                        <Image
                          src={"/images/calender.svg"}
                          alt="darrow"
                          width={20}
                          height={20}
                          className=""
                        />
                        <p className="mr-12">All Events</p>
                        <Image
                          src={"/images/down-arrow3.svg"}
                          alt="darrow"
                          width={20}
                          height={20}
                          className={` ml-1 transition-transform duration-500 ease-in-out ${isEventAccordionOpen ? "rotate-180" : ""
                            }`}
                        />
                      </button>

                      <div
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${isEventAccordionOpen ? "max-h-[200px]" : "max-h-0"
                          }`}
                      >
                        <div className="mt-2 space-y-2 px-4">
                          <SheetClose asChild>
                            <div className="flex ">

                              <button
                                onClick={handleClickUpcoming}
                                className={`w-full p-2 ml-9  rounded-full text-left text-[14px] ${props.activeTab === "upcoming"
                                  ? "text-[#5d0abc] font-semibold"
                                  : "text-gray-500 hover:text-gray-700"
                                  }`}
                              >
                                Upcoming Events
                              </button>
                            </div>
                          </SheetClose>
                          <SheetClose asChild>
                            <div className="flex">


                              <button
                                onClick={handleClickInvites}
                                className={`w-full p-2 ml-9 rounded-full text-left text-[14px] ${props.activeTab === "invites"
                                  ? "text-[#5d0abc] font-semibold"
                                  : "text-gray-500 hover:text-gray-700"
                                  }`}
                              >
                               Open Invites
                              </button>
                            </div>
                          </SheetClose>
                          <SheetClose asChild>
                            <div className="flex">


                              <button
                                onClick={handleClickEvents}
                                className={`w-full p-2 ml-9 rounded-full text-left text-[14px] ${props.activeTab === "myevents"
                                  ? "text-[#5d0abc] font-semibold"
                                  : "text-gray-500 hover:text-gray-700"
                                  }`}
                              >
                                My Events
                              </button>
                            </div>
                          </SheetClose>
                          <SheetClose asChild>
                            <div className="flex">
                              <button
                                onClick={handleClickOffered}
                                className={`w-full p-2 ml-9 rounded-full text-left text-[14px] ${props.activeTab === "offered"
                                  ? "text-[#5d0abc] font-semibold"
                                  : "text-gray-500 hover:text-gray-700"
                                  }`}
                              >
                                My offers
                              </button>
                            </div>
                          </SheetClose>
                        </div>
                      </div>
                    </div>
                    <div>
                      <button
                        onClick={toggleProfileAccordion}
                        className="w-full flex  items-center justify-between bg-[#d7cefc] px-4 py-2 rounded-full text-left font-medium text-[#5d0abc]"
                      >
                      <Image
                          src={"/images/profile.svg"}
                          alt="profile"
                          width={20}
                          height={20}
                          className=""
                        />
                        <p className="mr-[72px]">Profile</p>
                        <Image
                          src={"/images/down-arrow3.svg"}
                          alt="darrow"
                          width={20}
                          height={20}
                          className={` ml-1 transition-transform duration-500 ease-in-out ${isProfileAccordionOpen ? "rotate-180" : ""
                            }`}
                        />
                      </button>

                      <div
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${isProfileAccordionOpen ? "max-h-[200px]" : "max-h-0"
                          }`}
                      >
                        <div className="mt-2 space-y-2 px-4">
                          <SheetClose asChild>
                            <div className="flex ">

                              <button
                                onClick={handleClickPersonal}
                                className={`w-full p-2 ml-9  rounded-full text-left text-[14px] ${props.activeTab === "personaldetails"
                                  ? "text-[#5d0abc] font-semibold"
                                  : "text-gray-500 hover:text-gray-700"
                                  }`}
                              >
                                Personal Details
                              </button>
                            </div>
                          </SheetClose>
                          <SheetClose asChild>
                            <div className="flex">


                              <button
                                onClick={handleClickLogin}
                                className={`w-full p-2 ml-9 rounded-full text-left text-[14px] ${props.activeTab === "logindetails"
                                  ? "text-[#5d0abc] font-semibold"
                                  : "text-gray-500 hover:text-gray-700"
                                  }`}
                              >
                                Login Details
                              </button>
                            </div>
                          </SheetClose>
                          <SheetClose asChild>
                            <div className="flex ">

                              <button
                                onClick={handleClickServices}
                                className={`w-full p-2 ml-9  rounded-full text-left text-[14px] ${props.activeTab === "services"
                                  ? "text-[#5d0abc] font-semibold"
                                  : "text-gray-500 hover:text-gray-700"
                                  }`}
                              >
                                Services
                              </button>
                            </div>
                          </SheetClose>
                          <SheetClose asChild>
                            <div className="flex ">

                              <button
                                onClick={handleClickHowit}
                                className={`w-full p-2 ml-9  rounded-full text-left text-[14px] ${props.activeTab === "howitworks"
                                  ? "text-[#5d0abc] font-semibold"
                                  : "text-gray-500 hover:text-gray-700"
                                  }`}
                              >
                                How it works
                              </button>
                            </div>
                          </SheetClose>
                          {/* <SheetClose asChild>
                            <div className="flex">

                              <button
                                onClick={handleClickPayment}
                                disabled
                                className={`w-full p-2 ml-9  rounded-full text-left text-[14px] ${props.activeTab === "paymentmethod"
                                  ? "text-[#5d0abc] font-semibold"
                                  : "text-gray-500 hover:text-gray-700"
                                  }`}
                              >
                                Payment Method
                              </button>
                            </div>
                          </SheetClose> */}
                        </div>
                      </div>
                    </div>
                    <div>
                      <button
                        onClick={toggleComingAccordion}
                        className="w-full flex  items-center justify-between bg-[#ececec] px-4 py-2 rounded-full text-left font-medium text-[#857E7E]"
                      >
                        <Image
                          src={"/images/comingsoon.png"}
                          alt="darrow"
                          width={20}
                          height={20}
                          className=""
                        />
                        <p className="mr-4">Coming Soon</p>
                        <Image
                          src={"/images/coming-down.svg"}
                          alt="darrow"
                          width={20}
                          height={20}
                          className={` ml-1 transition-transform duration-500 ease-in-out ${isComingAccordionOpen ? "rotate-180" : ""
                            }`}
                        />
                      </button>

                      <div
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${isComingAccordionOpen ? "max-h-[200px]" : "max-h-0"
                          }`}
                      >
                        <div className="mt-2 space-y-2 px-4">
                          <SheetClose asChild>
                            <div className="flex">
                              
                              <button className="text-[#929292] w-full p-2 ml-9 rounded-full text-left text-[14px]">
                                Payment Method
                              </button>
                            </div>
                          </SheetClose>
                          <SheetClose asChild>
                            <div className="flex">
                            
                              <button className="text-[#929292] w-full p-2 ml-9 rounded-full text-left text-[14px]">
                                Reviews
                              </button>
                            </div>
                          </SheetClose>
                        
                        </div>
                      </div>
                    </div>
                  </li>
            </ul>

            <div className="mt-4 space-y-8 ">
              {storedData?.token && (
                <div className="space-y-4">
                  <div className="w-full pl-2 py-2 rounded-lg flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={storedData?.user?.image} />
                      <AvatarFallback>
                        {`
                        ${storedData?.user?.name?.split(" ")[0][0]}${storedData?.user?.name?.split(" ")?.length > 1
                            ? storedData?.user?.name?.split(" ")[1][0]
                            : ""
                          }`}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-[16px]">{storedData?.user?.name}</p>
                      <p className="text-neutral-600 text-[14px] w-[180px] truncate">
                        {storedData?.user?.email}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => logout()}
                    className="w-full text-red-500 px-4 py-2 flex justify-center items-center gap-2 rounded-lg bg-red-50"
                  >
                    Logout
                    <LuLogOut className="text-red-500" />
                  </button>
                </div>
              )}
              <p className="text-neutral-500 text-center text-xs">
                Copyright &copy; 2025 Updone. All rights reserved.
                <br />
                <Link className="pt-1 underline" href={`${process.env.NEXT_PUBLIC_BASE_URL}/terms-condition`}>
                  Terms & Conditions
                </Link>
                ,&nbsp;
                <Link className="pt-1 underline" href={`${process.env.NEXT_PUBLIC_BASE_URL}/privacy-policy`}>
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Conditional Logo */}

        <>

          <div className="px-6 pb-2 relative right-16 ">
            <p className="text-[22px] font-light text-[#4A4A4A] leading-[15px]">
              Talent<span className=" text-[#350ABC] font-bold">Pro</span>
            </p>
            <p className="flex gap-1 w-[80px] items-center text-[11px] absolute left-[70%] whitespace-nowrap">
              by{" "}
              <span>
                <Image
                  src={"/logo.svg"}
                  alt="Updone"
                  height={140}
                  width={160}
                  className="w-[50px] h-fit relative pb-1"
                />
              </span>
            </p>
          </div>


          <div className="mt-2">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>

            <Avatar className="absolute right-4 bottom-3 w-10 h-10 bg-[#d7cefc] text-[#350ABC] font-semibold">
              {storedData?.user?.image ? (
                <AvatarImage
                  src={storedData?.user?.image}
                  alt="User Avatar"
                  className="rounded-full object-cover"
                />
              ) : (
                <AvatarFallback>{userInitials}</AvatarFallback>
              )}
            </Avatar>
            </SheetTrigger>
            </Sheet>
          </div>
        </>
    </div>
  );
};

export default MobileNavbar;
