// import React, { useEffect, useState } from 'react'
// import Image from 'next/image'
// import { montserrat, poppins } from '@/app/lib/Fonts';

// import { useRouter } from 'next/navigation';

// const Hero = () => {
//     const router = useRouter()
//     const [image1Loaded, setImage1Loaded] = useState(false);
//     const [image2Loaded, setImage2Loaded] = useState(false);
//     const [allImagesLoaded, setAllImagesLoaded] = useState(true); // Initially true
//     useEffect(() => {
//         // Check if both images have finished loading
//         if (image1Loaded && image2Loaded) {
//             setAllImagesLoaded(false);
//         }
//     }, [image1Loaded, image2Loaded]);

//     const handleImage1Load = () => {
//         setImage1Loaded(true);
//     };

//     const handleImage2Load = () => {
//         setImage2Loaded(true);
//     };

//     const handlePostJobClick = () => {
//         localStorage?.removeItem('selectedServiceId');
//         localStorage?.removeItem('selectedServiceName');
//         router.push('/staff/booking')
//     }
//     return (
//         <div className='xl:mt-[70px] lg:mt-[70px]'>

//             <main className="2xl:[80vh] xl:h-[93vh] lg:h-dvh md:h-dvh sm:h-dvh h-dvh flex flex-col justify-end items-center relative">
//                 {allImagesLoaded && (
//                     <div className="absolute inset-0 flex items-start justify-start bg-gray-100 bottom-[0px] animate-pulse z-[99999] margin">
//                         <div className="loader_hero"></div>
//                     </div>
//                 )}
//                 {!allImagesLoaded &&
//                     <div className={`${montserrat.className} font-[900] relative bottom-6 2xl:bottom-12 flex flex-col text-[#0B0B0B] justify-center items-center uppercase text-center 2xl:text-[110px] xl:text-[110px] lg:text-[100px] leading-[100px]`}>
//                         <h2 className='text-[#f5f5f5] lg:text-[180px] xl:text-[210px] relative z-[-1] top-[84px]'>TALENTS</h2>
//                         <h1 className='relative bottom-[11px] !text-[100px] !leading-[85px]'>Book <span className='text-[#350ABC] relative lg:leading-[70px] '>Event</span> <br /> <span className='text-[#350ABC]'>staff</span> in a snap</h1>
//                     </div>
//                 }
//                 <Image
//                     onLoadingComplete={handleImage1Load}
//                     layout="responsive"
//                     className='2xl:!h-[66.5%] xl:!h-[63.5%] lg:!h-[63.5%] md:!h-[63.5%] sm:!h-[63.5%] !h-[63.5%]'
//                     src="/background.svg"
//                     height={300}
//                     width={1500}
//                     alt="Background"
//                 />

//                 <div className="absolute z-50 flex flex-col items-center justify-center text-white text-lg  xl:md:max-w-[980px] lg:max-w-[900px]  md:max-w-[900px] 2xl:max-w-[1000px] m-auto">
//                     <div className='flex justify-center items-start gap-[14px] absolute bottom-[40px]'>
//                         <button
//                             onClick={handlePostJobClick}
//                             className={`${poppins.className} relative lg:py-[16px] 2xl:py-[20px] px-[90px] text-[#350ABC] hover:bg-[#350ABC] font-[400] leading-[26px] tracking-[-0.4px] text-[18px] bg-[#F3F0FF] rounded-[8px] border-[1px] border-[#774DFD] transform  active:scale-95 active:shadow-inner hover:text-[#fff] overflow-hidden`}
//                         >
//                             <span className="relative z-10">Book a Talent Now</span>
//                             <span className="red-overlay"></span>
//                         </button>

//                     </div>
//                     <Image
//                         quality={100}
//                         onLoadingComplete={handleImage2Load}
//                         layout="fixed"
//                         height={724}
//                         width={1294}
//                         className='2xl:max-w-[120%] xl:max-w-[85%]  2xl:h-[100%] xl:h-[58%] lg:max-w-[90%] lg:h-[55%] md:h-[60%] sm:h-[60%] h-[60%]'
//                         src="/images/hero/hero.webp"
//                         alt="Hero Image"
//                         priority={true}
//                     />
//                 </div>
//             </main>
//         </div>
//     )
// }

// export default Hero