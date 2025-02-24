import { selectBookingActive } from '@/app/lib/store/features/bookingSlice';
import Image from 'next/image'
import React from 'react'
import { useSelector } from 'react-redux';
interface FormNavProps{
    steps:Array<any>
    currentStep:any;
    changeActiveColor:any;
    setChangeActiveColor:(arg:boolean)=>void
}
const FormNav = ({steps,currentStep,changeActiveColor,setChangeActiveColor}:FormNavProps) => {
    const bookingActive = useSelector(selectBookingActive);

    return (
        <>
            {/* steps */}
            <nav aria-label='Progress' className='relative left-6 z-[1]'>
                <ol role='list' className={`flex space-x-4 justify-center items-center ${!bookingActive &&  "mt-[60px]"}  max-w-[940px] m-auto`}>
                    {steps.map((step, index) => (
                        <li key={step.name} className='flex-1 gap-4'>
                            {currentStep > index ? (
                                <div className='flex justify-start items-center gap-4'>

                                    <div className='flex justify-center items-center'>
                                        <span className='relative top-[6px] left-[16px] text-[16px] font-[500] text-sky-600'>
                                            {step.image}
                                        </span>
                                        <div className='flex flex-col'>
                                            <span className='mb-[15px] text-[18px] font-[500] leading-[20.4px] text-[#000000] tracking-[-0.28px]'>
                                                {step.id}
                                            </span>
                                            <span className='absolute mt-5 text-[#6B6B6B] text-sm mb-[15px] text-[16px] font-[400] leading-[28px] font-[Poppins] tracking-[-0.11px]'>{step.name}</span>
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            width: changeActiveColor ? "176px" : " 190px",
                                            position: "absolute",
                                            marginLeft: changeActiveColor && step.name==="Find your best fit worker" ? "200px" :  step.name === "Describe your event" ? '195px' : "179px"
                                        }}
                                        className='flex w-full flex-row justify-start text-[16px] font-[500] items-center border-l-[1px] border-[#000000] opacity-[0.3px] py-2 pl-4 md:border-l-0 md:border-t-[1px] md:pb-0 md:pl-0 md:pt-4'
                                        aria-current='step'
                                    >
                                        
                                    </div>
                                </div>
                            ) : currentStep === index ? (
                                <div className='flex justify-start items-center gap-4'>

                                    <div className='flex justify-center items-center'>
                                        <span className='relative top-[6px] left-[16px]  text-[18px] font-[500] text-sky-600'>
                                            {
                                                step.name === "Find best fit worker and invite them" ?
                                                    <Image style={{ maxWidth: "80px" }} width={500} height={500} src='/images/stepBlue2.svg' alt='step-1' /> :
                                                    step.name === "Post your event and receive offers" && !changeActiveColor ? (
                                                        <>
                                                            {setChangeActiveColor(true)}
                                                            <Image style={{ maxWidth: "90px" }} width={500} height={500} src='/images/step1.svg' alt='step-1' />
                                                        </>
                                                    ) :
                                                        step.image
                                            }

                                        </span>
                                        <div className='flex flex-col'>
                                            <span className='mb-[15px] text-[18px] font-[500] leading-[20.4px] text-[#000000] tracking-[-0.28px]'>
                                                {step.id}
                                            </span>
                                            <span className='absolute mt-5 text-[#6B6B6B] mb-[15px] text-[16px] font-[400] leading-[28px]  tracking-[-0.11px]'>{step.name}</span>
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            width: "184px",
                                            position: "absolute",
                                            marginLeft: step.name === "Find best fit worker and invite them" ? '200px' : '200px'
                                        }}
                                        className={changeActiveColor ? "" : 'flex w-full flex-row justify-start items-center border-l-[1px] text-[16px] font-[400] border-[#000000] opacity-[0.3px] py-2 pl-4 md:border-l-0 md:border-t-[1px] md:pb-0 md:pl-0 md:pt-4'}
                                        aria-current='step'
                                    >

                                    </div>
                                </div>
                            ) : step.name === 'Post your event and receive offers' ? (
                                <div  className='ml-[25px] flex justify-start items-center'>
                                    <span className='relative top-[6px] left-[16px]  text-sm font-medium text-sky-600'>
                                        {
                                            step.image
                                        }
                                    </span>
                                    <div className='flex flex-col' >
                                        <span className='mb-[15px] text-[#b0b0b2] text-[18px] font-[500] leading-[20.4px] tracking-[-0.28px]'>
                                            {step.id}
                                        </span>
                                        <span className='absolute mt-5 text-[#cfcfd2] text-[16px] font-[400] leading-[24px] tracking-[-0.1px]'>{step.name}</span>
                                    </div>
                                </div>
                            ) : <div className='flex justify-start items-center gap-4'>

                                <div  className='flex justify-start items-center'>
                                    <span className='relative top-[6px] left-[16px]  text-sm font-medium text-sky-600'>
                                        {step.image}
                                    </span>
                                    <div className='flex flex-col' >
                                        <span className='mb-[15px] text-[#b0b0b2] text-[18px] font-[500] leading-[20.4px] tracking-[-0.28px]'>
                                            {step.id}
                                        </span>
                                        <span className='absolute mt-5 text-[#cfcfd2] text-[16px] font-[400] leading-[24px] tracking-[-0.1px]'>{step.name}</span>
                                    </div>
                                </div>
                                <div
                                    style={{
                                        width: "184px",
                                        position: "absolute",
                                        marginLeft: '202px'
                                    }}
                                    className='flex w-full flex-row justify-start items-center border-l-[1px] border-[#b0b0b2] opacity-[0.3px]  py-2 pl-4 md:border-l-0 md:border-t-[1px] md:pb-0 md:pl-0 md:pt-4'
                                    aria-current='step'
                                >

                                </div>
                            </div>}
                        </li>
                    ))}
                </ol>
            </nav>
        </>
    )
}

export default FormNav
