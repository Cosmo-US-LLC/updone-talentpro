import Image from "next/image";
import Link from "next/link";
import TypewriterEffect from "../../ui/hero/TypewriterEffect";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

const Hero = () => {
  // const router = useRouter();

  // useEffect(() => {
  //   router.prefetch('/add-job?step=event-location')
  // }, [router]);

  return (
    <div className="relative overflow-hidden pt-[150px] bg-gradient-to-r from-[#7a58df] via-[#8363d8] to-[#ab8fcb]"> 
      <Image
        src="/images/hero/hero-bg.webp"
        alt="Hero Background"
        layout="fill"
        objectFit="cover"
        priority
        className="z-0 bg-white"
      />
      <div className="relative h-full min-w-[1024px] max-w-[1280px] mx-auto px-6 flex items-center gap-4">
        <div className="mb-[100px] flex flex-col w-[65%] lg:mt-16 xl:mt-12">
          <h1 className="text-white lg:leading-[50px] xl:leading-[80px] 3xl:leading-[100px] mb-1 lg:text-[44px] xl:text-[64px] 3xl:text-[70px] font-[500] tracking-tight">
            <span>
              Book a{" "}
              <TypewriterEffect words={["Bartender", "Waitress", "Barback"]} />{" "}
              <br /> in a snap!
            </span>
          </h1>
          <p className="text-white lg:text-[18px] xl:text-[24px] 3xl:text-[22px] lg:mb-[8px] mt-[12px] font-[400] tracking-tight">
            Make your event unforgettable - hire top talent.
          </p>
          <div className="lg:mb-2 xl:mb-8">
            <Link
              className="lg:w-[200px] xl:w-[280px] lg:mb-4 xl:mb-0 flex justify-center items-center gap-4 px-2 lg:py-1 xl:py-4 text-black mt-6 lg:text-[14px] xl:text-[18px] font-medium leading-[30px] rounded-full border-2 border-white bg-[#FFD79C] hover:bg-[#fbd398] hover:text-black active:scale-95 transition-transform duration-200 ease-in-out"
              href={"/add-job?step=event-location"}
              style={{
                boxShadow: "0 0 50px rgba(0, 0, 0, 0.1), 0 0 15px #FFF4D9",
              }}
            >
              Book a Talent Now
            </Link>
          </div>

          <div className=" w-full flex flex-row lg:gap-4 xl:gap-10  ">
            <div className="    flex flex-row  gap-2">
              <Image
                className="xl:w-[36px] xl:h-[36px] xl:mt-1"
                src="/images/security/qualified.svg"
                alt="star"
                width={36}
                height={10}
              />
              <p className="flex flex-col lg:text:[10px] xl:text-[14px]   text-white">
                <span>Pre-vetted,</span>
                <span>Quality Staff</span>
              </p>
            </div>
            <div className="    flex flex-row  gap-2  ">
              <Image
                className=" xl:w-[36px] xl:h-[36px]    "
                src="/images/security/sransparent.svg"
                alt="star"
                width={36}
                height={10}
              />
              <p className="flex flex-col lg:text:[10px] xl:text-[14px]   text-white">
                <span>Transparent</span>
                <span>Pricing Structure</span>
              </p>
            </div>

            <div className="flex flex-row  gap-2 ">
              <Image
                className="  xl:w-[36px] xl:h-[36px]    "
                src="/images/hero/happy-customer.svg"
                alt="star"
                width={36}
                height={10}
              />
              <p className="flex flex-col lg:text:[10px] xl:text-[14px]   text-white">
                <span>+10,000</span>
                <span>Happy Customers</span>
              </p>
            </div>
          </div>
        </div>
        <div className="hidden relative w-[100%] max-w-[600px] h-full md:flex top-1 flex-row items-end">
          <Image
            className="object-contain w-full h-auto"
            src="/images/hero/home-staff.webp"
            alt="home-staff"
            quality={75}
            width={941}
            height={948}
            loading="lazy"
            style={{
              WebkitBackfaceVisibility: 'hidden',
              backfaceVisibility: 'hidden',
              transform: 'translateZ(0)'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;