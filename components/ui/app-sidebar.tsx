"use client";

import * as React from "react";
import { useState } from "react";
import { MapPin, Settings2 } from "lucide-react";
import { IoIosStarOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { PiCallBell, PiCurrencyDollar, PiUsersThree } from "react-icons/pi";
import { SlLocationPin } from "react-icons/sl";
import { PiBookOpenText } from "react-icons/pi";
import { ChevronRight } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenuItem,
  SidebarMenu,
  SidebarMenuButton,
  SidebarTriggerArrow,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  CreditCard,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector } from "@/app/lib/store/hooks";
import { useDispatch } from "react-redux";
import { apiRequest } from "@/app/lib/services";
import { clearAuth, selectAuth } from "@/app/lib/store/features/authSlice";
import { setEmpty as setAuthEmpty } from "@/app/lib/store/features/authSlice";
import { setEmpty as setJobEmpty } from "@/app/lib/store/features/jobCreateSlice";
import { setEmpty as setBookingEmpty } from "@/app/lib/store/features/bookingSlice";
import { setEmpty as setStaffEmpty } from "@/app/lib/store/features/staffSlice";
import Cookies from "js-cookie";
import { Skeleton } from "./skeleton";
import { FiLogOut } from "react-icons/fi";
import { Button } from "./button";
import { MdOutlinePayment } from "react-icons/md";
import { MdOutlineReviews } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { TbLogin2 } from "react-icons/tb";
import { MdMiscellaneousServices } from "react-icons/md";
import { BsEnvelopePaper } from "react-icons/bs";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { TbCalendarUp } from "react-icons/tb";
import { PiHandCoins } from "react-icons/pi";
import { Dispatch, SetStateAction } from "react";
import { LiaHandsHelpingSolid } from "react-icons/lia"; // Import necessary types

interface AppSidebarProps {
  setLoggingOut: Dispatch<SetStateAction<boolean>>; // Define the type
}

const coinIcon = () => {
  return (
    <div className="w-5 h-5">
      <PiCallBell size={32} />{" "}
    </div>
  );
};

// const items = [
//   {
//     title: eventCount !== null ? `Upcoming (${eventCount})` : "Upcoming",
//     url: "/",
//     icon: TbCalendarUp,
//   },
//   {
//     title: "Open Invites",
//     url: "/invites",
//     icon: BsEnvelopePaper,
//   },
//   {
//     title: "My Offers",
//     url: "/offered",
//     icon: PiHandCoins,
//     // icon: PiUsersThree,
//   },
//   {
//     title: "My Events",
//     url: "/my-events",
//     icon: FaRegCalendarCheck,
//   },
//   {
//     title: "Personal Details",
//     url: "/personal-details",
//     icon: CgProfile,
//   },
//   {
//     title: "Login Details",
//     url: "/login-details",
//     icon: TbLogin2,
//   },
//   {
//     title: "Services",
//     url: "/services",
//     icon: PiCallBell,
//   },
//   // {
//   //   title: "How it works",
//   //   url: "/how-it-works",
//   //   icon: PiBookOpenText,
//   // },
//   {
//     title: "Payments",
//     url: "/payments",
//     icon: CreditCard,
//   },
// ];
const items2 = [
  {
    title: "Reviews",
    url: "/reviews",
    icon: MdOutlineReviews,
    disabled: true,
  },
  // {
  //   title: "Payments",
  //   url: "/payments",
  //   icon: CreditCard,
  //   disabled: true
  // },
];

