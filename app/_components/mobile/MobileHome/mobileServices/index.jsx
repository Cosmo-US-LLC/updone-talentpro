import React from 'react';
import Image from 'next/image';
import MobileServicesCard from './mobileServicesCard';

const MobileServices = () => {
    return (
        <div>
            <section className="max-w-full overflow-hidden relative px-[20px]">
            <div  className="space-y-[40px] pt-[40px]">
                        <div className="">
                            <h3 className="text-[#161616] text-center leading-[32px] tracking-[-1.04px] text-[20px] font-[500] tracking-tight">
                            What services are you looking for?
                            </h3>
                        </div>
                        <div>
                         <MobileServicesCard />
                        </div>
                    </div>
            </section>
        </div>
    );
};

export default MobileServices;
