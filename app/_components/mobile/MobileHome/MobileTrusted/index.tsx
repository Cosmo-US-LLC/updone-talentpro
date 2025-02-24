// import React from 'react';
import './mobiletrusted.css';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';

const imageSources = [
  '/images/sponsor/trut (6).svg',
  '/images/sponsor/trut (5).svg',
  '/images/sponsor/trut (4).svg',
  '/images/sponsor/trut (3).svg',
  '/images/sponsor/trut (2).svg',
  '/images/sponsor/trut (1).svg'
];

const MobileTrusted: React.FC = () => {
  return (
    <div className=" bg-[#FFFFFF] mt-[100px] pb-[40px] px-[20px]"
    style={{background:'linear-gradient(0deg, #F7F7F7 31.32%, rgba(255, 255, 255, 0.00) 100%)'}}
    >
      <div className="title">
        <h2 className="text-center text-[24px] font-[400] leading-[32px] tracking-[-0.24px]">Trusted by hundreds of small and large businesses</h2>
      </div>
      <div>
        <Marquee direction="left" speed={100} delay={5}>
          {imageSources.concat(imageSources).map((src, index) => (
            <div className="image_wrapper py-[17px] px-[12px] w-[#fff] rounded-[11.579px]" key={index}>
              <Image
                className="text-gray-900  w-[40px] h-[40px]" 
                src={src}
                alt={`sponsor${index}`}
                width={20}  
                height={20}
                quality={100}
              />
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
}

export default MobileTrusted;
