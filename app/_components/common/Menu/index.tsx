// CommonDropdown.tsx
import Image from 'next/image';
import React, { ReactNode, useEffect, useRef } from 'react';

interface MenuItemProps {
    itemNames?: string[];
    isOpen?: boolean;
    handleSelect?: (arg: string) => void;
    selectedItem?: string | null;
    isLocation?: boolean;
    onCloseDropdown?: () => void; // Callback to close dropdown
    children?: ReactNode;
    isCalander?: boolean
}

const CommonDropdown: React.FC<MenuItemProps> = ({
    isOpen,
    itemNames,
    handleSelect,
    selectedItem,
    isLocation,
    onCloseDropdown,
    children,
    isCalander
}) => {
    const dropdownRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isOpen &&
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                // Click occurred outside the dropdown, so close it
                onCloseDropdown?.();
            }
        };

        // Add event listener when the dropdown is open
        document.addEventListener('mousedown', handleClickOutside);

        // Clean up the event listener on component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onCloseDropdown]);

    return (
        <>
            {isOpen && (
                <div
                    ref={dropdownRef}
                    className={`${isLocation ? 'space-y-[28px] h-[355px] left-[-20px]' : isCalander ? "mt-[60px] h-[455px]  left-[-10px] " : 'space-y-[18px]  left-0'}  bg-[#FFF] ${isCalander ? "w-auto" : "w-[260px]"} absolute min-h-[340px] rounded-[4px]`}
                    style={{
                        boxShadow:
                            '0px 10px 26px 0px rgba(0, 0, 0, 0.10)',
                    }}
                >
                    <div className={`${isCalander ? "pt-[20px] pb-[20px] pr-[20px] pl-[20px]" : "pt-[12px] px-[12px]"}`}>
                        {isCalander && children}
                        {isLocation && (
                            <div className='relative'>
                                <span className='absolute left-3 top-1/2 transform -translate-y-1/2'>
                                    <Image
                                        width={18}
                                        height={18}
                                        src={'/images/hero/mapsearch.svg'}
                                        alt='map'
                                    />
                                </span>
                                <input
                                    type='text'
                                    style={{
                                        boxShadow:
                                            '0px 2px 12px 0px rgba(140, 82, 255, 0.08)',
                                        outline: 'none',
                                    }}
                                    className='bg-[#FFF] my-[8px] border-[1px] border-[#EFE7FF] rounded-[4px]  w-full py-[3px]'
                                />
                            </div>
                        )}
                        {itemNames?.map((itemName) => (

                            <div
                                key={itemName}
                                className={`flex justify-between items-center w-full ${isLocation ? "py-[12px]" : "py-[9px]"} px-[10px] border-b-[.5px] border-[#F1EAFF] ${selectedItem === itemName
                                    ? 'bg-[#F3F0FF] border-b-[#D4BFFF] border-[0.5px]'
                                    : ''
                                    }`}
                                onClick={() => handleSelect?.(itemName)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div
                                    className={` ${selectedItem === itemName
                                        ? 'text-[#350ABC] flex justify-start items-center  gap-[15px]'
                                        : isLocation
                                            ? 'text-[#1D1D1D] flex justify-start items-center gap-[15px] text-[12px] font-[500] leading-normal'
                                            : 'text-[#595959]'
                                        } tracking-[-0.24px] leading-[24px] font-[400] text-[12px]`}
                                >
                                    {isLocation && (
                                        <span>
                                            <Image
                                                width={12}
                                                height={12}
                                                src={
                                                    '/images/hero/map.svg'
                                                }
                                                alt='map'
                                            />
                                        </span>
                                    )}
                                    {itemName}
                                </div>
                                {selectedItem === itemName && (
                                    <Image
                                        width={12}
                                        height={12}
                                        src={'/images/hero/tick.svg'}
                                        alt='tick'
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                    <div className={`flex ${isCalander ? "justify-end gap-[13px]" : 'justify-between'} items-center py-[11px] px-[21px] w-full bg-[#F3F0FF] absolute bottom-0`}>
                        <button className='border-[#595959] border rounded-[4px] px-[50px] py-[3px] text-[12px] font-[400] w-[93.5px] leading-[24px] tracking-[-0.24px] flex justify-center items-center text-[#595959]'>
                            Reset
                        </button>
                        <button className='border-[#2C2240] border rounded-[4px] px-[50px] py-[3px] text-[12px] w-[93.5px] font-[400] leading-[24px] tracking-[-0.24px] bg-[#2C2240] flex justify-center items-center text-center text-[#F3F0FF]'>
                            Confirm
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default CommonDropdown;
