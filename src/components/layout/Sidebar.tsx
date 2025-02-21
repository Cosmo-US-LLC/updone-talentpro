import { logout } from "@/store/slice/auth";
import { useEffect, useState } from "react";
import { IoIosStarOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { PiCurrencyDollar, PiUsersThree } from "react-icons/pi";
import { SlLocationPin } from "react-icons/sl";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router";

// Define an array of link objects
const links = [
  { name: "My Events", icon: SlLocationPin, path: "/" },
  { name: "Payment", icon: PiCurrencyDollar, path: "/payments" },
  { name: "Settlements", icon: PiUsersThree, path: "/settlements" },
  { name: "Reviews", icon: IoIosStarOutline, path: "/reviews" },
];

const SideBar = () => {
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dispatch = useDispatch();
  const [logoutPath, setLogoutPath] = useState("/");

  const bottomLinks = [
    { name: "Settings", icon: IoSettingsOutline, path: "/settings" },
    {
      name: "Logout",
      icon: LuLogOut,
      path: `${logoutPath}`,
    },
  ];

  // Set active link based on current pathname
  useEffect(() => {
    setLogoutPath(`${import.meta.env.VITE_PUBLIC_BASE_URL}/logout`);
    const findActiveIndex = () => {
      const activeLinkIndex = [...links, ...bottomLinks].findIndex((link) =>
        location.pathname.startsWith(link.path)
      );
      setActiveIndex(activeLinkIndex);
    };

    findActiveIndex();
  }, [location]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <aside className="max-lg:hidden w-[112px] h-[100%]">
      <section
        style={{ boxShadow: "0px 6px 26px 0px rgba(0, 0, 0, 0.06)" }}
        className="bg-[#fff] h-[100%] py-[10px] overflow-auto px-[8px] rounded-[12px] flex flex-col justify-between items-center"
      >
        {/* Top Links */}
        <div className="w-full flex flex-col gap-2">
          {links.map((link, index) => (
            <Link
              to={link.path}
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
                to={link.path}
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
