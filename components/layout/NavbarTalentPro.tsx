"use client";

import { clearAuth, selectAuth, setEmpty as setAuthEmpty } from "@/app/lib/store/features/authSlice";
import { setEmpty as setBookingEmpty } from "@/app/lib/store/features/bookingSlice";
import { setEmpty as setJobEmpty } from "@/app/lib/store/features/jobCreateSlice";
import { setEmpty as setStaffEmpty } from "@/app/lib/store/features/staffSlice";
import { useAppSelector } from "@/app/lib/store/hooks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import Cookies from "js-cookie";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";
import { PiUserLight } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { Skeleton } from "../ui/skeleton";
import { useEffect, useState } from "react";
import { FaBullseye } from "react-icons/fa";
import { apiRequest } from "@/app/lib/services";

function NavbarTalentPro() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { auth: storedData } = useAppSelector(selectAuth);
  console.log(storedData)

  const [clientLoad, setClientLoad] = useState(true);
  useEffect(()=>{
    setClientLoad(false)
  }, [])

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

  if (clientLoad) return <></>

  return (
    <header className="bg-white min-h-[65px] flex items-center shadow-md">
      <nav className="px-4 h-full w-full flex justify-between items-center">
        <div className="flex gap-4">
          {/* Logo */}
          {/* <div className="px-6 relative">
            <p className="text-3xl font-light text-[#4A4A4A] leading-[15px]">
              Talent<span className="font-medium text-[#6265F1]">Pro</span>
            </p>
            <p className="mt-1 flex gap-1 w-[80px] items-center text-[12px] absolute left-[70%] whitespace-nowrap">
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
          </div> */}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 outline-none hover:bg-white hover:text-black">
            {storedData?.user?.name ? (
              <>
                <Avatar>
                  <AvatarImage
                    src={
                      storedData?.user?.image
                    }
                  />
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
            <ChevronDown className="w-5 h-5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="relative right-5 p-0">
            {/* <DropdownMenuItem
              // onClick={() => router.push("settings")}
              className='hover:!bg-[#F1EEFF] duration-0 text-[#2C2240] hover:text-[#2C2240] py-[20px] px-[40px] flex justify-start items-center !text-[14px] font-[400] leading-[24px]'
            >
              <PiUserLight
                className="mr-[12px]"
                size={18}
              />
              My Account
            </DropdownMenuItem> */}
            <DropdownMenuItem
              onClick={() => handleLogout()}
              className="text-[#C20000] duration-0 hover:!bg-[#F1EEFF] hover:text-[#2C2240] py-[20px] px-[40px] flex justify-start items-center !text-[14px] font-[400] leading-[24px]"
            >
              <FiLogOut className="mr-[12px]" size={18} />{" "}
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </header>
  );
}

export default NavbarTalentPro;
