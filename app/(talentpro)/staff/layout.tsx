'use client'
import React from 'react'
import { RootLayoutProps } from '../../lib/types';
import useIsMobile from '../../lib/hooks/useMobile';
import NavbarTalentPro from '@/components/layout/NavbarTalentPro';

const RootLayout = ({ children }: RootLayoutProps) => {
    const isMobile = useIsMobile();

    if (isMobile === true) {
        return (
            children
        )
    } else if (isMobile === false) {
        return (
            <div className='overflow-y-hidden'>
                {children}
            </div>
        )
    }
}

export default RootLayout
