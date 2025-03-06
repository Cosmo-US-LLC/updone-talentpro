"use client"
import { clearAuth, selectAuth, setAuth, setEmpty as setAuthEmpty } from '@/app/lib/store/features/authSlice';
import { setEmpty as setBookingEmpty } from "@/app/lib/store/features/bookingSlice";
import { setEmpty as setJobEmpty } from "@/app/lib/store/features/jobCreateSlice";
import { setEmpty as setStaffEmpty } from "@/app/lib/store/features/staffSlice";
import { useAppSelector } from '@/app/lib/store/hooks';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaRegCalendarCheck } from "react-icons/fa6";
import { LuLogOut } from "react-icons/lu";
import { TbCalendarUp } from "react-icons/tb";
import { useDispatch } from 'react-redux';
import Image from "next/image";
import { MdOutlinePayment } from "react-icons/md";
import { MdOutlineReviews } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { TbLogin2 } from "react-icons/tb";
import { MdMiscellaneousServices } from "react-icons/md";
import { BsEnvelopePaper } from "react-icons/bs";
import { apiRequest } from '@/app/lib/services';


// Define an array of link objects
const links = [
    { name: 'Upcoming', icon: TbCalendarUp, path: '/' },
    { name: 'Invites', icon: BsEnvelopePaper, path: '/invites' },
    { name: 'My offers', imagePath: '/images/offer.png', path: '/offered' },
    { name: 'My Events', icon: FaRegCalendarCheck, path: '/myevents' },
    { name: 'Personal details ', icon: CgProfile, path: '/personaldetails' },
    { name: 'Login details', icon: TbLogin2, path: '/logindetails' },
    { name: 'Services', imagePath: '/images/bart.png', path: '/services' },
];

const bottomLinks = [
    { name: 'Logout', icon: LuLogOut, onClick: 'logout' },
];

const SideBarTalent = () => {
    const { auth: storedData } = useAppSelector(selectAuth);
    const router = useRouter();
    const pathname = usePathname();
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const authData = Cookies.get("authData");
        const authToken = Cookies.get("authToken");
        if (authData) {
          dispatch(setAuth(({ token: authToken, user: JSON.parse(authData) })));
        }
    }, [dispatch, router]);

    useEffect(() => {
        const findActiveIndex = () => {
            const activeLinkIndex = [...links, ...bottomLinks].findIndex(link => {
                if ('path' in link) {
                    return pathname === link.path;
                }
                return false;
            });
            setActiveIndex(activeLinkIndex);
            setLoading(false);
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
    

    return (
        <aside className="">
            <section
                style={{ boxShadow: '0px 6px 26px 0px rgba(0, 0, 0, 0.06)' }}
                className="bg-[#fff] h-[100%] py-[10px] overflow-auto px-[8px] rounded-[12px] flex flex-col justify-between items-center"
            >
                {/* Top Links */}
                <div className="w-full flex flex-col gap-2">
                    {links.map((link, index) => (
                        <Link
                            href={link.path}
                            key={index}
                            className={`hover:bg-[#F8F6FF] flex flex-col items-center justify-center gap-3 w-full p-3 rounded-[8px] ${
                                activeIndex === index ? 'bg-[#F8F6FF]' : ''
                            }`}
                        >
                            {'icon' in link && link.icon ? (
                                <link.icon className={`h-6 w-6  ${
                                    activeIndex === index ? 'text-[#350ABC]' : 'text-[#2C2240]'
                                }`} />
                            ) : (
                                <Image 
                                    src={link.imagePath}
                                    alt={link.name}
                                    width={30}
                                    height={24}
                                    className={activeIndex === index ? 'text-[#350ABC]' : 'text-[#2C2240]'}
                                />
                            )}
                            <span className={`text-[14px] text-center w-[73px] truncate leading-[18px] font-[400] ${
                                activeIndex === index ? 'text-[#350ABC]' : 'text-[#2C2240]'
                            }`}>{link.name}</span>
                        </Link>
                    ))}
                </div>



                {/* Bottom Links: Settings and Logout */}
                <div className="w-full">
                    <div className='flex flex-col gap-6 mb-8'>
                        <div className='flex flex-row justify-center items-center gap-2'>
                            {/* <Image
                                src="/images/talentpro/glass.svg"
                                alt="coming-soon"
                                width={20}
                                height={20}
                                objectFit="fill"
                            /> */}
                            {/* <p className='text-[14px] text-gray-400'>Coming Soon</p> */}
                        </div>
                        <div className="relative group flex flex-col items-center gap-2 cursor-pointer">
                            <MdOutlinePayment className="h-6 w-6" color="#BDBDBD" />
                            <p className="text-[12px] text-gray-400 font-[400]">Payments</p>

                         
                        </div>
                        <div className='relative group flex flex-col items-center gap-2 cursor-pointer'>
                            <MdOutlineReviews
                                className='h-6 w-6'
                                color='#BDBDBD'
                            />
                            <p className='text-[12px] text-gray-400 font-[400]'>Reviews</p>
                          
                            
                        </div>
                        
                    </div>
                    <span className='relative bottom-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="98" height="2" viewBox="0 0 98 2" fill="none">
                            <path d="M1 1.48828H97" stroke="url(#paint0_linear_2412_20068)" strokeLinecap="round" />
                            <defs>
                                <linearGradient id="paint0_linear_2412_20068" x1="1" y1="1.98828" x2="97" y2="1.98828" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#D9D9D9" stopOpacity="0" />
                                    <stop offset="0.475" stopColor="#D9D9D9" />
                                    <stop offset="1" stopColor="#D9D9D9" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </span>
                    <div className='w-full flex flex-col gap-2'>
                        {bottomLinks.map((link, index) => (
                            <div
                                key={index + links.length}
                                className={`hover:bg-[#F8F6FF] flex flex-col items-center justify-center gap-6 w-full p-3 rounded-[12px] cursor-pointer ${
                                    activeIndex === index + links.length ? 'bg-[#F8F6FF]' : ''
                                }`}
                                onClick={() => {
                                    if (link.onClick === 'logout') {
                                        handleLogout();
                                    }
                                }}
                            >
                                <link.icon className={`h-6 w-6  ${
                                    activeIndex === index + links.length ? 'text-[#350ABC]' : 'text-[#2C2240]'
                                }`} />
                                <span className={`text-[14px] leading-[18px] font-[400] ${
                                    activeIndex === index + links.length ? 'text-[#350ABC]' : 'text-[#2C2240]'
                                }`}>{link.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </aside>
    );
};

export default SideBarTalent;