"use client";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import Link from "next/link";
import { Sheet, SheetTrigger, SheetContent, SheetClose } from "@/components/ui/sheet"; // For modal
import { clearAuth, selectAuth, setAuth, setEmpty as setAuthEmpty } from '@/app/lib/store/features/authSlice';
import { setEmpty as setBookingEmpty } from "@/app/lib/store/features/bookingSlice";
import { setEmpty as setJobEmpty } from "@/app/lib/store/features/jobCreateSlice";
import { setEmpty as setStaffEmpty } from "@/app/lib/store/features/staffSlice";
import { useAppSelector } from '@/app/lib/store/hooks';
import { FaRegCalendarCheck } from "react-icons/fa6";
import { LuLogOut } from "react-icons/lu";
import { TbCalendarUp } from "react-icons/tb";
import { MdOutlinePayment } from "react-icons/md";
import { MdOutlineReviews } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { TbLogin2 } from "react-icons/tb";
import { MdMiscellaneousServices } from "react-icons/md";
import { apiRequest } from '@/app/lib/services';

// Maximum number of links to display before showing "More"
const MAX_VISIBLE_LINKS = 4;

// Define an array of link objects
const links = [
    { name: 'Upcoming', icon: TbCalendarUp, path: '/' },
    { name: 'My Events', icon: FaRegCalendarCheck, path: '/myevents' },
    { name: 'Personal Details', icon: CgProfile, path: '/personaldetails' },
    { name: 'Login Details', icon: TbLogin2, path: '/logindetails' },
    { name: 'Services', icon: MdMiscellaneousServices, path: '/services' },
    { name: 'Payments', icon: MdOutlinePayment, path: '/payments' },
    { name: 'Reviews', icon: MdOutlineReviews, path: '/reviews' },
];

const bottomLinks = [
    { name: 'Logout', icon: LuLogOut, onClick: 'logout' },
];

const SideBarTalent = () => {
    const { auth: storedData } = useAppSelector(selectAuth);
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useDispatch();
    const [isMoreOpen, setIsMoreOpen] = useState(false);

    // Find active link
    const activeIndex = links.findIndex(link => pathname === link.path);

    const handleLogout = async () => {
        await apiRequest("/logout", {
          method: "POST",
          headers: {
            revalidate: true,
            ...(storedData && { Authorization: `Bearer ${storedData?.token}` }),
          },
        }).then(() => {
          dispatch(clearAuth());
          dispatch(setStaffEmpty());
          dispatch(setBookingEmpty());
          dispatch(setJobEmpty());
          dispatch(setAuthEmpty());

          Cookies.remove("token");
          Cookies.remove("authToken");
          Cookies.remove("authData");

          router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/logout?status=200`);
        });
    };

    return (
        <aside className="">
            <section
                style={{ boxShadow: '0px 6px 26px 0px rgba(0, 0, 0, 0.06)' }}
                className="bg-[#fff] h-full py-2 overflow-hidden px-2 rounded-lg flex flex-col justify-between items-center"
            >
                {/* Top Links */}
                <div className="w-full flex flex-col gap-2">
                    {links.slice(0, MAX_VISIBLE_LINKS).map((link, index) => (
                        <Link
                            href={link.path}
                            key={index}
                            className={`hover:bg-[#F8F6FF] flex flex-col items-center justify-center gap-2 w-full p-3 rounded-lg ${
                                activeIndex === index ? 'bg-[#F8F6FF]' : ''
                            }`}
                        >
                            <link.icon className={`h-6 w-6 ${activeIndex === index ? 'text-[#350ABC]' : 'text-[#2C2240]'}`} />
                            <span className={`text-sm w-20 truncate font-medium ${activeIndex === index ? 'text-[#350ABC]' : 'text-[#2C2240]'}`}>
                                {link.name}
                            </span>
                        </Link>
                    ))}
                    
                    {/* "More" button */}
                    {links.length > MAX_VISIBLE_LINKS && (
                        <button
                            className="hover:bg-[#F8F6FF] flex flex-col items-center justify-center gap-2 w-full p-3 rounded-lg"
                            onClick={() => setIsMoreOpen(true)}
                        >
                            <span className="h-6 w-6 text-[#2C2240]">•••</span>
                            <span className="text-sm font-medium text-[#2C2240]">More</span>
                        </button>
                    )}
                </div>

                {/* Bottom Links */}
                <div className="w-full flex flex-col gap-2">
                    {bottomLinks.map((link, index) => (
                        <div
                            key={index + links.length}
                            className="hover:bg-[#F8F6FF] flex flex-col items-center justify-center gap-2 w-full p-3 rounded-lg cursor-pointer"
                            onClick={() => {
                                if (link.onClick === 'logout') {
                                    handleLogout();
                                }
                            }}
                        >
                            <link.icon className="h-6 w-6 text-[#2C2240]" />
                            <span className="text-sm font-medium text-[#2C2240]">{link.name}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* More Links Modal */}
            <Sheet open={isMoreOpen} onOpenChange={setIsMoreOpen}>
                <SheetContent
                    side="bottom"
                    className="w-full max-h-[70vh] bg-white shadow-lg rounded-t-lg overflow-y-auto"
                >
                    <div className="p-4">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">More Options</h2>
                        <ul className="flex flex-col gap-2">
                            {links.slice(MAX_VISIBLE_LINKS).map((link, index) => (
                                <SheetClose asChild key={index}>
                                    <Link
                                        href={link.path}
                                        className="hover:bg-[#F8F6FF] flex items-center gap-3 p-3 rounded-lg w-full"
                                        onClick={() => setIsMoreOpen(false)}
                                    >
                                        <link.icon className="h-6 w-6 text-[#2C2240]" />
                                        <span className="text-sm font-medium text-[#2C2240]">{link.name}</span>
                                    </Link>
                                </SheetClose>
                            ))}
                        </ul>
                    </div>
                </SheetContent>
            </Sheet>
        </aside>
    );
};

export default SideBarTalent;
