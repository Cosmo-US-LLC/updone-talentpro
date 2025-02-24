"use client"
import Image from 'next/image';
import { useRouter } from "next/navigation";

const JobGuideMobileScreen = ({ setStepInQuery }: any) => {
    const router = useRouter();

    return (
        <div className='bg-[#F9F7FF] min-h-dvh p-4 mb-20' style={{ scrollbarWidth: 'none' }}>
            <Image
                className='cursor-pointer'
                src='/images/mobile/x.svg'
                height={16}
                width={16}
                alt='x-icon'
                onClick={() => {
                    router.push(process.env.NEXT_PUBLIC_BASE_URL ?? '');
                }}
            />
            <div className="flex justify-start py-8">
                <p className="text-[23px] font-medium leading-[24px] underline">
                    4 Step To Hire The Best Talent
                </p>
            </div>
            <div className="text-center flex flex-col gap-[4rem]">
                {/* Step 1 */}
                <div className="flex flex-row gap-2">
                    <Image src='/images/gallery/job-guide/s1.svg' height={88} width={88} alt='step-1' />
                    <div className="text-left">
                        <h3 className="text-[16px] font-medium text-black leading-[24px] mb-1">1. Set your event's location</h3>
                        <p className="text-[14px] leading-[20px] font-medium text-[#6B6B6B]">Tell us where your event will take place. This will help us find the top talent in the vicinity.</p>
                    </div>
                </div>
                {/* Step 2 */}
                <div className="flex flex-row gap-2">
                    <div className="text-left">
                        <h3 className="text-[16px] font-medium text-black leading-[24px] mb-1">2. Pick a date and time</h3>
                        <p className="text-[14px] leading-[20px] font-medium text-[#6B6B6B]">Let us know when your event is happening.</p>
                    </div>
                    <Image src='/images/gallery/job-guide/s2.svg' height={88} width={88} alt='step-2' />
                </div>
                {/* Step 3 */}
                <div className="flex flex-row gap-2">
                    <Image src='/images/gallery/job-guide/s3.svg' height={88} width={88} alt='step-3' />
                    <div className="text-left">
                        <h3 className="text-[16px] font-medium text-black leading-[24px] mb-1">3. Describe the service you need</h3>
                        <p className="text-[14px] leading-[20px] font-medium text-[#6B6B6B]">Share details of the event and select the service you need. Our Talent prefers to come well prepared to provide top-notch service.</p>
                    </div>
                </div>
                {/* Step 4 */}
                <div className="flex flex-row gap-2">
                    <div className="text-left">
                        <h3 className="text-[16px] font-medium text-black leading-[24px] mb-1">4. Send invites to talent</h3>
                        <p className="text-[14px] leading-[20px] font-medium text-[#6B6B6B]">Invite the best talent for your event and get offers from them. You can hire a talent from the received offers.</p>
                    </div>
                    <Image src='/images/gallery/job-guide/s4.svg' height={88} width={88} alt='step-4' />
                </div>
            </div>
            <div className="flex justify-center">
                <div
                    style={{ boxShadow: '0 -8px 12px rgba(0, 0, 0, 0.1)' }}
                    className='fixed bottom-0 z-[9999] bg-[white] flex flex-row w-full h-20 rounded-t-2xl items-center justify-center border-[black]'>
                    <button
                        onClick={() => {
                            const queryParams = new URLSearchParams(window.location.search);
                            if (!queryParams.get('step')) {
                                setStepInQuery('event-location');
                                queryParams.set('step', 'event-location');
                                router.replace(`${window.location.pathname}?${queryParams.toString()}`);
                            }
                        }}
                        className="w-[12rem] bg-[#350ABC] py-[12px] text-[16px] font-[400] leading-[26px] text-[#e0d9f8] rounded-[4px]"
                    >
                        Post your event now!
                    </button>
                </div>
            </div>
        </div>
    )
}

export default JobGuideMobileScreen;