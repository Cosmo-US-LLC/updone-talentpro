// FaqContainer.tsx
import React, { useState } from 'react';

interface FaqItem {
    title: string;
    content: React.ReactNode;
  }
  
  interface FaqContainerProps {
    faqs: FaqItem[];
  }
  
const FaqContant: React.FC<FaqContainerProps> = ({ faqs }) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
      setActiveIndex(index === activeIndex ? null : index);
    };

  return (
    <div className="faq-container">
      {faqs.map((item, index) => {
        const isActive = index === activeIndex;
        return (
          <div key={index} className="faq-item shadow mb-[20px] rounded-[4px]">
            <div
              className={`faq-question text-[16px]  py-[16px] font-[400] cursor-pointer flex items-center justify-between px-[20px] py-[15px] rounded transition-all duration-300 ${
                isActive ? 'bg-[#2C2240] text-[#fff]' : 'bg-[#fff] text-[#2C2240]'
              }`}
              onClick={() => toggleAccordion(index)}
            >
             <h3 className='w-[100%] max-w-[257px]'> {item.title}</h3>
              <span className="icon text-[24px] leading-[24px]">
                {isActive ? '−' : '+'}
              </span>
            </div>
            {isActive && (
              <div className="faq-answer py-[16px] text-[14px] text-[#6B6B6B] font-[400] mt-[10px] px-[20px]">
                {item.content}
              </div>
            )}
            
          </div>
        );
      })}
    </div>
  );
};

export default FaqContant;
