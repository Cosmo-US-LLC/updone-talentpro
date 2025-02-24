"use client"
import React, { useCallback, useState } from 'react';
import  ACCORDIAN_DATA  from './constants';
import { montserrat } from '@/app/lib/Fonts';
import loadable from '../../ui/lazy-load';
const AccordionItem = loadable(() => import('./components'));
interface AccordianProps {
  isJobDetailsFaqs?: boolean;
}

const Accordion = ({isJobDetailsFaqs}:AccordianProps) => {
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const handleAccordionClick = useCallback(
    (index: number) => {
      setOpenAccordion(prev => (prev === index ? null : index));
    },
    [openAccordion]
  );

  return (
    <div
      style={{
        paddingTop: openAccordion === 0 ? '110px' : undefined,
      }}
      className={`${isJobDetailsFaqs ? " w-full left-0 bg-[#F3F0FF]":"bg-[#F9F9F9] relative"}  pt-[100px]  pb-[250px] flex justify-center items-center`}
    >
      <div className="flex flex-col justify-center min-w-[1024px] max-w-[1280px] px-6 items-center gap-8 lg:flex-row">
        <div>
          <h2 className={`${montserrat.className} 2xl:faq-head md:text-[34px] 2xl:text-[45px] mb-4 font-[600] md:leading-[40.64px] 2xl:leading-[44.64px]`}>
            Frequently Asked Questions
          </h2>
          <p className={`${montserrat.className} faq-body`}>Have question? We’re here to help</p>
        </div>
        <div className="w-full space-y-2">
          <div className="accordion-group space-y-[20px]" data-accordion="default-accordion">
            {ACCORDIAN_DATA.map((item, index) => (
              <AccordionItem
                key={index}
                index={index}
                title={item.title}
                content={item.content}
                isOpen={openAccordion === index}
                onClick={() => handleAccordionClick(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Accordion);
