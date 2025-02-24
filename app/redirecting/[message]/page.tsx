"use client"
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { useSearchParams } from 'next/navigation'

const Page = () => {
    const params = useParams();
    const router = useRouter();
    const searchParams = useSearchParams()

    const handleGoClientHub = () => {
        if (params?.message === 'accessDenied') {
            router.push(process.env.NEXT_PUBLIC_BASE_URL ? `${process.env.NEXT_PUBLIC_BASE_URL}/events` : '/');
        } else {
            if (searchParams.get("job_id")) {
                router.push(`/events/detail/${searchParams.get("job_id")}`);
            } else {
                router.push(`/events`);
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
            <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
                {
                    params?.message === 'accessDenied' ?
                        <>
                            <h1 className="text-3xl font-bold text-gray-800 mb-4">Oops! Access Denied</h1>
                            <p className="text-gray-600 mb-6">
                                You don’t have permission to access this page. Head back to the homepage and explore other options.
                            </p>
                        </> :
                        <>
                            <h1 className="text-3xl font-bold text-gray-800 mb-4">We've improved experience for you!</h1>
                            <p className="text-gray-600 mb-6">
                                Welcome to Updone Client Hub, one place to manage all your events.
                            </p>
                        </>

                }
                <button
                    onClick={handleGoClientHub}
                    className="bg-[#350ABC] hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-300"
                >
                    Go to Client Hub
                </button>
            </div>
        </div>
    );
};

export default Page;
