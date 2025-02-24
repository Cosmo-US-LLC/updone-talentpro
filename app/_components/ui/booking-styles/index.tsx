"use client"
import Image from 'next/image'
import React from 'react'

const BookingStyle = () => {
    return (
        <>
            {/* Top Left */}
            <div className='absolute z-[-1] top-[-130px] left-[-299px]'>
                <Image width={878} height={825} src='/images/booking/topLeft.svg' alt='step-1' />
            </div>
            {/* Top Right */}
            <div className='absolute z-[-1] top-[-262px] right-[-82px]'>
                <Image width={950} height={889} src='/images/booking/topRight.svg' alt='step-1' />
            </div>
            {/* Bottom Left */}
            {/* <div className='absolute z-[-1] bottom-[-230px] left-[-72px] '>
                <Image width={920} height={652} src='/images/booking/bottomLeft.svg' alt='step-1' />
            </div> */}

            {/* Bottom Center */}
            {/* <div className='absolute z-[-1] bottom-[-170px] left-1/2 transform -translate-x-1/2 '>
                <Image width={997} height={933} src='/images/booking/bottomCenter.svg' alt='step-1' />
            </div> */}
        </>
    )
}

export default React.memo(BookingStyle);
