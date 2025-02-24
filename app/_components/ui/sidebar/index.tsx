import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { IoIosStarOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { PiCurrencyDollar, PiUsersThree } from "react-icons/pi";
import { SlLocationPin } from "react-icons/sl";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/app/lib/store/hooks";
import { clearAuth, selectAuth } from "@/app/lib/store/features/authSlice";
import { setEmpty as setAuthEmpty } from "@/app/lib/store/features/authSlice";
import { setEmpty as setJobEmpty } from "@/app/lib/store/features/jobCreateSlice";
import { setEmpty as setBookingEmpty } from "@/app/lib/store/features/bookingSlice";
import { setEmpty as setStaffEmpty } from "@/app/lib/store/features/staffSlice";
import { apiRequest } from "@/app/lib/services";

// Define an array of link objects
const links = [
  { name: "My Events", icon: SlLocationPin, path: "/" },
  { name: "Payment", icon: PiCurrencyDollar, path: "/payments" },
  { name: "Settlements", icon: PiUsersThree, path: "/settlements" },
  { name: "Reviews", icon: IoIosStarOutline, path: "/reviews" },
];

const SideBar = () => {
  const { auth: storedData } = useAppSelector(selectAuth);
  const router = useRouter();
  const pathname = usePathname(); // Get the current path
  const [activeIndex, setActiveIndex] = useState<number | null>(null); // Set initial state to null
  const [loading, setLoading] = useState(true); // New loading state
  const dispatch = useDispatch();
  const [logoutPath, setLogoutPath] = useState('/'); // New loading state

  const bottomLinks = [
    { name: "Settings", icon: IoSettingsOutline, path: "/settings" },
    {
      name: "Logout",
      icon: LuLogOut,
      path: `${logoutPath}`
    },
  ];

  // Set active link based on current pathname
  useEffect(() => {
    setLogoutPath(`${process.env.NEXT_PUBLIC_BASE_URL}`)
    const findActiveIndex = () => {
      // Check which link matches the current pathname
      const activeLinkIndex = [...links, ...bottomLinks].findIndex((link) =>
        pathname.startsWith(link.path)
      );
      setActiveIndex(activeLinkIndex);
      setLoading(false); // Set loading to false after determining the active index
    };

    findActiveIndex();
  }, [pathname]);

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

  return (
    <aside className="w-[112px] z-10 h-[100.2%] relative bottom-[3px]">
      <section
        style={{ boxShadow: "0px 6px 26px 0px rgba(0, 0, 0, 0.06)" }}
        className="bg-[#fff] h-[100%] py-[10px] overflow-auto px-[8px] rounded-[12px] flex flex-col justify-between items-center"
      >
        {/* Top Links */}
        <div className="w-full flex flex-col gap-2">
          {links.map((link, index) => (
            <Link
              href={link.path}
              key={index}
              className={`hover:bg-[#F8F6FF] flex flex-col items-center justify-center gap-6 w-full p-3 rounded-[8px] ${
                activeIndex === index ? "bg-[#F8F6FF]" : ""
              }`}
            >
              <link.icon
                className={`h-6 w-6  ${
                  activeIndex === index ? "text-[#350ABC]" : "text-[#2C2240]"
                }`}
              />
              <span
                className={`text-[14px] leading-[18px] font-[400] ${
                  activeIndex === index ? "text-[#350ABC]" : "text-[#2C2240]"
                }`}
              >
                {link.name}
              </span>
            </Link>
          ))}
        </div>

        {/* Bottom Links: Settings and Logout */}
        <div className="w-full">
          <span className="relative bottom-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="98"
              height="2"
              viewBox="0 0 98 2"
              fill="none"
            >
              <path
                d="M1 1.48828H97"
                stroke="url(#paint0_linear_2412_20068)"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_2412_20068"
                  x1="1"
                  y1="1.98828"
                  x2="97"
                  y2="1.98828"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#D9D9D9" stopOpacity="0" />
                  <stop offset="0.475" stopColor="#D9D9D9" />
                  <stop offset="1" stopColor="#D9D9D9" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <div className="w-full flex flex-col gap-2">
            {bottomLinks.map((link, index) => (
              <Link
                href={link.path}
                key={index + links.length}
                className={`hover:bg-[#F8F6FF] flex flex-col items-center justify-center gap-6 w-full p-3 rounded-[12px] ${
                  activeIndex === index + links.length ? "bg-[#F8F6FF]" : ""
                }`}
                onClick={() => {
                  if (index === 1) {
                    handleLogout();
                  }
                }}
              >
                <link.icon
                  className={`h-6 w-6  ${
                    activeIndex === index + links.length
                      ? "text-[#350ABC]"
                      : "text-[#2C2240]"
                  }`}
                />
                <span
                  className={`text-[14px] leading-[18px] font-[400] ${
                    activeIndex === index + links.length
                      ? "text-[#350ABC]"
                      : "text-[#2C2240]"
                  }`}
                >
                  {link.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </aside>
  );
};

export default SideBar;
