import Image from "next/image";

const EmptyChatBox = () => {
    return (
        <div className="w-full flex flex-col gap-2 items-center justify-center rounded-xl">
            <Image
                width={100}
                height={97}
                className=""
                src="/images/client-portal/event-details/no_chat.svg"
                alt="no_chat"
            />
            <p className="text-[#B8A3FB] font-[600] text-[16px] leading-[30px] md:text-[12px] md:leading-[20px]">
            {/* <p className="text-[#B8A3FB] font-[600] text-[16px] leading-[30px]"> */}
                Select offer to view chat
            </p>
        </div>
    )
}
export default EmptyChatBox;
