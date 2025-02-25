"use client"

import JobDetailWorker from '@/app/_components/booking/worker/JobDetail'
import BookingStyles from '@/app/_components/ui/booking-styles'
import Header from '@/app/_components/ui/header'
import loadable from '@/app/_components/ui/lazy-load'
// import Loader from '@/app/_components/ui/loader'
import { selectAuth } from "@/app/lib/store/features/authSlice"
import { useAppSelector } from "@/app/lib/store/hooks"
import { Suspense, useEffect, useState } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { setJobData, setJobId } from "@/app/lib/store/features/staffSlice";
import { useDispatch, useSelector } from "react-redux";
import Footer from '@/app/_components/ui/footer'
import { apiRequest } from '@/app/lib/services'
import MyModal from '@/app/_components/common/modal/Modal'
import Image from 'next/image'
import { montserrat } from '@/app/lib/Fonts'
import { RiRecycleLine } from 'react-icons/ri'
import { Loader } from '@/app/_components/ui/dashboard-loader';
import { useError } from '@/app/lib/context/ErrorProvider'
import useIsMobile from '@/app/lib/hooks/useMobile'
import TalentMobile from '@/app/_components/booking/mobile/talent'
import NavbarTalentPro from '@/components/layout/NavbarTalentPro'

const JobDetail = loadable(() => import('@/app/_components/booking/job-detail'), { loading: () => <Loader /> });

const page = () => {
    const params = useParams();
    const { auth: storedData } = useAppSelector(selectAuth);
    const [isWorker, setIsWorker] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter()
    const dispatch = useDispatch()
    const { handleError } = useError();
    const isMobile = useIsMobile();
    const searchParams = useSearchParams();
    const activeTab = searchParams.get("tab") || "upcoming";

    useEffect(() => {
        if (storedData?.user) {
            if (storedData?.user?.role_id === 4) {
                setIsWorker(false);
            } else {
                setIsWorker(true);
            }
        }
    }, [storedData, router]);

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                var apiUrl;
                if (storedData?.token) {
                    apiUrl = `/job/details`;
                } else {
                    apiUrl = `/job/details/public`;
                }

                setLoading(true); // Show loader when the request starts
                // Fetch data from API
                const apiResponse = await apiRequest(apiUrl, {
                    method: 'POST',
                    headers: {
                        revalidate: true,
                        ...(storedData && { 'Authorization': `Bearer ${storedData.token}` })
                    },
                    body: {
                        job_id: params.id
                    }
                }, handleError);

                if (apiResponse) {
                    if (apiResponse?.job_not_found === true) {
                        router.push('/redirecting/accessDenied');
                    } else if (storedData?.user?.role_id === 4) {
                        router.push(`/redirecting/clientHub?job_id=${params.id}`);
                    }
                    dispatch(setJobData(apiResponse));
                    dispatch(setJobId(params.id));
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false); // Hide loader when the request finishes
            }
        };

        fetchJobDetails();
    }, []); // You may want to add dependencies if needed

    useEffect(() => {
        if (storedData?.user) {
            if (isWorker) {
                router.push(`/staff/job-detail/${params.id}?tab=${activeTab}`)
            }
        }
    }, [storedData, router, isWorker]);

    if (isMobile === true) {
        return (
            <TalentMobile jobId={params.id} />
        )
    } else if (isMobile === false) {
        return (
            <div>
                <JobDetailWorker jobId={params.id} />
                {/* <BookingStyles /> */}
            </div>
        )
    }
}

export default page
