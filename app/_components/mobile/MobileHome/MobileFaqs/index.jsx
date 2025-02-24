import React from 'react';
import Image from 'next/image';
import FaqContainer from './MobileFaqContant';
import ACCORDIAN_DATA from '../../../home/faqs/constants'


const MobileFaqs = () => {
  return (
    <div className=" bg-[#F9F9F9] pt-[57px] mt-[10px] pb-[70px] px-[20px]"
    >
      <div className="title">
        <h2 className="text-center text-[28px] font-[400] leading-[36px] ">Frequently Asked Questions</h2>
        <p className='text-[#6B6B6B] text-[16px] py-[10px] font-[400] text-center'>Have question? We’re here to help</p>
      </div>
      <div>
      <FaqContainer faqs={ACCORDIAN_DATA} />
      </div>
    </div>
  );
}

export default MobileFaqs;
