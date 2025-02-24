import { selectAuth } from '@/app/lib/store/features/authSlice';
import { useAppSelector } from '@/app/lib/store/hooks';
import { useRouter } from 'next/navigation';
import { BsPlusLg } from "react-icons/bs";
import { CiHome } from "react-icons/ci";
import { BottomDrawer } from "../../(mobile-version)/Drawer";
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';

const MobileFooter = () => {
  const router = useRouter();
  const { auth: storedData } = useAppSelector(selectAuth);
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleNavigation = () => {   
    router.push('/add-job?step=event-location');
  };

  return (
    <footer className="w-full text-center fixed bottom-[-1px] left-0 right-0 z-[1000]">
      <div className=' justify-center items-center absolute inline-block'>
      <div
      onClick={handleNavigation}
      // onTouchStart={(e) => e.currentTarget.classList.add('scale-95')}
      // onTouchEnd={(e) => e.currentTarget.classList.remove('scale-95')}
      style={{
        borderRadius: '124.074px',
        background: '#774DFD',
        boxShadow: "0px 0px 24.815px 0px rgba(53, 10, 188, 0.39)",
        transition: 'transform 0.1s ease',
      }}
      className='z-[999] text-[#FFF] !text-[40px] circle-btn flex justify-center relative right-[33px] top-[19px] items-center rounded-full'
    >
      <BsPlusLg size={22} />
    </div>
      </div>
      <div className='absolute h-[61%] bottom-0 flex justify-around items-center w-full'>
        <div
          onClick={() => {
            setOpenDrawer(false);
            router.push(process.env.NEXT_PUBLIC_BASE_URL ?? '');
          }}
          className='space-y-[.3rem]'>
          <span className='flex justify-center items-center'>
            {
              isHome && isDrawerOpen === false ?
                <Image
                  // className="w-[74px] h-[74px] rounded-full object-cover relative border-4 border-[#EBE6FF]"
                  // src={talent.profile_pic ? talent.profile_pic : '/images/mobiles/home-activated.svg'}
                  src={'/images/mobile/home-activated.svg'}
                  quality={100}
                  objectFit='fill'
                  width={34}
                  height={34}
                  alt=''
                  placeholder='blur'
                  blurDataURL="data:image/jpeg;base64,..."
                  priority={true}
                />
                :
                <svg width="34" height="34" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.5 9L12.5 2L21.5 9V20C21.5 20.5304 21.2893 21.0391 20.9142 21.4142C20.5391 21.7893 20.0304 22 19.5 22H5.5C4.96957 22 4.46086 21.7893 4.08579 21.4142C3.71071 21.0391 3.5 20.5304 3.5 20V9Z" stroke="#161616" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9.5 22V12H15.5V22" stroke="#161616" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            }
          </span>
          <p className={`font-[500] text-[12px] ${isHome && isDrawerOpen === false && 'text-[#774DFD]'}`}>Home</p>
        </div>
        <div className='space-y-[.6rem]' >
          <span className='flex justify-center items-center'>
            <CiHome size={35} className='opacity-0' />
          </span>
          <p className='font-[500]  text-[#161616] text-[12px]'>Book a Talent</p>
        </div>
        <div className='space-y-[.4rem]'>
          <span className='flex justify-center items-center z-[999]'>
            {
              isDrawerOpen ?
                <Image
                  // className="w-[74px] h-[74px] rounded-full object-cover relative border-4 border-[#EBE6FF]"
                  // src={talent.profile_pic ? talent.profile_pic : '/images/mobiles/home-activated.svg'}
                  src={'/images/mobile/user-activated.svg'}
                  quality={100}
                  objectFit='fill'
                  width={36}
                  height={36}
                  alt=''
                  placeholder='blur'
                  blurDataURL="data:image/jpeg;base64,..."
                  priority={true}
                /> :
                <svg width="36" height="36" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.5 21V19C20.5 17.9391 20.0786 16.9217 19.3284 16.1716C18.5783 15.4214 17.5609 15 16.5 15H8.5C7.43913 15 6.42172 15.4214 5.67157 16.1716C4.92143 16.9217 4.5 17.9391 4.5 19V21" stroke="#161616" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12.5 11C14.7091 11 16.5 9.20914 16.5 7C16.5 4.79086 14.7091 3 12.5 3C10.2909 3 8.5 4.79086 8.5 7C8.5 9.20914 10.2909 11 12.5 11Z" stroke="#161616" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            }
          </span>
          <div className="flex justify-center items-center">
          {
             storedData?.token ?
            
           
              <p className={`font-[500] ${isDrawerOpen ? "text-[#774DFD]" : "text-[#161616]"} truncate max-w-[45px] text-center text-[12px]`}>{storedData?.user?.name}</p>
              :
              <p className={`font-[500] ${isDrawerOpen ? "text-[#774DFD]" : "text-[#161616]"}   text-[12px]`}>Profile</p>
              
          }
          </div>
        </div>

        <BottomDrawer setIsDrawerOpen={setIsDrawerOpen} />

      </div>
      <svg
        width="100%"
        height="200"
        viewBox="0 0 393 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        <g filter="url(#filter0_d_3123_46570)">
          <path
            d="M156 56.373C156 52.301 152.699 49 148.627 49H0V130H392V49H242.35C238.291 49 235 52.2908 235 56.3503C235 74.542 221.691 89.9964 203.7 92.6949L200.871 93.1194C196.979 93.7031 193.022 93.6957 189.133 93.0973L187.259 92.8091C169.275 90.0424 156 74.5684 156 56.373Z"
            fill="white"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_3123_46570"
            x="-42"
            y="0"
            width="476"
            height="165"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="-7" />
            <feGaussianBlur stdDeviation="21" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
            />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3123_46570" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3123_46570" result="shape" />
          </filter>
        </defs>
      </svg>

    </footer>
  );
};

export default MobileFooter;
