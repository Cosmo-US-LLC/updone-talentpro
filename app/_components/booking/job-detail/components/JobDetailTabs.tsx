"use client"
import { useError } from '@/app/lib/context/ErrorProvider'
import { apiRequest } from '@/app/lib/services'
import { selectAuth } from '@/app/lib/store/features/authSlice'
import { selectStaff } from '@/app/lib/store/features/staffSlice'
import { useAppSelector } from '@/app/lib/store/hooks'
import { useEffect, useState } from 'react'
import Invites from './Invites'
import Offers from './Offers'

const JobDetailsTabs = ({ activeTab, setOffers, offers, jobId, setSelectedOffer, selectedOffer, messagesRefreshed, isInModal }: any) => {
    const [data, setData] = useState<any>(null);
    const { jobData } = useAppSelector(selectStaff);
    const { auth: storedData } = useAppSelector(selectAuth);
    const { handleError } = useError();
    const [job, setJob] = useState<any>({});

    useEffect(() => {
        const fetchDataIfNeeded = async () => {
            try {
                const newData = await apiRequest(`/job/${jobData?.id}/invites`, {
                    method: 'GET',
                    headers: {
                        ...(storedData && { 'Authorization': `Bearer ${storedData.token}` })
                    }
                }, handleError);
                setData(newData);
            } catch (error) {
            }
        };

        fetchDataIfNeeded();
    }, [jobData?.id]);

    // useEffect(() => {
    //     const fetchOffers = async () => {
    //         try {
    //             const response = await apiRequest(`/invitation/fetchOffers`, {
    //                 method: 'POST',
    //                 headers: {
    //                     revalidate: true,
    //                     ...(storedData && { 'Authorization': `Bearer ${storedData.token}` })
    //                 },
    //                 body: {
    //                     'job_id': jobData.id
    //                 }
    //             }, handleError);

    //             if (response) {
    //                 setJob(response.job);
    //                 setOffers(response.offers);
    //             } else {
    //                 console.error('Unexpected data format:', response);
    //             }
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };

    //     fetchOffers();
    // }, [storedData, jobData?.id, messagesRefreshed]);


    if (isInModal === true) {
        return (
            <>
                {/* {error === "Password mismatch" || "User not found" ||storedData.token  ? null : */}
                <div className='!h-[50%]'>
                    <section className='bg-[#FFF] rounded-[12px]'>
                        {activeTab === 'a' && (
                            <Offers
                                offers={offers}
                                job={job}
                                setSelectedOffer={setSelectedOffer}
                                selectedOffer={selectedOffer}
                                isInModal={isInModal}
                            />
                        )}
                        {activeTab === 'b' && (
                            <Invites jobId={jobId} data={data} />
                        )}
                    </section>
                </div>
                {/* } */}
            </>
        )
    } else {
        return (
            <>
                {/* {error === "Password mismatch" || "User not found" ||storedData.token  ? null : */}
                <div className='!h-[100%] h-full'>
                    <section className='bg-[#FFF] rounded-[12px]'>
                        {activeTab === 'a' && (
                            <Offers
                                offers={offers}
                                job={job}
                                setSelectedOffer={setSelectedOffer}
                                selectedOffer={selectedOffer}
                                isInModal={isInModal}
                            />
                        )}
                        {activeTab === 'b' && (
                            <Invites jobId={jobId} data={data} />
                        )}
                    </section>
                </div>
                {/* } */}
            </>
        )
    }


}

// export default React.memo(JobDetailsTabs)
export default JobDetailsTabs