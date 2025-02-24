// import React from 'react';
import "../MobileWhyChoose/whychoose.css";
import MobileWhyChooseCard from './MobileWhyChooseCard/MobileWhyChooseCard';

const MobileWhyChoose = () => {
  return (
    <div className='bg-[#2C2240] relative mb-[4rem] '>
      <div className='px-[26px] pb-20 after:absolute after:bottom-[-2%] after:-rotate-3 after:w-[105%] after:h-[200px] after:bg-[#2C2240]  after:-left-2 after:z-[9] after:-rotate-3'>
        <div className='relative z-[99]'>
          <div className='pt-20  text-white'>
            <h2 className='text-[28px] font-[400] leading-[36px] text-[#F3F0FF]'>Why choose updone?</h2>
            <p className='text-[16px] font-[400] pt-[22px] leading-[26px] text-[#fff]'>Plan your event with ease and confidence, we have you covered!</p>
          </div>
          <div className=' text-white pt-10'>
            <div className='h-[100%] flex'>
              <MobileWhyChooseCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileWhyChoose;
