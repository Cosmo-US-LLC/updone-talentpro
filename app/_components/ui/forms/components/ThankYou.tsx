import { montserrat } from '@/app/lib/Fonts'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ThankYou = () => {
  return (
    <main className="h-screen flex flex-col justify-start items-center">
    {/* Add your content here */}
    <div className="absolute flex items-start justify-center text-white max-w-[1279px] mx-auto w-full h-auto ">
        <div style={{ width: "50%" }} className='h-full'>
            <section>
                <div>
                    <Image layout="intrinsic" src="/images/thankyou/tick.svg" height={100} width={100} alt="tick" />
                </div>
                <div>
                    <h2 className={`${montserrat.className} font-[600] text-[54px] leading-[65.83px] translate-[-2%] text-[#000000] text-start mt-[16px]`}>Booking Confirmed Successfully!</h2>
                    <p className={`font-[400] text-[18px] leading-[36px] translate-[-2%] text-[#6B6B6B] text-start mt-[32px]`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vestibulum sed arcu non odio. Posuere soll.</p>
                    <Link href={process.env.NEXT_PUBLIC_BASE_URL || '/'} className="text-[#dfdbec] bg-[#350ABC] mt-[42px]  rounded-[4px] text-[16px] font-[400] px-[65px] h-[48px] py-[14px] text-center inline-flex items-center ">
                        <span className='mr-2'>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.666 8H3.33268" stroke="#F3F0FF" stroke-width="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M8 3.3335L3.33333 8.00016L8 12.6668" stroke="#F3F0FF" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>

                        </span>

                        Return to Home Page
                    </Link>
                </div>

            </section>
        </div>
        <div style={{ width: "50%" }} className=' h-[100vh]'>
            <div className='bg-[#FFFFFF] h-[110px] rounded-[8px] max-w-[460px] m-auto' style={{ boxShadow: '0px 8px 26px 0px rgba(0, 0, 0, 0.08)', marginRight: '0' }}>
                <div className='flex justify-between  items-start pb-[29px] px-[41.5px] pt-[17px] m-auto'>
                    <div>
                        <h3 className={`${montserrat.className} text-[40px] leading-[48.76px] tracking-[-2%] text-[#000000] font-[700]`}>$260</h3>
                        <p className={` text-[16px] leading-[24px] tracking-[-1%] text-[#6B6B6B] font-[400]`}>Payment Successful.</p>
                    </div>
                    <div>
                        <svg width="79" height="78" viewBox="0 0 79 78" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="39.5" cy="39" r="39" fill="#F8F6FF" />
                            <circle cx="39" cy="39" r="28" fill="#EBE6FF" />
                            <path d="M36.107 50C39.2208 41.2 47.9997 31.6667 52 28C43.6968 30.3294 37.945 38.6765 36.107 42.5588L31.2418 36.4118C28.2949 35.8311 27.0674 38.1163 27.0027 39.5266C26.99 39.8036 27.1811 40.0323 27.4114 40.1867C29.3402 41.4803 34.0965 47.0921 36.107 50Z" fill="#350ABC" />
                        </svg>

                    </div>
                </div>
                <div className='w-[103.5%]'>
                    <div className='relative right-[6px] z-10'>
                        <span className='text-black '>
                            <svg width="463" height="425" className='w-full' viewBox="0 0 463 425" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g filter="url(#filter0_b_944_2088)">
                                    <path d="M0 8C0 3.58172 3.58172 0 8 0H455C459.418 0 463 3.58171 463 7.99999V420.151C463 422.829 460.829 425 458.151 425C455.473 425 453.37 422.787 452.631 420.213C450.445 412.595 443.17 407 434.532 407C425.516 407 417.985 413.095 416.175 421.223C415.718 423.275 414.057 425 411.955 425C409.853 425 408.192 423.275 407.735 421.223C405.926 413.095 398.394 407 389.379 407C380.363 407 372.832 413.095 371.022 421.223C370.566 423.275 368.904 425 366.802 425C364.7 425 363.039 423.275 362.582 421.223C360.773 413.095 353.242 407 344.226 407C335.21 407 327.679 413.095 325.869 421.223C325.413 423.275 323.752 425 321.649 425C319.547 425 317.886 423.275 317.429 421.223C315.62 413.095 308.089 407 299.073 407C290.057 407 282.526 413.095 280.717 421.223C280.26 423.275 278.599 425 276.496 425C274.394 425 272.733 423.275 272.276 421.223C270.467 413.095 262.936 407 253.92 407C244.904 407 237.373 413.095 235.564 421.223C235.107 423.275 233.446 425 231.344 425C229.241 425 227.58 423.275 227.124 421.223C225.314 413.095 217.783 407 208.767 407C199.751 407 192.22 413.095 190.411 421.223C189.954 423.275 188.293 425 186.191 425C184.089 425 182.427 423.275 181.971 421.223C180.161 413.095 172.63 407 163.614 407C154.599 407 147.067 413.095 145.258 421.223C144.801 423.275 143.14 425 141.038 425C138.936 425 137.275 423.275 136.818 421.223C135.008 413.095 127.477 407 118.461 407C109.446 407 101.915 413.095 100.105 421.223C99.648 423.275 97.9869 425 95.8848 425C93.7827 425 92.1216 423.275 91.6647 421.223C89.8551 413.095 82.324 407 73.3083 407C64.2927 407 56.7616 413.095 54.9519 421.223C54.4951 423.275 52.834 425 50.7319 425C48.6298 425 46.9687 423.275 46.5118 421.223C44.7021 413.095 37.1711 407 28.1554 407C19.4606 407 12.1466 412.669 10.0138 420.363C9.32145 422.861 7.2842 425 4.69257 425C2.10093 425 0 422.899 0 420.307V8Z" fill="url(#paint0_linear_944_2088)" />
                                    <path d="M0.5 8C0.5 3.85786 3.85786 0.5 8 0.5H455C459.142 0.5 462.5 3.85785 462.5 7.99999V420.151C462.5 422.553 460.553 424.5 458.151 424.5C455.772 424.5 453.812 422.517 453.111 420.075C450.862 412.237 443.386 406.5 434.532 406.5C425.291 406.5 417.55 412.749 415.687 421.115C415.267 423.004 413.761 424.5 411.955 424.5C410.149 424.5 408.644 423.004 408.223 421.115C406.361 412.749 398.62 406.5 389.379 406.5C380.138 406.5 372.397 412.749 370.534 421.115C370.114 423.004 368.608 424.5 366.802 424.5C364.996 424.5 363.491 423.004 363.07 421.115C361.208 412.749 353.467 406.5 344.226 406.5C334.985 406.5 327.244 412.749 325.381 421.115C324.961 423.004 323.455 424.5 321.649 424.5C319.844 424.5 318.338 423.004 317.917 421.115C316.055 412.749 308.314 406.5 299.073 406.5C289.832 406.5 282.091 412.749 280.229 421.115C279.808 423.004 278.302 424.5 276.496 424.5C274.691 424.5 273.185 423.004 272.764 421.115C270.902 412.749 263.161 406.5 253.92 406.5C244.679 406.5 236.938 412.749 235.076 421.115C234.655 423.004 233.149 424.5 231.344 424.5C229.538 424.5 228.032 423.004 227.612 421.115C225.749 412.749 218.008 406.5 208.767 406.5C199.526 406.5 191.785 412.749 189.923 421.115C189.502 423.004 187.997 424.5 186.191 424.5C184.385 424.5 182.879 423.004 182.459 421.115C180.596 412.749 172.855 406.5 163.614 406.5C154.373 406.5 146.632 412.749 144.77 421.115C144.349 423.004 142.844 424.5 141.038 424.5C139.232 424.5 137.726 423.004 137.306 421.115C135.443 412.749 127.702 406.5 118.461 406.5C109.22 406.5 101.479 412.749 99.6168 421.115C99.1961 423.004 97.6907 424.5 95.8848 424.5C94.0789 424.5 92.5735 423.004 92.1528 421.115C90.2903 412.749 82.5493 406.5 73.3083 406.5C64.0674 406.5 56.3264 412.749 54.4639 421.115C54.0431 423.004 52.5377 424.5 50.7319 424.5C48.926 424.5 47.4206 423.004 46.9999 421.115C45.1373 412.749 37.3964 406.5 28.1554 406.5C19.2428 406.5 11.7266 412.313 9.53193 420.23C8.87735 422.591 6.98573 424.5 4.69257 424.5C2.37708 424.5 0.5 422.623 0.5 420.307V8Z" stroke="#F7F7F7" />
                                </g>
                                <defs>
                                    <filter id="filter0_b_944_2088" x="-8" y="-8" width="479" height="441" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                        <feGaussianBlur in="BackgroundImageFix" stdDeviation="4" />
                                        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_944_2088" />
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_944_2088" result="shape" />
                                    </filter>
                                    <linearGradient id="paint0_linear_944_2088" x1="0" y1="0" x2="366.363" y2="496.332" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="white" stopOpacity="0.88" />
                                        <stop offset="0.453985" stopColor="white" stopOpacity="0.6" />
                                        <stop offset="0.975" stopColor="white" stopOpacity="0.88" />
                                    </linearGradient>
                                </defs>
                            </svg>

                        </span>
                        <div className='text-black absolute top-0'>
                            <div className='h-[146px] w-full mt-[36px] flex flex-col justify-start items-center mb-[30px] pb-[81px] py-[44px] px-[20px]' style={{ margin: '0px' }}>
                                <div className='flex justify-between items-center w-[94%]'>
                                    <h3 className={`${montserrat.className} text-[16px] font-[500] leading-[14.63px] tracking-[-1%] text-[#000000]`}>Worker Name:</h3>
                                    <div className="flex items-center justify-center">
                                        <div className='relative bottom-[1px]'>

                                            <Image width={15} height={15} className='me-1' src='/images/booking/5.svg' alt='step-1' />
                                        </div>
                                        <p><span className={`${montserrat.className} text-[14px] font-[600] leading-normal tracking-[-0.14px] text-[#000000]`}>Sarah Miller</span> <span className="text-[12px] font-[400] leading-[24px] tracking-[-0.24px] text-[#000000] ml-[12px]">5.0/5</span> </p>
                                    </div>
                                </div>
                                <span className='my-[24px] w-full'>
                                    <svg width="438" height="1" viewBox="0 0 438 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <line x1="0.5" y1="0.5" x2="437.5" y2="0.5" stroke="#DEDEDE" strokeLinecap="round" />
                                    </svg>
                                </span>

                                <div className='flex justify-between items-center w-[94%]'>
                                    <h3 className={`${montserrat.className} text-[16px] font-[500] leading-[14.63px] tracking-[-1%] text-[#000000]`}>Booked Service:</h3>
                                    <div className="flex items-center justify-center">
                                        <p className={` flex justify-center items-center gap-2 text-[14px] font-[400] leading-[24px] tracking-[-0.24px] text-[#6B6B6B]`}><span><svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 3.5H2C1.44772 3.5 1 3.94772 1 4.5V9.5C1 10.0523 1.44772 10.5 2 10.5H10C10.5523 10.5 11 10.0523 11 9.5V4.5C11 3.94772 10.5523 3.5 10 3.5Z" stroke="#6B6B6B" stroke-width="0.646154" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M8 10.5V2.5C8 2.23478 7.89464 1.98043 7.70711 1.79289C7.51957 1.60536 7.26522 1.5 7 1.5H5C4.73478 1.5 4.48043 1.60536 4.29289 1.79289C4.10536 1.98043 4 2.23478 4 2.5V10.5" stroke="#6B6B6B" stroke-width="0.646154" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        </span> Cocktail Server</p>
                                    </div>
                                </div>
                                <span className='my-[24px] w-full'>
                                    <svg width="438" height="1" viewBox="0 0 438 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <line x1="0.5" y1="0.5" x2="437.5" y2="0.5" stroke="#DEDEDE" strokeLinecap="round" />
                                    </svg>
                                </span>

                                <div className='flex justify-between items-center w-[94%]'>
                                    <h3 className={`${montserrat.className} text-[16px] font-[500] leading-[14.63px] tracking-[-1%] text-[#000000]`}>Total Paid Amount:</h3>
                                    <div className="flex items-center justify-center">
                                        <p className={`text-[14px] font-[400] leading-[24px] tracking-[-0.24px] text-[#6B6B6B]`}>$260</p>
                                    </div>
                                </div>
                                <span className='my-[24px] w-full'>
                                    <svg className='w-full' width="238" height="1" viewBox="0 0 438 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <line x1="0.5" y1="0.5" x2="437.5" y2="0.5" stroke="#DEDEDE" strokeLinecap="round" />
                                    </svg>
                                </span>

                                <div className='flex justify-between items-center w-[94%]'>
                                    <h3 className={`${montserrat.className} text-[16px] font-[500] leading-[14.63px] tracking-[-1%] text-[#000000]`}>Event Details:</h3>
                                    <div className="flex items-center justify-center">
                                        <p className={`text-[14px] font-[400] leading-[24px] tracking-[-0.24px] text-[#6B6B6B]`}>3796 Stutler Lane, Altoona, PA, 16601</p>
                                    </div>
                                </div>
                                <span className='my-[24px] w-full'>
                                    <svg className='w-full' width="238" height="1" viewBox="0 0 438 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <line x1="0.5" y1="0.5" x2="437.5" y2="0.5" stroke="#DEDEDE" strokeLinecap="round" />
                                    </svg>
                                </span>
                                <div className='flex justify-between items-center w-[94%]'>
                                    <h3 className={`${montserrat.className} text-[16px] font-[500] leading-[14.63px] tracking-[-1%] text-[#000000]`}>Contact:</h3>
                                    <div className="flex items-center justify-center">
                                        <p className={`text-[14px] font-[400] leading-[24px] tracking-[-0.24px] text-[#6B6B6B]`}>3796 Stutler Lane, Altoona, PA, 16601</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-[-53px] z-[0] right-[-300px] text-black">
                <svg width="733" height="602" viewBox="0 0 733 502" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.3" filter="url(#filter0_f_944_2073)">
                        <circle cx="366.5" cy="366.5" r="166.5" fill="#FCE1C8" />
                    </g>
                    <defs>
                        <filter id="filter0_f_944_2073" x="0" y="0" width="733" height="733" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur_944_2073" />
                        </filter>
                    </defs>
                </svg>

            </div>

        </div>
    </div>
</main>
  )
}

export default ThankYou
