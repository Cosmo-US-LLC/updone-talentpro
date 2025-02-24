"use client"
import Image from "next/image";
import { useState } from "react";

interface TestimonialCardProps {
    avatarSrc?: any;
    name: string;
    content: string;
    isDetailTestonial?: boolean;
  }
  
  const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, content, avatarSrc, isDetailTestonial }) => {
    const [imageLoad, setImageLoad] = useState(false)
    const handleImageLoad = () => {
      setImageLoad(true)
    }
  
    return (
      <>
        {isDetailTestonial ?
          <div className={`testiminial_styles h-[248px] text-center justify-center items-center relative overflow-hidden  group py-6 flex gap-4 flex-col transition-all duration-500 container`}>
  
  
            {/* Content */}
            <div className="relative z-10 max-w-[calc(100%-2rem)] mx-auto">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {!imageLoad && <>Loading...</>}
                  <img className="w-12 h-12 rounded-full" onLoad={handleImageLoad} src={avatarSrc} alt="Neil image" />
                </div>
                <div className="flex-1 min-w-0 ms-4 text-left">
                  <h3 className="text-[20px] leading-[24px] tracking-[-0.4px] font-[600] xs:font-[400] text-[#2C2240]  ">
                    {name}
                  </h3>
                </div>
              </div>
  
              <div className='h-full flex justify-center items-center text-start'>
                <p className="text-[#0B0B0B] pb-2 2xl:text-[16px] xl:text-[16px] lg:text-[16px] md:text-[16px] sm:text-[16px] text-[14px] font-[400]  translate-[-0.32px] leading-[28px]">{content}</p>
              </div>
            </div>
          </div>
          :
  
          <div className={`testiminial_styles h-[248px] text-center justify-center items-center relative overflow-hidden  group p-6 flex gap-4 flex-col transition-all duration-500 container`} >
  
            {/* Content */}
            <div className="relative z-10 max-w-[calc(100%-2rem)] mx-auto">
              <div className="flex items-center">
                <div className="flex-shrink-0">
  
                  <Image
                    src={avatarSrc}
                    className="w-14 h-14 object-center object-cover rounded-full"
                    alt="Neil image"
                    width={300} // Example width, equivalent to 14 units in Tailwind
                    height={300} // Example height, equivalent to 14 units in Tailwind
                    quality={100} // Ensures the highest quality
                  />
  
                </div>
                <div className="flex-1 min-w-0 ms-4 text-left">
                  <h3 className="text-[20px] leading-[24px] tracking-[-0.4px]  font-[500] xs:font-[400] xs:text-[#2C2240] text-[#2C2240]  ">
                    {name}
                  </h3>
 
                </div>
              </div>
  
              <div className='h-full flex justify-center items-center text-start'>
                <p className="text-[#0B0B0B] pb-2 2xl:text-[16px] xl:text-[16px] lg:text-[16px] md:text-[16px] sm:text-[16px] text-[14px]  font-[400] translate-[-0.32px] leading-[24px]">{content}</p>
              </div>
            </div>
          </div>
        }
      </>
    );
  };
  export default TestimonialCard;