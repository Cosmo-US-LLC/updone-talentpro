import { useRouter } from 'next/navigation';
import React from 'react'

const Congratulations = ({ setDrawerOpen, drawerOpen }: any) => {
    const router = useRouter();
    const actions = ["View offers from talent.", "Talk to talent.", "Hire the best talent.", "Manage payements."];

    const handleGoToHome = () => {
        // setDrawerOpen(!drawerOpen);
        router.push(process.env.NEXT_PUBLIC_BASE_URL ?? '');
    }

    return (
        <div className="overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
            <img
                src="/images/mobile/congrat_bg.svg"
                className="h-[60%] w-full z-[-1] fixed top-[90px]"
                alt=""
            />
            <div className="flex items-center justify-center">
                <div className="flex flex-col items-center px-4 gap-[1rem]">
                    <img
                        src="/images/mobile/congratulations.svg"
                        className="h-24 w-24"
                        alt=""
                    />
                    <p className="text-[#0C9000] text-[14px] font-[400] leading-[24px]">Congratulations!</p>
                    <div className="flex flex-row items-center justify-center gap-2">
                        <p className="text-[black] text-[20px] font-[500] leading-[24px]">Your Event is live on</p>
                        <img
                            src="/images/mobile/updone_logo.svg"
                            className="h-16 w-16"
                            alt=""
                        />
                    </div>
                    <div className="text-left">
                        <p className="text-[black] text-[14px] font-[400] leading-[24px] mb-2">Please check your email and visit your <b>ClientHub</b> on desktop to:</p>
                        {
                            actions.map((action, index) => {
                                return (
                                    <div key={index} className="flex flex-row items-center text-left gap-2">
                                        <img
                                            src="/images/mobile/check-black.svg"
                                            className="h-[16px] w-[16px]"
                                            alt=""
                                        />
                                        <p className="italic font-[400] text-[14px] leading-[24px]">{action}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="border border-1 border-[#FEEC99] rounded-[4px] flex flex-row items-center justify-between gap-4 bg-[#FEF5E8] h-[114px] mt-[1dvh] p-4">
                        <img
                            src="/images/mobile/device.svg"
                            className="h-[43px] w-[74px]"
                            alt=""
                        />
                        <p className="text-[#6B6B6B] italic text-[14px] font-[400] leading-[24px] mb-2">We are working relentlessly to release <b>ClientHub</b> on cellphone and bring event management at your fingertips.</p>
                        <img
                            src="/images/mobile/info.svg"
                            className="h-[16px] w-[16px] self-start"
                            alt=""
                        />
                    </div>
                    <div className="absolute bottom-2 flex justify-center items-center gap-4">
                        <button onClick={handleGoToHome} className="rounded-[4px] py-[10px] px-4 w-full text-[white] bg-[#350ABC]">Back to home</button>
                    </div>
                    {
                        <div
                            style={{ boxShadow: '0 -8px 12px rgba(0, 0, 0, 0.1)' }}
                            className='fixed bottom-0 z-[9999] bg-[white] flex flex-row w-full h-20 rounded-t-2xl items-center justify-center border-[black]'>
                            <button
                                onClick={handleGoToHome}
                                className="w-[12rem] bg-[#350ABC] py-[12px] text-[16px] font-[400] leading-[26px] text-[#e0d9f8] rounded-[4px]"
                            >
                                Back to home
                            </button>
                        </div>
                    }
                </div>

            </div>
        </div>
    )
}

export default Congratulations
