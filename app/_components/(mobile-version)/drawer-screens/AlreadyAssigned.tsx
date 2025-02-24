import Image from 'next/image';

const AlreadyAssigned = ({ jobData, setOpenDrawer }: any) => {
    const hourRate = jobData?.invite?.offered_price === 'default' ? jobData?.myWorkingDetails?.per_hours_rate : jobData?.invite?.offered_price;


    return (
        <div className="overflow-y-auto p-4 flex flex-col items-center gap-4" style={{ scrollbarWidth: 'none' }}>
            <p className='text-[20px] font-[400] leading-[30px] mb-2'>Event is assigned to</p>
            <div className='flex flex-row items-center justify-between w-full'>
                <div className='flex flex-row items-center gap-2'>
                    <Image
                        alt='assigned-person'
                        height={40}
                        width={40}
                        quality={100}
                        className="rounded-full"
                        src={jobData?.assigned_worker?.profile_pic}
                    />
                    <p className='text-[16px] font-[500] leading-[8px]'>{jobData?.assigned_worker?.full_name}</p>
                </div>
                <div className='flex flex-row items-center gap-2'>
                    <Image
                        alt='assigned-person'
                        height={17}
                        width={16}
                        quality={100}
                        className=""
                        src={'/images/mobile/talent/star.svg'}
                    />
                    <p className='text-[14px] font-[400] leading-[24px]'>{jobData?.assigned_worker?.rating}/5</p>
                </div>
            </div>
            <div className='bg-[#EBE6FF] h-[1px] w-full' />
            <div className='flex flex-row items-center justify-between w-full'>
                <p className='text-[14px] font-[600] leading-[8px]'>Offered rate</p>
                <p className='text-[20px] font-[500] leading-[24px]'>${hourRate}<span className='text-[12px] font-[400] leading-[20px]'>/h</span></p>
            </div>
            <div className='absolute bottom-20 bg-[#EBE6FF] h-[1px] w-full' />
            <button
                onClick={() => {
                    setOpenDrawer(false);
                }}
                className="fixed bottom-4 w-[12rem] bg-[#350ABC] py-[12px] text-[16px] font-[400] leading-[26px] text-[#e0d9f8] rounded-[4px]"
            >
                {"Done"}
            </button>
        </div >
    )
}

export default AlreadyAssigned
