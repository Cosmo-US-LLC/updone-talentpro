"use client"
import Image from "next/image";
import React, { useState } from "react";
import { CARDS_DATA_CONSTANT } from "@/app/lib/constants";
import { montserrat } from "@/app/lib/Fonts";
import { Carousel } from "react-bootstrap";
import { useRouter } from "next/navigation";
// import 'bootstrap/dist/css/bootstrap.min.css';

function HowWork() {
  const [selectedCard, setSelectedCard] = useState(1); // State to track selected card
  const router = useRouter();
  const handleCardSelect = (cardId: number) => {
    setSelectedCard(cardId);
  };
  const handleHireNowClick = () => {
   
    router.push("/add-job?step=event-location");
  };

  return (
    <>
    <div
      style={{
        background: "linear-gradient(90deg, #F3F0FF 0%, #FFFFFF 100%)",
      }}
      className=""
    >
      <div className="min-w-[1024px] max-w-[1279px] px-6 mx-auto lg:h-[1150px] xl:h-[1050px] 2xl:h-[1100px]">
        <h2 className="text-center text-[60px] uppercase leading-[68px] font-[700] pt-[100px] pb-[25px]">
          How to{" "}
          <span className="text-[#350ABC] font-[800]">Hire Professional</span>{" "}
          <br /> For Your Need?
        </h2>
        <div className="relative min-h-[136vh] h-[100%] max-h-screen">
          {/* Background blur */}
          <div className="absolute inset-0 blur-5xl"></div>

          {/* Colored circles */}
          <div className="absolute inset-0 flex justify-end items-center space-x-4 space-y-4 blur-5xl max-w-[1279px] 2xl:max-w-[1440px] m-auto h-[90%]">
            <div className="absolute left-[32%] top-[2%] md:left-[1144px] md:top-[-17px] w-44 h-44 bg-[#FFACC5] rounded-full"></div>
            <div className="absolute right-[-4%] top-[45%] w-44 h-44 bg-[#FFFCAC] rounded-full"></div>
            <div className="absolute right-[33%] bottom-[40%] w-44 h-44 bg-[#FFD4AC] rounded-full"></div>
          </div>


          {/* Centered text */}
          <div className="absolute top-0 left-0 right-0 flex justify-center">
            <div className="relative h-screen flex flex-col md:flex-row w-full max-w-[1279px] 2xl:max-w-[1440px] top-[25px]">
              <div className="md:w-[60%] flex flex-col items-start justify-start space-y-4 2xl:relative 2xl:top-[56px] !w-[50%] h-auto">
                {CARDS_DATA_CONSTANT.map((card, id) => (
                  <div
                    key={id}
                    className={`!m-0 card-how-work ${
                      selectedCard === card.id ? "selected-how-work" : ""
                    }`}
                  >
                    <div
                      key={card.id}
                      style={{ margin: "0px", width: "86%" }}
                      className={`pl-[36px] ${card.id === 1 && "pt-0"} ${
                        card.id === 4 && "pb-0"
                      } pt-[25px] pb-[25px] give-border transition ease-in ${
                        selectedCard === card.id
                          ? "border-l-[6px]  border-[#350ABC]"
                          : "border-l-[6px]  border-[#e1dfea]"
                      } ${
                        selectedCard === card.id ? "" : ""
                      }  w-3/4 text-start cursor-pointer`}
                      onClick={() => handleCardSelect(card.id)}
                    >
                      <h3
                        className={`pb-2.5 tracking-[-0.48px] leading-normal font-[600] text-[24px] ${
                          montserrat.className
                        } ${
                          selectedCard === card.id
                            ? "text-[#3E2392]"
                            : "text-[#2C2240]"
                        }`}
                      >
                        {card.text}
                      </h3>
                      <p className="text-[16px] leading-[26px] font-[400] translate-[-0.32px] ml-[26px] text-[#6B6B6B] w-[104%%] ">
                        {card.dec}
                      </p>
                    </div>
                    <div
                      className={`border-b-[1px] !m-0 border-[#E8E8E8] absolute lg:w-[430px] xl:w-[550px] left-[38px] ${
                        card.id === 4 && "!border-none"
                      }`}
                    ></div>
                  </div>
                ))}
                <div className="text-start text-[#2C2240] m-0 text-[14.545px] font-[700] tracking-[-0.291px] leading-[ 23.636px] mt-[18px] rotate-[91reg] relative right-[256px] bottom-0"></div>
                <span
                  style={{ transform: "rotate(91deg)" }}
                  className="relative right-1.5"
                >
                  0{selectedCard}
                </span>{" "}
                <span style={{ margin: "0" }} className="m-0 ">
                  <svg
                    className="relative right-1.5 my-1"
                    width="17"
                    height="6"
                    viewBox="0 0 17 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.7018 5.70169L0.527273 1.71623L0.527273 0.407139L16.7018 4.37805L16.7018 5.70169Z"
                      fill="#6B6B6B"
                    />
                  </svg>
                </span>{" "}
                <span
                  style={{ margin: "0", transform: "rotate(91deg)" }}
                  className="m-0 relative right-1.5 text-start text-[#6B6B6B] text-[14.545px] font-[500] tracking-[-0.291px] leading-[ 23.636px]"
                >
                  04
                </span>
              </div>

              {/* Carousel */}
              <div className="w-full md:w-[50%] flex items-start justify-end relative bottom-[-32px]">
                <Carousel
                  interval={null}
                  activeIndex={selectedCard - 1}
                  // onSelect={(index) => setSelectedCard(index + 1)}
                  // slide={true}
                  fade={true}
                  controls={false}
                  touch
                >
                  {CARDS_DATA_CONSTANT?.map((card) => {
                    if (card?.image) {
                      return (
                        <Carousel.Item key={card?.id}>
                          <Image
                            src={card?.image}
                            alt={card?.text}
                            layout="responsive" // This makes the image responsive to its container
                            width={900} // Original image width, used to maintain aspect ratio
                            height={900} // Original image height, used to maintain aspect ratio
                            priority={true}
                          />
                        </Carousel.Item>
                      );
                    }
                  })}
                </Carousel>
              </div>
              
              {/* <div className="w-full md:w-[52%] flex items-start justify-end relative bottom-[-32px]">
                            {selectedCard === 1 && (
                                <div className='relative w-full h-[70%]'>
                                    <div className='relative inset-0'>
                                        <Image
                                            src={"/Frame 1410126545.webp"}
                                            alt={'Post a Job or Event'}
                                            width={910}
                                            height={910}
                                            priority={true}
                                        />
                                    </div>
                                </div>
                            )}
                            {selectedCard === 2 && (
                                <div className='relative w-full h-[70%]'>
                                    <div className='relative inset-0'>
                                        <Image
                                            src={"/Frame 1410126546.webp"}
                                            alt={'Invite the Best Talent'}
                                            width={910}
                                            height={910}
                                            priority={true}
                                        />
                                    </div>
                                </div>
                            )}
                            {selectedCard === 3 && (
                                <div className='relative w-full h-[70%]'>
                                    <div className='relative inset-0'>
                                        <Image
                                            src={"/Frame 1410126849.webp"}
                                            alt={'Receive and Review Offers'}
                                            width={910}
                                            height={910}
                                            priority={true}
                                        />
                                    </div>
                                </div>
                            )}
                            {selectedCard === 4 && (
                                <div className='relative w-full h-[70%]'>
                                    <div className='relative inset-0'>
                                        <Image
                                            src={"/Frame 1410126496.webp"}
                                            alt={'Accept and Offer, Done!'}
                                            width={910}
                                            height={910}
                                            priority={true}
                                        />
                                    </div>
                                </div>
                            )}
                        </div> */}
            </div>
            
          </div>
         
        </div>
        
      </div>
      <div className="w-full text-center relative lg:bottom-12 xl:bottom-16 2xl:bottom-18 cursor-pointer">
    <button
      onClick={handleHireNowClick}
      className="text-[#F3F0FF] !bg-[#350ABC] rounded-full text-[18px] font-normal px-[50px] py-[18px] text-center inline-flex items-center me-2 grow_ellipse
transition-transform duration-150 ease-in-out transform active:scale-95 active:shadow-inner "
    >
      Book a Talent Now
    </button>
  </div>
    </div>
    
  </>
  );
}

export default HowWork;
