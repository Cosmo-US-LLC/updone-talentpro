"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoHomeOutline } from "react-icons/io5";
import './style.css';
import { Breadcrumb } from '@/app/lib/types';
import { useAppSelector } from '@/app/lib/store/hooks';
import { selectAuth } from '@/app/lib/store/features/authSlice';
import { generateBreadcrumbs } from '@/app/lib/helpers/utils';

const renderBreadcrumb = (breadcrumb: Breadcrumb, index: number, length: number, isJobDetail?: boolean) => {
  const isActive = index === length - 1;
  return (
    <span key={breadcrumb.path} className={isActive ? 'active' : ''}>
      {isActive ? (
        <a className='breadcrumb-text'>
          {breadcrumb.name === 'Home' ? (
            <div className='flex justify-center items-center  gap-1 text-[14px] font-[600]'>
              <span className={`${isJobDetail ? "relative bottom-[2px]" : "relative bottom-[1.5px]"}`}><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1.5 4.5L6 1L10.5 4.5V10C10.5 10.2652 10.3946 10.5196 10.2071 10.7071C10.0196 10.8946 9.76522 11 9.5 11H2.5C2.23478 11 1.98043 10.8946 1.79289 10.7071C1.60536 10.5196 1.5 10.2652 1.5 10V4.5Z" stroke="#2C2240" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4.5 11V6H7.5V11" stroke="#2C2240" strokeLinecap="round" strokeLinejoin="round" />
              </svg></span> Home
            </div>
          ) : (
            breadcrumb.name
          )}
        </a>
      ) : (
        <Link href={breadcrumb.path} className='breadcrumb-link'>
          {breadcrumb.name === 'Home' ? (
            <div className='flex justify-center items-center gap-1'>
              <span className={`${isJobDetail ? "relative bottom-[2px]" : "relative bottom-[1.5px]"}`}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 12 12" fill="none">
                <path d="M1.5 4.5L6 1L10.5 4.5V10C10.5 10.2652 10.3946 10.5196 10.2071 10.7071C10.0196 10.8946 9.76522 11 9.5 11H2.5C2.23478 11 1.98043 10.8946 1.79289 10.7071C1.60536 10.5196 1.5 10.2652 1.5 10V4.5Z" stroke="#2C2240" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4.5 11V6H7.5V11" stroke="#2C2240" strokeLinecap="round" strokeLinejoin="round" />
              </svg></span> Home
            </div>
          ) : (
            breadcrumb.name
          )}
        </Link>
      )}
      {index < length - 1 && <span className='mx-[6px]'> / </span>}
    </span>
  );
};

const Breadcrumbs: React.FC<{ jobId?: string, currentStep?: number, isJobDetail?: boolean }> = ({ jobId, currentStep, isJobDetail }) => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(segment => segment !== '');
  const { auth: storedData } = useAppSelector(selectAuth);

  const breadcrumbs = generateBreadcrumbs(pathSegments, currentStep, jobId);
  const isWorker = breadcrumbs.some(item => item.name === "Invite Talents");
  return (
    <nav className={`${isWorker && storedData?.token && "!top-[50px] !relative"} breadcrumbs max-w-[1279px] 2xl:max-w-[1440px] mx-auto ${isJobDetail ? "!relative !bottom-[45px]" : ""}`}>
      {breadcrumbs.map((breadcrumb, index) => renderBreadcrumb(breadcrumb, index, breadcrumbs.length, isJobDetail))}
    </nav>
  );
};

export default Breadcrumbs;
