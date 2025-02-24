'use client'
import React, { ReactNode } from 'react'

interface SettlementsLayoutProps {
    children: ReactNode;
}
const SettlementsLayout = ({ children }: SettlementsLayoutProps) => {

    return (
        <div className={`${"mt-[133px] relative z-10"}`}>
            {children}
        </div>
    )
}

export default SettlementsLayout
