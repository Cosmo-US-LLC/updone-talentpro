"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { setEmpty as setAuthEmpty } from '../lib/store/features/authSlice';
import { setEmpty as setJobEmpty } from '../lib/store/features/jobCreateSlice';
import { setEmpty as setBookingEmpty } from '../lib/store/features/bookingSlice';
import { setEmpty as setStaffEmpty } from '../lib/store/features/staffSlice';

const UnauthorizedPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const searchParams = useSearchParams();
    const role = searchParams.get('role');

    const handleGoHome = () => {
        router.push(process.env.NEXT_PUBLIC_BASE_URL || '/');
    };

    const emptyRedux = () => {
        // alert("Forcing signout")
        dispatch(setStaffEmpty())
        dispatch(setBookingEmpty())
        dispatch(setJobEmpty())
        dispatch(setAuthEmpty())
    }

    const renderMessage = () => {
        emptyRedux();

        if (role === 'talent') {
            return (
                <>
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Access Restricted</h1>
                    <p className="text-gray-600 mb-6">
                        As a Talent, you don't have the necessary permissions to view this page.
                        Please sign up for a Host account and log in. Or, head back to the homepage to explore other options.
                    </p>
                </>
            );
        } else if (role === 'host') {
            return (
                <>
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Oops! Access Denied</h1>
                    <p className="text-gray-600 mb-6">
                        As a Host, you don't have the necessary permissions to view this page.
                        Please sign up for a Talent account and log in. Or, head back to the homepage to explore other options.
                    </p>
                </>
            );
        } else {
            return (
                <>
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Oops! Access Denied</h1>
                    <p className="text-gray-600 mb-6">
                        You don’t have permission to access this page. Head back to the homepage and explore other options.
                    </p>
                </>
            );
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
            <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
                {renderMessage()}
                <button
                    onClick={handleGoHome}
                    className="bg-[#350ABC] hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-300"
                >
                    Go to Homepage
                </button>
            </div>
        </div>
    );
};

export default function WrappedUnauthorizedPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <UnauthorizedPage />
        </Suspense>
    );
}
