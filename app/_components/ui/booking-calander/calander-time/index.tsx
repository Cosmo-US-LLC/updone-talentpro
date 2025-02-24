import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

const CalendarWithAvailability = dynamic(() => import('@/app/_components/common/Calander'), {
    ssr: false, // Do not SSR for this component
    loading: () => <><p className='flex justify-center items-center w-full'>Loading...</p></>, // Display loader while loading
});

const TimeAndCalander = ({
    date,
    setDate,
    setSelectedTimeId,
    scrollRef,
    scrollUp,
    scrollDown,
    setTimeMessage,
    setWorkingTimes,
    workingTimes
}: any) => {

    return (
        <div className={`flex gap-[45px] justify-start items-start `}>
            <div className={`h-[348px] w-[28rem]`}>
                <div className={`ml-5 w-full p-[10px] bg-[#fff] h-auto rounded-[8px]`} style={{
                    boxShadow: "0px 8px 26px 0px rgba(0, 0, 0, 0.07)",
                    border: "1px solid #f7f7f7"
                }}>
                    <Suspense fallback={<p className='w-full flex justify-center items-center'>Loading...</p>}>
                        <CalendarWithAvailability
                        setTimeMessage={setTimeMessage}
                            scrollUp={scrollUp}
                            scrollDown={scrollDown}
                        />
                    </Suspense>
                </div>
            </div>

        </div>
    );
}

export default TimeAndCalander;
