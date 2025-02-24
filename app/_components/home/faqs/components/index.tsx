'use client'

import { montserrat } from "@/app/lib/Fonts";



const AccordionItem: React.FC<{ index: number, title: string, content: JSX.Element, isOpen: boolean, onClick: () => void }> = ({ title, content, isOpen, onClick }) => {
  return (
    <div >
        <div
        style={{ background: isOpen ? '#2C2240' : undefined, color: isOpen ? '#F3F0FF' : undefined }}
          className={`relative flex items-center w-full py-3 2xl:py-6 rounded-tl-lg rounded-tr-lg px-4 text-left bg-[#FFFFFF] transition-all ease-in cursor-pointer text-[#2C2240] group ${isOpen ? ' text-[#F3F0FF]  m-0  relative bottom-[-12px]' : 'accordian-style rounded-md'}`}
          onClick={onClick}
        >
          <h3 className={`${montserrat.className} leading-[150%] text-[18px] font-[400] px-1`}>{title}</h3>
          {isOpen ? (
            <span className="absolute right-4 pt-1 text-lg group-open:opacity-0">
              <svg width="16" height="1" viewBox="0 0 16 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 0.5H15" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

            </span>
          ) : (
            <span className="absolute right-4 pt-1 text-lg group-open:opacity-0">
              <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5.5V19.5" stroke="#2C2240" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M5 12.5H19" stroke="#2C2240" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

            </span>
          )}
        </div>
      <div className={`${isOpen ? 'block rounded-bl-lg rounded-br-lg mb-4 bg-[#FFFFFF]' : 'h-0'} overflow-hidden transition-all duration-300 ease-in-out`}>
        <div className="p-4 text-[16px] text-[#6B6B6B] leading-[28px] font-[400] mt-[16px] ">
          {content}
        </div>
      </div>
    </div>
  );
};
export default AccordionItem;