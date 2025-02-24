import Image from 'next/image';
import React from 'react';

const cardData = [
  {
    id: 1,
    imageSrc: "/images/security/qualified.svg",
    title: "Pre-vetted, Qualified Talent",
    description: "Updone ensures consistent quality by thoroughly vetting all talent for skills, experience, and professionalism.",
  },
  {
    id: 2,
    imageSrc: "/images/security/streamlined.svg",
    title: "Streamlined Booking Process",
    description: "The user-friendly online platform allows clients to browse available talent, filter by specific needs, and confirm bookings within minutes.",
  },
  {
    id: 3,
    imageSrc: "/images/security/flexible.svg",
    title: "Flexibility and Scalability",
    description: "Updone caters to a variety of staffing needs, from last-minute replacements to long-term engagements.",
  },
  {
    id: 4,
    imageSrc: "/images/security/sransparent.svg",
    title: "Transparent pricing structure",
    description: "Competitive rates and transparent pricing structure ensure clients get the best value for their staffing needs..",
  },
];

const MobileWhyChooseCard = () => {
  return (
    <div className="w-full">
      {cardData.map((card, index) => (
        <div
          key={card.id}
          className={`w-full ${
            index === cardData.length - 1 ? "" : "border-b border-[#4E3F6C] mb-[35px] pb-[35px]"
          }`}
        >
          <div className="h-full flex items-start">
            <Image
            className='mt-[10px]'
              src={card.imageSrc}
              alt="icon"
              width={40}
              height={40}
              quality={100}
            />
            <div className="ml-4">
              <h3 className="text-[20px] font-[400] leading-[normal]">{card.title}</h3>
              <p className="pt-[10px] text-[14px] font-[400] leading-[24px]">
                {card.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MobileWhyChooseCard;