export function AppSidebar({
  setLoggingOut,
  ...props
}: AppSidebarProps & React.ComponentProps<typeof Sidebar>) {
  const { auth: storedData } = useAppSelector(selectAuth);
  const router = useRouter();
  const pathname = usePathname(); // Get the current path
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null); // Set initial state to null
  const [loading, setLoading] = React.useState(true); // New loading state
  const dispatch = useDispatch();
  const [logoutPath, setLogoutPath] = React.useState("/"); // New loading state
  const [isClient, setIsClient] = React.useState(false);
  const [eventCount, setEventCount] = React.useState<number | null>(null);
  const [offeredCount, setOfferedCount] = React.useState<number | null>(null);
  const [inviteCount, setInviteCount] = React.useState<number | null>(null);
  const [myEventCount, setMyEventCount] = React.useState<number | null>(null);
  const [isEventsOpen, setIsEventsOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(true);
  const toggleEvents = () => setIsEventsOpen((prev) => !prev);
  const toggleProfile = () => setIsProfileOpen((prev) => !prev);

  const eventItems = [
    {
      title:
        eventCount !== null
          ? `Upcoming Events(${eventCount})`
          : "Upcoming Events",
      url: "/",
      icon: TbCalendarUp,
    },
    {
      title:
        inviteCount !== null ? `Open Invites (${inviteCount})` : "Open Invites",
      url: "/invites",
      icon: BsEnvelopePaper,
    },
    {
      title:
        offeredCount !== null ? `My Offers (${offeredCount})` : "My Offers",
      url: "/offered",
      icon: PiHandCoins,
    },
    {
      title:
        myEventCount !== null ? `My Events (${myEventCount})` : "My Events",
      url: "/my-events",
      icon: FaRegCalendarCheck,
    },

    // {
    //   title: "How it works",
    //   url: "/how-it-works",
    //   icon: PiBookOpenText,
    // },
  ];

  const profileItems = [
    {
      title: "Personal Details",
      url: "/personal-details",
      icon: CgProfile,
    },
    {
      title: "Login Details",
      url: "/login-details",
      icon: TbLogin2,
    },
    {
      title: "Services",
      url: "/services",
      icon: PiCallBell,
    },
    {
      title: "Payments",
      url: "/payments",
      icon: CreditCard,
    },
  ];

  React.useEffect(() => {
    const fetchEventCount = async () => {
      try {
        const response = await apiRequest("/talentpro/upcoming-events", {
          method: "POST",
          headers: {
            ...(storedData && { Authorization: `Bearer ${storedData?.token}` }),
          },
          body: {
            page_number: 1,
            page_size: 100, // Just need count, so small payload
            city_id: storedData?.user?.city_id,
          },
        });

        const jobs = response?.jobs || [];
        setEventCount(jobs.length);
        setOfferedCount(jobs.filter((job: any) => job.has_offered).length);

        // 2️⃣ Fetch Invites
        const invitesResponse = await apiRequest("/talentpro/invites", {
          method: "POST",
          headers: {
            ...(storedData && { Authorization: `Bearer ${storedData?.token}` }),
          },
          body: {
            page_number: 1,
            page_size: 100,
            city_id: storedData?.user?.city_id,
          },
        });

        const inviteJobs = invitesResponse?.jobs || [];
        const openInvitesCount = inviteJobs.filter(
          (event: any) => event.has_offered === false
        ).length;
        setInviteCount(openInvitesCount);
      } catch (err) {
        console.error("Failed to fetch upcoming event count", err);
      }
    };

    if (storedData?.token) {
      fetchEventCount();
    }
  }, [storedData]);

  React.useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const response = await apiRequest("/talentpro/my-events", {
          method: "POST",
          headers: {
            revalidate: true,
            ...(storedData && { Authorization: `Bearer ${storedData?.token}` }),
          },
          body: {
            page_number: 1,
            page_size: 100,
            city_id: storedData?.user?.city_id,
          },
        });
        const jobs = response?.jobs || [];
        setMyEventCount(jobs.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (storedData?.token) {
      fetchMyEvents();
    }
  }, [storedData]);

  // Set active link based on current pathname
  React.useEffect(() => {
    setLogoutPath(`${process.env.NEXT_PUBLIC_BASE_URL}`);
    const findActiveIndex = () => {
      if (pathname == "/" || pathname.includes("/upcoming-events")) {
        setActiveIndex(0);
      } else if (pathname.includes("/invites")) {
        setActiveIndex(1);
      } else if (pathname.includes("/offered")) {
        setActiveIndex(2);
      } else if (pathname.includes("/my-events")) {
        setActiveIndex(3);
      } else if (pathname.includes("/personal-details")) {
        setActiveIndex(4);
      } else if (pathname.includes("/login-details")) {
        setActiveIndex(5);
      } else if (pathname.includes("/services")) {
        setActiveIndex(6);
        // } else if (pathname.includes("/how-it-works")) {
        //   setActiveIndex(7);
      } else if (pathname.includes("/payments")) {
        setActiveIndex(7);
      }
      // Check which link matches the current pathname
      // const activeLinkIndex = [...links, ...bottomLinks].findIndex((link) =>
      //   pathname.startsWith(link.path)
      // );
      // setActiveIndex(activeLinkIndex);
      setLoading(false); // Set loading to false after determining the active index
    };

    findActiveIndex();
    setIsClient(true);
  }, [pathname]);

  const handleLogout = async () => {
    setLoggingOut(true);
    await apiRequest("/logout", {
      method: "POST",
      headers: {
        revalidate: true,
        ...(storedData && { Authorization: `Bearer ${storedData?.token}` }),
      },
      body: {},
    }).then((res: any) => {
      console.log(res);
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
  return (
    <Sidebar collapsible="icon" {...props} className="">
      <SidebarHeader className="min-h-[65px] mb-4 flex justify-center overflow-hidden">
        <Link href={`/`} className="relative">
          <Image
            src={"/images/favicon.svg"}
            alt="Updone"
            height={40}
            width={40}
            className={cn(
              "h-[40px] shrink-0 transition-all duration-300 ease-in-out ml-2.5",
              "scale-0 opacity-0 group-data-[collapsible=icon]:scale-100 group-data-[collapsible=icon]:opacity-100"
            )}
          />

          <div
            className={cn(
              "absolute top-1 shrink-0 transition-all duration-300 delay-100 ease-in-out",
              "left-0 opacity-100 group-data-[collapsible=icon]:left-10 group-data-[collapsible=icon]:opacity-0"
            )}
          >
            <div className="relative w-fit ml-2 group-data-[collapsible=icon]:hidden">
              <p className="text-2xl font-light text-[#4A4A4A] leading-[15px]">
                Talent<span className="font-medium text-[#6265F1]">Pro</span>
              </p>
              <p className="flex gap-1 w-[80px] items-center text-[12px] absolute left-[70%] whitespace-nowrap">
                by{" "}
                <span>
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
            </div>
          </div>
        </Link>
        <div className="absolute -right-3 top-[53px] flex items-center">
          <SidebarTriggerArrow className="!h-[24px] w-[24px] !rounded-full bg-white border" />
        </div>
      </SidebarHeader>
      <SidebarContent className="group-data-[collapsible=icon]:!items-center">
        <SidebarGroup>
          <SidebarGroupLabel
            className="cursor-pointer flex justify-between items-center text-[16px]"
            onClick={toggleEvents}
          >
            All Events
            <ChevronRight
              className={`transition-transform duration-300 ${
                isEventsOpen ? "rotate-90" : "rotate-0"
              }`}
            />
          </SidebarGroupLabel>

          <div
            className={cn(
              "transition-all duration-500 ease-in-out overflow-hidden",
              isEventsOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
            )}
          >
            <SidebarGroupContent className="pl-0">
              <SidebarMenu>
                {eventItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className={cn(
                          "group-data-[collapsible=icon]:!ml-[10px] !text-[15px] !transition-all !h-fit !py-3 px-3",
                          pathname === item.url ||
                            (item.url === "/" &&
                              pathname.includes("/upcoming-events"))
                            ? "bg-[#F8F6FF] border-l-4 border-[#350ABC] font-semibold text-[#350ABC]"
                            : "hover:!bg-[#F8F6FF] text-[#2C2240]"
                        )}
                        title={item.title}
                      >
                        <item.icon
                          className={cn(
                            "!w-5 !h-5 mr-1",
                            pathname === item.url ||
                              (item.url === "/" &&
                                pathname.includes("/upcoming-events"))
                              ? "text-[#350ABC]"
                              : "text-[#2C2240]"
                          )}
                        />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </div>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel
            className="cursor-pointer flex justify-between items-center text-[16px]"
            onClick={toggleProfile}
          >
            Profile
            <ChevronRight
              className={`transition-transform duration-300 ${
                isProfileOpen ? "rotate-90" : "rotate-0"
              }`}
            />
          </SidebarGroupLabel>

          <div
            className={cn(
              "transition-all duration-500 ease-in-out overflow-hidden",
              isProfileOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
            )}
          >
            <SidebarGroupContent className="pl-0">
              <SidebarMenu>
                {profileItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className={cn(
                          "group-data-[collapsible=icon]:!ml-[10px] !text-[15px] !transition-all !h-fit !py-3 px-3",
                          pathname === item.url
                            ? "bg-[#F8F6FF] border-l-4 border-[#350ABC] font-semibold text-[#350ABC]"
                            : "hover:!bg-[#F8F6FF] text-[#2C2240]"
                        )}
                        title={item.title}
                      >
                        <item.icon
                          className={cn(
                            "!w-5 !h-5 mr-2",
                            pathname === item.url
                              ? "text-[#350ABC]"
                              : "text-[#2C2240]"
                          )}
                        />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </div>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-[16px]">
            Coming Soon
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items2.map((item, index) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.disabled ? "#" : item.url}
                      className={`group-data-[collapsible=icon]:!ml-[10px] !text-[15px] !transition-all !h-fit !py-3 px-3
    ${item.disabled ? "pointer-events-none text-gray-400" : ""} 

    ${
      pathname === item.url
        ? "bg-[#F8F6FF] border-l-4 border-[#350ABC] font-semibold text-[#350ABC]"
        : "hover:!bg-[#F8F6FF] text-[#2C2240]"
    }`}
                      title={item.title}
                    >
                      <item.icon
                        className={`!w-5 !h-5 mr-2 ${
                          pathname === item.url
                            ? "text-[#350ABC]"
                            : "text-[#2C2240]"
                        }`}
                      />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem className="p-2">
            <SidebarMenuButton
              onClick={() => handleLogout()}
              className="group-data-[collapsible=icon]:!ml-[0px] !transition-all p-3 group-data-[collapsible=icon]:!pl-3.5 mx-1 h-fit text-[#c20000c4] duration-0 bg-red-50 hover:!bg-red-100 hover:text-[#C20000] rounded-xl flex justify-start items-center !text-[14px] w-full"
            >
              <FiLogOut className="mr-[12px] w-4 h-4" /> Logout
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem className="">
            <SidebarMenuButton
              size="lg"
              className="group-data-[collapsible=icon]:!my-0.5 group-data-[collapsible=icon]:!ml-[10px] !transition-all pointer-events-none"
            >
              {isClient && storedData?.user?.name ? (
                <>
                  <Avatar className="h-10 w-10 rounded-lg">
                    <AvatarImage
                      src={storedData?.user?.image}
                      className="object-cover"
                    />
                    <AvatarFallback className="rounded-lg">{`
                        ${storedData?.user?.name?.split(" ")[0][0]}${
                      storedData?.user?.name?.split(" ").length > 1
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
              {isClient && storedData?.user?.name ? (
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
              ) : (
                ""
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
