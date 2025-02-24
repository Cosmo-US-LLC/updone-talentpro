import { setSelectedService } from '@/app/lib/store/features/jobCreateSlice';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';

const mobileServicesCard = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const cardData = [
    {
      id: 1,
      name: "Bartender",
      bgColor: "#F1F5FF",
      iconBgColor: "#B6CAFF",
      textColor: "#012487",
      buttonColor: "#012487",
      icon: "/images/mobile/home/services/bartender.webp",
      arrowIcon: "/images/mobile/home/services/arrow-up-right.svg"


    },
    {
      id: 2,
      name: "Waiter",
      bgColor: "#F0FCFF",
      iconBgColor: "#AEEEFF",
      textColor: "#01576E",
      buttonColor: "#01576E",
      icon: "/images/mobile/home/services/waiter.webp",
      arrowIcon: "/images/mobile/home/services/arrow-up-right (1).svg"


    },
    {
      id: 3,
      name: "Cocktail Server",
      bgColor: "#FFF7EE",
      iconBgColor: "#FFDCB0",
      textColor: "#884C00",
      buttonColor: "#884C00",
      icon: "/images/mobile/home/services/cocktail.webp",
      arrowIcon: "/images/mobile/home/services/arrow-up-right (2).svg"

    },
    {
      id: 6,
      name: "Barback",
      bgColor: "#F3EFFF",
      iconBgColor: "#C7B2FF",
      textColor: "#200174",
      buttonColor: "#200174",
      icon: "/images/mobile/home/services/Barback.webp",
      arrowIcon: "/images/mobile/home/services/arrow-up-right (3).svg"
    },
    {
      id: 4,
      name: "Promo Model",
      bgColor: "#FFEEF8",
      iconBgColor: "#FFBAE2",
      textColor: "#7F004A",
      buttonColor: "#7F004A",
      icon: "/images/mobile/home/services/promo.webp",
      arrowIcon: "/images/mobile/home/services/promo-model-arrow.svg",
      iconClass: "5px",
      iconClassTop: ""

    },
    {
      id: 5,
      name: "Event Helper",
      bgColor: "#FFE0E0",
      iconBgColor: "#FFF0F0",
      textColor: "#750000",
      buttonColor: "#750000",
      arrowIcon: "/images/mobile/home/services/arrow-up-right (5).svg",
      icon: "/images/mobile/home/services/eventhelper.webp",
    },
  ];

  const handleClickServiceCard = (service: any) => {
    setTimeout(() => {
      dispatch(setSelectedService(service));
      router.push('/add-job?step=event-location');
    }, 200);
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        {cardData.map((card: any, index) => (
          // <div
          //   key={index}
          //   className="py-3 pl-2 pr-1 rounded-lg overflow-hidden"
          //   style={{ backgroundColor: card.bgColor }}
          //   onClick={() => {
          //     handleClickServiceCard(card);
          //   }}
          // >
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5, ease: "easeOut" }}
            className="py-3 pl-2 pr-1 rounded-lg overflow-hidden"
            style={{ backgroundColor: card.bgColor, opacity: 0.5 }}
            onClick={() => handleClickServiceCard(card)}
          >
            <motion.div
              key={card.id}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.02 }}
            >
              <h3 style={{ color: card.textColor }} className="text-[18px] mb-12 font-[500] leading-[12px]">{card.name}</h3>
              <div className="flex items-center justify-end mt-4 relative">
                <div
                  className="w-[82px] absolute left-[-24px] top-[-30px] p-2 h-[82px] rounded-full flex items-center justify-center"
                  style={{ backgroundColor: card.iconBgColor }}
                >
                  <Image
                    className="w-[auto] h-[auto] relative"
                    style={{ left: card.iconClass, top: card.iconClassTop }}
                    src={card.icon}
                    alt={`${card.name} icon`}
                    width={[2, 4, 5, 6].includes(card.id) ? 40 : 22}
                    height={22} 
                    quality={100}
                    priority={true}
                  />
                </div>
                <button
                  className="flex items-center hover:bg-[transparent]  text-[14px] leading-[24px] font-[600]"
                  style={{ color: card.buttonColor }}
                >
                  Book Now
                  <Image
                    src={card.arrowIcon}
                    alt="arrow"
                    width={24}
                    height={24}
                    quality={100}
                    priority={true}
                  />
                </button>
              </div>
            </motion.div>
          </motion.div>
          // </div>
        ))}
      </div>
    </div>
  );
};

export default mobileServicesCard;
