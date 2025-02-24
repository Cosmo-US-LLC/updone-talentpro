"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
// import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const MobileHero = () => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const TypewriterEffect = ({ words }: any) => {
    const [text, setText] = useState("");
    const [wordIndex, setWordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [typingSpeed, setTypingSpeed] = useState(150); // Adjust typing speed
    const [isWaiting, setIsWaiting] = useState(false); // Control waiting before deleting

    useEffect(() => {
      const currentWord = words[wordIndex % words.length];

      if (!isWaiting) {
        const typeTimeout = setTimeout(() => {
          if (isDeleting) {
            setText(currentWord.substring(0, text.length - 1));
            setTypingSpeed(100); // Deleting speed
          } else {
            setText(currentWord.substring(0, text.length + 1));
          }

          // If word is fully typed
          if (!isDeleting && text === currentWord) {
            setIsWaiting(true);
            setTimeout(() => setIsDeleting(true), 2000); // Wait before starting to delete
          }

          // If word is fully deleted
          if (isDeleting && text === "") {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length); // Move to the next word
          }
        }, typingSpeed);

        return () => clearTimeout(typeTimeout); // Clear the timeout to avoid memory leaks
      } else {
        // Wait before deleting starts
        const waitingTimeout = setTimeout(() => {
          setIsWaiting(false);
          setIsDeleting(true); // Start deleting after waiting
        }, 2000); // Delay before deleting starts

        return () => clearTimeout(waitingTimeout);
      }
    }, [text, isDeleting, wordIndex, isWaiting, typingSpeed]);

    return <span className="font-[500]">{text}</span>;
  };

  return (
    <div>
      <section className="max-w-full overflow-hidden relative px-[20px]">
        <div
          className="px-2 pt-4 rounded-[12px] border border-[#EBE6FF] overflow-visible w-full"
          style={{
            opacity: 1,
            backgroundImage: `url(/images/gradient_1x.webp)`,
            backgroundColor: "lightgray",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            minHeight: "30vh",
          }}
        >
          <div className="flex flex-col justify-start items-center relative">
            <div className="w-full ml-8">
              {/* Text Section */}
              <div className="relative top-1 z-[10] text-left">
                <h1 className="text-white leading-[32px] text-[32px] mb-8 font-[600]">
                  Book a{" "}
                  <TypewriterEffect
                    words={["Bartender", "Waitress", "Barback"]}
                  />{" "}
                  <br />
                  <p className="pt-3 font-[300]">in a snap!</p>
                </h1>
              </div>
            </div>
            <div className="flex flex-row ml-2 ">
              <div className="mr-4  flex flex-row">
                <Image
                  className="mr-1 mt-0.5 mb-2 "
                  src="/images/security/qualified.svg"
                  alt="star"
                  width={28}
                  height={10}
                />
                <p className="text-[12px] text-white">
                  Pre-vetted, Quality Staff
                </p>
              </div>
              <div className="mr-8  flex flex-row">
                <Image
                  className="mr-2 mt-1 mb-3"
                  src="/images/security/sransparent.svg"
                  alt="star"
                  width={28}
                  height={10}
                />
                <p className="text-[12px] text-white">
                  Transparent Pricing Structure
                </p>
              </div>
            </div>
            {/* Image Section */}
            <div className="w-[120%] flex justify-center">
              <Image
                className="relative "
                src="/images/mobile-hero4.webp"
                alt="mockup"
                layout="responsive"
                width={351}
                height={135}
                // width={214}
                // height={218}
                quality={100}
                priority={true}
                onLoadingComplete={() => setIsLoading(false)}
              />
            </div>
            <Image
              className="absolute shadow-lg top-[292px] left-1/2 transform overflow-visible -translate-x-1/2  translate-y-1/2"
              src="/images/trustmobile.webp"
              alt="trustmob"
              width={220}
              height={40}
            />
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <Link
            // onClick={() => { router.push('/add-job?step=event-location') }}
            // onTouchEnd={() => {
            //   router.push("/add-job?step=event-location");
            // }}
            href={`${process.env.NEXT_PUBLIC_BASE_URL}/add-job?step=event-location`}
            style={{ boxShadow: "0px 0px 20px 0px rgba(243, 240, 255, 0.48)" }}
            className="text-[#FFF] mt-6 py-[16px] px-[28px] mx-auto rounded-full leading-[16px] font-[400] text-[16px] bg-[#2C2240]"
          >
            Book a Talent Now
          </Link>{" "}
        </div>
        <h5 className="flex justify-center text-[12px] mt-0.5 font-medium pr-2">
          +10K Happy Customers
        </h5>
      </section>
    </div>
  );
};

export default MobileHero;
