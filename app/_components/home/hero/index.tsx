import Image from "next/image";
import Link from "next/link";
import TypewriterEffect from "../../ui/hero/TypewriterEffect";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Hero = () => {
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/add-job?step=event-location')
  }, [router]);

  return (
    <div className="relative overflow-hidden pt-[150px]">
      <Image
        src="/images/hero/hero-bg.webp"
        alt="Hero Background"
        layout="fill"
        objectFit="cover"
        quality={75}
        priority
        className="-z-10"
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
              {/* <button
                // onClick={() => {
                //   router.push("/add-job?step=event-location");
                // }}
                style={{
                  boxShadow: "0 0 50px rgba(0, 0, 0, 0.1), 0 0 15px #FFF4D9",
                }}
                className="lg:w-[200px] xl:w-[280px] lg:mb-4 xl:mb-0 flex justify-center items-center gap-4 px-2 lg:py-1 xl:py-4 text-black mt-6 lg:text-[14px] xl:text-[18px] font-medium leading-[30px] rounded-full border-2 border-white bg-[#FFD79C] hover:bg-[#fbd398] hover:text-black active:scale-95 transition-transform duration-200 ease-in-out"
              > */}
              Book a Talent Now
              {/* </button> */}
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
        <div className="hidden md:block relative w-[100%] max-w-[600px] h-full flex flex-row items-end">
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

// import Image from "next/image";
// import Link from "next/link";
// import TypewriterEffect from "../../ui/hero/TypewriterEffect";

// const Hero = () => {
//   return (
//     <div>
//       <section className="max-w-full h-full overflow-hidden relative">
//         <div className="absolute inset-0 min-w-[1024px] max-w-[1280px] px-6 mx-auto flex justify-center items-center overflow-hidden z-10">
//           <div className="flex flex-col w-[65%] lg:mt-24">
//             <h1 className="text-white lg:leading-[50px] xl:leading-[80px] mb-1 lg:text-[44px] xl:text-[64px] font-[500] tracking-tight">
//               <span>
//                 Book a{" "}
//                 <TypewriterEffect
//                   words={["Bartender", "Waitress", "Barback"]}
//                 />{" "}
//                 <br /> in a snap
//               </span>
//             </h1>
//             <p className="text-white lg:text-[18px] xl:text-[24px] lg:mb-[20px] xl:mb-[20px] mt-[12px] font-[400] tracking-tight">
//               Make your event unforgettable - hire top talent.
//             </p>
//             <div className="lg:mb-2 xl:mb-10 2xl:mb-10">
//               <Link href={"/add-job?step=event-location"}>
//                 <button
//                   style={{
//                     boxShadow: "0 0 50px rgba(0, 0, 0, 0.1), 0 0 15px #FFF4D9",
//                   }}
//                   className="lg:w-[200px] xl:w-[280px] lg:mb-4 xl:mb-0 flex justify-center items-center gap-4 px-2 lg:py-1 xl:py-4 text-black mt-6 lg:text-[14px] xl:text-[18px] font-medium leading-[30px] rounded-full border-2 border-white bg-[#FFD79C] hover:bg-[#fbd398] hover:text-black active:scale-95 transition-transform duration-200 ease-in-out"
//                 >
//                   Book a Talent Now
//                 </button>
//               </Link>
//             </div>
//             <div className=" flex flex-row lg:mb-1 xl:mb-6">
//               <div className="flex flex-row lg:mr-8 xl:mr-12 mt-1">

//                 <div className="mr-20 mt-1 flex flex-row">
//                   <Image
//                     className="mr-3 mt-0.5 mb-2 lg:w-[36px] lg:h-[36px] xl:w-[48px] xl:h-[48px]"
//                     src="/images/security/qualified.svg"
//                     alt="star"
//                     width={36}
//                     height={10}
//                   />
//                   <p className="lg:text-[14px] xl:text-[18px] text-white">
//                     Pre-vetted, <br /> Qualified Staff
//                   </p>
//                 </div>
//                 <div className="mr-8 mt-0.5 flex flex-row">
//                   <Image
//                     className="mr-3 mt-1 mb-3 lg:w-[36px] lg:h-[36px] xl:w-[48px] xl:h-[48px]"
//                     src="/images/security/sransparent.svg"
//                     alt="star"
//                     width={36}
//                     height={10}
//                   />
//                   <p className="lg:text-[14px] xl:text-[18px] text-white">
//                     Transparent <br />
//                     Pricing Structure
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="flex w-[50%] h-full relative">
//             <img
//               className="w-full  lg:h-[60vh] xl:h-full lg:pt-24 xl:pt-32"
//               src="./images/hero/hom.webp"
//               alt="people"
//             />
//           </div>
//         </div>
//         <div className="">
//           <div className="relative inset-0 w-full">
//             <img
//               className="w-full lg:h-[55vh] xl:h-[70vh] object-cover"
//               src="./images/hero/gradient.webp"
//               alt="Banner Image"
//             />
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Hero;
