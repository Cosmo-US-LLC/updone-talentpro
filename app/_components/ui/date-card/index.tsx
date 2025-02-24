import React from 'react';

const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    return { month, day };
};

const DateCard = ({ date }: any) => {
    const { month, day } = formatDate(date);

    return (
        <div className="flex flex-col items-center justify-center w-28 h-28 rounded-[8px] border-[2px] border-[#F7F5FF]">
            <div className="bg-[#F7F5FF] text-[18px] font-medium w-full text-center py-2 rounded-t-lg">
                {month}
            </div>
            <div className="flex items-center justify-center text-black text-[32px] font-bold h-full">
                {day}
            </div>
        </div>
    );
};

export default DateCard;
