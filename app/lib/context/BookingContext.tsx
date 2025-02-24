"use client"
import React, { createContext, useContext, useState, ReactNode, useRef } from 'react';
import { useAppSelector } from '../store/hooks';
import { selectStaff } from '../store/features/staffSlice';


const BookingContext = createContext<any | undefined>(undefined);

export const useBookingContext = () => {
    const context = useContext(BookingContext);
    if (context === undefined) {
        throw new Error('useBookingContext must be used within a BookingProvider');
    }
    return context;
};

// Create a provider component
export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { staff } = useAppSelector(selectStaff);
    const scrollRef = useRef<HTMLDivElement>(null);

    const scrollUp = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ top: -100, behavior: 'smooth' });
        }
    };

    const scrollDown = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ top: 100, behavior: 'smooth' });
        }
    };

    return (
        <BookingContext.Provider value={{ scrollRef, scrollDown, scrollUp, staff }}>
            {children}
        </BookingContext.Provider>
    );
};
