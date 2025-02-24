'use client'
import loadable from '@/app/_components/ui/lazy-load';
import Loader from '@/app/_components/ui/loader';
import React, { Suspense } from 'react';
const StaffDetail = loadable(() => import('@/app/_components/booking/detail'), { loading: () => <Loader /> });
const page = () => {

  return (
    <>
    <Suspense fallback={<p className='w-full flex justify-center items-center'>Loading.....</p>}>
      <StaffDetail />
    </Suspense>
    </>
  );
}

export default page;
