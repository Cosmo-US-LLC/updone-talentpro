"use client"
import React from "react";
import { SecurityItemTypes } from "@/app/lib/types";
import loadable from "@/app/_components/ui/lazy-load";
const SecurityItemLazy = loadable(() => import('./SecurityItem'));
interface SecurityItemListProps {
    items: SecurityItemTypes[];
}

const SecurityItemList: React.FC<SecurityItemListProps> = ({ items }) => {
    return (
        <div className='flex flex-col justify-evenly items-start m-auto h-full space-y-6'>
            {items.map((item, index) => (
                <React.Fragment key={index}>
                    <SecurityItemLazy
                        src={item.src}
                        alt={item.alt}
                        title={item.title}
                        description={item.description}
                    />
                    {index < items.length - 1 && (
                        <svg width="" height="1" viewBox="0 0 394 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0.5L393 0.500034" stroke="white" strokeLinecap="round" />
                        </svg>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

export default React.memo(SecurityItemList);
